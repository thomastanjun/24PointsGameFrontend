import React, { useState, useEffect } from 'react';
import { Input } from '../components/GameStyles';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const useOnlinePlayerCount = () => {
    const [onlinePlayers, setOnlinePlayers] = useState<number>(0);
    
    useEffect(() => {
        const fetchCount = async () => {
            try {
                const response = await fetch(`${BASE_URL}/players/count`);
    
                if (!response.ok) {
                    console.error('Server response:', response.status, response.statusText);
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const count = await response.json();
                setOnlinePlayers(count);                
            } catch (error) {
                console.error('Error fetching online player number:', error);
                throw error;
            }
        }

        fetchCount();
        console.log("useOnlinePlayerCount: Fetching online player count");
        const interval = setInterval(fetchCount, 100);
        return () => clearInterval(interval);

    }, []);

    return onlinePlayers;
};

