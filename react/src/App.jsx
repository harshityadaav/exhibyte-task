import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import './styles/theme.css';

export function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <h1>Theme Switcher</h1>
        <ThemeSwitcher />
      </div>
    </ThemeProvider>
  );
}