/**
 * 🤝 APP SPONSORS
 * ===============
 * Patrocinadores de AlignMe (VBStats y BlueDebug).
 * Tarjeta clara sobre la imagen de fondo con logo grande, nombre, descripción
 * y enlace: VBStats abre su ficha en la tienda del dispositivo (App Store en
 * iOS, Google Play en Android) y BlueDebug su web.
 */

import React from 'react';
import { View, Image, Text, TouchableOpacity, Linking, Platform } from 'react-native';
import { useCommunity } from '../context/CommunityContext';
import {
  createAppStyles,
  APP_SPONSOR_LOGO_SIZE,
  APP_SPONSOR_LOGO_SIZE_COMPACT,
} from '../styles/AppStyles';
import { BlueDeBugLogo } from './BlueDeBugLogo';
import { GenericTheme } from '../config/themes';

/** Ficha de VBStats en Google Play (Android) */
const VBSTATS_PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.vbstats';
/** Ficha de VBStats en la App Store (iOS) */
const VBSTATS_APP_STORE_URL = 'https://apps.apple.com/us/app/vbstats/id6758320427';
/** Web corporativa de BlueDebug */
const BLUEDEBUG_WEB_URL = 'https://bluedebug.com';

/** Tienda que corresponde al dispositivo donde corre la app */
const VBSTATS_STORE_URL = Platform.OS === 'ios' ? VBSTATS_APP_STORE_URL : VBSTATS_PLAY_STORE_URL;

/** Abre el enlace del patrocinador sin tumbar la pantalla si falla */
const openSponsorLink = async (url: string) => {
  try {
    await Linking.openURL(url);
  } catch (error) {
    console.log('No se pudo abrir el enlace del patrocinador:', url, error);
  }
};

interface SponsorEntryProps {
  compact: boolean;
  url: string;
  name: string;
  tagline: string;
  accessibilityLabel: string;
  logo: React.ReactNode;
  /** Fondo propio del hueco del logo, cuando la marca lo necesita */
  logoTileStyle?: object;
  AppStyles: ReturnType<typeof createAppStyles>;
}

/** Patrocinador individual: logo, nombre, descripción y enlace */
function SponsorEntry({
  compact,
  url,
  name,
  tagline,
  accessibilityLabel,
  logo,
  logoTileStyle,
  AppStyles,
}: SponsorEntryProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => openSponsorLink(url)}
      style={[AppStyles.appSponsorRow, compact && AppStyles.appSponsorRowCompact]}
      accessibilityRole="link"
      accessibilityLabel={accessibilityLabel}
    >
      <View
        style={[
          AppStyles.appSponsorLogoTile,
          compact && AppStyles.appSponsorLogoTileCompact,
          logoTileStyle,
        ]}
      >
        {logo}
      </View>

      <View style={AppStyles.appSponsorTextBlock}>
        <Text
          style={[AppStyles.appSponsorName, compact && AppStyles.appSponsorNameCompact]}
          numberOfLines={1}
        >
          {name}
        </Text>
        <Text
          style={[AppStyles.appSponsorTagline, compact && AppStyles.appSponsorTaglineCompact]}
          numberOfLines={2}
        >
          {tagline}
        </Text>
      </View>

      {!compact && <Text style={AppStyles.appSponsorArrow}>›</Text>}
    </TouchableOpacity>
  );
}

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
      {!compact && <Text style={AppStyles.appSponsorsLabel}>PATROCINADORES</Text>}

      <View style={[AppStyles.appSponsorsCard, compact && AppStyles.appSponsorsCardCompact]}>
        <SponsorEntry
          compact={compact}
          AppStyles={AppStyles}
          url={VBSTATS_STORE_URL}
          name="VBStats"
          tagline="Estadísticas de voleibol"
          accessibilityLabel="VBStats, estadísticas de voleibol. Abrir su ficha en la tienda de aplicaciones"
          logoTileStyle={AppStyles.appSponsorLogoTileVbstats}
          logo={
            <Image
              source={require('../assets/sponsors/vbstats.png')}
              style={{ width: logoSize, height: logoSize }}
              resizeMode="contain"
            />
          }
        />

        <View style={[AppStyles.appSponsorSeparator, compact && AppStyles.appSponsorSeparatorCompact]} />

        <SponsorEntry
          compact={compact}
          AppStyles={AppStyles}
          url={BLUEDEBUG_WEB_URL}
          name="BlueDebug"
          tagline="Transformación Digital"
          accessibilityLabel="BlueDebug, transformación digital. Abrir bluedebug.com"
          logo={<BlueDeBugLogo height={logoSize * 0.78} />}
        />
      </View>
    </View>
  );
}
