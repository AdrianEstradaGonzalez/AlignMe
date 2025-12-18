import AsyncStorage from '@react-native-async-storage/async-storage';

const VERSION_CHECK_KEY = '@last_version_check';
const CHECK_INTERVAL = 24 * 60 * 60 * 1000; // 24 horas en milisegundos

export interface VersionInfo {
  minVersion: string;
  currentVersion: string;
  storeLinks: {
    android: string;
    ios: string;
  };
  updateRequired: boolean;
  message: {
    es: string;
  };
}

/**
 * Compara dos versiones en formato semántico (X.Y.Z)
 * @returns -1 si v1 < v2, 0 si son iguales, 1 si v1 > v2
 */
export const compareVersions = (v1: string, v2: string): number => {
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
 * Verifica si necesita hacer una nueva comprobación de versión
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
 * Verifica la versión de la app contra el servidor
 * @param currentVersion Versión actual de la app (del package.json)
 * @param apiUrl URL del servidor de versiones
 * @returns Información de la versión o null si hay error
 */
export const checkAppVersion = async (
  currentVersion: string,
  apiUrl: string = 'https://alignme-version-server.onrender.com/api/version'
): Promise<VersionInfo | null> => {
  try {
    // Verificar si debe hacer la comprobación
    const shouldCheck = await shouldCheckVersion();
    if (!shouldCheck) {
      console.log('Version check skipped - checked recently');
      return null;
    }

    // Hacer la petición con timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 segundos timeout

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error('Version check failed:', response.status);
      return null;
    }

    const versionInfo: VersionInfo = await response.json();

    // Guardar el timestamp de esta comprobación
    await saveLastCheckTime();

    return versionInfo;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      console.warn('Version check timeout - server may be sleeping');
    } else {
      console.error('Error checking app version:', error);
    }
    return null;
  }
};

/**
 * Determina si se debe mostrar la alerta de actualización
 * @param currentVersion Versión actual de la app
 * @param versionInfo Información del servidor
 * @returns true si debe mostrar la alerta
 */
export const shouldShowUpdateAlert = (
  currentVersion: string,
  versionInfo: VersionInfo
): boolean => {
  // Si updateRequired es true, siempre mostrar
  if (versionInfo.updateRequired) {
    return true;
  }

  // Si la versión actual es menor que la mínima requerida
  if (compareVersions(currentVersion, versionInfo.minVersion) < 0) {
    return true;
  }

  return false;
};

/**
 * Determina si la actualización es obligatoria
 * @param currentVersion Versión actual de la app
 * @param versionInfo Información del servidor
 * @returns true si la actualización es obligatoria
 */
export const isUpdateMandatory = (
  currentVersion: string,
  versionInfo: VersionInfo
): boolean => {
  return compareVersions(currentVersion, versionInfo.minVersion) < 0;
};
