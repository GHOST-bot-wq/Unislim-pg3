import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Quiz from './pages/Quiz';
import Resultado from './pages/Resultado';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/resultado" element={<Resultado />} />
      </Routes>
    </BrowserRouter>
  );
}
