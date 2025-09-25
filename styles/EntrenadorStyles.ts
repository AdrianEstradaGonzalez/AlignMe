import { StyleSheet, Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");

// 🔹 Base de referencia
const BASE_WIDTH = 360;
const BASE_HEIGHT = 640;
const rawScale = Math.min(width / BASE_WIDTH, height / BASE_HEIGHT);

// 🔹 Límites de escala
const MIN_SCALE = 0.75; // más agresivo en móviles chicos
const MAX_SCALE = 1.2;    // nunca más grande que el diseño base
const scale = Math.min(Math.max(rawScale, MIN_SCALE), MAX_SCALE);

// 🔹 Factores de pantalla
const isSmallScreen = width < 360 || height < 640; // móviles pequeños
const isLargeScreen = width > 600;                 // tablets

// 🔹 Tamaños principales (con máximos)
const campoSize = Math.min(width * 0.82, height * 0.45, 420) * scale;
const posicionSize = campoSize * 0.26 * scale;

export const EntrenadorStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    alignItems: "center",
    justifyContent: "center",
  },

  campo: {
    width: campoSize,
    aspectRatio: 1,
    backgroundColor: "#fff7ed",
    borderRadius: 16 * scale,
    borderWidth: 1.5 * scale,
    borderColor: "#fb923c",
    justifyContent: "space-around",
    paddingVertical: 8 * scale,
    marginVertical: 8 * scale,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },

  fila: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    flex: 1,
    width: "100%",
  },

  lineaSeparadora: {
    height: 1.5 * scale,
    backgroundColor: "#fb923c",
    width: "85%",
    alignSelf: "center",
    marginVertical: 2 * scale,
  },

  posicion: {
    width: posicionSize,
    height: posicionSize,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5 * scale,
    borderColor: "#fb923c",
    borderRadius: 12 * scale,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },

  input: {
    width: "75%",
    height: "55%",
    borderWidth: 1 * scale,
    borderColor: "#d1d5db",
    borderRadius: 8 * scale,
    textAlign: "center",
    fontSize: Math.min(posicionSize * 0.22, 18),
    padding: 0,
    color: "#111827",
    backgroundColor: "#f9fafb",
    marginBottom: 2 * scale,
  },

  label: {
    fontSize: Math.min(posicionSize * 0.18, 14),
    fontWeight: "600",
    marginBottom: 3 * scale,
    color: "#374151",
  },

  botonesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 6 * scale,
  },

  botonFlotante: {
    backgroundColor: "#3b82f6",
    width: campoSize * 0.16,
    height: campoSize * 0.16,
    borderRadius: campoSize * 0.08,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },

  botonCentral: {
    backgroundColor: "#ef4444",
  },

  barraControl: {
    width: campoSize,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12 * scale,
    padding: 20 * scale,
    marginBottom: 8 * scale,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },

  controlItem: {
    flex: 1,
    alignItems: "center",
    minWidth: width * 0.2 * scale,
  },

  controlLabel: {
    fontSize: Math.min(width * 0.038, 14),
    fontWeight: "500",
    color: "#374151",
    marginBottom: 2 * scale,
    textAlign: "center",
  },

  codigoEquipo: {
    height: Math.min(height * 0.055, 50) * scale,
    borderRadius: 8 * scale,
    borderWidth: 1.2 * scale,
    borderColor: "#f59e0b",
    backgroundColor: "#fef9c3",
    textAlign: "center",
    fontSize: Math.min(width * 0.055, 20),
    fontWeight: "bold",
    color: "#78350f",
    paddingVertical: Platform.OS === "ios" ? 0 : 2 * scale,
    minWidth: width * 0.14 * scale,
  },

  equipoSelector: {
    height: Math.min(height * 0.055, 50) * scale,
    borderRadius: 8 * scale,
    borderWidth: 1.2 * scale,
    borderColor: "#f59e0b",
    backgroundColor: "#fef9c3",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: width * 0.012 * scale,
    minWidth: width * 0.14 * scale,
  },

  equipoText: {
    fontWeight: "bold",
    fontSize: Math.min(width * 0.045, 18),
    color: "#78350f",
    textAlign: "center",
  },

  filaSets: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: campoSize,
    height: Math.min(height * 0.055, 50) * scale,
    backgroundColor: "#fff",
    borderRadius: 10 * scale,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    paddingHorizontal: 5 * scale,
    marginBottom: 8 * scale,
  },

  setButton: {
    width: Math.min(height * 0.045, 40) * scale,
    height: Math.min(height * 0.045, 40) * scale,
    borderRadius: 8 * scale,
    backgroundColor: "#3b82f6",
    justifyContent: "center",
    alignItems: "center",
  },

  setDisplay: {
    flex: 1,
    height: "85%",
    marginHorizontal: 4 * scale,
    borderRadius: 8 * scale,
    backgroundColor: "#3b82f6",
    justifyContent: "center",
    alignItems: "center",
  },

  setText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: Math.min(width * 0.042, 16),
    textAlign: "center",
  },

  homeButton: {
    position: "absolute",
    left: width * 0.1 * scale,
    top: height * 0.015 * scale,
    zIndex: 20,
    padding: campoSize * 0.018,
    backgroundColor: "#fb923c",
    borderRadius: campoSize * 0.06,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },

  modoButton: {
    position: "absolute",
    top: height * 0.015 * scale,
    right: width * 0.1 * scale,
    zIndex: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fb923c",
    paddingHorizontal: width * 0.025 * scale,
    paddingVertical: height * 0.008 * scale,
    borderRadius: 10 * scale,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },

  modoText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: Math.min(width * 0.042, 14),
  },

  filaUnica: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },

  qrButton: {
    width: campoSize,
    backgroundColor: "#fb923c",
    paddingVertical: 10 * scale,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12 * scale,
    marginTop: 10 * scale,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },

  qrButtonText: {
    color: "#fff",
    fontSize: Math.min(width * 0.05, 18),
    fontWeight: "600",
    textAlign: "center",
  },
});
