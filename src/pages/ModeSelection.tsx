import React, { useContext } from 'react';
import { GameClientContext } from '../contexts/GameClientContext';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useGameExit } from '../hooks/useGameExit';
import {
  AppPage,
  PagePanel,
  PrimaryButton,
  SecondaryButton
} from '../components/GameStyles';

const ModePage = styled(AppPage)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModeShell = styled.div`
  width: min(880px, 100%);
  display: flex;
  flex-direction: column;
  gap: 26px;
`;

const ModeHeader = styled.header`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const HeaderLabel = styled.p`
  margin: 0;
  color: var(--color-accent);
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const Greeting = styled.h1`
  margin: 0;
  color: var(--color-text-strong);
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 6vw, 4rem);
  line-height: 1;
  letter-spacing: -0.055em;
`;

const PlayerName = styled.span`
  color: var(--color-accent);
`;

const ModeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const ModeCard = styled(PagePanel)`
  min-height: 260px;
  padding: clamp(22px, 4vw, 30px);
  justify-content: space-between;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    border-color: var(--color-border-strong);
    box-shadow: 0 24px 50px rgba(18, 33, 56, 0.12);
  }

  @media (max-width: 720px) {
    min-height: 220px;
  }
`;

const ModeContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const ModeBadge = styled.div`
  width: 54px;
  height: 54px;
  border-radius: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--color-accent-soft);
  color: var(--color-accent-strong);
  font-weight: 800;
  letter-spacing: -0.04em;
`;

const ModeTitle = styled.h2`
  margin: 0;
  color: var(--color-text-strong);
  font-size: clamp(1.7rem, 4vw, 2.35rem);
  line-height: 1;
  letter-spacing: -0.04em;
`;

const ModeSubtitle = styled.p`
  margin: 0;
  color: var(--color-text-muted);
  line-height: 1.5;
`;

const CardAction = styled.div`
  display: flex;
`;

const StartButton = styled(PrimaryButton)`
  width: 100%;
`;

const RoomListButton = styled(SecondaryButton)`
  width: 100%;
`;

const ModeSelection: React.FC = () => {
  const navigate = useNavigate();
  const { client } = useContext(GameClientContext);
  const playerName = client?.getPlayerName() || 'Player';

  const handleSingleMode = async() => {
    console.log("ModeSelection Player: ", client?.getPlayerName());
    if (!client) {
      return;
    }
    const roomID = await client.createRoom('1');
    await client.joinGame(roomID);
    navigate('/game/single', {
       state: { 
        mode: 'single' } });
  };

  const handleMultiMode = () => {
    console.log("ModeSelection Player: ", client?.getPlayerName());
    navigate('/rooms', {
       state: { 
        mode: 'multi' } });
  };

  useGameExit(client);
  
  return (
    <ModePage>
      <ModeShell>
        <ModeHeader>
          <HeaderLabel>Choose mode</HeaderLabel>
          <Greeting>
            Ready to play, <PlayerName>{playerName}</PlayerName>?
          </Greeting>
        </ModeHeader>

        <ModeGrid>
          <ModeCard>
            <ModeContent>
              <ModeBadge>1P</ModeBadge>
              <ModeTitle>Single Player</ModeTitle>
              <ModeSubtitle>Play a quick solo round.</ModeSubtitle>
            </ModeContent>

            <CardAction>
              <StartButton onClick={handleSingleMode}>Start Game</StartButton>
            </CardAction>
          </ModeCard>

          <ModeCard>
            <ModeContent>
              <ModeBadge>VS</ModeBadge>
              <ModeTitle>Multiplayer</ModeTitle>
              <ModeSubtitle>Find or create a room.</ModeSubtitle>
            </ModeContent>

            <CardAction>
              <RoomListButton onClick={handleMultiMode}>Room List</RoomListButton>
            </CardAction>
          </ModeCard>
        </ModeGrid>
      </ModeShell>
    </ModePage>
  );
};

export default ModeSelection;
