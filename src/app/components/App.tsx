import React from 'react';
import '../styles/ui.css';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { TailWindCSS } from './pages/TailWindCSS';
import { PromptText } from './pages/PromptText';

export function App() {
  return (
    <div>
      <div className="header">
        <h2>Figma Dev portal</h2>
      </div>
      <div className="content">
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<Dashboard />}></Route>
            <Route path="/tailwindcss" element={<TailWindCSS />}></Route>
            <Route path="/prompttext" element={<PromptText />}></Route>
          </Routes>
        </MemoryRouter>
      </div>
    </div>
  );
}
