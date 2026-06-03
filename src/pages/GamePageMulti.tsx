import React, { useEffect, useState } from 'react';
import { useGameExit } from '../hooks/useGameExit';
import { useGameLogic } from '../hooks/useGameLogic';
import {
  ButtonGroup,
  ControlButton,
  NumberButton,
  NumbersGrid,
  OperatorButton,
  OperatorGrid,
  PrimaryControlButton,
  QuitButton,
} from '../components/GameButtons';
import {
  Container,
  CountdownOverlay,
  CurrentPlayerAreaMulti,
  EmptyPlayerState,
  FormulaDisplay,
  GameAreaMulti,
  GameBoard,
  GameSection,
  GameTimer,
  Header,
  HeaderRow,
  MetaPill,
  OtherPlayersArea,
  OtherPlayersHeader,
  PanelDescription,
  PanelHeader,
  PanelTitle,
  PlayerFormulaPreview,
  PlayerHeader,
  PlayerName,
  PlayerCard,
  PlayerResultBadge,
  ResultDisplay,
  RightControls,
  SectionLabel,
  StatusNotice,
  SupportingText,
  Title,
  WinnerDisplay,
  WinnerFormula,
} from '../components/GameStyles';

const operatorTokens = ['+', '-', '*', '/', '(', ')'];

const GamePageMulti: React.FC = () => {
  const {
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
    updateDisplay,
    updateGameState,
    handleTokenClick,
    handleNumberTokenClick,
    handleRemove,
    handleClear,
    handleNewGame,
    handleLogout,
  } = useGameLogic();

  const [isCountingDown] = useState(false);
  const [count] = useState(3);
  const [gameTime] = useState<number>(0);

  useEffect(() => {
    if (client) {
      client.setGameUpdateCallback(updateGameState);

      client.fetchGamePage().then(() => {
        updateDisplay(client);
      });
    }

    return () => {
      if (client) {
        client.setGameUpdateCallback(null);
      }
    };
    // The room subscription lifecycle should track the active client instance.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client]);

  useGameExit(client);

  const errorMessage = error === 'default error' ? '' : error.trim();
  const visibleResult = (errorMessage ? result.replace(errorMessage, '') : result)
    .replace('+default', '')
    .replace('default error', '')
    .trim() || '0';
  const otherPlayerEntries = Object.entries(otherPlayers);
  const roomPlayerCount = otherPlayerEntries.length + 1;

  return (
    <Container>
      <Header>
        <HeaderRow>
          <PanelHeader>
            <SectionLabel>Multiplayer</SectionLabel>
            <PanelDescription>
              Keep your board focused, track the room activity beside it, and
              solve the puzzle before anyone else does.
            </PanelDescription>
          </PanelHeader>
          <MetaPill>{roomPlayerCount} players in room</MetaPill>
        </HeaderRow>

        <HeaderRow>
          <RightControls>
            <PlayerName>{playerName || 'Player'}</PlayerName>
            <GameTimer>Match clock {gameTime}</GameTimer>
          </RightControls>
          <QuitButton onClick={handleLogout}>Leave room</QuitButton>
        </HeaderRow>
      </Header>

      {winner && (
        <WinnerDisplay>
          <SectionLabel>Round complete</SectionLabel>
          <h2>Puzzle solved</h2>
          <p>
            {winner === playerName
              ? 'You found the winning solution for this round.'
              : `${winner} solved the puzzle first.`}
          </p>
          <WinnerFormula>{winnerFormula}</WinnerFormula>
        </WinnerDisplay>
      )}

      <GameAreaMulti>
        <CurrentPlayerAreaMulti>
          <GameBoard>
            {isCountingDown ? (
              <CountdownOverlay>{count}</CountdownOverlay>
            ) : (
              <>
                <GameSection>
                  <SectionLabel>Number tiles</SectionLabel>
                  <NumbersGrid>
                    {gameNumbers.map((num, index) => (
                      <NumberButton
                        key={index}
                        onClick={() => handleNumberTokenClick(num, index)}
                        disabled={usedButtonIndices.includes(index)}
                      >
                        {num}
                      </NumberButton>
                    ))}
                  </NumbersGrid>
                </GameSection>

                <GameSection>
                  <SectionLabel>Formula</SectionLabel>
                  <FormulaDisplay>{formula || 'Start building your formula'}</FormulaDisplay>
                  <ResultDisplay>Current result: {visibleResult}</ResultDisplay>
                  {errorMessage && (
                    <StatusNotice tone="warning">{errorMessage}</StatusNotice>
                  )}
                </GameSection>

                <GameSection>
                  <SectionLabel>Operators</SectionLabel>
                  <OperatorGrid>
                    {operatorTokens.map((operator) => (
                      <OperatorButton
                        key={operator}
                        onClick={() => handleTokenClick(operator)}
                      >
                        {operator}
                      </OperatorButton>
                    ))}
                  </OperatorGrid>
                </GameSection>

                <GameSection>
                  <SectionLabel>Actions</SectionLabel>
                  <ButtonGroup>
                    <ControlButton onClick={handleClear}>Clear</ControlButton>
                    <ControlButton onClick={handleRemove}>Undo</ControlButton>
                    <PrimaryControlButton onClick={handleNewGame}>
                      New Game
                    </PrimaryControlButton>
                  </ButtonGroup>
                  <SupportingText>
                    New Game refreshes the round for the room while Clear and
                    Undo only affect your current formula.
                  </SupportingText>
                </GameSection>
              </>
            )}
          </GameBoard>
        </CurrentPlayerAreaMulti>

        <OtherPlayersArea>
          <PanelHeader>
            <SectionLabel>Room activity</SectionLabel>
            <OtherPlayersHeader>Other players</OtherPlayersHeader>
            <PanelDescription>
              Watch live formulas and partial results as other players work
              through the same puzzle.
            </PanelDescription>
          </PanelHeader>

          {otherPlayerEntries.length > 0 ? (
            otherPlayerEntries.map(([name, cell]) => (
              <PlayerCard key={name}>
                <PlayerHeader>
                  <span>{name}</span>
                  <PlayerResultBadge>{cell.value || '0'}</PlayerResultBadge>
                </PlayerHeader>
                <PlayerFormulaPreview>
                  {cell.formula || 'No formula yet'}
                </PlayerFormulaPreview>
              </PlayerCard>
            ))
          ) : (
            <EmptyPlayerState>
              No other players are active in this room yet. Their formulas will
              appear here as soon as they join and start building.
            </EmptyPlayerState>
          )}
        </OtherPlayersArea>
      </GameAreaMulti>
    </Container>
  );
};

export default GamePageMulti;
