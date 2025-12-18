import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BACKEND_URL = 'https://alignme-backend.onrender.com'; // Actualiza con tu URL de Render
const VERSION_CHECK_KEY = '@last_version_check';
const CHECK_INTERVAL = 24 * 60 * 60 * 1000; // 24 horas

interface VersionConfig {
  minVersion: string;
  currentVersion: string;
  forceUpdate: boolean;
  storeLinks: {
    android: string;
    ios: string;
  };
}

interface VersionCheckResult {
  needsUpdate: boolean;
  forceUpdate: boolean;
  storeUrl: string;
}

/**
 * Compara dos versiones en formato semántico (X.Y.Z)
 * @returns -1 si v1 < v2, 0 si iguales, 1 si v1 > v2
 */
const compareVersions = (v1: string, v2: string): number => {
  const parts1 = v1.split('.').map(Number);
  const parts2 = v2.split('.').map(Number);

  for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
    const part1 = parts1[i] || 0;
    const part2 = parts2[i] || 0;

    if (part1 < part2) return -1;
    if (part1 > part2) return 1;
  }

  return 0;
};

/**
 * Verifica si debe hacer nueva comprobación de versión
 */
const shouldCheckVersion = async (): Promise<boolean> => {
  try {
    const lastCheck = await AsyncStorage.getItem(VERSION_CHECK_KEY);
    if (!lastCheck) return true;

    const lastCheckTime = parseInt(lastCheck, 10);
    const now = Date.now();

    return (now - lastCheckTime) > CHECK_INTERVAL;
  } catch (error) {
    console.error('Error checking version timestamp:', error);
    return true;
  }
};

/**
 * Guarda el timestamp de la última comprobación
 */
const saveLastCheckTime = async (): Promise<void> => {
  try {
    await AsyncStorage.setItem(VERSION_CHECK_KEY, Date.now().toString());
  } catch (error) {
    console.error('Error saving version check timestamp:', error);
  }
};

/**
 * Verifica la versión de la app contra el backend
 */
export const checkAppVersion = async (): Promise<VersionCheckResult> => {
  const currentVersion = '2.2.0'; // Sincronizado con package.json
  
  try {
    // Verificar si debe hacer la comprobación
    const shouldCheck = await shouldCheckVersion();
    if (!shouldCheck) {
      console.log('Version check skipped - checked recently');
      return { needsUpdate: false, forceUpdate: false, storeUrl: '' };
    }

    // Hacer petición con timeout (Render puede tardar en despertar)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 segundos

    const response = await fetch(`${BACKEND_URL}/api/version`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error('Version check failed:', response.status);
      return { needsUpdate: false, forceUpdate: false, storeUrl: '' };
    }

    const config: VersionConfig = await response.json();
    await saveLastCheckTime();

    // Determinar si necesita actualizar
    const needsUpdate = 
      config.forceUpdate || 
      compareVersions(currentVersion, config.minVersion) < 0 ||
      compareVersions(currentVersion, config.currentVersion) < 0;

    const forceUpdate = 
      config.forceUpdate || 
      compareVersions(currentVersion, config.minVersion) < 0;

    const storeUrl = Platform.OS === 'ios' 
      ? config.storeLinks.ios 
      : config.storeLinks.android;

    return {
      needsUpdate,
      forceUpdate,
      storeUrl
    };

  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      console.warn('Version check timeout - backend sleeping on Render');
    } else {
      console.error('Error checking version:', error);
    }
    return { needsUpdate: false, forceUpdate: false, storeUrl: '' };
  }
};
