import { View, ImageBackground, Image, TouchableOpacity, ActivityIndicator, Dimensions, Platform, Linking } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, Provider as PaperProvider, Card } from "react-native-paper";
import EntrenadorView from "./pages/EntrenadorView";
import QRView from "./pages/QRView";
import ArbitroPager from "./pages/ArbitroPager";
import { CommunityProvider, useCommunity } from "./context/CommunityContext";
import { CommunitySwitcher } from "./components/CommunitySwitcher";
import CustomAlert from "./components/CustomAlert";
import { LocationBlockScreen } from "./components/LocationBlockScreen";
import { createAppStyles } from "./styles/AppStyles";
import { useState, useEffect } from "react";
import { request, PERMISSIONS, RESULTS, check } from 'react-native-permissions';
import { checkAppVersion } from './services/versionCheck';
import { detectCommunityByLocation } from './services/locationService';
import Geolocation from 'react-native-geolocation-service';
import { AsturiasTheme } from './config/themes';
import { getCommunityAssets } from './config/assets';

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
    return null;
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
          {/* Sección 1: Logo Header - Oculto en Asturias */}
          <View style={{ alignItems: 'center', marginBottom: 16 }}>
            {/* Sin headerLogo para Asturias */}
          </View>

          {/* Sección 2: Contenedor Principal */}
          <Card style={AppStyles.card} mode="elevated">
          <Card.Content style={AppStyles.cardContent}>
            {/* Logo único centrado - Solo 258.png */}
            <View style={AppStyles.logosRow}>
              <Image
                source={assets.appLogo}
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

// Pantalla de bloqueo para actualización obligatoria
function UpdateBlockScreen({ message, onUpdatePress }: { message: string; onUpdatePress: () => void }) {
  const { theme, assets } = useCommunity();

  return (
    <View style={{ flex: 1, backgroundColor: '#0f172a' }}>
      <CustomAlert
        visible={true}
        theme={theme ?? AsturiasTheme}
        assets={assets ?? getCommunityAssets('asturias')}
        message={message}
        onCancel={() => {}} // No hace nada
        onAccept={onUpdatePress}
        showResetButton={false}
        showCancelButton={false}
      />
    </View>
  );
}

