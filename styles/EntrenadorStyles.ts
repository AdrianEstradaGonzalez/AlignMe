import { StyleSheet, Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");

// Proporciones adaptables
const campoSize = width * 0.9;
const posicionSize = campoSize * 0.28;

// Estilo base de caja (para vistas como el selector A/B)
const cajaEquipoBaseView = {
  flex: 1,
  minWidth: width * 0.18,
  maxWidth: width * 0.28,
  height: height * 0.05,
  borderRadius: 8,
  borderWidth: 1,
  borderColor: "#d97706",
  backgroundColor: "#fde047",
  justifyContent: "center" as const,
  alignItems: "center" as const,
};

// Estilo base de texto (para TextInput)
const cajaEquipoBaseText = {
  flex: 1,
  minWidth: width * 0.18,
  maxWidth: width * 0.28,
  height: height * 0.05,
  borderRadius: 8,
  borderWidth: 1,
  borderColor: "#d97706",
  backgroundColor: "#fde047",
};
export const EntrenadorStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafc",
  },

  scrollContent: {
    alignItems: "center",
    paddingTop: height * 0.1,
    paddingHorizontal: width * 0.04,
    paddingBottom: height * 0.08,
  },

  campo: {
    width: campoSize,
    aspectRatio: 1,
    backgroundColor: "#ffedd5",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#fb923c",
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
    backgroundColor: "#fb923c",
    width: "90%",
    alignSelf: "center",
  },

  posicion: {
    width: posicionSize,
    height: posicionSize,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#fb923c",
    borderRadius: 12,
    backgroundColor: "#fff",
    elevation: 2,
  },

  input: {
    width: "80%",
    height: "60%",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    textAlign: "center",
    fontSize: posicionSize * 0.22,
    padding: 0,
    color: "#111",
    backgroundColor: "#f9fafb",
    marginBottom: 4,
  },

  label: {
    fontSize: posicionSize * 0.2,
    fontWeight: "600",
    marginBottom: 5,
    color: "#374151",
  },

  botonesContainer: {
    position: "absolute",
    bottom: -campoSize * 0.08,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  botonFlotante: {
    backgroundColor: "#3b82f6",
    width: campoSize * 0.18,
    height: campoSize * 0.18,
    borderRadius: campoSize * 0.09,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
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
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    elevation: 2,
  },

  controlItem: {
    flex: 1,           // 🔹 que cada item se reparta bien
    alignItems: "center",
  },

  controlLabel: {
    fontSize: width * 0.035,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 4,
    textAlign: "center",
  },

    codigoEquipo: {
    ...cajaEquipoBaseText,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: width * 0.045,
    fontWeight: "bold",
    color: "#78350f",
    paddingVertical: 0,
    paddingTop: Platform.OS === "ios" ? 0 : 2,
  },

  equipoSelector: {
    ...cajaEquipoBaseView,
  },

  equipoText: {
    fontWeight: "bold",
    fontSize: width * 0.045,
    color: "#78350f",
    textAlign: "center",
  },

  filaSets: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: campoSize,
    height: height * 0.065,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 2,
    paddingHorizontal: 6,
    marginBottom: 12,
  },

  setButton: {
    width: height * 0.05,
    height: height * 0.05,
    borderRadius: 8,
    backgroundColor: "#3b82f6",
    justifyContent: "center",
    alignItems: "center",
  },

  setDisplay: {
    flex: 1,
    height: "85%",
    marginHorizontal: 6,
    borderRadius: 8,
    backgroundColor: "#3b82f6",
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
    top: height * 0.02,
    left: 20,
    zIndex: 10,
    padding: 8,
    backgroundColor: "#fb923c",
    borderRadius: 20,
    elevation: 3,
  },

  modoButton: {
    position: "absolute",
    top: height * 0.02,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fb923c",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    elevation: 3,
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
    marginTop: height * 0.08,
    marginBottom: height * 0.04,
    width: "92%",
    backgroundColor: "#fb923c",
    paddingVertical: height * 0.02,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    elevation: 4,
  },

  qrButtonText: {
    color: "#fff",
    fontSize: width * 0.045,
    fontWeight: "bold",
    textAlign: "center",
  },
});
