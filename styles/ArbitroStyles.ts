import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

// Escalado según pantalla pequeña
const scale = Math.min(width / 360, height / 640); // referencia: 360x640

const campoSize = width * 0.85 * scale; // campo ocupa 85% del ancho
const posicionSize = (campoSize - 32) / 4; // columnas y red

export const ArbitroStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafc",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20 * scale,
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingBottom: 70 * scale, // espacio para footer fijo
  },

  campo: {
    width: campoSize,
    aspectRatio: 1,
    backgroundColor: "#ffedd5",
    borderRadius: 16 * scale,
    borderWidth: 2,
    borderColor: "#fb923c",
    justifyContent: "center",
    alignItems: "center",
    padding: 4 * scale,
  },

  fila: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "stretch",
    flex: 1,
    width: "100%",
  },

  columna: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: 2 * scale,
  },

  red: {
    width: 2 * scale,
    alignSelf: "stretch",
    backgroundColor: "#ef4444",
    marginHorizontal: 2 * scale,
  },

  posicion: {
    width: posicionSize,
    height: posicionSize,
    marginVertical: 2 * scale,
    borderWidth: 2,
    borderColor: "#fb923c",
    borderRadius: 8 * scale,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    elevation: 2,
    paddingVertical: 4 * scale,
  },

  posLabel: {
    fontSize: posicionSize * 0.18,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 1 * scale,
  },

  divisor: {
    width: "80%",
    height: 1,
    backgroundColor: "#d1d5db",
    marginVertical: 1,
  },

  numLabel: {
    fontSize: posicionSize * 0.22,
    fontWeight: "bold",
    color: "#111",
    marginTop: 1,
  },

  // Botón Home
  homeButton: {
    position: "absolute",
    top: 10 * scale,
    left: 12 * scale,
    zIndex: 10,
    padding: 6 * scale,
    backgroundColor: "#fb923c",
    borderRadius: 16 * scale,
    elevation: 3,
  },

  // Botón cambiar modo
  modoButton: {
    position: "absolute",
    top: 10 * scale,
    right: 12 * scale,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fb923c",
    paddingHorizontal: 10 * scale,
    paddingVertical: 6 * scale,
    borderRadius: 8 * scale,
    elevation: 3,
  },

  modoText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12 * scale,
  },

  filaSets: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: campoSize,
    height: 40 * scale,
    backgroundColor: "#fff",
    borderRadius: 8 * scale,
    elevation: 2,
    paddingHorizontal: 4 * scale,
    marginBottom: 25 * scale,
  },

  setButton: {
    width: 30 * scale,
    height: 30 * scale,
    borderRadius: 6 * scale,
    backgroundColor: "#3b82f6",
    justifyContent: "center",
    alignItems: "center",
  },

  setDisplay: {
    flex: 1,
    height: "85%",
    marginHorizontal: 4 * scale,
    borderRadius: 6 * scale,
    backgroundColor: "#3b82f6",
    justifyContent: "center",
    alignItems: "center",
  },

  setText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14 * scale,
    textAlign: "center",
  },

  qrButton: {
    flex: 1,
    backgroundColor: "#fb923c",
    paddingVertical: 10 * scale,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10 * scale,
    flexDirection: "column",
    elevation: 4,
  },

  qrRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    width: "100%",
  },

  swipeNavWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    height: 50 * scale,
  },

  qrButtonLeft: {
    marginRight: 4 * scale,
  },

  qrButtonRight: {
    marginLeft: 4 * scale,
  },

  qrButtonText: {
    color: "#fff",
    fontSize: 12 * scale,
    fontWeight: "bold",
    textAlign: "center",
    flexShrink: 1,
  },

  qrIcon: {
    width: 24 * scale,
    height: 24 * scale,
    tintColor: "#fff",
    marginBottom: 4 * scale,
  },
});
