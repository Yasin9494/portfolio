import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loader from "./pages/Loader.jsx";
import Main from "./pages/Main.jsx";
import Soon from "./pages/Soon.jsx";
import Friends from "./pages/Friends.jsx";
import Earn from "./pages/Earn.jsx";
import { Toaster, toast } from "sonner";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [initialBalance, setInitialBalance] = useState(Number(localStorage.getItem('balance')) || 0);
  const [initialLimitClicks, setInitialLimitClicks] = useState(Number(localStorage.getItem('limitClicks')) || 5000);

  useEffect(() => {
    // Инициализация Google Analytics
    const scriptGA = document.createElement("script");
    scriptGA.async = true;
    scriptGA.src = "https://www.googletagmanager.com/gtag/js?id=G-F9S7TV6FQX";
    document.head.appendChild(scriptGA);

    const inlineScript = document.createElement("script");
    inlineScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-F9S7TV6FQX');
    `;
    document.head.appendChild(inlineScript);

    return () => {
      document.head.removeChild(scriptGA);
      document.head.removeChild(inlineScript);
    };
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-web-app.js";
    script.async = true;
    script.onload = () => {
      const { user } = window.Telegram.WebApp.initDataUnsafe;
      if (user && user.id) {
        setUserId(user.id);
        localStorage.setItem('userId', user.id);
        fetchInitialData(user.id);
      } else {
        toast.error("Failed to retrieve user information from Telegram.");
        setLoading(false);
      }
    };
    script.onerror = () => {
      toast.error("Failed to load Telegram WebApp script.");
      setLoading(false);
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [userId]);

  const fetchInitialData = async (userId) => {
    try {
      const response = await fetch(`https://api.suntap.fun/getInfo/${userId}`);
      const data = await response.json();
      setInitialBalance(data.wallet);
      setInitialLimitClicks(data.limit_clicks);
      localStorage.setItem('balance', data.wallet);
      localStorage.setItem('limitClicks', data.limit_clicks);
    } catch (error) {
      console.error("Error fetching initial data:", error);
      toast.error("Error fetching initial data from the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <BrowserRouter>
      <div className="container">
        <Toaster position="top-center" richColors />
        {loading ? (
          <Loader />
        ) : (
          <Routes>
            <Route
              path="/"
              element={<Main userId={userId} initialBalance={initialBalance} initialLimitClicks={initialLimitClicks} />}
            />
            <Route path="/friends" element={<Friends />} />
            <Route path="/earn" element={<Earn />} />
            <Route path="/airdrop" element={<Soon />} />
            <Route path="*" element={<Main userId={userId} initialBalance={initialBalance} initialLimitClicks={initialLimitClicks} />} />
          </Routes>
        )}
      </div>
    </BrowserRouter>
  );
}
