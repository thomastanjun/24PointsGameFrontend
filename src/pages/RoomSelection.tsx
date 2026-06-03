import styled from 'styled-components';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameClientContext } from '../contexts/GameClientContext';
import { RoomInfo } from '../GameDefinitions';
import { useGameExit } from '../hooks/useGameExit';
import {
  AppPage,
  EmptyState,
  EmptyStateText,
  EmptyStateTitle,
  HeroTopRow,
  MetaPill,
  MetaRow,
  PageDescription,
  PageEyebrow,
  PageHeadingGroup,
  PageHero,
  PagePanel,
  PageShell,
  PageTitle,
  PanelDescription,
  PanelHeader,
  PanelTitle,
  PrimaryButton,
  SecondaryButton,
  SectionLabel
} from '../components/GameStyles';

const RoomsPanel = styled(PagePanel)`
  gap: 16px;
`;

const RoomsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  flex-wrap: wrap;
`;

const RoomsHeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const RoomList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const RoomCard = styled.article`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 18px;
  padding: 18px;
  border-radius: 18px;
  border: 1px solid var(--color-border);
  background: var(--color-surface-soft);

  @media (max-width: 720px) {
    flex-direction: column;
  }
`;

const RoomDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const RoomTitle = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  color: var(--color-text-strong);
`;

const RoomMetaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, max-content));
  gap: 14px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const RoomMetaItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const RoomMetaLabel = styled.span`
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-muted);
`;

const RoomMetaValue = styled.span`
  color: var(--color-text-strong);
  font-weight: 600;
`;

const RoomActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  min-width: 168px;

  @media (max-width: 720px) {
    width: 100%;
    align-items: stretch;
  }
`;

const RoomSelection: React.FC = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<RoomInfo[]>([]);
  const [hasLoadedRooms, setHasLoadedRooms] = useState(false);
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const [joiningRoomId, setJoiningRoomId] = useState<string | null>(null);
  const { client } = useContext(GameClientContext);

  useEffect(() => {
    if (!client) {
      return;
    }

    let isMounted = true;

    const loadRooms = async () => {
      try {
        const response = await client.fetchRooms();
        if (!isMounted) {
          return;
        }

        if (response.status === 'Empty') {
          setRooms([]);
          return;
        }

        console.log("RoomList: ", response.status);
        console.log("RoomListLength: ", response.roomList.length);
        setRooms(response.roomList);
      } catch (error) {
        console.error('Error loading rooms:', error);
        if (isMounted) {
          setRooms([]);
        }
      } finally {
        if (isMounted) {
          setHasLoadedRooms(true);
        }
      }
    };

    void loadRooms();
    const intervalId = window.setInterval(loadRooms, 1000);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
    };
  }, [client]);

  const handleRoomClick = async (roomID: string) => {
    if (!client || joiningRoomId) return;

    setJoiningRoomId(roomID);
    try {
      await client.joinGame(roomID);
      navigate(`/game/multi/${roomID}`);
    } catch (error) {
      console.error('Error joining room:', error);
      setJoiningRoomId(null);
    }
  };

  const createRoom = async (maxPlayer: string) => {
    if (!client || isCreatingRoom) return;

    setIsCreatingRoom(true);
    try {
      const roomID = await client.createRoom(maxPlayer);
      await client.joinGame(roomID);
      navigate(`/game/multi/${roomID}`, {
        state: { 
         mode: 'multi' } });

    } catch (error) {
      console.error('Error creating room:', error);
      setIsCreatingRoom(false);
    }
  };

  const renderRooms = () => {
    if (!hasLoadedRooms) {
      return (
        <EmptyState>
          <EmptyStateTitle>Checking for open rooms</EmptyStateTitle>
          <EmptyStateText>
            The room list refreshes automatically, so available rooms will show
            up here as soon as they are found.
          </EmptyStateText>
        </EmptyState>
      );
    }

    if (rooms.length === 0) {
      return (
        <EmptyState>
          <EmptyStateTitle>No open rooms yet</EmptyStateTitle>
          <EmptyStateText>
            Create a room to become the first player in it, or stay here and
            wait for another open room to appear.
          </EmptyStateText>
        </EmptyState>
      );
    }

    return (
      <RoomList>
        {rooms.map((room) => (
          <RoomCard key={room.roomID}>
            <RoomDetails>
              <RoomTitle>Room {room.roomID}</RoomTitle>
              <RoomMetaGrid>
                <RoomMetaItem>
                  <RoomMetaLabel>Host</RoomMetaLabel>
                  <RoomMetaValue>{room.hostPlayer}</RoomMetaValue>
                </RoomMetaItem>
                <RoomMetaItem>
                  <RoomMetaLabel>Open seats</RoomMetaLabel>
                  <RoomMetaValue>{room.vacancySeats}</RoomMetaValue>
                </RoomMetaItem>
              </RoomMetaGrid>
            </RoomDetails>

            <RoomActions>
              <SecondaryButton
                onClick={() => handleRoomClick(room.roomID)}
                disabled={isCreatingRoom || joiningRoomId !== null}
              >
                {joiningRoomId === room.roomID ? 'Joining...' : 'Join room'}
              </SecondaryButton>
            </RoomActions>
          </RoomCard>
        ))}
      </RoomList>
    );
  };

  useGameExit(client);

  return (
    <AppPage>
      <PageShell>
        <PageHero>
          <HeroTopRow>
            <PageEyebrow>Multiplayer rooms</PageEyebrow>
            <MetaPill>Refreshes automatically</MetaPill>
          </HeroTopRow>
          <PageHeadingGroup>
            <PageTitle>Create a room or join one that is already open.</PageTitle>
            <PageDescription>
              Hosting makes you the first player in a new room. Joining lets
              you jump into a room that already has open seats.
            </PageDescription>
          </PageHeadingGroup>
          <MetaRow>
            <MetaPill>Create a room for up to 8 players</MetaPill>
            <MetaPill>Join open rooms below</MetaPill>
          </MetaRow>
        </PageHero>

        <RoomsPanel>
          <RoomsHeader>
            <PanelHeader>
              <SectionLabel>Game rooms</SectionLabel>
              <PanelTitle>Create a room or join one below</PanelTitle>
              <PanelDescription>
                Create a room when you want to host right away, or join any
                open room from the list below.
              </PanelDescription>
            </PanelHeader>

            <RoomsHeaderActions>
              <MetaPill>
                {hasLoadedRooms
                  ? `${rooms.length} ${rooms.length === 1 ? 'room' : 'rooms'}`
                  : 'Loading list'}
              </MetaPill>
              <PrimaryButton
                onClick={() => createRoom('8')}
                disabled={isCreatingRoom || joiningRoomId !== null}
              >
                {isCreatingRoom ? 'Creating room...' : 'Create new room'}
              </PrimaryButton>
            </RoomsHeaderActions>
          </RoomsHeader>

          {renderRooms()}
        </RoomsPanel>
      </PageShell>
    </AppPage>
  );
};

export default RoomSelection;
