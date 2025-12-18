import { View, ImageBackground, Image, TouchableOpacity, ActivityIndicator, Dimensions, Platform, BackHandler, Linking } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, Provider as PaperProvider, Card } from "react-native-paper";
import EntrenadorView from "./pages/EntrenadorView";
import QRView from "./pages/QRView";
import ArbitroPager from "./pages/ArbitroPager";
import { CommunityProvider, useCommunity } from "./context/CommunityContext";
import { createAppStyles } from "./styles/AppStyles";
import { useState, useEffect } from "react";
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import AccessDeniedAlert from "./components/AccessDeniedAlert";
import LocationRequiredAlert from "./components/LocationRequiredAlert";
import { detectUserCommunity } from "./services/geolocation";
import { isCommunityAllowed } from "./config/allowedCommunities";
import { getTheme } from "./config/themes";

const { height: screenHeight } = Dimensions.get('window');

type RootStackParamList = {
  Home: undefined;
  Entrenador: undefined;
  Arbitro: undefined;
  QRView: { data: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function HomeScreen({ navigation }: any) {
  const { theme, assets, communityId } = useCommunity();

  if (!theme || !assets || !communityId) {
    return null; // o un loading spinner
  }

  const AppStyles = createAppStyles(theme);

  // Renderizado específico para Baleares
  if (communityId === 'baleares') {
    return (
      <ImageBackground
        source={assets.background}
        style={AppStyles.background}
      >
        <View style={AppStyles.overlay}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: screenHeight * 0.15 }}>
            {/* Sección 1: Logo Header */}
            <View style={{ alignItems: 'center', marginBottom: 16 }}>
              <Image
                source={assets.headerLogo}
                style={AppStyles.logoHeader}
                resizeMode="contain"
              />
            </View>

            {/* Sección 2: Contenedor Principal */}
            <Card style={AppStyles.card} mode="elevated">
            <Card.Content style={AppStyles.cardContent}>
              {/* Logos horizontalmente centrados */}
              <View style={AppStyles.logosRow}>
                <Image
                  source={assets.appLogo}
                  style={AppStyles.secondaryLogo}
                  resizeMode="contain"
                />
                {assets.topRightLogo && (
                  <Image
                    source={assets.topRightLogo}
                    style={AppStyles.balearesSecondaryLogo}
                    resizeMode="contain"
                  />
                )}
              </View>
              <Text variant="headlineLarge" style={AppStyles.title}>
                {assets.appTitle}
              </Text>

              {/* Botones de acción */}
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => navigation.navigate("Entrenador")}
                style={AppStyles.actionCard}
              >
                <View style={AppStyles.actionLeftBar} />
                <View style={AppStyles.actionBorder} pointerEvents="none" />
                <View style={{ flex: 1, alignItems: "center" }}>
                  <Text style={AppStyles.actionText}>Entrenador</Text>
                </View>
                <Text style={AppStyles.actionArrow}>›</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => navigation.navigate("Arbitro")}
                style={AppStyles.actionCard}
              >
                <View style={AppStyles.actionLeftBar} />
                <View style={AppStyles.actionBorder} pointerEvents="none" />
                <View style={{ flex: 1, alignItems: "center" }}>
                  <Text style={AppStyles.actionText}>Árbitro</Text>
                </View>
                <Text style={AppStyles.actionArrow}>›</Text>
              </TouchableOpacity>
            </Card.Content>
          </Card>

            {/* Sección 3: Logo Footer (Patrocinador) */}
            <View style={{ height: 80, marginTop: 12, alignItems: 'center', justifyContent: 'center' }}>
              {assets.sponsorLogo && (
                <Image
                  source={assets.sponsorLogo}
                  style={AppStyles.sponsorLogo}
                  resizeMode="contain"
                />
              )}
            </View>
          </View>

          <Text style={AppStyles.copyright}>
            © Copyright 2025 - BlueDeBug
          </Text>
        </View>
      </ImageBackground>
    );
  }

  // Renderizado para Asturias (y otras comunidades genéricas)
  return (
    <ImageBackground
      source={assets.background}
      style={AppStyles.background}
    >
      <View style={AppStyles.overlay}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: screenHeight * 0.15 }}>
          {/* Sección 1: Logo Header */}
          <View style={{ alignItems: 'center', marginBottom: 16 }}>
            <Image
              source={assets.headerLogo}
              style={AppStyles.logoHeader}
              resizeMode="contain"
            />
          </View>

          {/* Sección 2: Contenedor Principal */}
          <Card style={AppStyles.card} mode="elevated">
          <Card.Content style={AppStyles.cardContent}>
            {/* Logos horizontalmente centrados */}
            <View style={AppStyles.logosRow}>
              <Image
                source={assets.appLogo}
                style={AppStyles.secondaryLogo}
                resizeMode="contain"
              />
              <Image
                source={assets.appLogoWithLetters}
                style={AppStyles.secondaryLogo}
                resizeMode="contain"
              />
            </View>
            <Text variant="headlineLarge" style={AppStyles.title}>
              {assets.appTitle}
            </Text>

            {/* Botones con estilo tipo "liga" */}
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => navigation.navigate("Entrenador")}
              style={AppStyles.actionCard}
            >
              <View style={AppStyles.actionLeftBar} />
              <View style={AppStyles.actionBorder} pointerEvents="none" />
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={AppStyles.actionText}>Entrenador</Text>
              </View>
              <Text style={AppStyles.actionArrow}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => navigation.navigate("Arbitro")}
              style={AppStyles.actionCard}
            >
              <View style={AppStyles.actionLeftBar} />
              <View style={AppStyles.actionBorder} pointerEvents="none" />
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={AppStyles.actionText}>Árbitro</Text>
              </View>
              <Text style={AppStyles.actionArrow}>›</Text>
            </TouchableOpacity>
          </Card.Content>
        </Card>

          {/* Sección 3: Logo Footer (Espacio reservado, sin contenido en Asturias) */}
          <View style={{ height: 80, marginTop: 12, alignItems: 'center', justifyContent: 'center' }}>
            {/* Espacio reservado para mantener consistencia con Baleares */}
          </View>
        </View>

        {/* Marca de CopyRight */}
        <Text style={AppStyles.copyright}>
          © Copyright 2025 - BlueDeBug
        </Text>
      </View>
    </ImageBackground>
  );
}

