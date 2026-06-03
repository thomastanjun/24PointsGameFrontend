import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameClientContext } from '../contexts/GameClientContext';
import GameClient from '../services/GameClient';
import { PageInfo, CellInfo, GameStatusInfo } from '../GameDefinitions';

export const useGameLogic = () => {
    console.log("useGameLogic called at", new Date().toISOString());
    const navigate = useNavigate();
    const { client } = useContext(GameClientContext);

    const buildTokenHistoryFromFormula = (currentFormula: string, numbers: string[]) => {
        if (!currentFormula.trim() || numbers.length === 0) {
            return [];
        }

        const tokens = currentFormula.match(/\d+|[()+\-*/]/g) || [];
        const claimedNumberIndices = new Set<number>();

        return tokens.map((token) => {
            if (!/^\d+$/.test(token)) {
                return -1;
            }

            const matchingIndex = numbers.findIndex(
                (value, index) => value === token && !claimedNumberIndices.has(index)
            );

            if (matchingIndex === -1) {
                return -1;
            }

            claimedNumberIndices.add(matchingIndex);
            return matchingIndex;
        });
    };
    
    const [playerName, setPlayerName] = useState(client?.getPlayerName() || '');
    const [formula, setFormula] = useState(client?.getCurrentPlayerFormula() || '');
    const [result, setResult] = useState(client?.getCurrentPlayerResult() || '0+default');
    const [error, setError] = useState(client?.getCurrentPlayerError() || 'default error');
    const [otherPlayers, setOtherPlayers] = useState<{ [playerName: string]: { formula: string, value: string } }>({});
    const [gameNumbers, setGameNumbers] = useState<string[]>(client?.getGameNumbersString() || []);
    const [usedButtonIndices, setUsedButtonIndices] = useState<number[]>([]);
    const [tokenHistory, setTokenHistory] = useState<number[]>([]);
    const [winner, setWinner] = useState<string>('');
    const [winnerFormula, setWinnerFormula] = useState<string>('');
    const [isTimerRunning, setIsTimerRunning] = useState(true);
    //const [gameTime, setGameTime] = useState<number>(0);
    const [isCountingDown, setIsCountingDown] = useState(false);
    //const [count, setCount] = useState(3);

    const updateDisplay = (client: GameClient) => {
        setFormula(client.getCurrentPlayerFormula());
        setError(client.getCurrentPlayerError());
        setResult(client.getCurrentPlayerResult() + client.getCurrentPlayerError());
        const newNumbers = client.getGameNumbersString();
        if (!arraysEqual(newNumbers, gameNumbers)) {
            setGameNumbers(newNumbers);
        }
        console.log('compared numbers and ' + arraysEqual(newNumbers, gameNumbers));
        setOtherPlayers(client.getOtherPlayers());
        setWinner(client.getWinner());
        setWinnerFormula(client.getWinnerFormula());
        console.log('updateDisplay');
    };

    const updateGameState = (data: PageInfo) => {
        if (!client) {
            return;
        }
        setFormula(client.getCurrentPlayerFormula());
        setError(client.getCurrentPlayerError());
        setResult(client.getCurrentPlayerResult() + client.getCurrentPlayerError());
        const newNumbers = client.getGameNumbersString();
        if (!arraysEqual(newNumbers, gameNumbers)) {
            setGameNumbers(newNumbers);
        }
        console.log('compared numbers and ' + arraysEqual(newNumbers, gameNumbers));
        setOtherPlayers(client.getOtherPlayers());
        setWinner(client.getWinner());
        setWinnerFormula(client.getWinnerFormula());
        console.log('updateGameState');
    }

    const arraysEqual = (a: string[], b: string[]) => {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
          if (a[i] !== b[i]) return false;
        }
        return true;
    }

    const updateGameNumbers = () => {
        if (!client) {
            return;
        }
        if (client.getGameNumbersString() !== gameNumbers) {
            setGameNumbers(client.getGameNumbersString());
        }
    }

    const handleTokenClick = async (token: string) => {
        if (!client) return;

        try {
            await client.addToken(token);
            updateDisplay(client);
            setTokenHistory(prev => [...prev, -1]);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleNumberTokenClick = async (token: string, index: number) => {
        if (!client) return;

        try {
            await client.addToken(token);
            updateDisplay(client);
            setUsedButtonIndices(prev => [...prev, index]);
            setTokenHistory(prev => [...prev, index]);
            
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleRemove = async () => {
        if (!client) return;
        try {
            await client.removeToken();
            updateDisplay(client);
            setTokenHistory( prev => {
                if (prev.length === 0) return prev;

                const newHistory = prev.slice(0, -1);
                const lastToken = prev[prev.length - 1];

                if (lastToken > -1) {
                    setUsedButtonIndices(prev => prev.filter(i => i !== lastToken));
                }

                return newHistory;
            }

            )
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleClear = async () => {
        if (!client) return;
        try {
            await client.clearFormula();
            updateDisplay(client);
            setUsedButtonIndices([]);
            setTokenHistory([]);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleNewGame = async () => {
        if (!client) return;
        try {
            await client.startNewGame();
            if (isTimerRunning) {
                setIsTimerRunning(false);
            }
            updateDisplay(client);
            setUsedButtonIndices([]);
            setTokenHistory([]);

            setTimeout(() => {
                setIsTimerRunning(true); 
            }, 0);
            
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleLogout = async () => {
        if (!client) return;
        try {
            await client.exitGame();
            client.resetClient();
            navigate('/');
        } catch (error) {
            console.error('Error:', error);
        }
    };


    useEffect(() => {
        setUsedButtonIndices([]);
        setTokenHistory([]);
    }, [gameNumbers]);

    useEffect(() => {
        const nextTokenHistory = buildTokenHistoryFromFormula(formula, gameNumbers);

        setTokenHistory(nextTokenHistory);
        setUsedButtonIndices(nextTokenHistory.filter((index) => index > -1));
    }, [formula, gameNumbers]);


    useEffect(() => {
        if (winner) {
            setIsTimerRunning(false);
        }
    }, [winner]);

    /** 
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isCountingDown && count > 1) {
            timer = setTimeout(() => setCount(prev => prev - 1), 1000);
        } else if (count === 1) {
            timer = setTimeout(() => {
                setIsCountingDown(false);
                setCount(3); 
            }, 1000);
        }
        return () => clearTimeout(timer);
    }, [count, isCountingDown]);

    */
   /** 
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (!isCountingDown && !winner) {
            interval = setInterval(() => {
                    setGameTime(prev => prev + 0.01);
                    console.log('GameTime:', gameTime);
            },10);
        }
        return () => clearInterval(interval);
    }, [isCountingDown, winner]);
    */

    return {
        client,
        playerName,
        formula,
        result,
        error,
        otherPlayers,
        gameNumbers,
        usedButtonIndices,
        winner,
        winnerFormula,
        //gameTime,
        isCountingDown,
        isTimerRunning,
        //count,
        updateDisplay,
        updateGameState,
        handleTokenClick,
        handleNumberTokenClick,
        handleRemove,
        handleClear,
        handleNewGame,
        handleLogout
    }
}
