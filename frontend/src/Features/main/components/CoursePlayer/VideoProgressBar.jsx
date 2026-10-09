import { useEffect, useState } from "react";

const VideoProgressBar = ({ playerRef }) => {

    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {

        const interval = setInterval(() => {

            const player = playerRef.current;

            if (!player) return;

            const currentTime = player.getCurrentTime();
            const totalDuration = player.getDuration();

            if (totalDuration > 0) {

                setDuration(totalDuration);

                setProgress(
                    (currentTime / totalDuration) * 100
                );

            }

        }, 300);

        return () => clearInterval(interval);

    }, [playerRef]);


    // ==============================
    // SEEK VIDEO
    // ==============================

    const handleSeek = (e) => {

        const value = Number(e.target.value);

        setProgress(value);

        if (!duration || !playerRef.current) return;

        const seekTime =
            (value / 100) * duration;

        playerRef.current.seekTo(
            seekTime,
            true
        );

    };


    return (

        <div className="video-progress">

            <input
                type="range"
                min="0"
                max="100"
                step="0.1"
                value={progress}
                onChange={handleSeek}
                style={{
                    "--progress": `${progress}%`
                }}
            />

        </div>

    );

};

export default VideoProgressBar;