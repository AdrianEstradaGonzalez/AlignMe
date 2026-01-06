/**
 * 🌍 COMMUNITY CONTEXT
 * ====================
 * Context para gestionar la comunidad según ubicación GPS.
 * Ya no requiere persistencia manual - se detecta automáticamente.
 */

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { CommunityId, Theme, getTheme } from '../config/themes';
import { CommunityAssets, getCommunityAssets } from '../config/assets';

interface CommunityContextType {
  communityId: CommunityId | null;
  theme: Theme | null;
  assets: CommunityAssets | null;
  isLoading: boolean;
  isLocationAllowed: boolean;
  setCommunity: (communityId: CommunityId) => void;
  setLocationAllowed: (allowed: boolean) => void;
}

const CommunityContext = createContext<CommunityContextType | undefined>(undefined);

interface CommunityProviderProps {
  children: ReactNode;
}

export const CommunityProvider: React.FC<CommunityProviderProps> = ({ children }) => {
  const [communityId, setCommunityIdState] = useState<CommunityId | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLocationAllowed, setIsLocationAllowed] = useState(false);

  const setCommunity = (newCommunityId: CommunityId) => {
    setCommunityIdState(newCommunityId);
  };

  const setLocationAllowed = (allowed: boolean) => {
    setIsLocationAllowed(allowed);
  };

  const theme = communityId ? getTheme(communityId) : getTheme('asturias'); // Default Asturias
  const assets = communityId ? getCommunityAssets(communityId) : getCommunityAssets('asturias');

  return (
    <CommunityContext.Provider
      value={{
        communityId,
        theme,
        assets,
        isLoading,
        isLocationAllowed,
        setCommunity,
        setLocationAllowed,
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
