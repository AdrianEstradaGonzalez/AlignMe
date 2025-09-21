import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const campoSize = width * 0.9; // campo ocupa 90% del ancho pantalla
const posicionSize = campoSize / 6; // cada posición será proporcional al campo

export const ArbitroStyles = StyleSheet.create({
  campo: {
    width: campoSize,
    aspectRatio: 1,
    backgroundColor: "#F5A62380",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#D17F1A",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
  },
  fila: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    width: "100%",
  },
  columna: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
 
  label: {
    fontSize: posicionSize * 0.35, // fuente proporcional al tamaño
    fontWeight: "bold",
  },
  red: {
    width: 4, // solo una línea
    alignSelf: "stretch",
    backgroundColor: "#FF0000",
    marginHorizontal: 5,
  },
  homeButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
    padding: 5,
    backgroundColor: "#ff6600",
    borderRadius: 20,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
  },
  homeText: {
    marginLeft: 5,
    fontWeight: "bold",
    fontSize: 16,
    color: "#fff",
  },
  modoButton: {
    position: "absolute",
    top: 50,
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
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },

      posicion: {
    width: 70,         // más grande
    height: 70,        // más grande
    margin: 6,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fdfdfd",
    paddingVertical: 6,
  },
  posLabel: {
    fontSize: 14,
    color: "#444",
    marginBottom: 4,
  },
  divisor: {
    width: "80%",
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 2,
  },
  numLabel: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginTop: 2,
  },
  qrRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  width: "90%", // mismo ancho que el campo
  marginTop: 20,
},
qrButton: {
  flex: 1,
  backgroundColor: "#2196F3",
  paddingVertical: 15,
  alignItems: "center",
  borderRadius: 8,
},
qrButtonLeft: {
  marginRight: 10, // espacio entre los botones
},
qrButtonRight: {
  marginLeft: 10, // espacio entre los botones
},
qrButtonText: {
  color: "#fff",
  fontSize: 16,
  fontWeight: "bold",
  marginTop: 5,
},

equiposRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  width: "90%", // mismo ancho que el campo
  marginBottom: 10,
  paddingHorizontal: 5,
},
equipoAIndicativo: {
  position: "absolute",
  top: 5,
  left: 5,
  paddingHorizontal: 8,
  paddingVertical: 4,
  borderWidth: 2,
  borderColor: "#D17F1A",
  borderRadius: 8,
  backgroundColor: "#FFF",
  zIndex: 10,
},
equipoBIndicativo: {
  position: "absolute",
  top: 5,
  right: 5,
  paddingHorizontal: 8,
  paddingVertical: 4,
  borderWidth: 2,
  borderColor: "#D17F1A",
  borderRadius: 8,
  backgroundColor: "#FFF",
  zIndex: 10,
},
equipoLabel: {
  fontSize: 14,
  fontWeight: "bold",
  textAlign: "center",
},

container: {
  flex: 1,
  backgroundColor: "#f0f0f0",
  alignItems: "center",
  justifyContent: "center", // centra el campo verticalmente
  paddingTop: 80, // mantiene espacio para botones de home y modo
},
filaSets: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: campoSize,          // ancho exacto del campo
  height: 50,                // altura de la barra
  backgroundColor: "#F5A62380", // mismo naranja que el campo
  borderWidth: 2,
  borderColor: "#000",       // borde negro
  borderRadius: 8,
  paddingHorizontal: 5,
},
setButton: {
  width: 40,
  height: 40,
  borderRadius: 6,
  backgroundColor: "#2196F3", // mismo naranja
  justifyContent: "center",
  alignItems: "center",
},
setDisplay: {
  flex: 1,                    // ocupa todo el espacio entre flechas
  height: 40,
  marginHorizontal: 5,
  borderRadius: 6,
  backgroundColor: "#2196F3", // mismo naranja
  justifyContent: "center",
  alignItems: "center",
},
setText: {
  color: "#fff",
  fontWeight: "bold",
  fontSize: 18,
  textAlign: "center",
},

codigoEquipoBox: {
  position: "absolute",
  top: 5,
  paddingHorizontal: 8,
  paddingVertical: 4,
  borderWidth: 2,
  borderColor: "#000",
  borderRadius: 6,
  backgroundColor: "#fff",
},
codigoEquipoText: {
  fontWeight: "bold",
  fontSize: 16,
  color: "#000",
},






});
