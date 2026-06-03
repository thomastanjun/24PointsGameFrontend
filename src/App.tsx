import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';  
import ModeSelection from './pages/ModeSelection';
import RoomSelection from './pages/RoomSelection';
import GamePageSingle from './pages/GamePageSingle'; 
import GamePageMulti from './pages/GamePageMulti'; 
import { GameClientProvider } from './contexts/GameClientContext';
import ProtectedRoutes from './components/ProtectedRoutes';

function App() {
  return (
    <HashRouter >
     <GameClientProvider>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/mode-selection" element={<ModeSelection />} />
          <Route path="/rooms" element={<RoomSelection />} />
          <Route path="/game/single" element={<GamePageSingle />} />
          <Route path="/game/multi/:roomId" element={<GamePageMulti />} />
        </Route>
      </Routes>
      </GameClientProvider>
    </HashRouter>
  );
}

export default App;
