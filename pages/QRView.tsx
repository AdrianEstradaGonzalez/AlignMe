// QRView.tsx
import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import type { RootStackParamList } from "../types/Navigation";
import { QRViewStyles as styles } from "../styles/QRViewStyles";

// Iconos locales
const icons = {
  back: require("../assets/icons/left.png"), // usa tu icono de flecha aquí
};

type QRViewRouteProp = RouteProp<RootStackParamList, "QRView">;

export default function QRView() {
  const route = useRoute<QRViewRouteProp>();
  const navigation = useNavigation();
  const { data } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Código QR generado</Text>
      <QRCode value={data} size={250} />
      <Text style={styles.subtitle}>Muestra este código al árbitro</Text>

      {/* Botón Volver con icono local */}
      <TouchableOpacity
        style={styles.volverButton}
        onPress={() => navigation.goBack()}
      >
        <Image
          source={icons.back}
          style={{ width: 22, height: 22, tintColor: "#fff", marginRight: 6 }}
        />
        <Text style={styles.volverButtonText}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
}
