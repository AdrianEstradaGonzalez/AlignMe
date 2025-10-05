import { StyleSheet, Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");
const scaleHeight = height / 800;

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
    minHeight: height, 
  },

  card: {
    width: width * 0.9,
    maxWidth: 420,
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
    width: "100%",
    height: 60 * scaleHeight,
    resizeMode: "contain",
    marginBottom: 16,
  },

  logo: {
    width: width * 0.25,
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

  copyright: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    fontSize: 11,
    color: "#e2e8f0",
    opacity: 0.85,
    letterSpacing: 0.5,
  },
});