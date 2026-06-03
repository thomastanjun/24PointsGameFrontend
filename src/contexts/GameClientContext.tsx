import React, { createContext, useState } from 'react';
import GameClient from '../services/GameClient';
import { GameClientProviderProps } from '../types/GameClientProviderProps';

type GameClientContextType = {
    client: GameClient | null;
    setGameClient: (client: GameClient) => void;
  };
  
  export const GameClientContext = createContext<GameClientContextType>({
    client: null,
    setGameClient: () => {},
  });
  
  export const GameClientProvider: React.FC<GameClientProviderProps> = ({ children }) => {
    const [client, setGameClient] = useState<GameClient | null>(null);
  
    return (
      <GameClientContext.Provider value={{ client, setGameClient }}>
        {children}
      </GameClientContext.Provider>
    );
  };