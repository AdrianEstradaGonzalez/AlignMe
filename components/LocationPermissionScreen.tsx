/**
 * 📍 LOCATION PERMISSION SCREEN
 * =============================
 * Pantalla informativa cuando no hay permisos o ubicación activada.
 */

import React from "react";
import { View, Linking } from "react-native";
import CustomAlert from "./CustomAlert";
import { AsturiasTheme, Theme } from "../config/themes";
import { CommunityAssets } from "../config/assets";

const alignMeTheme: Theme = {
  ...AsturiasTheme,
  primary: "#3b82f6",
  primaryDark: "#2563eb",
  secondary: "#64748b",
  federationTitle: "AlignMe",
};

const alignMeAssets: CommunityAssets = {
  headerLogo: require("../assets/asturias/258.png"),
  appLogo: require("../assets/asturias/258.png"),
  background: require("../assets/fondo.jpeg"),
  flag: require("../assets/asturias/258.png"),
  appTitle: "AlignMe",
};

export function LocationPermissionScreen() {
  const handleContactPress = () => {
    const url = "https://bluedebug.com";
    Linking.openURL(url).catch((err) =>
      console.error("Error al abrir el enlace:", err)
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#0f172a" }}>
      <CustomAlert
        visible={true}
        theme={alignMeTheme}
        assets={alignMeAssets}
        message={
          "La federación de la comunidad en la que te encuentras no dispone de los derechos de AlignMe.\nContacte a través de bluedebug.com para adquirirlos"
        }
        onCancel={() => {}}
        onAccept={handleContactPress}
        showResetButton={false}
        showCancelButton={false}
        acceptButtonText="Contactar"
      />
    </View>
  );
}
