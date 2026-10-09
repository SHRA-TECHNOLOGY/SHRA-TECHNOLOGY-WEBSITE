import { useRef } from "react";

const usePlayer = () => {
  // YouTube player ka reference
  const playerRef = useRef(null);

  // Fullscreen container ka reference
  const containerRef = useRef(null);

  //click topic ka video show karna
  const onReady = (event) => {
    playerRef.current = event.target;
  };

  //play feature
  const play = () => {
    playerRef.current?.playVideo();
  };

  //pause feature
  const pause = () => {
    if (!playerRef.current) return;
    const state = playerRef.current.getPlayerState(); //return window.YT.PlayerState.PLAYING par 1, pause par 2 , end par 0

    if (state === window.YT.PlayerState.PLAYING) {
      playerRef.current.pauseVideo();
    }
  };

  //play button
  const togglePlay = () => {
    if (!playerRef.current) return;

    const state = playerRef.current.getPlayerState();

    if (
      state === window.YT.PlayerState.PAUSED ||
      state === window.YT.PlayerState.ENDED
    ) {
      playerRef.current.playVideo();
    } else if (state === window.YT.PlayerState.PLAYING) {
      playerRef.current.pauseVideo();
    }
  };

  //10s after
  const seekForward = () => {
    if (!playerRef.current) return;

    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
  };

  //10s back
  const seekBackward = () => {
    if (!playerRef.current) return;

    playerRef.current.seekTo(
      Math.max(playerRef.current.getCurrentTime() - 10, 0),
    );
  };

  //volume controller
  const setVolume = (volume) => {
    playerRef.current?.setVolume(volume);
  };

  //get current volume
  const getVolume = () => {
    return playerRef.current?.getVolume() ?? 100;
  };

  // replay logic

  const replay = () => {
    if (!playerRef.current) return;

    playerRef.current.seekTo(0); //0second par shift kar dega

    playerRef.current.playVideo();
  };

  // get video current time
  const getCurrentTime = () => {
    return playerRef.current?.getCurrentTime() || 0;
  };

  // get video duration time
  const getDuration = () => {
    return playerRef.current?.getDuration() || 0;
  };

  // ==========================================
  // FULLSCREEN LOGIC
  // ==========================================

  const fullscreen = () => {
    const container = containerRef.current;

    if (!container) return;

    // Agar fullscreen nahi hai
    if (!document.fullscreenElement) {
      container.requestFullscreen();
    } else {
      // Fullscreen se bahar
      document.exitFullscreen();
    }
  };

  //speed logic here
  const setPlaybackRate = (speed) => {
    playerRef.current?.setPlaybackRate(speed);
  };

  //mute feature
  const mute = () => {
    playerRef.current?.mute();
  };

  //unmute feature
  const unMute = () => {
    playerRef.current?.unMute();
  };

  //before and after skip
  const seekTo = (time) => {
    if (!playerRef.current) return;
    playerRef.current.seekTo(time);
  };

  return {
    playerRef,

    onReady,

    play,

    pause,

    togglePlay,

    seekForward,

    seekBackward,

    setVolume,
    replay,

    containerRef,
    fullscreen,

    mute,

    unMute,

    seekTo,

    getCurrentTime,

    getDuration,

    getVolume,

    setPlaybackRate,
  };
};

export default usePlayer;
