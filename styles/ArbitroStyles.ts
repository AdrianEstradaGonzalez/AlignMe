import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

// Campo ocupa 90% del ancho de pantalla
const campoSize = width * 0.9;
// Cada lado tiene 2 columnas (delanteras + traseras), más la red
// Restamos márgenes para que no se solape
const posicionSize = (campoSize - 40) / 4; 

export const ArbitroStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafc",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: height * 0.08,
  },

  campo: {
    width: campoSize,
    aspectRatio: 1,
    backgroundColor: "#ffedd5",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#fb923c",
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    marginBottom: 20,
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
    paddingHorizontal: 4,
  },

  red: {
    width: 3,
    alignSelf: "stretch",
    backgroundColor: "#ef4444",
    marginHorizontal: 4,
  },

  posicion: {
    width: posicionSize,
    height: posicionSize,
    marginVertical: 4,
    borderWidth: 2,
    borderColor: "#fb923c",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    elevation: 2,
    paddingVertical: 6,
  },

  posLabel: {
    fontSize: posicionSize * 0.22,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 2,
  },

  divisor: {
    width: "80%",
    height: 1,
    backgroundColor: "#d1d5db",
    marginVertical: 2,
  },

  numLabel: {
    fontSize: posicionSize * 0.26,
    fontWeight: "bold",
    color: "#111",
    marginTop: 2,
  },

  // Botón Home
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

  // Botón cambiar modo
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

  // Fila de sets
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
    marginBottom: 24,
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

  // Botones QR
  qrRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "92%",
    marginTop: 20,
  },

  qrButton: {
  flex: 1,
  backgroundColor: "#fb923c",
  paddingVertical: 14,
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 12,
  flexDirection: "column", // 👈 antes era "row"
  elevation: 4,
},


  qrButtonLeft: {
    marginRight: 8,
  },

  qrButtonRight: {
    marginLeft: 8,
  },

  qrButtonText: {
    color: "#fff",
    fontSize: width * 0.042,
    fontWeight: "bold",
    flexShrink: 1, // 🔥 evita que el texto se salga
  },

  // Indicadores de equipo
  equipoAIndicativo: {
    position: "absolute",
    top: 5,
    left: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#fb923c",
    borderRadius: 8,
    backgroundColor: "#fff",
    zIndex: 10,
  },

  equipoBIndicativo: {
    position: "absolute",
    top: 5,
    right: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#fb923c",
    borderRadius: 8,
    backgroundColor: "#fff",
    zIndex: 10,
  },

  equipoLabel: {
    fontSize: width * 0.035,
    fontWeight: "bold",
    color: "#374151",
  },

  codigoEquipoBox: {
    position: "absolute",
    top: 5,
    alignSelf: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#fb923c",
    borderRadius: 6,
    backgroundColor: "#fff",
  },

  // Añadir estilos nuevos para los códigos
codigoEquipoBoxIzq: {
  position: "absolute",
  top: 8,
  left: 12,
  paddingHorizontal: 10,
  paddingVertical: 6,
  borderRadius: 8,
  backgroundColor: "#fff",
  borderWidth: 2,
  borderColor: "#fb923c",
  elevation: 3,
},
codigoEquipoBoxDer: {
  position: "absolute",
  top: 8,
  right: 12,
  paddingHorizontal: 10,
  paddingVertical: 6,
  borderRadius: 8,
  backgroundColor: "#fff",
  borderWidth: 2,
  borderColor: "#fb923c",
  elevation: 3,
},
codigoEquipoText: {
  fontWeight: "bold",
  fontSize: width * 0.045,
  color: "#111",
  letterSpacing: 1,
},
qrIcon: {
  width: 28,
  height: 28,
  tintColor: "#fff",
  marginBottom: 6,
},

});
