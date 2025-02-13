import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import '../styles/ThemeSwitcher.css';

export function ThemeSwitcher() {
  const { themeMode, themeColors, toggleTheme, applyCustomColors } = useTheme();
  const [localCustomColors, setLocalCustomColors] = useState(themeColors);

  useEffect(() => {
    setLocalCustomColors(themeColors);
  }, [themeColors]);

  const handleColorChange = (colorKey, value) => {
    setLocalCustomColors(prev => ({ ...prev, [colorKey]: value }));
  };

  const handleApplyCustomColors = () => {
    applyCustomColors(localCustomColors);
  };

  return (
    <div className="theme-switcher">
      <button className="theme-toggle-btn" onClick={toggleTheme}>
        Switch to {themeMode === 'light' ? 'Dark' : 'Light'} Theme
      </button>

      <div className="custom-colors">
        <h3>Customize Current Theme</h3>
        {Object.entries(themeColors).map(([key, value]) => (
          <div key={key} className="color-input-group">
            <label htmlFor={key}>{key}:</label>
            <input
              type="color"
              id={key}
              value={localCustomColors[key] || value}
              onChange={(e) => handleColorChange(key, e.target.value)}
            />
          </div>
        ))}
        <button className="apply-colors-btn" onClick={handleApplyCustomColors}>
          Apply Custom Colors
        </button>
      </div>
    </div>
  );
}