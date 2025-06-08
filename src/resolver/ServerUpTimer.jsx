import React, { useState, useEffect, useContext, useCallback } from "react";
import HostContext from "../contexts/HostContext";
import MusicPlayer from "./MusicPlayer";

const gifList = [
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdmd0M2E5ZmM3ZGtqb3VxaWtzcXQ2ZHd3a3BqYTVmbzkwNjNtano2diZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/blSTtZehjAZ8I/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzdwZW5nOTQwZ28xM2RnNWdiMnUydHAwc3VhM3loY2R5bHJ5eGwwNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/j5bqnQ5x4UinExgVmW/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGUyMzM3Z2NjM2oxcG80bjZ6amxoOXpzMmNuZ2pvZWNrenJnZXZncCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/JVglf7QjxaZZM2tjfB/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGtjOHo0Zmh3Yzg3ZWk3eDd5bjhscHAxanlib29oaDl0eXd0ZWZmaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l4Ep3mmmj7Bw3adWw/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDB5bjJ0OHV6NHlvZWJ1dDJubWRvMGJyZnlubGR3NWR5bmI4eWR1OCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/I6x89qGDCjvHCQ7AS1/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXdyN3Nva3pnZ2tyeTFsbG9rNm1icmsyZHJ5Z2JkdzdxOWQwYXo5cSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Ac0fCix8D3oN7DwCEB/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2xqM3o0NzZiZXY1bTcyYW0wc3JqY2JleXB6aHo3MmM1Zm12ODY4cCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/1n1Qt8awVkldNxAt6A/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdWZuOXUyamZnem9qY3I2OGl6NDhnYXJmMjk2NHNmeXJhbDJiNXp1NSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/AgWQwLTByaABsBQ9Zf/giphy.gif",
];

const ServerUpTimer = ({ onClose }) => {
  const host = useContext(HostContext);
  const [isServerUp, setIsServerUp] = useState(false);
  const [countdown, setCountdown] = useState(150); // 2:30
  const [gifIndex, setGifIndex] = useState(null);
  const [showContent, setShowContent] = useState(false);

  // Check server status on mount and call onClose if up
  useEffect(() => {
    const checkServer = async () => {
      try {
        const res = await fetch(`${host}/api/status`);
        const data = await res.json();
        if (data) {
          setIsServerUp(true);
          onClose();
        }
      } catch {
        setIsServerUp(false);
      }
      console.log(isServerUp);
    };
    checkServer();
    // eslint-disable-next-line
  }, [host, onClose]);

  // Countdown interval
  useEffect(() => {
    if (isServerUp) {
      setCountdown(0);
      onClose();
      return;
    }
    const interval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isServerUp]);

  // Check server status every 5 seconds
  useEffect(() => {
    const checkServer = async () => {
      try {
        const res = await fetch(`${host}/api/status`);
        const data = await res.json();
        setIsServerUp(Boolean(data));
      } catch {
        setIsServerUp(false);
      }
    };
    checkServer();
    const interval = setInterval(checkServer, 5000);
    return () => clearInterval(interval);
  }, [host]);

  // Format seconds to mm:ss
  const formatTime = (sec) => {
    const minutes = Math.floor(sec / 60);
    const seconds = sec % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Progress bar width
  const progress = (countdown / 150) * 100;

  // Change GIF function
  const changeGif = useCallback(() => {
    setGifIndex((prev) => {
      if (prev === null) {
        return 0; // or Math.floor(Math.random() * gifList.length)
      }
      return (prev + 1) % gifList.length;
    });
  }, []);

  const gifToggle = () => {
    if (gifIndex === null) {
      setGifIndex(1);
    } else {
      setGifIndex(null);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!showContent) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-indigo-700 via-purple-800 to-fuchsia-800 flex items-center justify-center min-h-screen">
      <div className="bg-white/90 shadow-2xl rounded-3xl p-8 md:p-12 w-full max-w-md mx-4 flex flex-col items-center">
        <div className="mb-6">
          {isServerUp ? (
            <svg
              className="w-20 h-20 text-green-500 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 12l2 2 4-4"
              />
            </svg>
          ) : (
            <svg
              className="w-20 h-20 text-red-500 mx-auto animate-pulse"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 9l-6 6m0-6l6 6"
              />
            </svg>
          )}
        </div>
        <h1
          className={`text-3xl font-bold mb-2 ${
            isServerUp ? "text-green-700" : "text-red-700"
          }`}
        >
          {isServerUp ? "Server is Up" : "Server is Down"}
        </h1>
        {!isServerUp && (
          <>
            <div className="text-sm font-semibold text-gray-500 mb-1">
              Estimated Uptime
            </div>
            <div className="text-5xl font-mono font-extrabold mb-4 text-gray-800 tracking-widest">
              {formatTime(countdown)}
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full mb-4 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-pink-500 to-indigo-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <img
              src={gifIndex !== null ? gifList[gifIndex] : "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMW5sdDBscTFqeGtzN3R1M2J0d2xmZjhieWQzZnd0dTNlM2tqMHNsaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/tqKfFKsOIFnffwKSzD/giphy.gif"}
              alt="Server down meme"
              className="mx-auto rounded-lg mb-4 w-32 h-32 object-cover shadow"
            />
          </>
        )}
        <p className="text-base text-gray-700 mt-2">
          {isServerUp
            ? "Your server is running and ready to use."
            : "Free hosting limits the server uptime. Please wait until your server runs."}
        </p>
        <div className="mt-20 w-full">
          <MusicPlayer onToggleGif={gifToggle} onChangeGif={changeGif} />
        </div>
      </div>
    </div>
  );
};

export default ServerUpTimer;
