import React from "react";
import { View, ImageBackground, Image, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Button,
  Text,
  Provider as PaperProvider,
  Card,
} from "react-native-paper";
import EntrenadorView from "./pages/EntrenadorView";
import QRView from "./pages/QRView";
import ArbitroPager from "./pages/ArbitroPager";
import { AppStyles } from "./styles/AppStyles";

type RootStackParamList = {
  Home: undefined;
  Entrenador: undefined;
  Arbitro: undefined;
  QRView: { data: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function HomeScreen({ navigation }: any) {
  return (
    <ImageBackground
      source={require("./assets/fondo.jpeg")}
      style={AppStyles.background}
    >
      <View style={AppStyles.overlay}>
        {/* Logo pegado al borde superior interno del Card */}
  <Image
    source={require("./assets/logo_fvbpa.png")}
    style={AppStyles.logoHeader}
    resizeMode="contain"
  />
<Card style={AppStyles.card} mode="elevated">
  <Card.Content style={{ alignItems: "center", width: "100%" }}>
    <Image
      source={require("./assets/258.png")}
      style={AppStyles.logo}
      resizeMode="contain"
    />
    <Text variant="headlineLarge" style={AppStyles.title}>
      AlignMe
    </Text>

    {/* Botones */}
    <Button
      mode="contained"
      onPress={() => navigation.navigate("Entrenador")}
      style={[AppStyles.button, { marginBottom: 14, alignSelf: "stretch" }]}
      contentStyle={AppStyles.buttonContent}
    >
      Entrenador
    </Button>

    <Button
      mode="contained"
      onPress={() => navigation.navigate("Arbitro")}
      style={[AppStyles.button, { alignSelf: "stretch" }]}
      contentStyle={AppStyles.buttonContent}
    >
      Árbitro
    </Button>
  </Card.Content>
</Card>

        {/* 🔹 Marca de CopyRight */}
        <Text style={AppStyles.copyright}>
          © Copyright 2025 - Adrián Estrada González
        </Text>
      </View>
    </ImageBackground>
  );
}

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="Entrenador"
            component={EntrenadorView}
            options={{ title: "Modo Entrenador" }}
          />
          <Stack.Screen
            name="Arbitro"
            component={ArbitroPager}
            options={{ title: "Modo Arbitro" }}
          />
          <Stack.Screen
            name="QRView"
            component={QRView}
            options={{ title: "Código QR" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}