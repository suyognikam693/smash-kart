import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EventDetails from './pages/EventDetails';
import Registration from './pages/Registration';
import Payment from './pages/Payment';
import PlayersList from './pages/PlayersList';
import Highlights from './pages/Highlights';
import JoinRoom from './pages/JoinRoom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/event/:id" element={<EventDetails />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/players" element={<PlayersList />} />
      <Route path="/highlights" element={<Highlights />} />
      {/* Route for joining room (must be exact to access) */}
      <Route path="/join-room" element={<JoinRoom />} />
      {/* Catch-all to home */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;
