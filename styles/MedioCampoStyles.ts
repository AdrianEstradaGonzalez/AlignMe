import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const campoSize = width * 0.85;
const posicionSize = campoSize * 0.28;

export const MedioCampoStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafc",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },

  tituloBox: {
    width: campoSize,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#F5A623AA",
    borderWidth: 2,
    borderColor: "#D17F1A",
    marginBottom: 10,
    alignItems: "center",
  },
  tituloPrincipal: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  tituloSecundario: {
    fontSize: 16,
    color: "#000",
    marginTop: 4,
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
    marginVertical: 10,
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
    fontSize: posicionSize * 0.22,
    color: "#111",
  },

  label: {
    fontSize: posicionSize * 0.2,
    fontWeight: "600",
    marginBottom: 5,
    color: "#374151",
  },

  labelEquipo: {
    position: "absolute",
    zIndex: 20,
  },
  textoEquipo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    backgroundColor: "#fde047",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#d97706",
  },

  labelCodigo: {
    position: "absolute",
    zIndex: 20,
  },
  textoCodigo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    backgroundColor: "#fff176",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#d97706",
    minWidth: 40,
    textAlign: "center",
  },

  qrButton: {
    backgroundColor: "#fb923c",
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    elevation: 4,
    width: "90%",
    alignSelf: "center",
  },
  qrButtonText: {
    color: "#fff",
    fontSize: width * 0.045,
    fontWeight: "bold",
    textAlign: "center",
  },
});