export default function App() {
  const [isCheckingVersion, setIsCheckingVersion] = useState(true);
  const [isCheckingLocation, setIsCheckingLocation] = useState(true);
  const [isRequestingPermissions, setIsRequestingPermissions] = useState(true);
  const [showUpdateAlert, setShowUpdateAlert] = useState(false);
  const [locationBlocked, setLocationBlocked] = useState(false);
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const [initialCommunityId, setInitialCommunityId] = useState<string | null>(null);
  const [updateInfo, setUpdateInfo] = useState<{
    forceUpdate: boolean;
    message: string;
    storeUrl: string;
  } | null>(null);

  // PASO 1: Solicitar permisos al iniciar
  useEffect(() => {
    const requestPermissions = async () => {
      try {
        console.log('🔐 Solicitando permisos...');
        
        // Solicitar permisos de cámara
        const cameraPermission = Platform.OS === 'ios' 
          ? PERMISSIONS.IOS.CAMERA 
          : PERMISSIONS.ANDROID.CAMERA;
        
        await request(cameraPermission);

        // Solicitar permisos de ubicación
        let result;

        if (Platform.OS === 'ios') {
          // En iOS, usar Geolocation directamente para solicitar permisos
          console.log('📍 iOS: Solicitando autorización de ubicación...');
          
          // requestAuthorization devuelve: 'granted', 'denied', 'disabled', 'restricted'
          const authStatus = await Geolocation.requestAuthorization('whenInUse');
          console.log('📍 Estado de autorización iOS:', authStatus);
          
          if (authStatus === 'granted') {
            result = RESULTS.GRANTED;
          } else if (authStatus === 'denied') {
            result = RESULTS.DENIED;
          } else if (authStatus === 'disabled') {
            // Location services deshabilitados en el dispositivo
            result = RESULTS.BLOCKED;
          } else {
            result = RESULTS.BLOCKED;
          }
        } else {
          // Android: usar react-native-permissions
          const locationPermission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
          const currentStatus = await check(locationPermission);
          
          if (currentStatus === RESULTS.GRANTED) {
            result = currentStatus;
          } else {
            result = await request(locationPermission);
          }
          
          // Si no se concedió ubicación precisa, verificar si hay ubicación aproximada
          if (result !== RESULTS.GRANTED) {
            console.log('⚠️ Ubicación precisa no concedida, verificando aproximada...');
            const coarsePermission = PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION;
            const coarseResult = await check(coarsePermission);
            
            if (coarseResult === RESULTS.GRANTED) {
              console.log('✅ Ubicación aproximada disponible');
              result = RESULTS.GRANTED;
            }
          }
        }
        
        if (result === RESULTS.GRANTED || result === RESULTS.LIMITED) {
          console.log('✅ Permisos de ubicación concedidos');
          setPermissionsGranted(true);
        } else {
          console.log('❌ Permisos de ubicación denegados:', result);
          setLocationBlocked(true);
          setPermissionsGranted(false);
        }
      } catch (error) {
        console.error('Error solicitando permisos:', error);
        setLocationBlocked(true);
        setPermissionsGranted(false);
      } finally {
        setIsRequestingPermissions(false);
      }
    };

    requestPermissions();
  }, []);

  // PASO 2: Una vez concedidos los permisos, verificar ubicación y versión
  useEffect(() => {
    if (!permissionsGranted || isRequestingPermissions) {
      return; // Esperar a que se concedan los permisos
    }

    const initializeApp = async () => {
      try {
        console.log('🌍 Verificando ubicación...');
        
        // Verificar ubicación
        const locationResult = await checkLocationAndCommunity();
        
        if (!locationResult.isAllowed) {
          console.log('🚫 Ubicación no permitida');
          setLocationBlocked(true);
          setIsCheckingLocation(false);
          setIsCheckingVersion(false);
          return;
        }

        console.log('✅ Ubicación permitida');
        setInitialCommunityId(locationResult.communityId ?? null);
        setIsCheckingLocation(false);

        // Si la ubicación es válida, verificar versión
        console.log('📱 Verificando versión...');
        const versionResult = await checkAppVersion();

        if (versionResult.needsUpdate) {
          setUpdateInfo({
            forceUpdate: versionResult.forceUpdate,
            message: versionResult.forceUpdate
              ? "¡Actualización obligatoria! Debes actualizar AlignMe para continuar usando la app."
              : "Hay una nueva versión disponible de AlignMe. Te recomendamos actualizar para disfrutar de las últimas mejoras.",
            storeUrl: versionResult.storeUrl,
          });
          setShowUpdateAlert(true);
          if (!versionResult.forceUpdate) {
            setIsCheckingVersion(false);
          }
        } else {
          setIsCheckingVersion(false);
        }
      } catch (error) {
        console.error('Error en inicialización:', error);
        setIsCheckingVersion(false);
        setIsCheckingLocation(false);
      }
    };

    initializeApp();
  }, [permissionsGranted, isRequestingPermissions]);

  const checkLocationAndCommunity = async (): Promise<{ isAllowed: boolean; communityId: string | null }> => {
    try {
      // Obtener ubicación actual (los permisos ya fueron concedidos)
      return new Promise((resolve) => {
        Geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude, accuracy } = position.coords;
            const locationResult = detectCommunityByLocation(latitude, longitude);
            
            console.log('📍 Ubicación detectada:', { 
              latitude, 
              longitude, 
              accuracy: accuracy ? `${accuracy.toFixed(0)}m` : 'N/A',
              communityId: locationResult.communityId 
            });
            
            resolve({
              isAllowed: locationResult.isAllowed,
              communityId: locationResult.communityId,
            });
          },
          (error) => {
            console.error('Error obteniendo ubicación:', error);
            resolve({ isAllowed: false, communityId: null });
          },
          { 
            // Intentar alta precisión, pero aceptar baja precisión también
            enableHighAccuracy: false, // Cambiado a false para aceptar ubicación aproximada
            timeout: 20000, 
            maximumAge: 10000 
          }
        );
      });
    } catch (error) {
      console.error('Error verificando ubicación:', error);
      return { isAllowed: false, communityId: null };
    }
  };

  const handleUpdatePress = () => {
    if (updateInfo?.storeUrl) {
      Linking.openURL(updateInfo.storeUrl);
    }
  };

  const handleDismissUpdate = () => {
    if (!updateInfo?.forceUpdate) {
      setShowUpdateAlert(false);
    }
  };

  // Prioridad: ubicación > versión
  if (locationBlocked) {
    return (
      <PaperProvider>
        <CommunityProvider>
          <LocationBlockScreen />
        </CommunityProvider>
      </PaperProvider>
    );
  }

  // Pantalla de actualización obligatoria
  if (showUpdateAlert && updateInfo?.forceUpdate) {
    return (
      <PaperProvider>
        <CommunityProvider>
          <UpdateBlockScreen
            message={updateInfo.message}
            onUpdatePress={handleUpdatePress}
          />
        </CommunityProvider>
      </PaperProvider>
    );
  }

  return (
    <PaperProvider>
      <CommunityProvider>
        <AppContent
          isRequestingPermissions={isRequestingPermissions}
          isCheckingVersion={isCheckingVersion}
          isCheckingLocation={isCheckingLocation}
          permissionsGranted={permissionsGranted}
          initialCommunityId={initialCommunityId}
          showUpdateAlert={showUpdateAlert}
          updateInfo={updateInfo}
          onUpdatePress={handleUpdatePress}
          onDismissUpdate={handleDismissUpdate}
        />
      </CommunityProvider>
    </PaperProvider>
  );
}

