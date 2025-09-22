import React from "react";
import { View, ImageBackground } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, Text, Provider as PaperProvider, Card } from "react-native-paper";
import EntrenadorView from "./pages/EntrenadorView";
import { AppStyles as styles } from "./styles/AppStyles";  // 👈 import estilos
import QRView from "./pages/QRView";
import ArbitroPager from "./pages/ArbitroPager";

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
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Card style={styles.card} mode="elevated">
          <Card.Content>
            <Text variant="headlineLarge" style={styles.title}>
              VolleyLineUp
            </Text>

            <Button
              mode="contained"
              onPress={() => navigation.navigate("Entrenador")}
              style={styles.button}
              contentStyle={styles.buttonContent}
            >
              Entrenador
            </Button>

            <Button
              mode="contained"
              onPress={() => navigation.navigate("Arbitro")}
              style={styles.button}
              contentStyle={styles.buttonContent}
            >
              Árbitro
            </Button>
          </Card.Content>
        </Card>
      </View>
    </ImageBackground>
  );
}

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
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
