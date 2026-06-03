import React, { useState, useEffect } from 'react';
import  GameClient from '../services/GameClient';

export const useGameExit = (client: GameClient | null) => {

    useEffect(() => {
        const handleBeforeUnload =  (e: BeforeUnloadEvent) => {
            if (client) {
                client.exitGame();
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);

    }, [client]);

}