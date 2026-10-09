import { useEffect, useRef, useState } from "react";

const useTimer = (
  durationInMinutes,
  onTimeUp,
  initialRemainingTime
) => {
  const [remainingTime, setRemainingTime] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const onTimeUpRef = useRef(onTimeUp);

  useEffect(() => {
    onTimeUpRef.current = onTimeUp;
  }, [onTimeUp]);

  // Initialize timer
  useEffect(() => {
    if (
      durationInMinutes === undefined ||
      durationInMinutes === null ||
      Number.isNaN(Number(durationInMinutes))
    ) {
      return;
    }

    if (
      initialRemainingTime !== undefined &&
      initialRemainingTime !== null &&
      !Number.isNaN(Number(initialRemainingTime))
    ) {
      setRemainingTime(Number(initialRemainingTime));
    } else {
      setRemainingTime(Number(durationInMinutes) * 60);
    }

    setIsRunning(true);
  }, [durationInMinutes]);

  // Countdown
  useEffect(() => {
    if (!isRunning || remainingTime === null) {
      return;
    }

    if (remainingTime <= 0) {
      setIsRunning(false);
      onTimeUpRef.current?.();
      return;
    }

    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev === null || prev <= 1) {
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, remainingTime]);

  const start = () => {
    if (remainingTime > 0) {
      setIsRunning(true);
    }
  };

  const pause = () => {
    setIsRunning(false);
  };

  const reset = () => {
    setRemainingTime(Number(durationInMinutes) * 60);
    setIsRunning(true);
  };

  const safeTime = Math.max(0, remainingTime ?? 0);

  const hours = Math.floor(safeTime / 3600);

  const minutes = Math.floor(
    (safeTime % 3600) / 60
  );

  const seconds = safeTime % 60;

  const formattedTime =
    `${String(hours).padStart(2, "0")}:` +
    `${String(minutes).padStart(2, "0")}:` +
    `${String(seconds).padStart(2, "0")}`;

  return {
    remainingTime: remainingTime ?? 0,
    formattedTime,
    isRunning,
    start,
    pause,
    reset,
  };
};

export default useTimer;