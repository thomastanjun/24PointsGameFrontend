import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import GameClient from '../services/GameClient';
import { GameClientContext } from '../contexts/GameClientContext';
import { useOnlinePlayerCount } from '../hooks/useOnlinePlayerCount';

const LoginContainer = styled.main`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    padding: 20px;
    position: relative;
`;

const OnlinePlayersBox = styled.div`
    position: absolute;
    top: 20px;
    right: 20px;
    background: rgba(255, 255, 255, 0.9);
    padding: 10px 20px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const OnlineDot = styled.div`
    width: 8px;
    height: 8px;
    background: #4ade80;
    border-radius: 50%;
    animation: pulse 1.5s infinite;

    @keyframes pulse {
        0% { opacity: 1; }
        50% { opacity: 0.5; }
        100% { opacity: 1; }
    }
`;

const OnlineCount = styled.span`
    color: #1f2937;
    font-weight: 500;
`;

const GameTitle = styled.h1`
    font-size: 4rem;
    color: #fff;
    margin: 0 0 0.5rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const SubTitle = styled.p`
    font-size: 1.2rem;
    color: #e2e8f0;
    margin: 0 0 2rem;
`;

const Card = styled.section`
    background: rgba(255, 255, 255, 0.95);
    padding: 2rem;
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    width: 100%;
    max-width: 400px;
`;

const WelcomeText = styled.h2`
    text-align: center;
    color: #2d3748;
    margin: 0 0 1.5rem;
    font-size: 1.8rem;
`;

const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const Label = styled.label`
    color: #4a5568;
    font-size: 0.9rem;
`;

const Input = styled.input`
    width: 100%;
    box-sizing: border-box;
    padding: 0.75rem;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.2s;

    &:focus {
        outline: none;
        border-color: #4299e1;
    }
`;

const SubmitButton = styled.button`
    background: #4299e1;
    color: white;
    padding: 1rem;
    border: none;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: bold;
    cursor: pointer;
    transition: transform 0.2s, background-color 0.2s;

    &:hover {
        background: #3182ce;
        transform: translateY(-2px);
    }

    &:active {
        transform: translateY(0);
    }
`;

const GameRules = styled.div`
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid #e2e8f0;
`;

const RulesTitle = styled.h3`
    color: #2d3748;
    font-size: 1.2rem;
    margin: 0 0 1rem;
`;

const RulesList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const Rule = styled.p`
    color: #4a5568;
    font-size: 0.9rem;
    margin: 0;
`;

const MobileBreak = styled.br`
    display: none;

    @media (max-width: 480px) {
        display: block;
    }
`;

const LoginPage = () => {
    const { setGameClient } = useContext(GameClientContext);
    const navigate = useNavigate();
    const [playerName, setPlayerName] = useState('');
    const onlinePlayers = useOnlinePlayerCount();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!playerName.trim()) {
            alert("Player name cannot be empty");
            return 
        }
            
        const client = new GameClient(playerName);
        try{
            await client.addPlayer(playerName);
            setGameClient(client);
            console.log("LoginPage Player: ", client.getPlayerName());

            navigate('/mode-selection');
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            } else {
                console.error('Unexpected error:', error);
                alert("Unexpected error");
            }
        }
        
    };

    return (
        <LoginContainer>
            <OnlinePlayersBox>
                <OnlineDot />
                <OnlineCount>Online: {onlinePlayers}</OnlineCount>
            </OnlinePlayersBox>
            <GameTitle>24</GameTitle>
            <SubTitle>
                Combine Numbers <MobileBreak />to Hit 24
            </SubTitle>

            <Card>
                <WelcomeText>Welcome to the Game</WelcomeText>
                <LoginForm onSubmit={handleLogin}>
                    <InputGroup>
                        <Label htmlFor="player-name">Enter Your Name</Label>
                        <Input
                            id="player-name"
                            value={playerName}
                            onChange={(e) => setPlayerName(e.target.value)}
                            placeholder="Your player name"
                            required
                        />
                    </InputGroup>
                    <SubmitButton type="submit">
                        Start Playing!
                    </SubmitButton>
                </LoginForm>

                <GameRules>
                    <RulesTitle>How to Play:</RulesTitle>
                    <RulesList>
                        <Rule>&bull; Use all four numbers exactly once</Rule>
                        <Rule>&bull; Use basic operations (+, -, &times;, &divide;) and parentheses</Rule>
                        <Rule>&bull; Make the result equal to 24</Rule>
                        <Rule>&bull; Play solo or challenge other players</Rule>
                    </RulesList>
                </GameRules>
            </Card>
        </LoginContainer>
    );
};

export default LoginPage;
