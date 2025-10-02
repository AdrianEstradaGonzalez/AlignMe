import { StyleSheet, Dimensions, Platform, PixelRatio } from "react-native";

const { width, height } = Dimensions.get("window");

// Escalas dinámicas según altura de pantalla
const scaleHeight = height / 800; // base 800px de altura de referencia

export const AppStyles = StyleSheet.create({
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
    backgroundColor: "rgba(15, 23, 42, 0.55)",
  },

  card: {
    width: width * 0.9,
    maxWidth: 420,
    maxHeight: height * 0.85,
    backgroundColor: "#ffffff",
    borderRadius: 28,
    paddingVertical: 20 * scaleHeight, // padding dinámico
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "flex-start",
    opacity: 0.95,
    flexShrink: 1,
    marginBottom: 40,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 10,
  },

  logoHeader: {
    alignSelf: "center",
    width: "100%",
    height: 60 * scaleHeight, // altura dinámica según pantalla
    resizeMode: "contain",
    marginBottom: 16,
  },

  logo: {
    width: width * 0.25, // más pequeño para pantallas bajas
    height: width * 0.25,
    resizeMode: "contain",
    marginBottom: 12,
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
    color: "#0f172a",
    letterSpacing: 0.8,
    lineHeight: 32,
  },

  button: {
    borderRadius: 16,
    backgroundColor: "#7c3aed",
    marginVertical: 6,
    minWidth: "100%",
    flexShrink: 1,
    paddingVertical: 12,

    shadowColor: "#7c3aed",
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

  icon: {
    width: 28,
    height: 28,
    marginRight: 10,
    resizeMode: "contain",
  },

  copyright: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    fontSize: 11,
    color: "#e2e8f0",
    opacity: 0.85,
    letterSpacing: 0.5,
  },
});
