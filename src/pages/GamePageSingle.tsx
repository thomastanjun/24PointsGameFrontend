import React from 'react';
import { useGameLogic } from '../hooks/useGameLogic';
import { useGameExit } from '../hooks/useGameExit';
import { TimerComponent } from './TimerComponent';
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
  CurrentPlayerAreaSingle,
  FormulaDisplay,
  GameAreaSingle,
  GameBoard,
  GameSection,
  Header,
  HeaderRow,
  PanelDescription,
  PanelHeader,
  PanelTitle,
  PlayerName,
  ResultDisplay,
  RightControls,
  SectionLabel,
  StatusNotice,
  SupportingText,
  TimerWrapper,
  Title,
  WinnerDisplay,
  WinnerFormula,
  MetaPill,
} from '../components/GameStyles';

const operatorTokens = ['+', '-', '*', '/', '(', ')'];

const GamePageSingle: React.FC = () => {
  console.log('GamePageSingle re-rendered at', new Date().toISOString());
  const {
    client,
    playerName,
    formula,
    result,
    error,
    gameNumbers,
    winner,
    winnerFormula,
    isTimerRunning,
    usedButtonIndices,
    handleNumberTokenClick,
    handleTokenClick,
    handleRemove,
    handleClear,
    handleNewGame,
    handleLogout,
  } = useGameLogic();

  const errorMessage = error === 'default error' ? '' : error.trim();
  const visibleResult = (errorMessage ? result.replace(errorMessage, '') : result)
    .replace('+default', '')
    .replace('default error', '')
    .trim() || '0';

  useGameExit(client);

  return (
    <Container>
      <Header>
        <HeaderRow>
          <PanelHeader>
            <SectionLabel>Single-player</SectionLabel>
            <PanelDescription>
              Use all four number tiles once, combine them with operators, and
              keep refining your expression until the result reaches 24.
            </PanelDescription>
          </PanelHeader>
          <MetaPill>Solo board</MetaPill>
        </HeaderRow>

        <HeaderRow>
          <RightControls>
            <PlayerName>{playerName || 'Player'}</PlayerName>
            <TimerWrapper>
              <TimerComponent isRunning={isTimerRunning} />
            </TimerWrapper>
          </RightControls>
          <QuitButton onClick={handleLogout}>Quit game</QuitButton>
        </HeaderRow>
      </Header>

      {winner && (
        <WinnerDisplay>
          <SectionLabel>Round complete</SectionLabel>
          <h2>Puzzle solved</h2>
          <p>
            {winner === playerName
              ? 'You found a valid solution for 24.'
              : `${winner} solved the puzzle.`}
          </p>
          <WinnerFormula>{winnerFormula}</WinnerFormula>
        </WinnerDisplay>
      )}

      <GameAreaSingle>
        <CurrentPlayerAreaSingle>
          <GameBoard>
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
            </GameSection>
          </GameBoard>
        </CurrentPlayerAreaSingle>
      </GameAreaSingle>
    </Container>
  );
};

export default GamePageSingle;
