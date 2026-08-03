/**
 * 🎨 MULTI-COMMUNITY THEME SYSTEM
 * ================================
 * Sistema centralizado de temas para múltiples comunidades autónomas.
 * Cada comunidad tiene su propia paleta de colores personalizada.
 */

export type CommunityId = 'generic' | 'asturias' | 'baleares';

/**
 * Comunidades con personalización propia (federaciones con licencia).
 * El resto del territorio usa la versión básica ('generic').
 */
export type CustomizedCommunityId = Exclude<CommunityId, 'generic'>;

export interface Theme {
  // Identificación
  id: CommunityId;
  name: string;
  federationTitle: string;
  
  // 🎯 COLORES PRINCIPALES
  primary: string;
  primaryDark: string;
  primaryLight: string;
  
  // 🎯 COLORES SECUNDARIOS
  secondary: string;
  secondaryLight: string;
  
  accent: string;
  accentDark: string;
  
  // 🎯 COLORES DE FONDO Y SUPERFICIE
  background: string;
  surface: string;
  surfaceDark: string;
  
  // 🎯 COLORES DE TEXTO
  textPrimary: string;
  textSecondary: string;
  textLight: string;
  textOnPrimary: string;
  
  // 🎯 COLORES DE BORDE Y DIVISORES
  border: string;
  borderAccent: string;
  divider: string;
  
  // 🎯 COLORES DEL CAMPO/CANCHA
  fieldBackground: string;
  fieldBorder: string;
  fieldLine: string;
  
  // 🎯 OVERLAYS Y SOMBRAS
  overlayDark: string;
  overlayLight: string;
  shadow: string;
  
  // 🎯 ESTADOS
  success: string;
  warning: string;
  error: string;
  info: string;
  
  // 🎯 COLORES SEMÁNTICOS (Botones específicos)
  buttonPrimary: string;
  buttonSecondary: string;
  buttonAccent: string;
  buttonInfo: string;
  buttonDanger: string;
  
  // 🎯 COLORES DE TARJETAS DE ACCIÓN
  actionCardBg: string;
  actionCardBorder: string;
  actionCardBorderSubtle: string;
  actionCardText: string;
  actionCardArrow: string;
  actionCardLeftBar: string;
}

/**
 * ⚪ TEMA GENÉRICO (VERSIÓN BÁSICA)
 * Versión sin personalizar de AlignMe, para cualquier ubicación sin federación licenciada.
 */
export const GenericTheme: Theme = {
  id: 'generic',
  name: 'AlignMe',
  federationTitle: 'AlignMe',

  // Colores principales - azul AlignMe
  primary: "#1e40af",
  primaryDark: "#1e40af",
  primaryLight: "#60a5fa",

  secondary: "#1e40af",
  secondaryLight: "#a78bfa",

  accent: "#fbdc09",
  accentDark: "#d97706",

  // Fondos y superficies
  background: "#f9fafb",
  surface: "#ffffff",
  surfaceDark: "#1d2841",

  // Textos
  textPrimary: "#0f172a",
  textSecondary: "#374151",
  textLight: "#6b7280",
  textOnPrimary: "#ffffff",

  // Bordes
  border: "#e5e7eb",
  borderAccent: "#3b82f6",
  divider: "#d1d5db",

  // Campo
  fieldBackground: "#fff7ed",
  fieldBorder: "#3b82f6",
  fieldLine: "#3b82f6",

  // Overlays
  overlayDark: "rgba(15, 23, 42, 0.55)",
  overlayLight: "rgba(59, 130, 246, 0.1)",
  shadow: "#000000",

  // Estados
  success: "#10b981",
  warning: "#f59e0b",
  error: "#ef4444",
  info: "#1e40af",

  // Botones
  buttonPrimary: "#1e40af",
  buttonSecondary: "#3b82f6",
  buttonAccent: "#f59e0b",
  buttonInfo: "#1e40af",
  buttonDanger: "#ef4444",

  // Tarjetas de acción
  actionCardBg: "#1d2841",
  actionCardBorder: "#3b82f6",
  actionCardBorderSubtle: "rgba(59, 130, 246, 0.12)",
  actionCardText: "#ffffff",
  actionCardArrow: "#3b82f6",
  actionCardLeftBar: "#3b82f6",
};

/**
 * 🔵 TEMA ASTURIAS
 * Basado en los colores de la Federación de Voleibol del Principado de Asturias
 */
