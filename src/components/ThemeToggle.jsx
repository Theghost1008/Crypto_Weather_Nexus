import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full focus:outline-none transition-colors duration-200"
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkMode ? (
        <span className="text-yellow-300 text-xl">☀️</span>
      ) : (
        <span className="text-gray-700 text-xl">🌙</span>
      )}
    </button>
  );
}