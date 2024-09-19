import React from 'react';

function ThemeToggle({ toggleTheme, theme }) {
  return (
    <button onClick={toggleTheme}>
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
    </button>
  );
}

export default ThemeToggle;
