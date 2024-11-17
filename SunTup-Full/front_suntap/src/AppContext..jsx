import React, { createContext, useContext, useState } from "react";

// Создаем контекст
const AppContext = createContext();

// Хук для использования контекста в компонентах
export const useAppContext = () => useContext(AppContext);

// Провайдер контекста, который оборачивает компоненты и предоставляет им состояние
export const AppProvider = ({ children }) => {
  const [balance, setBalance] = useState(Number(localStorage.getItem('balance')) || 0);
  const [limitClicks, setLimitClicks] = useState(Number(localStorage.getItem('limitClicks')) || 5000);

  return (
    <AppContext.Provider value={{ balance, setBalance, limitClicks, setLimitClicks }}>
      {children}
    </AppContext.Provider>
  );
};