interface AppContentProps {
  isRequestingPermissions: boolean;
  isCheckingVersion: boolean;
  isCheckingLocation: boolean;
  permissionsGranted: boolean;
  initialCommunityId: string | null;
  showUpdateAlert: boolean;
  updateInfo: {
    forceUpdate: boolean;
    message: string;
    storeUrl: string;
  } | null;
  onUpdatePress: () => void;
  onDismissUpdate: () => void;
}

function AppContent({ 
  isRequestingPermissions,
  isCheckingVersion, 
  isCheckingLocation,
  permissionsGranted,
  initialCommunityId,
  showUpdateAlert, 
  updateInfo, 
  onUpdatePress, 
  onDismissUpdate 
}: AppContentProps) {
  const { communityId, theme, assets, setCommunity, setLocationAllowed } = useCommunity();

  // Fijar comunidad detectada por App cuando ya hay permisos
  useEffect(() => {
    if (permissionsGranted && initialCommunityId) {
      console.log('📍 Comunidad recibida desde App:', initialCommunityId);
      setCommunity(initialCommunityId as any);
      setLocationAllowed(true);
    }
  }, [permissionsGranted, initialCommunityId, setCommunity, setLocationAllowed]);

  // Mostrar loading mientras se solicitan permisos, verifica versión o ubicación
  if (isRequestingPermissions || isCheckingVersion || isCheckingLocation) {
    
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
        <Image 
          source={require('./assets/asturias/258.png')} 
          style={{ width: 200, height: 200, marginBottom: 24 }}
          resizeMode="contain"
        />
      </View>
    );
  }

  // Si no hay comunidad, mostrar loading (mientras se detecta)
  if (!communityId) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
        <Image 
          source={require('./assets/asturias/258.png')} 
          style={{ width: 200, height: 200, marginBottom: 24 }}
          resizeMode="contain"
        />
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={{ color: '#0f172a', marginTop: 16, fontSize: 16 }}>Detectando comunidad...</Text>
      </View>
    );
  }

  // Navegación normal
  return (
    <>
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

      {/* Alert de actualización */}
      {theme && assets && updateInfo && (
        <CustomAlert
          visible={showUpdateAlert}
          theme={theme}
          assets={assets}
          message={updateInfo.message}
          onCancel={onDismissUpdate}
          onAccept={onUpdatePress}
          showResetButton={false}
        />
      )}
    </>
  );
}