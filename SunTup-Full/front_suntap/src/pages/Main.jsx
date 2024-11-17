import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import styleMain from "./Main.module.css";
import coinIcon from "../assets/img/coin_icon.png";
import usdCoin from "../assets/img/dollar.png";
import coin from "../assets/img/coin.png";
import logo from "../assets/img/logo.png"; // Логотип
import { Toaster, toast } from "sonner";
import Loader from "./Loader.jsx"; 

export default function Main({ userId }) {
  const [balance, setBalance] = useState(null);
  const [limitClicks, setLimitClicks] = useState(null);
  const [progress, setProgress] = useState(0);
  const [clicks, setClicks] = useState([]);
  const [addCoin] = useState(1);
  const maxProgress = 5000;
  const updateTimeout = useRef(null);
  const initialBalanceRef = useRef(0);
  const [telegramId, setTelegramId] = useState(""); // Хранение Telegram ID
  const [userAvatar, setUserAvatar] = useState(""); // Хранение аватара пользователя

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://api.suntap.fun/getInfo/${userId}`);
        const data = await response.json();
        setBalance(data.wallet);
        setLimitClicks(data.limit_clicks);
        setProgress((data.limit_clicks / maxProgress) * 100);
        
        initialBalanceRef.current = data.wallet;

        localStorage.setItem("balance", data.wallet);
        localStorage.setItem("limitClicks", data.limit_clicks);

        // Получаем Telegram ID и аватар пользователя
        setTelegramId(userId); // Telegram ID передается в компонент как `userId`
        setUserAvatar(data.avatar || ""); // Если аватар доступен, устанавливаем его

      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to fetch user data from server.");
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  useEffect(() => {
    if (balance !== null && limitClicks !== null) {
      if (updateTimeout.current) clearTimeout(updateTimeout.current);
      updateTimeout.current = setTimeout(() => {
        updateUserData();
      }, 1000);
    }
  }, [balance, limitClicks]);

  const updateUserData = async () => {
    try {
      const deltaBalance = balance - initialBalanceRef.current;
      console.log(`Sending deltaBalance=${deltaBalance}, limitClicks=${limitClicks}`);

      await fetch(
        `https://api.suntap.fun/updateInfo/${userId}/${deltaBalance}/${limitClicks}`
      );

      initialBalanceRef.current = balance;

    } catch (error) {
      console.error("Error updating user data:", error);
      toast.error("Failed to update user data on server.");
    }
  };

  const handleClick = (e) => {
    if (limitClicks <= 0) {
      toast.error("Daily limit reached!");
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    setBalance((prev) => prev + addCoin);
    setLimitClicks((prev) => prev - addCoin);

    const clickId = Date.now();
    setClicks((prevClicks) => [
      ...prevClicks,
      { id: clickId, x, y },
    ]);

    const rotationX = (y - rect.height / 3) / 8;
    const rotationY = (x - rect.width / 3) / 8;
    e.target.style.transform = `perspective(1000px) rotateX(${
      -y / 10
    }deg) rotateY(${x / 10}deg)`;

    setTimeout(() => {
      e.target.style.transform = "";
    }, 100);

    setTimeout(() => {
      setClicks((prevClicks) => prevClicks.filter((click) => click.id !== clickId));
    }, 1000);
  };

  if (balance === null || limitClicks === null) {
    return <Loader />;
  }

  return (
    <>
      <Toaster position="top-center" richColors />
      <div className={styleMain.main}>
        <div className={styleMain.main_content}>
          <div className={styleMain.header}>
            <div className={styleMain.logo}>
              <img src={logo} alt="SunTup Logo" />
            </div>
            <div className={styleMain.user_info}>
              
              <span className={styleMain.telegramId}>ID: {telegramId}</span>
            </div>
          </div>
          <div className={styleMain.coin_count}>
            <img src={coinIcon} alt="Coin Icon" />
            <span>
              <img src={usdCoin} alt="USD Coin" />
              {balance}
            </span>
          </div>
          <div className={styleMain.coin} onClick={handleClick}>
            <img className={styleMain.coin_image} src={coin} alt="Coin" />
            {clicks.map((click) => (
              <div
                key={click.id}
                className={styleMain.clickAnimation}
                style={{
                  top: `${click.y + 120}px`,
                  left: `${click.x + 120}px`,
                }}
              >
                +{addCoin}
              </div>
            ))}
          </div>
          <div className={styleMain.data}>
            <div className={styleMain.progress}>
              <div
                className={styleMain.line}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className={styleMain.limits}>
              <div className={styleMain.item}>{limitClicks}</div>
              <div className={styleMain.item}>{maxProgress}</div>
            </div>
          </div>
        </div>
        <Navbar />
      </div>
    </>
  );
}
