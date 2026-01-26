/**
 * 📍 LOCATION SERVICE
 * ===================
 * Servicio para detectar la comunidad autónoma según las coordenadas GPS.
 * Incluye definición de polígonos para cada comunidad autónoma.
 */

import { CommunityId } from '../config/themes';

export interface LocationResult {
  communityId: CommunityId | null;
  isAllowed: boolean;
  latitude: number;
  longitude: number;
}

// Testing helper: cuando se activa, permitirá toda la continental USA
let ALLOW_ALL_US = false;
export function enableAllowAllUSForTesting() {
  ALLOW_ALL_US = true;
}
/**
 * Polígonos aproximados de las comunidades autónomas permitidas.
 * Cada polígono es un array de coordenadas [lat, lon].
 * Los polígonos se definen en sentido horario/antihorario para cubrir el área.
 */
const COMMUNITY_POLYGONS: Record<CommunityId, Array<[number, number]>> = {
  asturias: [
    // Caja ampliada para cubrir todo el Principado y bordes
    [44.0, -7.6],   // Noroeste
    [44.0, -4.0],   // Noreste
    [42.5, -4.0],   // Sureste
    [42.5, -7.6],   // Suroeste
  ],
  baleares: [
    // Caja amplia que cubre Mallorca, Menorca, Ibiza, Formentera y margen marino
    [40.9, 0.0],    // Noroeste
    [40.9, 5.2],    // Noreste
    [37.0, 5.2],    // Sureste
    [37.0, 0.0],    // Suroeste
  ],
};

/**
 * Algoritmo de punto en polígono (Ray Casting)
 * Determina si un punto está dentro de un polígono.
 */
function isPointInPolygon(
  lat: number,
  lon: number,
  polygon: Array<[number, number]>
): boolean {
  let inside = false;
  
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];
    
    const intersect =
      yi > lon !== yj > lon &&
      lat < ((xj - xi) * (lon - yi)) / (yj - yi) + xi;
    
    if (intersect) {
      inside = !inside;
    }
  }
  
  return inside;
}

/**
 * Determina la comunidad autónoma según las coordenadas.
 */
export function detectCommunityByLocation(
  latitude: number,
  longitude: number
): LocationResult {
  // Si está activo el modo de pruebas, permitir cualquier punto dentro de la continental USA
  if (ALLOW_ALL_US) {
    const latMin = 24.52; // sur de continental US
    const latMax = 49.38; // norte de continental US
    const lonMin = -124.77; // oeste
    const lonMax = -66.95;  // este

    if (latitude >= latMin && latitude <= latMax && longitude >= lonMin && longitude <= lonMax) {
      return {
        communityId: 'asturias',
        isAllowed: true,
        latitude,
        longitude,
      };
    }
  }
  // Buscar en qué comunidad se encuentra el punto
  for (const [communityId, polygon] of Object.entries(COMMUNITY_POLYGONS)) {
    if (isPointInPolygon(latitude, longitude, polygon)) {
      return {
        communityId: communityId as CommunityId,
        isAllowed: true,
        latitude,
        longitude,
      };
    }
  }
  
  // Si no está en ninguna comunidad permitida
  return {
    communityId: null,
    isAllowed: false,
    latitude,
    longitude,
  };
}

/**
 * Lista de comunidades permitidas (para facilitar la extensión)
 */
export const ALLOWED_COMMUNITIES: CommunityId[] = ['asturias', 'baleares'];

/**
 * Añadir nueva comunidad (para facilitar la extensión futura)
 */
export function addCommunityPolygon(
  communityId: CommunityId,
  polygon: Array<[number, number]>
): void {
  COMMUNITY_POLYGONS[communityId] = polygon;
  if (!ALLOWED_COMMUNITIES.includes(communityId)) {
    ALLOWED_COMMUNITIES.push(communityId);
  }
}
