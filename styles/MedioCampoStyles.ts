import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

// Escala base referencia 360x640
const scale = Math.min(width / 360, height / 640);

// Detectar pantallas muy pequeñas (ej: 4 pulgadas)
const isSmallScreen = width < 360 || height < 640;
const smallFactor = isSmallScreen ? 0.85 : 1;

// 🔹 Tamaños principales con límites
const campoSize = Math.min(width * 0.85, 420) * smallFactor;
const posicionSize = Math.min(campoSize * 0.28, 100) * smallFactor;

export const MedioCampoStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafc",
    alignItems: "center",
    justifyContent: "center",
    padding: 12 * smallFactor,
  },

  tituloBox: {
    width: campoSize,
    padding: 8 * smallFactor,
    borderRadius: 10 * smallFactor,
    backgroundColor: "#F5A623AA",
    borderWidth: 1.5 * smallFactor,
    borderColor: "#D17F1A",
    marginBottom: 8 * smallFactor,
    alignItems: "center",
    maxWidth: 420,
  },
  tituloPrincipal: {
    fontSize: Math.min(18 * scale * smallFactor, 20),
    fontWeight: "bold",
    color: "#000",
  },
  tituloSecundario: {
    fontSize: Math.min(14 * scale * smallFactor, 16),
    color: "#000",
    marginTop: 4 * smallFactor,
  },

  campo: {
    width: campoSize,
    aspectRatio: 1,
    backgroundColor: "#ffedd5",
    borderRadius: 14 * smallFactor,
    borderWidth: 2,
    borderColor: "#fb923c",
    justifyContent: "space-around",
    paddingVertical: 8 * smallFactor,
    marginVertical: 8 * smallFactor,
    maxWidth: 420,
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
    height: 2 * smallFactor,
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
    borderRadius: 10 * smallFactor,
    backgroundColor: "#fff",
    elevation: 2,
  },

  input: {
    fontSize: Math.min(posicionSize * 0.18, 18) * smallFactor,
    color: "#111",
  },

  label: {
    fontSize: Math.min(posicionSize * 0.16, 16) * smallFactor,
    fontWeight: "600",
    marginBottom: 4 * smallFactor,
    color: "#374151",
  },

  labelEquipo: {
    position: "absolute",
    zIndex: 20,
  },
  textoEquipo: {
    fontSize: Math.min(14 * scale * smallFactor, 16),
    fontWeight: "bold",
    color: "#000",
    backgroundColor: "#fde047",
    paddingHorizontal: 8 * smallFactor,
    paddingVertical: 3 * smallFactor,
    borderRadius: 6 * smallFactor,
    borderWidth: 1,
    borderColor: "#d97706",
  },

  labelCodigo: {
    position: "absolute",
    zIndex: 20,
  },
  textoCodigo: {
    fontSize: Math.min(14 * scale * smallFactor, 16),
    fontWeight: "bold",
    color: "#000",
    backgroundColor: "#fff176",
    paddingHorizontal: 6 * smallFactor,
    paddingVertical: 2 * smallFactor,
    borderRadius: 5 * smallFactor,
    borderWidth: 1,
    borderColor: "#d97706",
    minWidth: 36 * smallFactor,
    textAlign: "center",
  },

  qrButton: {
    backgroundColor: "#fb923c",
    paddingVertical: 10 * smallFactor,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10 * smallFactor,
    elevation: 4,
    width: "90%",
    maxWidth: 400,
    alignSelf: "center",
  },
  qrButtonText: {
    color: "#fff",
    fontSize: Math.min(14 * scale * smallFactor, 16),
    fontWeight: "bold",
    textAlign: "center",
  },
});
