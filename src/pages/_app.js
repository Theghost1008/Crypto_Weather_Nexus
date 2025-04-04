import store from "@/store/store";
import "@/styles/globals.css";
import { Provider } from "react-redux";
import { ThemeProvider } from "@/context/ThemeContext.jsx";
import { useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';

function ThemeWrapper({ children }) {
  const { darkMode } = useTheme();
  
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return children;
}

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <ThemeWrapper>
          <Component {...pageProps} />
        </ThemeWrapper>
      </Provider>
    </ThemeProvider>
  );
}