/**
 * 🚫 LOCATION BLOCK SCREEN
 * =========================
 * Pantalla de bloqueo cuando el dispositivo no está en una comunidad permitida.
 */

import React from 'react';
import { View, Linking } from 'react-native';
import CustomAlert from './CustomAlert';
import { AsturiasTheme, Theme } from '../config/themes';
import { CommunityAssets } from '../config/assets';

interface LocationBlockScreenProps {
  onContactPress?: () => void;
}

export function LocationBlockScreen({ onContactPress }: LocationBlockScreenProps) {
  // Theme personalizado para el bloqueo (solo usa AlignMe)
    const theme: Theme = {
      ...AsturiasTheme,
      primary: '#3b82f6',
      primaryDark: '#2563eb',
      secondary: '#64748b',
      federationTitle: 'AlignMe',
    };

  // Assets personalizados para el bloqueo (usa el icono 258 en lugar de la bandera)
  const assets: CommunityAssets = {
    headerLogo: require('../assets/asturias/258.png'),
    appLogo: require('../assets/asturias/258.png'),
    background: require('../assets/fondo.jpeg'),
    flag: require('../assets/asturias/258.png'), // Usa el icono 258 en lugar de la bandera
    appTitle: 'AlignMe',
  };

  const handleContactPress = () => {
    const url = 'https://bluedebug.com';
    Linking.openURL(url).catch((err) => 
      console.error('Error al abrir el enlace:', err)
    );
    onContactPress?.();
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#0f172a' }}>
      <CustomAlert
        visible={true}
        theme={theme}
        assets={assets}
        message={"La federación de la comunidad en la que te encuentras no dispone de los derechos de AlignMe.\nContacte a través de bluedebug.com para adquirirlos"}
        onCancel={() => {}} // No hace nada - no se puede cerrar
        onAccept={handleContactPress}
        showResetButton={false}
        showCancelButton={false}
        acceptButtonText="Contactar"
      />
    </View>
  );
}
