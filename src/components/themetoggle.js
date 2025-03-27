import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Sun, Moon } from 'lucide-react'; // Import Sun and Moon SVGs

const ThemeToggleButton = styled.button`
  margin-left: 20px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  color: var(--lightest-slate);
  display: flex;
  align-items: center;
  justify-content: center;

  &:focus {
    outline: none;
  }
`;

const ThemeToggle = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <ThemeToggleButton
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Sun size={20} className="h-[1.2rem] w-[1.2rem] transition-all" />
      ) : (
        <Moon size={20} className="h-[1.2rem] w-[1.2rem] transition-all" />
      )}
    </ThemeToggleButton>
  );
};

export default ThemeToggle;