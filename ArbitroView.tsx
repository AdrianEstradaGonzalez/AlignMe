import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ArbitroStyles as styles } from "./styles/ArbitroStyles";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { RootStackParamList } from "./types/Navigation";

type NavigationProp = StackNavigationProp<RootStackParamList, "Arbitro">;

export default function ArbitroView({
  modoProp,
  setModoProp,
  setActualProp,
  setSetActualProp,
  valoresEquipos,
  onEscanear,
}: {
  modoProp?: "6x6" | "4x4";
  setModoProp?: (m: "6x6" | "4x4") => void;
  setActualProp?: number;
  setSetActualProp?: (n: number) => void;
  valoresEquipos?: { [set: number]: { A?: { [pos: string]: string }; B?: { [pos: string]: string } } };
  onEscanear?: (eq: "A" | "B") => void;
}) {
  const navigation = useNavigation<NavigationProp>();
  const [modoLocal, setModoLocal] = useState<"6x6" | "4x4">("6x6");
  const modo = modoProp ?? modoLocal;
  const setModo = setModoProp ?? setModoLocal;

  const TOTAL_SETS = modo === "6x6" ? 5 : 3;
  const [setActualLocal, setSetActualLocal] = useState<number>(1);
  const setActual = setActualProp ?? setActualLocal;
  const setSetActual = setSetActualProp ?? setSetActualLocal;

  const posiciones6x6 = { delanteras: ["IV", "III", "II"], traseras: ["V", "VI", "I"] };
  const posiciones4x4 = { delanteras: ["IV", "III", "II"], traseras: ["I"] };

  const getPosiciones = (equipo: "A" | "B") => {
    if (modo === "6x6")
      return equipo === "A"
        ? posiciones6x6
        : { delanteras: ["II", "III", "IV"], traseras: ["I", "VI", "V"] };
    return equipo === "A"
      ? posiciones4x4
      : { delanteras: ["II", "III", "IV"], traseras: ["I"] };
  };

  const equipoIzq = setActual % 2 === 1 ? "A" : "B";
  const equipoDer = setActual % 2 === 1 ? "B" : "A";

  const renderPosicion = (pos: string, equipo: "A" | "B") => {
    const valores = valoresEquipos?.[setActual]?.[equipo] || {};
    const valor = valores[pos] || "-";
    return (
      <View key={pos} style={styles.posicion}>
        <Text style={styles.posLabel}>{pos}</Text>
        <View style={styles.divisor} />
        <Text style={styles.numLabel}>{valor}</Text>
      </View>
    );
  };

  const retrocederSet = () => setSetActual(setActual > 1 ? setActual - 1 : 1);
  const avanzarSet = () => setSetActual(setActual < TOTAL_SETS ? setActual + 1 : TOTAL_SETS);

  return (
    <View style={styles.container}>
      {/* Botón Home */}
      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={{ fontSize: 24, color: "#fff" }}>🏠</Text>
      </TouchableOpacity>

      {/* Botón Modo */}
      <TouchableOpacity
        style={styles.modoButton}
        onPress={() => setModo(modo === "6x6" ? "4x4" : "6x6")}
      >
        <Text style={{ fontSize: 18, color: "#fff", marginRight: 5 }}>🔄</Text>
        <Text style={styles.modoText}>
          {modo === "6x6" ? "Modo: Voley 6x6" : "Modo: MiniVoley 4x4"}
        </Text>
      </TouchableOpacity>

      {/* Fila de sets */}
      <View style={styles.filaSets}>
        <TouchableOpacity onPress={retrocederSet} style={styles.setButton}>
          <Text style={{ fontSize: 20, color: "#fff" }}>⬅️</Text>
        </TouchableOpacity>
        <View style={styles.setDisplay}>
          <Text style={styles.setText}>{`Set ${setActual}`}</Text>
        </View>
        <TouchableOpacity onPress={avanzarSet} style={styles.setButton}>
          <Text style={{ fontSize: 20, color: "#fff" }}>➡️</Text>
        </TouchableOpacity>
      </View>

      {/* Campo */}
      <View style={styles.campo}>
        <View style={styles.fila}>
          <View style={styles.columna}>
            {getPosiciones(equipoIzq).traseras.map((pos) =>
              renderPosicion(pos, equipoIzq)
            )}
          </View>
          <View style={styles.columna}>
            {getPosiciones(equipoIzq).delanteras.map((pos) =>
              renderPosicion(pos, equipoIzq)
            )}
          </View>
          <View style={styles.red}></View>
          <View style={styles.columna}>
            {getPosiciones(equipoDer).delanteras.map((pos) =>
              renderPosicion(pos, equipoDer)
            )}
          </View>
          <View style={styles.columna}>
            {getPosiciones(equipoDer).traseras.map((pos) =>
              renderPosicion(pos, equipoDer)
            )}
          </View>
        </View>
      </View>

      {/* Botones QR debajo */}
      <View style={styles.qrRow}>
        <TouchableOpacity
          style={[styles.qrButton, styles.qrButtonLeft]}
          onPress={() => onEscanear?.(equipoIzq)}
        >
          <Text style={{ fontSize: 20, color: "#fff", marginRight: 6 }}>📷</Text>
          <Text style={styles.qrButtonText}>{`Escanear Equipo ${equipoIzq}`}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.qrButton, styles.qrButtonRight]}
          onPress={() => onEscanear?.(equipoDer)}
        >
          <Text style={{ fontSize: 20, color: "#fff", marginRight: 6 }}>📷</Text>
          <Text style={styles.qrButtonText}>{`Escanear Equipo ${equipoDer}`}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
