/**
 * 🔐 COMUNIDADES AUTÓNOMAS PERMITIDAS
 * ====================================
 * Lista de comunidades que tienen los derechos de AlignMe.
 * Es fácil añadir o quitar comunidades de esta lista.
 */

import { CommunityId } from './themes';

/**
 * Lista de comunidades autónomas que tienen acceso a AlignMe
 */
export const ALLOWED_COMMUNITIES: CommunityId[] = [
  'asturias', 
  'baleares'
];

/**
 * Verifica si una comunidad tiene acceso a AlignMe
 * @param communityId - ID de la comunidad a verificar
 * @returns true si la comunidad tiene acceso, false en caso contrario
 */
export const isCommunityAllowed = (communityId: CommunityId | null): boolean => {
  if (!communityId) return false;
  return ALLOWED_COMMUNITIES.includes(communityId);
};

/**
 * 📝 INSTRUCCIONES PARA AÑADIR NUEVA COMUNIDAD:
 * 
 * 1. Añadir el ID de la comunidad a CommunityId en themes.ts
 * 2. Crear el tema en themes.ts
 * 3. Crear los assets en assets.ts
 * 4. Añadir el ID a ALLOWED_COMMUNITIES en este archivo
 * 5. Actualizar las coordenadas geográficas en geolocation.ts
 * 
 * EJEMPLO:
 * export const ALLOWED_COMMUNITIES: CommunityId[] = [
 *   'asturias',
 *   'baleares',
 *   'cataluña',  // <- Nueva comunidad
 * ];
 */
