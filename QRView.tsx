import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import type { RootStackParamList } from "./types/Navigation";
import { QRViewStyles as styles } from "./styles/QRViewStyles";

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

      {/* Botón Volver abajo */}
      <TouchableOpacity
        style={styles.volverButton}
        onPress={() => navigation.goBack()}
      >
        {/* Reemplazo del icono con emoji/flecha */}
        <Text style={{ fontSize: 22, color: "#fff", marginRight: 6 }}>⬅️</Text>
        <Text style={styles.volverButtonText}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
}
