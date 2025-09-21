import React, { useState, useRef } from "react";
import { ScrollView, View, Dimensions, Modal, Alert, Text, TouchableOpacity } from "react-native";
import CameraScreen from "react-native-camera-kit";
import ArbitroView from "./ArbitroView";
import MedioCampoView from "./MedioCampoView";

const { width } = Dimensions.get("window");

export default function ArbitroPager() {
  const [modo, setModo] = useState<"6x6" | "4x4">("6x6");
  const [setActual, setSetActual] = useState<number>(1);
  const [valoresEquipos, setValoresEquipos] = useState<{ [set: number]: { A?: { [pos: string]: string }; B?: { [pos: string]: string } } }>({});
  const scrollRef = useRef<ScrollView>(null);

  const [scannerVisible, setScannerVisible] = useState(false);
  const [equipoEscanear, setEquipoEscanear] = useState<"A" | "B">("A");

  const openScanner = (eq: "A" | "B") => {
    setEquipoEscanear(eq);
    setScannerVisible(true);
  };

  const handleBarCodeRead = (event: { nativeEvent: { codeStringValue: string } }) => {
    setScannerVisible(false);

    let datosQR: { [pos: string]: string } = {};
    try {
      datosQR = JSON.parse(event.nativeEvent.codeStringValue);
    } catch {
      Alert.alert("QR inválido", "No se pudo leer el QR correctamente");
      return;
    }

    setValoresEquipos(prev => ({
      ...prev,
      [setActual]: {
        ...(prev[setActual] || {}),
        [equipoEscanear]: datosQR,
      },
    }));

    const xPos = equipoEscanear === "A" ? 0 : width * 2;
    scrollRef.current?.scrollTo({ x: xPos, animated: true });
  };

  return (
    <>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={{ flex: 1 }}
      >
        <View style={{ width }}>
          <MedioCampoView
            modo={modo}
            lado="izq"
            setActual={setActual}
            onEscanear={openScanner}
            valoresQR={valoresEquipos[setActual]?.A}
          />
        </View>

        <View style={{ width }}>
          <ArbitroView
            modoProp={modo}
            setModoProp={setModo}
            setActualProp={setActual}
            setSetActualProp={setSetActual}
            valoresEquipos={valoresEquipos}
            onEscanear={openScanner}
          />
        </View>

        <View style={{ width }}>
          <MedioCampoView
            modo={modo}
            lado="der"
            setActual={setActual}
            onEscanear={openScanner}
            valoresQR={valoresEquipos[setActual]?.B}
          />
        </View>
      </ScrollView>

      <Modal visible={scannerVisible} animationType="slide">
        <CameraScreen
          scanBarcode={true}
          onReadCode={handleBarCodeRead}
          showFrame={true}
          laserColor="red"
          frameColor="white"
          hideControls={true}
        />

        <TouchableOpacity
          style={{
            position: "absolute",
            bottom: 50,
            alignSelf: "center",
            padding: 10,
            backgroundColor: "orange",
            borderRadius: 8,
          }}
          onPress={() => setScannerVisible(false)}
        >
          <Text style={{ color: "#fff" }}>Cancelar</Text>
        </TouchableOpacity>
      </Modal>
    </>
  );
}
