import React, { useState, useRef } from "react";
import { View, TextInput, Text, TouchableOpacity, Alert } from "react-native";
import { EntrenadorStyles as styles } from "./styles/EntrenadorStyles";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { RootStackParamList } from "./types/Navigation";

type NavigationProp = StackNavigationProp<RootStackParamList, "Entrenador">;

const posiciones6x6 = {
  delanteras: ["IV", "III", "II"],
  traseras: ["V", "VI", "I"],
  orden: ["I", "VI", "V", "IV", "III", "II"],
};

const posiciones4x4 = {
  delanteras: ["IV", "III", "II"],
  traseras: ["I"], // solo I
  orden: ["I", "IV", "III", "II"],
};

const MAX_LEN = 2;

export default function EntrenadorView() {
  const [modo, setModo] = useState<"6x6" | "4x4">("6x6");
  const TOTAL_SETS = modo === "6x6" ? 5 : 3;

  const [valoresPorSet, setValoresPorSet] = useState<{
    [set: number]: { [pos: string]: string };
  }>({
    1: {},
  });

  const [codigoEquipo, setCodigoEquipo] = useState<string>("");
  const [equipo, setEquipo] = useState<"A" | "B">("A");
  const [setActual, setSetActual] = useState<number>(1);

  const prevValuesRef = useRef<{ [pos: string]: string }>({});
  const valores = valoresPorSet[setActual] || {};
  const navigation = useNavigation<NavigationProp>();

  const generarQR = () => {
    const datos = {
      modo,
      codigoEquipo,
      equipo,
      setActual,
      valores: valoresPorSet,
    };

    navigation.navigate("QRView", { data: JSON.stringify(datos) });
  };

  const toggleModo = () => {
    setModo((m) => (m === "6x6" ? "4x4" : "6x6"));
    setSetActual(1);
    setValoresPorSet({ 1: {} });
  };

  const handleFocus = (pos: string) => {
    prevValuesRef.current[pos] = valores[pos] ?? "";
  };

  const handleChange = (pos: string, value: string) => {
    if (!/^\d*$/.test(value)) return;

    setValoresPorSet((prev) => ({
      ...prev,
      [setActual]: {
        ...(prev[setActual] || {}),
        [pos]: value,
      },
    }));
  };

  const validatePos = (pos: string) => {
    const current = (valores[pos] || "").trim();
    if (current === "") return;

    const duplicate = Object.entries(valores).some(
      ([k, v]) => k !== pos && v === current
    );
    if (duplicate) {
      Alert.alert("Número duplicado", "Ese número ya está en otra posición");
      const prev = prevValuesRef.current[pos] ?? "";
      setValoresPorSet((prevState) => ({
        ...prevState,
        [setActual]: { ...(prevState[setActual] || {}), [pos]: prev },
      }));
    }
  };

  const renderPosicion = (pos: string) => (
    <View key={pos} style={styles.posicion}>
      <Text style={styles.label}>{pos}</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        maxLength={MAX_LEN}
        value={valores[pos] || ""}
        onFocus={() => handleFocus(pos)}
        onChangeText={(text) => handleChange(pos, text)}
        onBlur={() => validatePos(pos)}
      />
    </View>
  );

  const rotarHorario = () => {
    const actuales = valores;
    const orden = modo === "6x6" ? posiciones6x6.orden : posiciones4x4.orden;
    const nuevos: { [key: string]: string } = {};
    orden.forEach((pos, idx) => {
      const nextIdx = (idx + 1) % orden.length;
      if (actuales[pos]) nuevos[orden[nextIdx]] = actuales[pos];
    });
    setValoresPorSet((prev) => ({ ...prev, [setActual]: nuevos }));
  };

  const rotarAntihorario = () => {
    const actuales = valores;
    const orden = modo === "6x6" ? posiciones6x6.orden : posiciones4x4.orden;
    const nuevos: { [key: string]: string } = {};
    orden.forEach((pos, idx) => {
      const prevIdx = (idx - 1 + orden.length) % orden.length;
      if (actuales[pos]) nuevos[orden[prevIdx]] = actuales[pos];
    });
    setValoresPorSet((prev) => ({ ...prev, [setActual]: nuevos }));
  };

  const vaciarCampo = () =>
    setValoresPorSet((prev) => ({ ...prev, [setActual]: {} }));

  const avanzarSet = () =>
    setSetActual((prev) => {
      const next = prev < TOTAL_SETS ? prev + 1 : TOTAL_SETS;
      setValoresPorSet((p) => (p[next] ? p : { ...p, [next]: {} }));
      return next;
    });

  const retrocederSet = () =>
    setSetActual((prev) => {
      const next = prev > 1 ? prev - 1 : 1;
      setValoresPorSet((p) => (p[next] ? p : { ...p, [next]: {} }));
      return next;
    });

  const posiciones = modo === "6x6" ? posiciones6x6 : posiciones4x4;

  return (
    <View style={styles.container}>
      {/* Botón Home arriba izquierda */}
      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={{ fontSize: 26, color: "#fff" }}>🏠</Text>
      </TouchableOpacity>

      {/* Botón Modo arriba derecha */}
      <TouchableOpacity style={styles.modoButton} onPress={toggleModo}>
        <Text style={{ fontSize: 18, color: "#fff", marginRight: 5 }}>🔄</Text>
        <Text style={styles.modoText}>
          {modo === "6x6" ? "Modo: Voley 6x6" : "Modo: MiniVoley 4x4"}
        </Text>
      </TouchableOpacity>

      {/* Barra Código de equipo y Equipo A/B */}
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
        <TouchableOpacity onPress={retrocederSet} style={styles.setButton}>
          <Text style={{ fontSize: 24, color: "#fff" }}>◀</Text>
        </TouchableOpacity>

        <View style={styles.setDisplay}>
          <Text style={styles.setText}>{`Set ${setActual}`}</Text>
        </View>

        <TouchableOpacity onPress={avanzarSet} style={styles.setButton}>
          <Text style={{ fontSize: 24, color: "#fff" }}>▶</Text>
        </TouchableOpacity>
      </View>

      {/* Campo de voleibol */}
      <View style={styles.campo}>
        {/* Delanteras */}
        <View style={styles.fila}>
          {posiciones.delanteras.map((pos) => renderPosicion(pos))}
        </View>

        <View style={styles.lineaSeparadora} />

        {/* Traseras */}
        <View style={styles.fila}>
          {modo === "6x6" ? (
            posiciones.traseras.map((pos) => renderPosicion(pos))
          ) : (
            <View style={styles.filaUnica}>{renderPosicion("I")}</View>
          )}
        </View>

        {/* Botones de rotación */}
        <View style={styles.botonesContainer}>
          <TouchableOpacity onPress={rotarHorario} style={styles.botonFlotante}>
            <Text style={{ fontSize: 24, color: "#fff" }}>⟳</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={vaciarCampo}
            style={[styles.botonFlotante, styles.botonCentral]}
          >
            <Text style={{ fontSize: 22, color: "#fff" }}>🗑</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={rotarAntihorario}
            style={styles.botonFlotante}
          >
            <Text style={{ fontSize: 24, color: "#fff" }}>⟲</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Botón Generar QR */}
      <TouchableOpacity style={styles.qrButton} onPress={generarQR}>
        <Text style={styles.qrButtonText}>Generar código QR</Text>
      </TouchableOpacity>
    </View>
  );
}
