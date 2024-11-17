import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import styleFriends from "./Friends.module.css";
import profileImage from "../assets/img/user.png";
import copyIcon from "../assets/icons/copy.png";
import addUser from "../assets/icons/add.png";
import giftIcon from "../assets/icons/gift.png";
import usdCoin from "../assets/img/dollar.png";
import percentageIcon from "../assets/icons/percentage.png";
import Navbar from "../components/Navbar";
import { Toaster, toast } from "sonner";

export default function Friends() {
  const [userName, setUserName] = useState("");
  const [linkToCopy, setLinkToCopy] = useState("");
  const [friends, setFriends] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoadingFriends, setIsLoadingFriends] = useState(true);
  const [isLoadingLeaderboard, setIsLoadingLeaderboard] = useState(true);
  const [myUserId, setMyUserId] = useState(null);

  useEffect(() => {
    const { user } = window.Telegram.WebApp.initDataUnsafe;
    if (user && user.id) {
      setMyUserId(user.id.toString());
      setUserName(user.username || user.id);
      setLinkToCopy(`https://t.me/SunPumpTap_bot?start=${user.id}`);
      getReferals(user.id);
      getLeaderboard(user.id);

      console.log("My User ID:", user.id);
    } else {
      toast.error("Error on Telegram side! Try later");
      setUserName("Unknown");
      setLinkToCopy("undefined");
    }
  }, []);

  const getReferals = async (userId) => {
    try {
      const response = await fetch(`https://api.suntap.fun/getReferals/${userId}`);
      const data = await response.json();
      setFriends(data);
    } catch (error) {
      toast.error("Error on server side! Try later");
    } finally {
      setIsLoadingFriends(false);
    }
  };

  const getLeaderboard = async (userId) => {
    try {
      const response = await fetch(`https://api.suntap.fun/getLeaderboardWithUser/${userId}`);
      const data = await response.json();
      console.log("Leaderboard data:", data);
      if (data.leaderboard && Array.isArray(data.leaderboard)) {
        // Загружаем аватары
        const leaderboardWithAvatars = await Promise.all(
          data.leaderboard.map(async (user) => {
            if (user.telegram_avatar_url) {
              const avatarUrl = await fetchTelegramAvatar(user.telegram_avatar_url);
              return { ...user, avatar_url: avatarUrl };
            }
            return { ...user, avatar_url: null };
          })
        );
        setLeaderboard(leaderboardWithAvatars);
      } else {
        setLeaderboard([]);
      }
    } catch (error) {
      toast.error("Error on server side! Try later");
    } finally {
      setIsLoadingLeaderboard(false);
    }
  };

  const fetchTelegramAvatar = async (fileId) => {
    try {
      const response = await fetch(`https://api.telegram.org/bot6950963049:AAF0eEr885r0QbhnGxftPw0JyOKWW33Gm9Y/getFile?file_id=${fileId}`);
      const data = await response.json();
      if (data.ok) {
        return `https://api.telegram.org/file/bot6950963049:AAF0eEr885r0QbhnGxftPw0JyOKWW33Gm9Y/${data.result.file_path}`;
      } else {
        return profileImage; // Возвращаем изображение по умолчанию, если не удалось получить аватар
      }
    } catch (error) {
      return profileImage;
    }
  };

  const handleCopyLink = () => {
    if (linkToCopy) {
      navigator.clipboard.writeText(linkToCopy);
      toast.success("Link copied to clipboard!");
    }
  };

  const handleShareLink = () => {
    if (window.Telegram && window.Telegram.WebApp) {
      const shareText = `Join Sun Tap and start earning with me! Click the link: ${linkToCopy}`;
      window.Telegram.WebApp.openTelegramLink(
        `https://t.me/share/url?url=${encodeURIComponent(linkToCopy)}&text=${encodeURIComponent(shareText)}`
      );
    } else {
      toast.error("Unable to share via Telegram. Please copy the link manually.");
    }
  };

  const formatUsername = (username, userId) => {
    // Проверяем, есть ли telegram_username, если нет — выводим user_id
    if (!username || username.trim() === "") {
      return userId;
    }
    if (username.length > 10) {
      return `${username.slice(0, 6)}...${username.slice(-2)}`;
    }
    return username;
  };

  return (
    <Tabs>
      <Toaster position="top-center" richColors />
      <TabList>
        <Tab>Friends</Tab>
        <Tab>LeaderBoard</Tab>
      </TabList>

      <TabPanel>
        <div className={styleFriends.friends}>
          <div className={styleFriends.info}>
            <div className={styleFriends.item}>
              <img src={giftIcon} alt="Gift" />
              Invite a friend and get <span>5000 coins</span>
            </div>
            <div className={styleFriends.item}>
              <img src={percentageIcon} alt="Percentage" />
              Invite a friend with Premium and get <span>25000 coins</span>
            </div>
          </div>

          <div className={styleFriends.invite}>
            <div className={styleFriends.share_link} onClick={handleShareLink}>
              Invite a friend
              <img src={addUser} alt="Invite" />
            </div>
            <div className={styleFriends.copy} onClick={handleCopyLink}>
              <img src={copyIcon} alt="Copy" />
            </div>
          </div>

          <ul className={styleFriends.friends_list}>
            {isLoadingFriends ? (
              <p className="load-friends">Loading...</p>
            ) : friends.length === 0 ? (
              <p className="load-friends">You don't have any friends.</p>
            ) : (
              friends.map((friend, index) => (
                <li key={index}>
                  <img
                    src={friend.referal_avatar || profileImage}
                    alt={formatUsername(friend.referal_name, friend.referal_id)}
                  />
                  <div className={styleFriends.name}>
                    {formatUsername(friend.referal_name, friend.referal_id)}
                  </div>
                  <div className={styleFriends.desc}>
                    <img src={usdCoin} alt="Coins" />
                    {friend.total_bonus_coins}
                  </div>
                </li>
              ))
            )}
          </ul>
          <Navbar />
        </div>
      </TabPanel>

      <TabPanel>
        <ul className={`${styleFriends.friends_list} ${styleFriends.big_list}`}>
          {isLoadingLeaderboard ? (
            <p className="load-leaderboard">Loading...</p>
          ) : leaderboard.length === 0 ? (
            <p className="load-leaderboard">No leaderboard data available.</p>
          ) : (
            leaderboard.map((user, index) => (
              <li
                key={index}
                className={user.user_id.toString() === myUserId ? "user_position" : ""}
              >
                <span>{index + 1}</span>
                <img
                  src={user.avatar_url || profileImage}
                  alt={formatUsername(user.telegram_username, user.user_id)}
                />
                <div className={styleFriends.name}>
                  {formatUsername(user.telegram_username, user.user_id)}
                </div>
                <div className={styleFriends.desc}>
                  <img src={usdCoin} alt="Coins" />
                  {user.wallet}
                </div>
              </li>
            ))
          )}
        </ul>
        <Navbar />
      </TabPanel>
    </Tabs>
  );
}
