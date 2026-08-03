/**
 * 🤝 APP SPONSORS
 * ===============
 * Patrocinadores de AlignMe (VBStats y BlueDeBug).
 * Se muestran en el home, sobre una píldora clara para que los logos
 * mantengan contraste sobre la imagen de fondo.
 */

import React from 'react';
import { View, Image, Text } from 'react-native';
import { useCommunity } from '../context/CommunityContext';
import {
  createAppStyles,
  APP_SPONSOR_LOGO_SIZE,
  APP_SPONSOR_LOGO_SIZE_COMPACT,
} from '../styles/AppStyles';
import { BlueDeBugLogo } from './BlueDeBugLogo';
import { GenericTheme } from '../config/themes';

interface AppSponsorsProps {
  /** Versión reducida, para pantallas que ya muestran otro patrocinador */
  compact?: boolean;
}

export function AppSponsors({ compact = false }: AppSponsorsProps) {
  const { theme } = useCommunity();
  const AppStyles = createAppStyles(theme ?? GenericTheme);

  const logoSize = compact ? APP_SPONSOR_LOGO_SIZE_COMPACT : APP_SPONSOR_LOGO_SIZE;

  return (
    <View style={AppStyles.appSponsors}>
      {!compact && (
        <Text style={AppStyles.appSponsorsLabel}>PATROCINADORES</Text>
      )}

      <View style={[AppStyles.appSponsorsPill, compact && AppStyles.appSponsorsPillCompact]}>
        <Image
          source={require('../assets/sponsors/vbstats.png')}
          style={[AppStyles.appSponsorLogo, compact && AppStyles.appSponsorLogoCompact]}
          resizeMode="contain"
          accessibilityLabel="VBStats"
        />

        <View style={AppStyles.appSponsorDivider} />

        <BlueDeBugLogo height={logoSize * 0.8} />
      </View>
    </View>
  );
}
