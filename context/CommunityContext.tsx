/**
 * 🌍 COMMUNITY CONTEXT
 * ====================
 * Context para gestionar la comunidad según ubicación GPS.
 * Ya no requiere persistencia manual - se detecta automáticamente.
 * Si no hay comunidad detectada se usa la versión básica ('generic').
 */

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { CommunityId, Theme, getTheme, DEFAULT_COMMUNITY_ID } from '../config/themes';
import { CommunityAssets, getCommunityAssets } from '../config/assets';

interface CommunityContextType {
  communityId: CommunityId | null;
  theme: Theme | null;
  assets: CommunityAssets | null;
  isLoading: boolean;
  setCommunity: (communityId: CommunityId) => void;
}

const CommunityContext = createContext<CommunityContextType | undefined>(undefined);

interface CommunityProviderProps {
  children: ReactNode;
}

export const CommunityProvider: React.FC<CommunityProviderProps> = ({ children }) => {
  const [communityId, setCommunityIdState] = useState<CommunityId | null>(null);
  const [isLoading] = useState(false);

  const setCommunity = (newCommunityId: CommunityId) => {
    setCommunityIdState(newCommunityId);
  };

  // Sin comunidad detectada todavía: versión básica como fallback
  const theme = getTheme(communityId ?? DEFAULT_COMMUNITY_ID);
  const assets = getCommunityAssets(communityId ?? DEFAULT_COMMUNITY_ID);

  return (
    <CommunityContext.Provider
      value={{
        communityId,
        theme,
        assets,
        isLoading,
        setCommunity,
      }}
    >
      {children}
    </CommunityContext.Provider>
  );
};

/**
 * 🎯 Hook para usar el contexto de comunidad
 */
export const useCommunity = (): CommunityContextType => {
  const context = useContext(CommunityContext);
  if (context === undefined) {
    throw new Error('useCommunity must be used within a CommunityProvider');
  }
  return context;
};
