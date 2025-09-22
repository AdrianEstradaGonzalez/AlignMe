import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, Image } from "react-native";
import { EntrenadorStyles as styles } from "./styles/EntrenadorStyles";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { RootStackParamList } from "./types/Navigation";

type NavigationProp = StackNavigationProp<RootStackParamList, "Entrenador">;

// Iconos locales
const icons = {
  home: require("./assets/icons/home.png"),
  swap: require("./assets/icons/swap.png"),
  left: require("./assets/icons/left.png"),
  right: require("./assets/icons/right.png"),
  rotateLeft: require("./assets/icons/rotate-left-arrow-icon.webp"),
  rotateRight: require("./assets/icons/rotate-right-arrow-icon.webp"),
  trash: require("./assets/icons/trash.png"),
  qr: require("./assets/icons/qr.png"),
};

const posiciones6x6 = {
  delanteras: ["IV", "III", "II"],
  traseras: ["V", "VI", "I"],
};

const posiciones4x4 = {
  delanteras: ["IV", "III", "II"],
  traseras: ["I"],
};

export default function EntrenadorView() {
  const [modo, setModo] = useState<"6x6" | "4x4">("6x6");
  const [codigoEquipo, setCodigoEquipo] = useState<string>("");
  const [equipo, setEquipo] = useState<"A" | "B">("A");
  const [setActual, setSetActual] = useState<number>(1);

  // 🔹 Ahora solo guardamos las posiciones directamente (sin sets)
  const [valores, setValores] = useState<{ [pos: string]: string }>({});
  const navigation = useNavigation<NavigationProp>();

  const TOTAL_SETS = modo === "6x6" ? 5 : 3;

  const generarQR = () => {
    // 🔹 QR limpio: solo posiciones y valores
    const datos = {
      modo,
      codigoEquipo,
      valores,
    };
    navigation.navigate("QRView", { data: JSON.stringify(datos) });
  };

  const toggleModo = () => {
    setModo((m) => (m === "6x6" ? "4x4" : "6x6"));
    setValores({});
    setSetActual(1);
  };

  const renderPosicion = (pos: string) => (
    <View key={pos} style={styles.posicion}>
      <Text style={styles.label}>{pos}</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        maxLength={2}
        value={valores[pos] || ""}
        onChangeText={(text) =>
          setValores((prev) => ({ ...prev, [pos]: text }))
        }
      />
    </View>
  );

  const posiciones = modo === "6x6" ? posiciones6x6 : posiciones4x4;

  return (
    <View style={styles.container}>
      {/* Botón Home */}
      <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate("Home")}>
        <Image source={icons.home} style={{ width: 28, height: 28, tintColor: "#fff" }} />
      </TouchableOpacity>

      {/* Botón Modo */}
      <TouchableOpacity style={styles.modoButton} onPress={toggleModo}>
        <Image source={icons.swap} style={{ width: 22, height: 22, tintColor: "#fff", marginRight: 5 }} />
        <Text style={styles.modoText}>
          {modo === "6x6" ? "Voley 6x6" : "MiniVoley 4x4"}
        </Text>
      </TouchableOpacity>

      {/* Barra superior: Código y Equipo */}
      <View style={styles.barraControl}>
        <View style={styles.controlItem}>
          <Text style={styles.controlLabel}>Código de equipo</Text>
          <TextInput
            style={styles.codigoEquipo}
            maxLength={3}
            value={codigoEquipo}
            onChangeText={(text) => setCodigoEquipo(text.toUpperCase())}
            placeholder="COD"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.controlItem}>
          <Text style={styles.controlLabel}>Equipo</Text>
          <TouchableOpacity
            style={styles.equipoSelector}
            onPress={() => setEquipo((e) => (e === "A" ? "B" : "A"))}
          >
            <Text style={styles.equipoText}>{equipo}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Fila de sets */}
      <View style={styles.filaSets}>
        <TouchableOpacity onPress={() => setSetActual(Math.max(1, setActual - 1))} style={styles.setButton}>
          <Image source={icons.left} style={{ width: 20, height: 20, tintColor: "#fff" }} />
        </TouchableOpacity>
        <View style={styles.setDisplay}>
          <Text style={styles.setText}>{`Set ${setActual}`}</Text>
        </View>
        <TouchableOpacity onPress={() => setSetActual(Math.min(TOTAL_SETS, setActual + 1))} style={styles.setButton}>
          <Image source={icons.right} style={{ width: 20, height: 20, tintColor: "#fff" }} />
        </TouchableOpacity>
      </View>

      {/* Campo */}
      <View style={styles.campo}>
        <View style={styles.fila}>
          {posiciones.delanteras.map((pos) => renderPosicion(pos))}
        </View>
        <View style={styles.lineaSeparadora} />
        <View style={styles.fila}>
          {modo === "6x6"
            ? posiciones.traseras.map((pos) => renderPosicion(pos))
            : renderPosicion("I")}
        </View>

        {/* Botones de acciones */}
        <View style={styles.botonesContainer}>
          <TouchableOpacity onPress={() => {}} style={styles.botonFlotante}>
            <Image source={icons.rotateRight} style={{ width: 26, height: 26, tintColor: "#fff" }} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setValores({})}
            style={[styles.botonFlotante, styles.botonCentral]}
          >
            <Image source={icons.trash} style={{ width: 24, height: 24, tintColor: "#fff" }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}} style={styles.botonFlotante}>
            <Image source={icons.rotateLeft} style={{ width: 26, height: 26, tintColor: "#fff" }} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Botón QR */}
      <TouchableOpacity style={styles.qrButton} onPress={generarQR}>
        <Image source={icons.qr} style={{ width: 26, height: 26, tintColor: "#fff", marginRight: 8 }} />
        <Text style={styles.qrButtonText}>Generar código QR</Text>
      </TouchableOpacity>
    </View>
  );
}
