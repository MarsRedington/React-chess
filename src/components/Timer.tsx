import React, { FC, useEffect, useRef, useState } from "react";
import { Player } from "../models/Player";
import { Colors } from "../models/Colors";

interface TimerProps {
  currentPlayer: Player | null;
  restart: () => void;
}

const Timer: FC<TimerProps> = ({ currentPlayer, restart }) => {
  const [blackTime, setBlackTime] = useState(300);
  const [whiteTime, setWhiteTime] = useState(300);
  const [startGame, setStartGame] = useState(false);
  const timer = useRef<null | ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    if (startGame) {
      setBlackTime(300);
      setWhiteTime(300);
      startTimer();
    }
  }, [currentPlayer, startGame]);

  function startTimer() {
    if (timer.current) {
      clearInterval(timer.current);
    }
    const callback =
      currentPlayer?.color === Colors.WHITE
        ? decrementWhiteTimer
        : decrementBlackTimer;
    timer.current = setInterval(callback, 1000);
  }

  function decrementBlackTimer() {
    if (blackTime > 0) {
      setBlackTime((prev) => prev - 1);
    }
  }
  function decrementWhiteTimer() {
    if (whiteTime > 0) {
      setWhiteTime((prev) => prev - 1);
    }
  }

  const handleRestart = () => {
    setStartGame(true);
    if (startGame) {
      setWhiteTime(300);
      setBlackTime(300);
      restart();
    }
  };

  return (
    <div className="timerWrapper">
      <div className="buttonWrapper">
        <button className="restartButton" onClick={handleRestart}>
          {startGame ? "Restart Game" : "Start Game"}
        </button>
      </div>
      <div className="switchWrapper">
        <h2>Black - {blackTime}</h2>
        <h2>White - {whiteTime}</h2>
      </div>
    </div>
  );
};

export default Timer;
