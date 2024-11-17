import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styleLoader from "./Loader.module.css";

export default function Loader() {
    const navigate = useNavigate();

    useEffect(() => {
        if (window.Telegram && window.Telegram.WebApp) {
            window.Telegram.WebApp.expand(); // Разворачивание на полный экран
        }

        const timer = setTimeout(() => {
            navigate(`/`);
        }, 1000);

        return () => clearTimeout(timer); // Очистка таймера при размонтировании компонента
    }, [navigate]);

    return <div className={styleLoader.loader}>loading...</div>;
}
