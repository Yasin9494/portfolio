import React, { useEffect, useState } from "react";
import styleEarn from "./Earn.module.css"; // CSS module
import Navbar from "../components/Navbar";
import telegramIcon from "../assets/icons/telegram.png";
import twitterIcon from "../assets/icons/twitter.png";
import coinCountIcon from "../assets/icons/dollar.png";

const Earn = () => {
  const [tasks, setTasks] = useState([]);
  const [coins, setCoins] = useState(0);
  const [loading, setLoading] = useState({});
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`https://api.suntap.fun/tasks/${userId}`);
        const data = await response.json();
        console.log("Server response:", data);

        if (!data || data.length === 0) {
          console.error("Empty response from server.");
          return;
        }

        setTasks(data);
        const claimedTasks = data.filter((task) => task.status === "claimed");
        const totalCoins = claimedTasks.reduce(
          (sum, task) => sum + task.reward,
          0
        );
        setCoins(totalCoins);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [userId]);

  const startTask = async (taskId, taskLink) => {
    try {
      setLoading((prevLoading) => ({ ...prevLoading, [taskId]: true }));
      
      // Открытие ссылки в новом окне
      window.open(taskLink, "_blank");

      await fetch(`https://api.suntap.fun/tasks/${userId}/start/${taskId}`, {
        method: "POST",
      });

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, status: "in_progress" } : task
        )
      );

      setLoading((prevLoading) => ({ ...prevLoading, [taskId]: false }));
    } catch (error) {
      console.error("Error starting task:", error);
      setLoading((prevLoading) => ({ ...prevLoading, [taskId]: false }));
    }
  };

  const checkTask = async (taskId, taskLink) => {
    try {
      setLoading((prevLoading) => ({ ...prevLoading, [taskId]: true }));
      console.log(`Checking task with link: ${taskLink}`);
      const response = await fetch(
        `https://api.suntap.fun/tasks/${userId}/check/${taskId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ link: taskLink }),
        }
      );

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      if (data.status === "completed") {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === taskId ? { ...task, status: "completed" } : task
          )
        );
      }

      setLoading((prevLoading) => ({ ...prevLoading, [taskId]: false }));
    } catch (error) {
      console.error("Error checking task:", error);
      setLoading((prevLoading) => ({ ...prevLoading, [taskId]: false }));
    }
  };

  const claimTask = async (taskId) => {
    try {
      setLoading((prevLoading) => ({ ...prevLoading, [taskId]: true }));
      const response = await fetch(
        `https://api.suntap.fun/tasks/${userId}/claim/${taskId}`,
        {
          method: "POST",
        }
      );
      const data = await response.json();

      if (data.success) {
        setCoins((prevCoins) => prevCoins + data.reward);
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === taskId ? { ...task, status: "claimed" } : task
          )
        );
      }

      setLoading((prevLoading) => ({ ...prevLoading, [taskId]: false }));
    } catch (error) {
      console.error("Error claiming task:", error);
      setLoading((prevLoading) => ({ ...prevLoading, [taskId]: false }));
    }
  };

  return (
    <div className={styleEarn.earn}>
      <div className={styleEarn.summ}>
        Total Coins: <span>{coins}</span>
      </div>
      <ul className={styleEarn.taskList}>
        {tasks.map((task) => (
          <li
            key={task.id}
            className={task.status === "claimed" ? styleEarn.completed : ""}
          >
            <img
              src={
                task.icon_url === "/src/assets/icons/twitter.png"
                  ? twitterIcon
                  : telegramIcon
              }
              alt="icon"
            />
            <div className="info">
              <div className={styleEarn.name}>{task.description}</div>
              <div className={styleEarn.desc}>
                <img src={coinCountIcon} alt="Coin icon" />+{task.reward}
              </div>
            </div>
            <button
              onClick={() => {
                if (task.status === "not_started") {
                  startTask(task.id, task.link);
                } else if (task.status === "in_progress") {
                  checkTask(task.id, task.link);
                } else if (task.status === "completed") {
                  claimTask(task.id);
                }
              }}
              disabled={loading[task.id] || task.status === "claimed"}
              className={styleEarn.task_btn}
            >
              {loading[task.id]
                ? "Loading..."
                : task.status === "claimed"
                ? "Claimed"
                : task.status === "completed"
                ? "Claim"
                : task.status === "in_progress"
                ? "Check"
                : "Start"}
            </button>
          </li>
        ))}
      </ul>
      <Navbar />
    </div>
  );
};

export default Earn;
