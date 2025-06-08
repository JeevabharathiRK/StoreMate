import React, { useRef, useState, useEffect } from "react";
import "./MusicPlayer.css";

const MusicPlayer = ({ onToggleGif, onChangeGif }) => {
  const audioRef = useRef(null);
  const [active, setActive] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    audio.addEventListener("timeupdate", updateProgress);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
    };
  }, []);

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (!active) {
      onToggleGif();
      audioRef.current.play();
      setActive(true);
    } else {
      onToggleGif();
      audioRef.current.pause();
      setActive(false);
    }
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  useEffect(() => {
    let interval = null;
    if (active) {
      interval = setInterval(() => {
        onChangeGif();
        console.log("Gif changed");
      }, 10000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [active, onChangeGif]);

  return (
    <div className="player">
      <audio
        ref={audioRef}
        src="https://pagalhits.com/download/143"
        preload="auto"
      />
      <div id="info" className={`info${active ? " active" : ""}`}>
        <span className="artist">Espresso</span>
        <span className="name">Sabrina Carpenter</span>
        <div className="progress-bar">
          <div className="bar" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      <div id="control-panel" className={`control-panel${active ? " active" : ""}`}>
        <div
          className="album-art"
          style={{
            backgroundImage:
              "url('https://pagalhits.com/upload_file/20/32/230x230/thumb_671b26ef9c841.webp')",
          }}
        ></div>
        <div className="controls">
          <div className="prev" title="Previous"></div>
          <div
            id="play"
            className="play"
            title={active ? "Pause" : "Play"}
            onClick={handlePlayPause}
          ></div>
          <div className="next" title="Next"></div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;