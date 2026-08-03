/**
 * 📍 LOCATION SERVICE
 * ===================
 * Servicio para detectar la comunidad autónoma según las coordenadas GPS.
 * La ubicación NO restringe el acceso a la app: sólo decide qué personalización
 * se muestra. Fuera de las comunidades con licencia se usa la versión básica.
 */

import { CommunityId, CustomizedCommunityId, DEFAULT_COMMUNITY_ID } from '../config/themes';

export interface LocationResult {
  communityId: CommunityId;
  latitude: number;
  longitude: number;
}

/**
 * Polígonos aproximados de las comunidades con personalización propia.
 * Cada polígono es un array de coordenadas [lat, lon].
 * Los polígonos se definen en sentido horario/antihorario para cubrir el área.
 */
const COMMUNITY_POLYGONS: Record<CustomizedCommunityId, Array<[number, number]>> = {
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
 * Si el punto no cae en ninguna comunidad personalizada, devuelve la versión básica.
 */
export function detectCommunityByLocation(
  latitude: number,
  longitude: number
): LocationResult {
  // Buscar en qué comunidad personalizada se encuentra el punto
  for (const [communityId, polygon] of Object.entries(COMMUNITY_POLYGONS)) {
    if (isPointInPolygon(latitude, longitude, polygon)) {
      return {
        communityId: communityId as CommunityId,
        latitude,
        longitude,
      };
    }
  }

  // Fuera de las comunidades con licencia: versión básica sin personalizar
  return {
    communityId: DEFAULT_COMMUNITY_ID,
    latitude,
    longitude,
  };
}

/**
 * Lista de comunidades con personalización (para facilitar la extensión)
 */
export const CUSTOMIZED_COMMUNITIES: CustomizedCommunityId[] = ['asturias', 'baleares'];

/**
 * Añadir nueva comunidad (para facilitar la extensión futura)
 */
export function addCommunityPolygon(
  communityId: CustomizedCommunityId,
  polygon: Array<[number, number]>
): void {
  COMMUNITY_POLYGONS[communityId] = polygon;
  if (!CUSTOMIZED_COMMUNITIES.includes(communityId)) {
    CUSTOMIZED_COMMUNITIES.push(communityId);
  }
}