export default function App() {
  return (
    <PaperProvider>
      <CommunityProvider>
        <AppContent />
      </CommunityProvider>
    </PaperProvider>
  );
}

function AppContent() {
  const { communityId, isLoading, setCommunity } = useCommunity();
  const [isCheckingLocation, setIsCheckingLocation] = useState(false);
  const [showAccessDenied, setShowAccessDenied] = useState(false);
  const [detectedCommunityName, setDetectedCommunityName] = useState<string>('');
  const [showLocationRequired, setShowLocationRequired] = useState(false);

  // Verificar geolocalización y permisos SIEMPRE al iniciar
  useEffect(() => {
    const checkLocationAndAccess = async () => {
      setIsCheckingLocation(true);

      try {
        // Detectar la comunidad basándose en la ubicación GPS actual
        const { community, error } = await detectUserCommunity();

        if (community) {
          // Verificar si la comunidad detectada tiene acceso
          if (isCommunityAllowed(community)) {
            // Comunidad permitida, establecerla (o actualizarla si cambió)
            await setCommunity(community);
          } else {
            // Comunidad no permitida, mostrar alerta
            const theme = getTheme(community);
            setDetectedCommunityName(theme.name);
            setShowAccessDenied(true);
          }
        } else {
          // No se pudo detectar la comunidad (fuera de área, sin permisos, etc.)
          console.log('No se pudo detectar la comunidad:', error);
          // Si los permisos fueron denegados, bloquear acceso
          if (error === 'Permisos de ubicación denegados') {
            setShowLocationRequired(true);
          } else {
            // Fuera de área o error: denegar acceso
            setDetectedCommunityName('tu ubicación');
            setShowAccessDenied(true);
          }
        }
      } catch (error) {
        console.error('Error en verificación de ubicación:', error);
        setDetectedCommunityName('tu ubicación');
        setShowAccessDenied(true);
      } finally {
        setIsCheckingLocation(false);
      }
    };

    checkLocationAndAccess();
  }, []); // Solo al montar, sin depender de communityId

  // Solicitar permisos de cámara al iniciar la app
  useEffect(() => {
    const requestCameraPermission = async () => {
      try {
        const permission = Platform.OS === 'ios' 
          ? PERMISSIONS.IOS.CAMERA 
          : PERMISSIONS.ANDROID.CAMERA;
        
        const result = await request(permission);
        
        if (result !== RESULTS.GRANTED) {
          console.log('Permiso de cámara no concedido:', result);
        }
      } catch (error) {
        console.error('Error solicitando permiso de cámara:', error);
      }
    };

    requestCameraPermission();
  }, []);

  // Cerrar la app si el acceso es denegado
  const handleAccessDeniedClose = () => {
    setShowAccessDenied(false);
    // Cerrar la aplicación
    BackHandler.exitApp();
  };

  const handleOpenSettings = async () => {
    try {
      await Linking.openSettings();
    } catch (e) {
      console.error('Error opening settings:', e);
    }
  };

  const handleLocationRequiredExit = () => {
    setShowLocationRequired(false);
    BackHandler.exitApp();
  };

  // Mostrar loading mientras se carga la comunidad guardada o se verifica ubicación
  if (isLoading || isCheckingLocation) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0f172a' }}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={{ color: '#fff', marginTop: 16, fontSize: 16 }}>
          {isCheckingLocation ? 'Verificando ubicación...' : 'Cargando...'}
        </Text>
      </View>
    );
  }

  // Mostrar alerta de acceso denegado
  if (showAccessDenied) {
    return (
      <AccessDeniedAlert
        visible={showAccessDenied}
        communityName={detectedCommunityName}
        onClose={handleAccessDeniedClose}
      />
    );
  }

  // Mostrar alerta cuando falten permisos de ubicación
  if (showLocationRequired) {
    return (
      <LocationRequiredAlert
        visible={showLocationRequired}
        onOpenSettings={handleOpenSettings}
        onExit={handleLocationRequiredExit}
      />
    );
  }

  // Si no hay comunidad después de verificar, significa que hubo un error
  // Las alertas ya se muestran arriba

  // Verificación adicional de seguridad
  if (!isCommunityAllowed(communityId)) {
    const theme = getTheme(communityId);
    return (
      <AccessDeniedAlert
        visible={true}
        communityName={theme.name}
        onClose={handleAccessDeniedClose}
      />
    );
  }

  // Si ya hay comunidad y está permitida, mostrar navegación normal
  return (
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
  );
}