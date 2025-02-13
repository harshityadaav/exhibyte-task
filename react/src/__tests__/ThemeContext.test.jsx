import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, useTheme } from '../context/ThemeContext';

function TestComponent() {
  const { themeMode, themeColors, toggleTheme, applyCustomColors } = useTheme();
  return (
    <div>
      <span data-testid="theme-mode">{themeMode}</span>
      <span data-testid="background-color">{themeColors.background}</span>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <button onClick={() => applyCustomColors({ background: '#123456' })}>
        Apply Custom Colors
      </button>
    </div>
  );
}

describe('ThemeProvider', () => {
  it('provides the default light theme', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-mode')).toHaveTextContent('light');
    expect(screen.getByTestId('background-color')).toHaveTextContent('#ffffff');
  });

  it('toggles the theme mode', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText('Toggle Theme'));
    expect(screen.getByTestId('theme-mode')).toHaveTextContent('dark');
    expect(screen.getByTestId('background-color')).toHaveTextContent('#1a1a1a');
  });

  it('applies custom colors', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText('Apply Custom Colors'));
    expect(screen.getByTestId('background-color')).toHaveTextContent('#123456');
  });
});