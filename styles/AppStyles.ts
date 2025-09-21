import { StyleSheet } from "react-native";

export const AppStyles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  card: {
    width: "85%",
    backgroundColor: "rgba(255,255,255,0.85)", // translúcida
    borderRadius: 16,
    paddingVertical: 30,
    alignItems: "center",
    elevation: 6, // sombra en Android
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    width: "100%",
    marginVertical: 8,
    borderRadius: 12,
  },
  buttonContent: {
    paddingVertical: 8,
  },
});
