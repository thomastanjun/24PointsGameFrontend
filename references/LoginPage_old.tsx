import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import GameClient from '../services/GameClient';
import { GameClientContext } from '../contexts/GameClientContext';
import {
    LoginContainer,
    Rule,
    Card,
    GameTitle,
    LoginForm,
    WelcomeText,
    Label,
    GameRules,
    SubmitButton,
    RulesList,
    InputGroup,
    RulesTitle,
    Input,
    SubTitle,
    OnlinePlayersBox,
    OnlineDot,
    OnlineCount
} from '../components/GameStyles';
import { useOnlinePlayerCount} from '../hooks/useOnlinePlayerCount';


const LoginPage = () => {
    const { setGameClient } = useContext(GameClientContext);
    const navigate = useNavigate();
    const [playerName, setPlayerName] = useState('');
    const  onlinePlayers  = useOnlinePlayerCount();



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
            <SubTitle>Combine Numbers to Hit 24</SubTitle>
            
            <Card>
                <WelcomeText>Welcome to the Game</WelcomeText>
                <LoginForm onSubmit={handleLogin}>
                    <InputGroup>
                        <Label>Enter Your Name</Label>
                        <Input
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
                        <Rule>• Use all four numbers exactly once</Rule>
                        <Rule>• Use basic operations (+, -, ×, ÷) and parentheses</Rule>
                        <Rule>• Make the result equal to 24</Rule>
                        <Rule>• Play solo or challenge other players</Rule>
                    </RulesList>
                </GameRules>
            </Card>
        </LoginContainer>
    );
};

export default LoginPage;