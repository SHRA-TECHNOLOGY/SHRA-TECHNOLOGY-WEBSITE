import { useEffect } from "react";

const useKeyboard = ({
  togglePlay,

  seekForward,

  seekBackward,
  mute,
  fullscreen,
  replay,
}) => {
  useEffect(() => {
    const handleKey = (e) => {
      const active = document.activeElement;

      // Input field me shortcut disable
      if (active?.tagName === "INPUT" || active?.tagName === "TEXTAREA") {
        return;
      }

      if (e.ctrlKey || e.metaKey) return;

      switch (e.code) {
        case "Space":
          e.preventDefault();

          togglePlay();

          break;

        case "ArrowRight":
          e.preventDefault();

          seekForward();

          break;

        case "ArrowLeft":
          e.preventDefault();

          seekBackward();

          break;

        case "KeyM":
          mute();

          break;
        case "KeyF":
          fullscreen();

          break;

        case "KeyR":
          replay();

          break;

        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [togglePlay, seekForward, seekBackward]);
};

export default useKeyboard;
