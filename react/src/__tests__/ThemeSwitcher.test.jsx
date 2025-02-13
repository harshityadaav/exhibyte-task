import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '../context/ThemeContext';
import { ThemeSwitcher } from '../components/ThemeSwitcher';

describe('ThemeSwitcher', () => {
  it('renders the theme switcher button', () => {
    render(
      <ThemeProvider>
        <ThemeSwitcher />
      </ThemeProvider>
    );

    expect(screen.getByText(/Switch to Dark Theme/i)).toBeInTheDocument();
  });

  it('toggles the theme when the button is clicked', () => {
    render(
      <ThemeProvider>
        <ThemeSwitcher />
      </ThemeProvider>
    );

    const toggleButton = screen.getByText(/Switch to Dark Theme/i);
    fireEvent.click(toggleButton);
    expect(screen.getByText(/Switch to Light Theme/i)).toBeInTheDocument();
  });

  it('updates custom colors when applied', () => {
    render(
      <ThemeProvider>
        <ThemeSwitcher />
      </ThemeProvider>
    );

    const colorInput = screen.getByLabelText(/background/i);
    fireEvent.change(colorInput, { target: { value: '#123456' } });

    const applyButton = screen.getByText(/Apply Custom Colors/i);
    fireEvent.click(applyButton);

    expect(colorInput.value).toBe('#123456');
  });
});