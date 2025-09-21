import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

// proporciones para adaptarse a cualquier pantalla
const campoSize = width * 0.85;
const posicionSize = campoSize * 0.28;

export const EntrenadorStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: height * 0.12,
    paddingBottom: height * 0.04,
  },

  campo: {
    width: campoSize,
    aspectRatio: 1,
    backgroundColor: "#F5A62380",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#D17F1A",
    justifyContent: "space-around",
    paddingVertical: 10,
    marginVertical: height * 0.02,
  },
  fila: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    flex: 1,
    width: "100%",
  },
  lineaSeparadora: {
    height: 2,
    backgroundColor: "#fff",
    width: "100%",
  },
  posicion: {
    width: posicionSize,
    height: posicionSize,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 12,
    backgroundColor: "#FFF",
  },

  input: {
    width: "80%",
    height: "40%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    textAlign: "center",
    fontSize: posicionSize * 0.22,
    padding: 0,
  },

  label: {
    fontSize: posicionSize * 0.2,
    fontWeight: "bold",
    marginBottom: 5,
  },

  botonesContainer: {
    position: "absolute",
    bottom: -campoSize * 0.18,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  botonFlotante: {
    backgroundColor: "#2196F3",
    width: campoSize * 0.18,
    height: campoSize * 0.18,
    borderRadius: campoSize * 0.09,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  botonCentral: {
    backgroundColor: "#F44336",
  },

  // Barra superior
  barraControl: {
    width: campoSize,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F5A62380",
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 6,
    padding: 8,
    marginBottom: 8,
  },
  controlItem: {
    alignItems: "center",
    flex: 1,
  },
  controlLabel: {
    fontSize: width * 0.035,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
    textAlign: "center",
  },
  codigoEquipo: {
    width: width * 0.2,
    height: height * 0.05,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 6,
    textAlign: "center",
    fontSize: width * 0.04,
    backgroundColor: "#FFF",
  },
  equipoSelector: {
    width: width * 0.15,
    height: height * 0.05,
    borderRadius: 6,
    backgroundColor: "#fffb00ff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#000",
  },
  equipoText: {
    fontWeight: "bold",
    fontSize: width * 0.045,
  },

  filaSets: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: campoSize,
    height: height * 0.06,
    backgroundColor: "#F5A62380",
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 8,
    paddingHorizontal: 5,
  },
  setButton: {
    width: height * 0.05,
    height: height * 0.05,
    borderRadius: 6,
    backgroundColor: "#2196F3",
    justifyContent: "center",
    alignItems: "center",
  },
  setDisplay: {
    flex: 1,
    height: "90%",
    marginHorizontal: 5,
    borderRadius: 6,
    backgroundColor: "#2196F3",
    justifyContent: "center",
    alignItems: "center",
  },
  setText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: width * 0.045,
    textAlign: "center",
  },

  homeButton: {
    position: "absolute",
    top: height * 0.05,
    left: 20,
    zIndex: 10,
    padding: 5,
    backgroundColor: "#ff6600",
    borderRadius: 20,
    elevation: 3,
  },

  modoButton: {
    position: "absolute",
    top: height * 0.05,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ff6600",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#000",
  },

  modoText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: width * 0.035,
  },

  filaUnica: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },

  qrButton: {
    marginTop: height * 0.1,
    width: "90%",
    backgroundColor: "#ff6600",
    paddingVertical: height * 0.02,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#000",
    flexDirection: "row",
  },

  qrButtonText: {
    color: "#fff",
    fontSize: width * 0.045,
    fontWeight: "bold",
  },
});
