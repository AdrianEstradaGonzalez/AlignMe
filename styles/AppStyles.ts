import { StyleSheet, Dimensions, Platform } from "react-native";
import { Theme } from "../config/themes";

const { width, height } = Dimensions.get("window");
const scaleHeight = height / 800;
const sponsorLogoHeight = 56 * scaleHeight;

// Patrocinadores de la app (VBStats y BlueDebug)
export const APP_SPONSOR_LOGO_SIZE = Math.max(34, 46 * scaleHeight);
export const APP_SPONSOR_LOGO_SIZE_COMPACT = Math.max(28, 34 * scaleHeight);
const appSponsorTileSize = APP_SPONSOR_LOGO_SIZE + 12;
const appSponsorTileSizeCompact = APP_SPONSOR_LOGO_SIZE_COMPACT + 10;
const appSponsorsCardWidth = Math.min(360, width * 0.9);

/**
 * 🎨 DYNAMIC STYLES FACTORY
 * =========================
 * Genera estilos dinámicos basados en el tema de la comunidad seleccionada
 */
export const createAppStyles = (theme: Theme) => StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },

  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    backgroundColor: theme.overlayDark,
    minHeight: height, 
  },

  card: {
    width: width * 0.9,
    maxHeight: height * 0.85,
    backgroundColor: "#ffffff",
    borderRadius: 28,
    paddingVertical: 20 * scaleHeight,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center", // 🔹 centra contenido interno
    opacity: 0.95,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 10,
  },

  logoHeader: {
    alignSelf: "center",
    width: Math.min(480, width * 0.75),
    height: 64 * scaleHeight,
    resizeMode: "contain",
    marginBottom: 16,
  },

  logo: {
    width: width * 0.25,
    height: width * 0.25,
    resizeMode: "contain",
    marginBottom: 12,
  },

  logosRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    gap: 16,
  },

  secondaryLogo: {
    width: width * 0.25,
    height: width * 0.25,
    resizeMode: "contain",
  },

  balearesSecondaryLogo: {
    width: width * 0.175,
    height: width * 0.175,
    resizeMode: "contain",
  },

  title: {
    fontFamily: Platform.select({
      ios: "Avenir-Heavy",
      android: "sans-serif-condensed",
    }),
    fontWeight: "700",
    fontSize: 28,
    textAlign: "center",
    marginBottom: 16,
    color: theme.textPrimary,
    letterSpacing: 0.8,
    lineHeight: 32,
  },

  button: {
    borderRadius: 16,
    backgroundColor: theme.buttonPrimary,
    marginVertical: 6,
    minWidth: "100%",
    paddingVertical: 12,

    shadowColor: theme.buttonPrimary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },

  buttonContent: {
    paddingVertical: 12,
  },

  buttonLabel: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },

  copyright: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
    fontSize: 11,
    color: theme.textOnPrimary,
    opacity: 0.85,
    letterSpacing: 0.5,
  },

  /* New reusable styles for Home action buttons */
  cardContent: {
    // keep a single source of truth: the Card defines the inner padding
    alignItems: "center",
    width: "100%",
  },

  actionCard: {
    backgroundColor: theme.actionCardBg,
    borderRadius: 16,
    overflow: "hidden",
    marginVertical: 8,
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 6,
  },

  actionLeftBar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 6,
    backgroundColor: theme.actionCardLeftBar,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },

  actionBorder: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.actionCardBorderSubtle,
  },

  actionText: {
    color: theme.actionCardText,
    fontWeight: "800",
    fontSize: 18,
    
  },

  actionArrow: {
    color: theme.actionCardArrow,
    fontSize: 26,
    fontWeight: "600",
  },

  // Styles específicos para Baleares
  topRightLogo: {
    position: "absolute",
    top: 30 * scaleHeight,
    right: 8,
    width: Math.min(80, width * 0.25),
    height: 60 * scaleHeight,
    resizeMode: "contain",
    zIndex: 100,
  },

  sponsorLogo: {
    alignSelf: "center",
    width: Math.min(280, width * 0.85),
    height: sponsorLogoHeight,
    marginTop: 0,
    marginBottom: 0,
    opacity: 0.95,
  },

  // Hueco del patrocinador de la federación (Baleares), ajustado a su logo
  federationSponsorSlot: {
    height: sponsorLogoHeight + 10 * scaleHeight,
    marginTop: 10 * scaleHeight,
    alignItems: "center",
    justifyContent: "center",
  },

  // Patrocinadores de la app (VBStats + BlueDebug): tarjeta con logo, nombre y enlace
  appSponsorsSection: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16 * scaleHeight,
  },

  appSponsorsSectionCompact: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6 * scaleHeight,
  },

  appSponsors: {
    width: appSponsorsCardWidth,
    alignItems: "stretch",
    alignSelf: "center",
  },

  appSponsorsLabel: {
    fontSize: 10,
    lineHeight: 14,
    fontWeight: "800",
    letterSpacing: 2,
    textAlign: "center",
    color: theme.textOnPrimary,
    opacity: 0.85,
    marginBottom: 7,
    textShadowColor: "rgba(0, 0, 0, 0.35)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },

  appSponsorsCard: {
    width: "100%",
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.96)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.65)",
    overflow: "hidden",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },

  appSponsorsCardCompact: {
    flexDirection: "row",
    alignItems: "stretch",
    borderRadius: 16,
  },

  appSponsorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 10 * scaleHeight,
    paddingHorizontal: 14,
  },

  appSponsorRowCompact: {
    flex: 1,
    gap: 8,
    paddingVertical: 7 * scaleHeight,
    paddingHorizontal: 10,
  },

  appSponsorLogoTile: {
    width: appSponsorTileSize,
    height: appSponsorTileSize,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f3f4f6",
    overflow: "hidden",
  },

  appSponsorLogoTileCompact: {
    width: appSponsorTileSizeCompact,
    height: appSponsorTileSizeCompact,
    borderRadius: 12,
  },

  appSponsorLogoTileVbstats: {
    backgroundColor: "#111827",
  },

  appSponsorTextBlock: {
    flex: 1,
    justifyContent: "center",
  },

  appSponsorName: {
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.2,
    color: theme.textPrimary,
  },

  appSponsorNameCompact: {
    fontSize: 14,
  },

  appSponsorTagline: {
    fontSize: 12,
    fontWeight: "600",
    color: theme.textLight,
    marginTop: 2,
  },

  appSponsorTaglineCompact: {
    fontSize: 10.5,
    lineHeight: 13,
    marginTop: 1,
  },

  appSponsorArrow: {
    fontSize: 24,
    fontWeight: "600",
    color: theme.borderAccent,
    marginLeft: 2,
  },

  appSponsorSeparator: {
    height: 1,
    marginHorizontal: 14,
    backgroundColor: theme.border,
  },

  appSponsorSeparatorCompact: {
    width: 1,
    height: "auto",
    marginHorizontal: 0,
    marginVertical: 10,
  },

  sponsorBelow: {
    width: Math.min(280, width * 0.85),
    alignSelf: "center",
    marginTop: 12 * scaleHeight,
    marginBottom: 8 * scaleHeight,
    alignItems: "center",
  },
});