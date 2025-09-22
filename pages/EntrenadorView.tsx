import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { EntrenadorStyles as styles } from "../styles/EntrenadorStyles";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { RootStackParamList } from "../types/Navigation";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type NavigationProp = StackNavigationProp<RootStackParamList, "Entrenador">;

// Iconos locales
const icons = {
  home: require("../assets/icons/home.png"),
  swap: require("../assets/icons/swap.png"),
  left: require("../assets/icons/left.png"),
  right: require("../assets/icons/right.png"),
  rotateLeft: require("../assets/icons/rotate-left-arrow-icon.webp"),
  rotateRight: require("../assets/icons/rotate-right-arrow-icon.webp"),
  trash: require("../assets/icons/trash.png"),
  qr: require("../assets/icons/qr.png"),
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
  const [valores, setValores] = useState<{ [pos: string]: string }>({});
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();

  const TOTAL_SETS = modo === "6x6" ? 5 : 3;

  const generarQR = () => {
    const datos = { modo, codigoEquipo, valores };
    navigation.navigate("QRView", { data: JSON.stringify(datos) });
  };

  const toggleModo = () => {
    setModo((m) => (m === "6x6" ? "4x4" : "6x6"));
    setValores({});
    setSetActual(1);
  };

  // --- Rotaciones ---
  const getOrden = (): string[] => {
    return modo === "6x6"
      ? ["I", "VI", "V", "IV", "III", "II"]
      : ["I", "IV", "III", "II"];
  };

  const rotateClockwise = () => {
    const orden = getOrden();
    const old = { ...valores };
    const nuevo: { [pos: string]: string } = { ...valores };

    const n = orden.length;
    for (let i = 0; i < n; i++) {
      const from = orden[i];
      const to = orden[(i + 1) % n];
      nuevo[to] = old[from] ?? "";
    }
    setValores(nuevo);
  };

  const rotateCounterclockwise = () => {
    const orden = getOrden();
    const old = { ...valores };
    const nuevo: { [pos: string]: string } = { ...valores };

    const n = orden.length;
    for (let i = 0; i < n; i++) {
      const from = orden[i];
      const to = orden[(i - 1 + n) % n];
      nuevo[to] = old[from] ?? "";
    }
    setValores(nuevo);
  };
  // --- fin rotaciones ---

const renderPosicion = (pos: string) => (
  <View key={pos} style={styles.posicion}>
    <Text style={styles.label}>{pos}</Text>
    <TextInput
      style={styles.input}
      keyboardType="numeric"
      maxLength={2}
      value={valores[pos] || ""}
      onChangeText={(text) => {
        setValores((prev) => {
          // Si el usuario todavía está escribiendo (menos de 2 dígitos), 
          // solo actualizamos temporalmente sin validar para evitar falsas alertas.
          if (text.length < 2) {
            return { ...prev, [pos]: text };
          }

          // Si ya tiene 2 dígitos, validamos y rechazamos si hay duplicado.
          const isDuplicate = Object.entries(prev).some(
            ([key, value]) => key !== pos && value === text
          );
          if (isDuplicate) {
            Alert.alert(
              "Número repetido",
              `El número ${text} ya está asignado en otra posición.`
            );
            return prev; // no guardar el valor duplicado
          }

          return { ...prev, [pos]: text };
        });
      }}
      onEndEditing={(e) => {
        // Si el usuario terminó de editar (útil cuando el número final es 1 dígito),
        // comprobamos duplicados y revertimos/limpiamos si hace falta.
        const text = e.nativeEvent.text ?? "";
        if (text === "") return;

        setValores((prev) => {
          const isDuplicate = Object.entries(prev).some(
            ([key, value]) => key !== pos && value === text
          );
          if (isDuplicate) {
            Alert.alert(
              "Número repetido",
              `El número ${text} ya está asignado en otra posición.`
            );
            return { ...prev, [pos]: "" }; // limpiamos para forzar corrección
          }
          return prev;
        });
      }}
    />
  </View>
);


  const posiciones = modo === "6x6" ? posiciones6x6 : posiciones4x4;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={0}
    >
      {/* Botón Home */}
          {/* Botón Home */}
        <TouchableOpacity
          style={[styles.homeButton, { top: insets.top + 10 }]} // 👈 notch seguro
          onPress={() => navigation.navigate("Home")}
        >
          <Image
            source={icons.home}
            style={{ width: 28, height: 28, tintColor: "#fff" }}
          />
        </TouchableOpacity>

        {/* Botón Modo */}
        <TouchableOpacity
          style={[styles.modoButton, { top: insets.top + 10 }]} // 👈 notch seguro
          onPress={toggleModo}
        >
          <Image
            source={icons.swap}
            style={{ width: 22, height: 22, tintColor: "#fff", marginRight: 5 }}
          />
          <Text style={styles.modoText}>
            {modo === "6x6" ? "Voley 6x6" : "MiniVoley 4x4"}
          </Text>
        </TouchableOpacity>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >          
          

          {/* Barra superior */}
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
            <TouchableOpacity
              onPress={() => setSetActual(Math.max(1, setActual - 1))}
              style={styles.setButton}
            >
              <Image
                source={icons.left}
                style={{ width: 20, height: 20, tintColor: "#fff" }}
              />
            </TouchableOpacity>
            <View style={styles.setDisplay}>
              <Text style={styles.setText}>{`Set ${setActual}`}</Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                setSetActual(Math.min(TOTAL_SETS, setActual + 1))
              }
              style={styles.setButton}
            >
              <Image
                source={icons.right}
                style={{ width: 20, height: 20, tintColor: "#fff" }}
              />
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
              <TouchableOpacity
                onPress={rotateClockwise}
                style={styles.botonFlotante}
              >
                <Image
                  source={icons.rotateRight}
                  style={{ width: 26, height: 26, tintColor: "#fff" }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setValores({})}
                style={[styles.botonFlotante, styles.botonCentral]}
              >
                <Image
                  source={icons.trash}
                  style={{ width: 24, height: 24, tintColor: "#fff" }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={rotateCounterclockwise}
                style={styles.botonFlotante}
              >
                <Image
                  source={icons.rotateLeft}
                  style={{ width: 26, height: 26, tintColor: "#fff" }}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Botón QR (debajo del campo y botones) */}
          <TouchableOpacity style={styles.qrButton} onPress={generarQR}>
            <Image
              source={icons.qr}
              style={{ width: 32, height: 32, tintColor: "#fff", marginBottom: 6 }}
            />
            <Text style={styles.qrButtonText}>Generar Código QR</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}
