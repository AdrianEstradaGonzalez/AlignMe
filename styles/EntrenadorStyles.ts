import { StyleSheet, Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");

// 🔹 Escalado moderado
const campoSize = Math.min(width * 0.85, height * 0.5, 460);
const posicionSize = campoSize * 0.26;

export const EntrenadorStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    marginTop:height*0.08 // gris neutro suave
  },

  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: width * 0.035,
  },

  // 🎯 Cancha
  campo: {
    width: campoSize,
    aspectRatio: 1,
    backgroundColor: "#fff7ed", // beige cancha
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#fb923c",
    justifyContent: "space-around",
    paddingVertical: 8,
    marginVertical: 12,
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
    height: 1.5,
    backgroundColor: "#fb923c",
    width: "85%",
    alignSelf: "center",
    marginVertical: 3,
  },

  // 🏐 Posiciones
  posicion: {
    width: posicionSize,
    height: posicionSize,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#fb923c",
    borderRadius: 12,
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
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    textAlign: "center",
    fontSize: Math.min(posicionSize * 0.22, 20),
    padding: 0,
    color: "#111827",
    backgroundColor: "#f9fafb",
    marginBottom: 3,
  },

  label: {
    fontSize: Math.min(posicionSize * 0.18, 16),
    fontWeight: "600",
    marginBottom: 4,
    color: "#374151",
  },

  // 🔄 Botones de rotación
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

  // 📝 Barra superior
  barraControl: {
    width: campoSize,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },

  controlItem: {
    flex: 1,
    alignItems: "center",
    minWidth: width * 0.22,
  },

  controlLabel: {
    fontSize: Math.min(width * 0.038, 16),
    fontWeight: "500",
    color: "#374151",
    marginBottom: 3,
    textAlign: "center",
  },

  codigoEquipo: {
    flex: 1,
    height: Math.min(height * 0.06, 55),
    borderRadius: 8,
    borderWidth: 1.2,
    borderColor: "#f59e0b",
    backgroundColor: "#fef9c3",
    textAlign: "center",
    fontSize: Math.min(width * 0.055, 24),
    fontWeight: "bold",
    color: "#78350f",
    paddingVertical: 0,
    paddingTop: Platform.OS === "ios" ? 0 : 2,
    minWidth: width * 0.15, // 👈 ancho mínimo igual al del codigoEquipo
  },

  equipoSelector: {
  flex: 1,
  height: Math.min(height * 0.06, 55),
  borderRadius: 8,
  borderWidth: 1.2,
  borderColor: "#f59e0b",
  backgroundColor: "#fef9c3",
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: width * 0.015,
  minWidth: width * 0.15, // 👈 ancho mínimo igual al del codigoEquipo
},


  equipoText: {
    fontWeight: "bold",
    fontSize: Math.min(width * 0.045, 22),
    color: "#78350f",
    textAlign: "center",
  },

  // 🎯 Sets
  filaSets: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: campoSize,
    height: Math.min(height * 0.06, 55),
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    paddingHorizontal: 6,
    marginBottom: 10,
  },

  setButton: {
    width: Math.min(height * 0.045, 45),
    height: Math.min(height * 0.045, 45),
    borderRadius: 8,
    backgroundColor: "#3b82f6",
    justifyContent: "center",
    alignItems: "center",
  },

  setDisplay: {
    flex: 1,
    height: "85%",
    marginHorizontal: 5,
    borderRadius: 8,
    backgroundColor: "#3b82f6",
    justifyContent: "center",
    alignItems: "center",
  },

  setText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: Math.min(width * 0.042, 18),
    textAlign: "center",
  },

  // 🏠 Home → posición segura con insets en el componente
  homeButton: {
    position: "absolute",
    left: 18,
    zIndex: 20,
    padding: 8,
    backgroundColor: "#fb923c",
    borderRadius: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },

  // 🔄 Modo → posición segura con insets en el componente
  modoButton: {
    position: "absolute",
    right: 18,
    zIndex: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fb923c",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },

  modoText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: Math.min(width * 0.042, 16),
  },

  filaUnica: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },

  // 📱 QR → margen inferior seguro en el componente
  qrButton: {
    marginTop: 40,
    width: campoSize,
    backgroundColor: "#fb923c",
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },

  qrButtonText: {
    color: "#fff",
    fontSize: Math.min(width * 0.05, 20),
    fontWeight: "600",
    textAlign: "center",
  },
});
