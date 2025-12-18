/**
 * 🌍 SERVICIO DE GEOLOCALIZACIÓN
 * ================================
 * Determina la comunidad autónoma del usuario basándose en su ubicación GPS.
 */

import { Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { CommunityId } from '../config/themes';

/**
 * Coordenadas geográficas aproximadas de las comunidades autónomas
 * Formato: [latitud_min, latitud_max, longitud_min, longitud_max]
 */
interface CommunityBounds {
  name: string;
  latMin: number;
  latMax: number;
  lonMin: number;
  lonMax: number;
}

const COMMUNITY_BOUNDS: Record<CommunityId, CommunityBounds> = {
  asturias: {
    name: 'Asturias',
    latMin: 42.9,    // Límite sur
    latMax: 43.7,    // Límite norte
    lonMin: -7.2,    // Límite oeste
    lonMax: -4.5,    // Límite este
  },
  baleares: {
    name: 'Islas Baleares',
    latMin: 38.6,    // Límite sur
    latMax: 40.1,    // Límite norte
    lonMin: 1.2,     // Límite oeste
    lonMax: 4.4,     // Límite este
  },
};

/**
 * Resultado de la solicitud de permisos de ubicación
 */
export enum LocationPermissionStatus {
  GRANTED = 'granted',
  DENIED = 'denied',
  BLOCKED = 'blocked',
  UNAVAILABLE = 'unavailable',
}

/**
 * Solicita permisos de ubicación al usuario
 */
export const requestLocationPermission = async (): Promise<LocationPermissionStatus> => {
  try {
    const permission = Platform.OS === 'ios' 
      ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE 
      : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

    const result = await request(permission);

    switch (result) {
      case RESULTS.GRANTED:
        return LocationPermissionStatus.GRANTED;
      case RESULTS.DENIED:
        return LocationPermissionStatus.DENIED;
      case RESULTS.BLOCKED:
        return LocationPermissionStatus.BLOCKED;
      case RESULTS.UNAVAILABLE:
        return LocationPermissionStatus.UNAVAILABLE;
      default:
        return LocationPermissionStatus.DENIED;
    }
  } catch (error) {
    console.error('Error requesting location permission:', error);
    return LocationPermissionStatus.DENIED;
  }
};

/**
 * Obtiene la ubicación actual del usuario
 */
const getCurrentPosition = (): Promise<{ latitude: number; longitude: number }> => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: false,
        timeout: 15000,
        maximumAge: 10000,
      }
    );
  });
};

/**
 * Determina la comunidad autónoma basándose en las coordenadas
 */
const getCommunityFromCoordinates = (
  latitude: number, 
  longitude: number
): CommunityId | null => {
  // Buscar en qué comunidad caen las coordenadas
  for (const [communityId, bounds] of Object.entries(COMMUNITY_BOUNDS)) {
    if (
      latitude >= bounds.latMin &&
      latitude <= bounds.latMax &&
      longitude >= bounds.lonMin &&
      longitude <= bounds.lonMax
    ) {
      return communityId as CommunityId;
    }
  }
  
  return null; // No está en ninguna comunidad conocida
};

/**
 * Detecta la comunidad autónoma del usuario
 * @returns El ID de la comunidad o null si no se pudo determinar
 */
export const detectUserCommunity = async (): Promise<{
  community: CommunityId | null;
  error?: string;
}> => {
  try {
    // 1. Verificar permisos
    const permissionStatus = await requestLocationPermission();
    
    if (permissionStatus !== LocationPermissionStatus.GRANTED) {
      return {
        community: null,
        error: 'Permisos de ubicación denegados',
      };
    }

    // 2. Obtener ubicación
    const position = await getCurrentPosition();
    
    // 3. Determinar comunidad
    const community = getCommunityFromCoordinates(
      position.latitude,
      position.longitude
    );

    return {
      community,
      error: community ? undefined : 'No se pudo determinar la comunidad',
    };
  } catch (error) {
    console.error('Error detecting user community:', error);
    return {
      community: null,
      error: 'Error al obtener la ubicación',
    };
  }
};

/**
 * 📝 INSTRUCCIONES PARA AÑADIR NUEVA COMUNIDAD:
 * 
 * 1. Añadir las coordenadas de la nueva comunidad a COMMUNITY_BOUNDS
 * 2. Las coordenadas se pueden obtener de mapas o herramientas geográficas
 * 3. Asegurarse de que el CommunityId existe en themes.ts
 * 
 * EJEMPLO:
 * cataluña: {
 *   name: 'Cataluña',
 *   latMin: 40.5,
 *   latMax: 42.9,
 *   lonMin: 0.2,
 *   lonMax: 3.3,
 * },
 */
