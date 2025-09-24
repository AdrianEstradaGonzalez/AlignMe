import { StyleSheet, Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");

// 🔹 Escalado relativo según pantalla
const scale = Math.min(width / 360, height / 640); // referencia 360x640
const campoSize = Math.min(width * 0.85, height * 0.5, 460) * scale;
const posicionSize = campoSize * 0.26;

export const EntrenadorStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    marginTop: height * 0.08 * scale,
  },

  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: width * 0.035 * scale,
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
    marginVertical: 12 * scale,
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
    marginVertical: 3 * scale,
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
    fontSize: Math.min(posicionSize * 0.22, 20) * scale,
    padding: 0,
    color: "#111827",
    backgroundColor: "#f9fafb",
    marginBottom: 3 * scale,
  },

  label: {
    fontSize: Math.min(posicionSize * 0.18, 16) * scale,
    fontWeight: "600",
    marginBottom: 4 * scale,
    color: "#374151",
  },

  botonesContainer: {
    position: "absolute",
    bottom: -campoSize * 0.1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
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
    padding: 10 * scale,
    marginBottom: 12 * scale,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },

  controlItem: {
    flex: 1,
    alignItems: "center",
    minWidth: width * 0.22 * scale,
  },

  controlLabel: {
    fontSize: Math.min(width * 0.038, 16) * scale,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 3 * scale,
    textAlign: "center",
  },

  codigoEquipo: {
    flex: 1,
    height: Math.min(height * 0.06, 55) * scale,
    borderRadius: 8 * scale,
    borderWidth: 1.2 * scale,
    borderColor: "#f59e0b",
    backgroundColor: "#fef9c3",
    textAlign: "center",
    fontSize: Math.min(width * 0.055, 24) * scale,
    fontWeight: "bold",
    color: "#78350f",
    paddingVertical: Platform.OS === "ios" ? 0 : 2 * scale,
    minWidth: width * 0.15 * scale,
  },

  equipoSelector: {
    flex: 1,
    height: Math.min(height * 0.06, 55) * scale,
    borderRadius: 8 * scale,
    borderWidth: 1.2 * scale,
    borderColor: "#f59e0b",
    backgroundColor: "#fef9c3",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: width * 0.015 * scale,
    minWidth: width * 0.15 * scale,
  },

  equipoText: {
    fontWeight: "bold",
    fontSize: Math.min(width * 0.045, 22) * scale,
    color: "#78350f",
    textAlign: "center",
  },

  filaSets: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: campoSize,
    height: Math.min(height * 0.06, 55) * scale,
    backgroundColor: "#fff",
    borderRadius: 10 * scale,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    paddingHorizontal: 6 * scale,
    marginBottom: 10 * scale,
  },

  setButton: {
    width: Math.min(height * 0.045, 45) * scale,
    height: Math.min(height * 0.045, 45) * scale,
    borderRadius: 8 * scale,
    backgroundColor: "#3b82f6",
    justifyContent: "center",
    alignItems: "center",
  },

  setDisplay: {
    flex: 1,
    height: "85%",
    marginHorizontal: 5 * scale,
    borderRadius: 8 * scale,
    backgroundColor: "#3b82f6",
    justifyContent: "center",
    alignItems: "center",
  },

  setText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: Math.min(width * 0.042, 18) * scale,
    textAlign: "center",
  },

  homeButton: {
    position: "absolute",
    left: width * 0.08 * scale,
    top: height * 0.02 * scale,
    zIndex: 20,
    padding: campoSize * 0.02,
    backgroundColor: "#fb923c",
    borderRadius: campoSize * 0.08,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },

  modoButton: {
    position: "absolute",
    top: height * 0.02 * scale,
    right: width * 0.08 * scale,
    zIndex: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fb923c",
    paddingHorizontal: width * 0.03 * scale,
    paddingVertical: height * 0.01 * scale,
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
    fontSize: Math.min(width * 0.042, 16) * scale,
  },

  filaUnica: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },

  qrButton: {
    marginTop: 24 * scale,
    width: campoSize,
    backgroundColor: "#fb923c",
    paddingVertical: 12 * scale,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12 * scale,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },

  qrButtonText: {
    color: "#fff",
    fontSize: Math.min(width * 0.05, 20) * scale,
    fontWeight: "600",
    textAlign: "center",
  },
});
