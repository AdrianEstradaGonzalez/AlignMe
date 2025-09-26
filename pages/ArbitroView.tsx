import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { ArbitroStyles as styles } from "../styles/ArbitroStyles";
import SwipeIndicatorNav from "./SwipeIndicatorNav";
import NavBar from "./NavBar"; // 👈 usamos la barra reutilizable

type Props = {
  modoProp?: "6x6" | "4x4";
  setModoProp?: (m: "6x6" | "4x4") => void;
  setActualProp?: number;
  setSetActualProp?: (n: number) => void;
  valoresEquipos?: {
    [set: number]: {
      A?: { codigo?: string; equipo?: string } & { [pos: string]: string };
      B?: { codigo?: string; equipo?: string } & { [pos: string]: string };
    };
  };
  onEscanear?: (eq: "A" | "B") => void;
};

const icons = {
  left: require("../assets/icons/left.png"),
  right: require("../assets/icons/right.png"),
  qr: require("../assets/icons/qr.png"),
};

export default function ArbitroView({
  modoProp,
  setModoProp,
  setActualProp,
  setSetActualProp,
  valoresEquipos,
  onEscanear,
}: Props) {
  const [modoLocal, setModoLocal] = useState<"6x6" | "4x4">("6x6");
  const modo = modoProp ?? modoLocal;
  const setModo = setModoProp ?? setModoLocal;

  const TOTAL_SETS = modo === "6x6" ? 5 : 3;
  const [setActualLocal, setSetActualLocal] = useState<number>(1);
  const setActual = setActualProp ?? setActualLocal;
  const setSetActual = setSetActualProp ?? setSetActualLocal;

  const posiciones6x6 = {
    delanteras: ["IV", "III", "II"],
    traseras: ["V", "VI", "I"],
  };
  const posiciones4x4 = {
    delanteras: ["IV", "III", "II"],
    traseras: ["I"],
  };

  const getPosiciones = () => (modo === "6x6" ? posiciones6x6 : posiciones4x4);

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

  const mapPosDerecha = (pos: string, modo: "6x6" | "4x4"): string => {
    if (modo === "4x4") {
      switch (pos) {
        case "IV": return "II";
        case "II": return "IV";
        default:   return pos;
      }
    }
    switch (pos) {
      case "IV": return "II";
      case "II": return "IV";
      case "V":  return "I";
      case "I":  return "V";
      default:   return pos;
    }
  };

  const retrocederSet = () => setSetActual(setActual > 1 ? setActual - 1 : 1);
  const avanzarSet = () =>
    setSetActual(setActual < TOTAL_SETS ? setActual + 1 : TOTAL_SETS);

  const codigoIzq =
    valoresEquipos?.[setActual]?.[equipoIzq]?.codigo?.toUpperCase() ?? "---";
  const codigoDer =
    valoresEquipos?.[setActual]?.[equipoDer]?.codigo?.toUpperCase() ?? "---";

  const nombreIzq =
    valoresEquipos?.[setActual]?.[equipoIzq]?.equipo ?? `${equipoIzq}`;
  const nombreDer =
    valoresEquipos?.[setActual]?.[equipoDer]?.equipo ?? `${equipoDer}`;

  return (
    <View style={styles.container}>
      {/* 🔹 Barra de navegación arriba */}
      <NavBar
        modo={modo}
        toggleModo={() => setModo(modo === "6x6" ? "4x4" : "6x6")}
      />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        showsVerticalScrollIndicator={false}
      >
        {/* Fila de sets */}
        <View style={styles.filaSets}>
          <TouchableOpacity onPress={retrocederSet} style={styles.setButton}>
            <Image
              source={icons.left}
              style={{ width: 20, height: 20, tintColor: "#fff" }}
            />
          </TouchableOpacity>
          <View style={styles.setDisplay}>
            <Text style={styles.setText}>{`Set ${setActual}`}</Text>
          </View>
          <TouchableOpacity onPress={avanzarSet} style={styles.setButton}>
            <Image
              source={icons.right}
              style={{ width: 20, height: 20, tintColor: "#fff" }}
            />
          </TouchableOpacity>
        </View>

        {/* Campo con etiquetas */}
        <View style={{ marginBottom: 20 }}>
          {/* Izquierda */}
          <View
            style={{
              position: "absolute",
              top: -18,
              left: 12,
              flexDirection: "row",
              alignItems: "center",
              zIndex: 20,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#000",
                backgroundColor: "#fde047",
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "#d97706",
              }}
              numberOfLines={1}
            >
              {nombreIzq}
            </Text>
            <Text
              style={{
                marginLeft: 6,
                fontSize: 16,
                fontWeight: "bold",
                color: "#000",
                backgroundColor: "#fff176",
                paddingHorizontal: 8,
                paddingVertical: 3,
                borderRadius: 6,
                borderWidth: 1,
                borderColor: "#d97706",
                minWidth: 40,
                textAlign: "center",
              }}
            >
              {codigoIzq || "---"}
            </Text>
          </View>

          {/* Derecha */}
          <View
            style={{
              position: "absolute",
              top: -18,
              right: 12,
              flexDirection: "row",
              alignItems: "center",
              zIndex: 20,
            }}
          >
            <Text
              style={{
                marginRight: 6,
                fontSize: 16,
                fontWeight: "bold",
                color: "#000",
                backgroundColor: "#fff176",
                paddingHorizontal: 8,
                paddingVertical: 3,
                borderRadius: 6,
                borderWidth: 1,
                borderColor: "#d97706",
                minWidth: 40,
                textAlign: "center",
              }}
            >
              {codigoDer || "---"}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#000",
                backgroundColor: "#fde047",
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "#d97706",
              }}
              numberOfLines={1}
            >
              {nombreDer}
            </Text>
          </View>

          {/* Grid */}
          <View style={styles.campo}>
            <View style={styles.fila}>
              <View style={styles.columna}>
                {getPosiciones().traseras.map((pos) =>
                  renderPosicion(pos, equipoIzq)
                )}
              </View>
              <View style={styles.columna}>
                {getPosiciones().delanteras.map((pos) =>
                  renderPosicion(pos, equipoIzq)
                )}
              </View>
              <View style={styles.red}></View>
              <View style={styles.columna}>
                {getPosiciones().delanteras.map((pos) =>
                  renderPosicion(mapPosDerecha(pos, modo), equipoDer)
                )}
              </View>
              <View style={styles.columna}>
                {getPosiciones().traseras.map((pos) =>
                  renderPosicion(mapPosDerecha(pos, modo), equipoDer)
                )}
              </View>
            </View>
          </View>
        </View>

        {/* Botones QR debajo del campo */}
        <View style={styles.qrRow}>
          <TouchableOpacity
            style={[styles.qrButton, styles.qrButtonLeft]}
            onPress={() => onEscanear?.(equipoIzq)}
          >
            <Image source={icons.qr} style={styles.qrIcon} />
            <Text style={styles.qrButtonText}>{`Escanear\nEquipo ${equipoIzq}`}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.qrButton, styles.qrButtonRight]}
            onPress={() => onEscanear?.(equipoDer)}
          >
            <Image source={icons.qr} style={styles.qrIcon} />
            <Text style={styles.qrButtonText}>{`Escanear\nEquipo ${equipoDer}`}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Footer fijo */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 60,
          backgroundColor: "transparent",
        }}
      >
        <SwipeIndicatorNav active="center" />
      </View>
    </View>
  );
}
