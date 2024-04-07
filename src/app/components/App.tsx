import React from 'react';
import '../styles/ui.css';
import { Event } from '../../plugin/enum/event.enum';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { TailWindCSS } from './pages/TailWindCSS';

export function App() {
  const onCancel = () => {
    parent.postMessage({ pluginMessage: { type: Event.ClosePlugin } }, '*');
  };

  return (
    <div>
      <div className="header">
        <button onClick={onCancel}>Close</button>
      </div>
      <div className="content">
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<Dashboard />}></Route>
            <Route path="/tailwindcss" element={<TailWindCSS />}></Route>
          </Routes>
        </MemoryRouter>
      </div>
    </div>
  );
}
