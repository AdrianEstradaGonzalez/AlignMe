import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

// Escalado según pantalla pequeña
const scale = Math.min(width / 360, height / 640); // referencia: 360x640

const campoSize = width * 0.85 * scale;
const posicionSize = campoSize * 0.28;

export const MedioCampoStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafc",
    alignItems: "center",
    justifyContent: "center",
    padding: 12 * scale,
  },

  tituloBox: {
    width: campoSize,
    padding: 8 * scale,
    borderRadius: 10 * scale,
    backgroundColor: "#F5A623AA",
    borderWidth: 1.5 * scale,
    borderColor: "#D17F1A",
    marginBottom: 8 * scale,
    alignItems: "center",
  },
  tituloPrincipal: {
    fontSize: 18 * scale,
    fontWeight: "bold",
    color: "#000",
  },
  tituloSecundario: {
    fontSize: 14 * scale,
    color: "#000",
    marginTop: 4 * scale,
  },

  campo: {
    width: campoSize,
    aspectRatio: 1,
    backgroundColor: "#ffedd5",
    borderRadius: 14 * scale,
    borderWidth: 2 * scale,
    borderColor: "#fb923c",
    justifyContent: "space-around",
    paddingVertical: 8 * scale,
    marginVertical: 8 * scale,
  },

  fila: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    flex: 1,
    width: "100%",
  },
  filaUnica: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  lineaSeparadora: {
    height: 2 * scale,
    backgroundColor: "#fb923c",
    width: "90%",
    alignSelf: "center",
  },

  posicion: {
    width: posicionSize,
    height: posicionSize,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2 * scale,
    borderColor: "#fb923c",
    borderRadius: 10 * scale,
    backgroundColor: "#fff",
    elevation: 2,
  },

  input: {
    fontSize: posicionSize * 0.18,
    color: "#111",
  },

  label: {
    fontSize: posicionSize * 0.16,
    fontWeight: "600",
    marginBottom: 4 * scale,
    color: "#374151",
  },

  labelEquipo: {
    position: "absolute",
    zIndex: 20,
  },
  textoEquipo: {
    fontSize: 14 * scale,
    fontWeight: "bold",
    color: "#000",
    backgroundColor: "#fde047",
    paddingHorizontal: 8 * scale,
    paddingVertical: 3 * scale,
    borderRadius: 6 * scale,
    borderWidth: 1 * scale,
    borderColor: "#d97706",
  },

  labelCodigo: {
    position: "absolute",
    zIndex: 20,
  },
  textoCodigo: {
    fontSize: 14 * scale,
    fontWeight: "bold",
    color: "#000",
    backgroundColor: "#fff176",
    paddingHorizontal: 6 * scale,
    paddingVertical: 2 * scale,
    borderRadius: 5 * scale,
    borderWidth: 1 * scale,
    borderColor: "#d97706",
    minWidth: 36 * scale,
    textAlign: "center",
  },

  qrButton: {
    backgroundColor: "#fb923c",
    paddingVertical: 10 * scale,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10 * scale,
    elevation: 4,
    width: "90%",
    alignSelf: "center",
  },
  qrButtonText: {
    color: "#fff",
    fontSize: 14 * scale,
    fontWeight: "bold",
    textAlign: "center",
  },
});
