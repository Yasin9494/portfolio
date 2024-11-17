import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { Toaster } from 'sonner';

const addGoogleAnalytics = () => {
  const scriptGA = document.createElement('script');
  scriptGA.async = true;
  scriptGA.src = 'https://www.googletagmanager.com/gtag/js?id=G-F9S7TV6FQX';
  document.head.appendChild(scriptGA);

  const inlineScript = document.createElement('script');
  inlineScript.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-F9S7TV6FQX');
  `;
  document.head.appendChild(inlineScript);
};

const initializeTelegram = () => {
  if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.expand();
    console.log("Telegram WebApp detected.");
  } 
  // Убрали только показ сообщения, но логика работы WebApp API осталась
};

const loadTelegramAPI = () => {
  const script = document.createElement("script");
  script.src = "https://telegram.org/js/telegram-web-app.js";
  script.async = true;
  script.onload = initializeTelegram;
  script.onerror = () => {
    console.error("Failed to load Telegram WebApp script.");
  };
  document.head.appendChild(script);
};

const RootComponent = () => {
  useEffect(() => {
    addGoogleAnalytics(); // Возвращаем Google Analytics
    loadTelegramAPI();
  }, []);

  return (
    <StrictMode>
      <App />
      <Toaster position="top-center" richColors />
    </StrictMode>
  );
};

createRoot(document.getElementById('root')).render(<RootComponent />);