export const AsturiasTheme: Theme = {
  id: 'asturias',
  name: 'Asturias',
  federationTitle: 'AlignMe',
  
  // Colores principales - tonos azulados/morados
  primary: "#1e40af",
  primaryDark: "#1e40af",
  primaryLight: "#60a5fa",
  
  secondary: "#1e40af",
  secondaryLight: "#a78bfa",
  
  accent: "#fbdc09",
  accentDark: "#d97706",
  
  // Fondos y superficies
  background: "#f9fafb",
  surface: "#ffffff",
  surfaceDark: "#1d2841",
  
  // Textos
  textPrimary: "#0f172a",
  textSecondary: "#374151",
  textLight: "#6b7280",
  textOnPrimary: "#ffffff",
  
  // Bordes
  border: "#e5e7eb",
  borderAccent: "#3b82f6",
  divider: "#d1d5db",
  
  // Campo
  fieldBackground: "#fff7ed",
  fieldBorder: "#3b82f6",
  fieldLine: "#3b82f6",
  
  // Overlays
  overlayDark: "rgba(15, 23, 42, 0.55)",
  overlayLight: "rgba(59, 130, 246, 0.1)",
  shadow: "#000000",
  
  // Estados
  success: "#10b981",
  warning: "#f59e0b",
  error: "#ef4444",
  info: "#1e40af",
  
  // Botones
  buttonPrimary: "#1e40af",
  buttonSecondary: "#3b82f6",
  buttonAccent: "#f59e0b",
  buttonInfo: "#1e40af",
  buttonDanger: "#ef4444",
  
  // Tarjetas de acción
  actionCardBg: "#1d2841",
  actionCardBorder: "#3b82f6",
  actionCardBorderSubtle: "rgba(59, 130, 246, 0.12)",
  actionCardText: "#ffffff",
  actionCardArrow: "#3b82f6",
  actionCardLeftBar: "#3b82f6",
};

/**
 * 🟣 TEMA BALEARES (COTABAL)
 * Basado en los colores oficiales de COTABAL
 */
export const BalearesTheme: Theme = {
  id: 'baleares',
  name: 'Islas Baleares',
  federationTitle: 'COTABAL LINE UP',
  
  // Colores principales - morado COTABAL
  primary: "#590660",
  primaryDark: "#3d0442",
  primaryLight: "#7a0887",
  
  // Rojo COTABAL
  secondary: "#d9121a",
  secondaryLight: "#ff4148",
  
  // Amarillo COTABAL
  accent: "#fbdc09",
  accentDark: "#e5c708",
  
  // Fondos y superficies
  background: "#f9fafb",
  surface: "#ffffff",
  surfaceDark: "#2d0f33",
  
  // Textos
  textPrimary: "#0f172a",
  textSecondary: "#374151",
  textLight: "#6b7280",
  textOnPrimary: "#ffffff",
  
  // Bordes
  border: "#e5e7eb",
  borderAccent: "#590660",
  divider: "#d1d5db",
  
  // Campo
  fieldBackground: "#fff7ed",
  fieldBorder: "#590660",
  fieldLine: "#590660",
  
  // Overlays
  // Overlays
  overlayDark: "rgba(15, 23, 42, 0.55)",
  overlayLight: "rgba(59, 130, 246, 0.1)",
  shadow: "#000000",
  
  // Estados
  success: "#10b981",
  warning: "#f59e0b",
  error: "#ef4444",
  info: "#3b82f6",
  
  // Botones
  buttonPrimary: "#590660",
  buttonSecondary: "#590660",
  buttonAccent: "#fbdc09",
  buttonInfo: "#3b82f6",
  buttonDanger: "#ef4444",
  
  // Tarjetas de acción
  actionCardBg: "#2d0f33",
  actionCardBorder: "#590660",
  actionCardBorderSubtle: "rgba(89, 6, 96, 0.2)",
  actionCardText: "#ffffff",
  actionCardArrow: "#fbdc09",
  actionCardLeftBar: "#d9121a",
};

/**
 * 📦 REGISTRO DE TEMAS
 * Aquí se registran todos los temas disponibles
 */
export const THEMES: Record<CommunityId, Theme> = {
  generic: GenericTheme,
  asturias: AsturiasTheme,
  baleares: BalearesTheme,
};

/**
 * 🎯 HELPER: Obtener tema por ID
 */
export const getTheme = (communityId: CommunityId): Theme => {
  return THEMES[communityId];
};

/**
 * 🎯 COMUNIDAD POR DEFECTO
 * Se usa cuando la ubicación no corresponde a una federación con licencia,
 * o cuando no se puede determinar (sin permiso de ubicación, GPS sin señal...).
 */
export const DEFAULT_COMMUNITY_ID: CommunityId = 'generic';

/**
 * 📝 INSTRUCCIONES PARA AÑADIR NUEVA COMUNIDAD:
 *
 * 1. Añade el nuevo ID al tipo CommunityId (ej: 'galicia')
 * 2. Crea el objeto de tema siguiendo la estructura de Theme
 * 3. Añade el tema al objeto THEMES
 * 4. Actualiza config/assets.ts con los recursos de la nueva comunidad
 * 5. Añade la bandera en assets/{comunidad}/bandera.png
 */
