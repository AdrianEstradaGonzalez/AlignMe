import { Platform } from 'react-native';

const BACKEND_URL = 'https://alignme-backend.onrender.com';

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
 * Verifica la versión de la app contra el backend
 * SIEMPRE verifica en cada inicio - no usa caché de timestamp
 */
export const checkAppVersion = async (): Promise<VersionCheckResult> => {
  const currentVersion = '2.2.0'; // Sincronizado con package.json
  
  try {
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
