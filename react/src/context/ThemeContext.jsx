import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

const defaultTheme = {
  light: {
    background: '#ffffff',
    text: '#000000',
    primary: '#007bff',
    secondary: '#6c757d'
  },
  dark: {
    background: '#1a1a1a',
    text: '#ffffff',
    primary: '#0056b3',
    secondary: '#545b62'
  }
};

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export function ThemeProvider({ children }) {
  const [themeMode, setThemeMode] = useState(() => 
    localStorage.getItem('themeMode') || 'light'
  );

  const [themeColors, setThemeColors] = useState(() => {
    const savedColors = localStorage.getItem('themeColors');
    return savedColors ? JSON.parse(savedColors) : defaultTheme[themeMode];
  });

  useEffect(() => {
    localStorage.setItem('themeMode', themeMode);
  }, [themeMode]);

  useEffect(() => {
    Object.entries(themeColors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}`, value);
    });
    localStorage.setItem('themeColors', JSON.stringify(themeColors));
  }, [themeColors]);

  const toggleTheme = () => {
    const newMode = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(newMode);
    setThemeColors(defaultTheme[newMode]);
  };

  const applyCustomColors = (newColors) => {
    const updatedColors = { ...themeColors, ...newColors };
    setThemeColors(updatedColors);
    localStorage.setItem('themeColors', JSON.stringify(updatedColors));
  };

  return (
    <ThemeContext.Provider value={{
      themeMode,
      themeColors,
      toggleTheme,
      applyCustomColors
    }}>
      {children}
    </ThemeContext.Provider>
  );
}