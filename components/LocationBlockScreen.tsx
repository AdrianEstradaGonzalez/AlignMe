/**
 * 🚫 LOCATION BLOCK SCREEN
 * =========================
 * Pantalla de bloqueo cuando el dispositivo no está en una comunidad permitida.
 */

import React from 'react';
import { View, Linking } from 'react-native';
import CustomAlert from './CustomAlert';
import { AsturiasTheme } from '../config/themes';
import { getCommunityAssets } from '../config/assets';

interface LocationBlockScreenProps {
  onContactPress?: () => void;
}

export function LocationBlockScreen({ onContactPress }: LocationBlockScreenProps) {
  const theme = AsturiasTheme;
  const assets = getCommunityAssets('asturias');

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
