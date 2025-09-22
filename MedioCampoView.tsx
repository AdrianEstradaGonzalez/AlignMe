import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { EntrenadorStyles as styles } from "./styles/EntrenadorStyles";

// Icono local
const icons = {
  qr: require("./assets/icons/qr.png"),
};

const posiciones6x6 = { delanteras: ["IV", "III", "II"], traseras: ["V", "VI", "I"] };
const posiciones4x4 = { delanteras: ["IV", "III", "II"], traseras: ["I"] };

export default function MedioCampoView({
  modo,
  lado,
  setActual,
  onEscanear,
  valoresQR = {},
}: {
  modo: "6x6" | "4x4";
  lado: "izq" | "der";
  setActual: number;
  onEscanear: (eq: "A" | "B") => void;
  valoresQR?: { codigo?: string; equipo?: string } & { [pos: string]: string };
}) {
  const posiciones = modo === "6x6" ? posiciones6x6 : posiciones4x4;

  // 🔹 Lógica impar/par → A izquierda / B derecha
  const equipo =
    lado === "izq"
      ? setActual % 2 === 1
        ? "A"
        : "B"
      : setActual % 2 === 1
      ? "B"
      : "A";

  const renderPosicion = (pos: string) => (
    <View key={pos} style={styles.posicion}>
      <Text style={styles.label}>{pos}</Text>
      <Text style={[styles.input, { textAlign: "center", paddingVertical: 10 }]}>
        {valoresQR[pos] ?? "-"}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Caja superior de título */}
      <View
        style={{
          width: styles.campo.width,
          padding: 12,
          borderRadius: 12,
          backgroundColor: "#F5A623AA",
          borderWidth: 2,
          borderColor: "#D17F1A",
          marginBottom: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#000" }}>
          Hoja de Rotaciones
        </Text>
        <Text style={{ fontSize: 16, color: "#000", marginTop: 4 }}>
          SET {setActual}
        </Text>
      </View>

      {/* Campo con etiquetas de equipo */}
      <View style={{ marginBottom: 20 }}>
        {/* Letra A/B */}
        {lado === "izq" && (
          <View
            style={{
              position: "absolute",
              left: 12,
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
            >
              {`${equipo}`}
            </Text>
          </View>
        )}

        {lado === "der" && (
          <View
            style={{
              position: "absolute",
              right: 12,
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
            >
              {`${equipo}`}
            </Text>
          </View>
        )}

        {/* Código simétrico en la otra esquina */}
        {lado === "izq" && (
          <View
            style={{
              position: "absolute",
              right: 12,
              zIndex: 20,
            }}
          >
            <Text
              style={{
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
              {valoresQR.codigo?.toUpperCase() ?? "---"}
            </Text>
          </View>
        )}

        {lado === "der" && (
          <View
            style={{
              position: "absolute",
              left: 12,
              zIndex: 20,
            }}
          >
            <Text
              style={{
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
              {valoresQR.codigo?.toUpperCase() ?? "---"}
            </Text>
          </View>
        )}

        {/* Grid del campo */}
        <View style={styles.campo}>
          <View style={styles.fila}>
            {posiciones.delanteras.map((pos) => renderPosicion(pos))}
          </View>
          <View style={styles.lineaSeparadora} />
          <View style={styles.fila}>
            {modo === "6x6" ? (
              posiciones.traseras.map((pos) => renderPosicion(pos))
            ) : (
              <View style={styles.filaUnica}>{renderPosicion("I")}</View>
            )}
          </View>
        </View>
      </View>

      {/* Botón QR */}
      <TouchableOpacity
        style={[
          styles.qrButton,
          { marginTop: 20, flexDirection: "column", alignItems: "center" },
        ]}
        onPress={() => onEscanear(equipo)}
      >
        <Image
          source={icons.qr}
          style={{ width: 32, height: 32, tintColor: "#fff", marginBottom: 6 }}
        />
        <Text style={styles.qrButtonText}>
          Escanear{`\n`}Equipo {equipo}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
