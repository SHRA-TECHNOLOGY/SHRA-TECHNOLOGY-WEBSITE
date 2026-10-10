// yah page keval api youtube ko handle karta h 

import { useState, useEffect, useMemo, useRef } from "react";
import YouTube from "react-youtube";

import usePlayer from "../../hooks/usePlayer.js";
import useKeyboard from "../../hooks/useKeyboard.js";
import useProgress from "../../Hooks/useProgress.js";

import NextLessonOverlay from "./NextLessonOverlay";
import VideoControls from "./VideoControls";

import { useLessonUrl } from '../../Hooks/Course/useCourse'
import VideoProgressBar from "./VideoProgressBar";

const VideoPlayer = ({
    currentLesson,
    sectionId,
    nextLessonData,
    onNextLesson,
    markCompleted,
    showOverlay,
    setShowOverlay,
    courseId
}) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const { playerRef, onReady, replay, setPlaybackRate, seekForward, seekBackward, togglePlay, pause, mute, unMute, fullscreen, containerRef } = usePlayer();

    useKeyboard({ togglePlay, seekForward, seekBackward, mute, fullscreen, replay, });

    const lessonId = currentLesson?.id;


    const {
        saveProgress
    } = useProgress(
        playerRef,
        lessonId,
        courseId,
        sectionId
    );

    // video quality get 

    const qualities = playerRef.current?.getAvailableQualityLevels() || [];

    //keval ek bar ops bnega hook ki help se
    const opts = useMemo(() => ({
        width: "100%",
        height: "100%",
        playerVars: {
            autoplay: 1,
            controls: 0,
            rel: 0,
            modestbranding: 1,
            playsinline: 1,
            disablekb: 1,
            fs: 0,
            iv_load_policy: 3,
            mute: 0,
        },
    }), []);


    //video end hote hee complete mark show 

    const onStateChange = (event) => {

        // Video End
        if (event.data === window.YT.PlayerState.ENDED) {

            // Backend mein progress + completed save
            saveProgress(true);

            // Parent mein completed lesson update
            markCompleted(currentLesson.id);
        }


        if (event.data === window.YT.PlayerState.PLAYING) {
            setIsPlaying(true);
        } else {
            setIsPlaying(false);
        }

    };


    // Show Overlay 15 sec before end

    useEffect(() => {

        if (!playerRef.current) return;

        const interval = setInterval(() => {

            const current = playerRef.current?.getCurrentTime() ?? 0;

            const total = playerRef.current.getDuration();

            if (!showOverlay && total > 0 && total - current <= 15) {
                setShowOverlay(true);
            }

        }, 1000);

        return () => clearInterval(interval);

    }, [playerRef, currentLesson, setShowOverlay]);


    // state for auto hide show 3 second
    const [showControls, setShowControls] = useState(true);

    const hideControlsTimer = useRef(null);

    // ==========================================
    // SHOW CONTROLS
    // ==========================================

    const showVideoControls = () => {

        // Purana timer cancel
        clearTimeout(hideControlsTimer.current);

        // Controls show
        setShowControls(true);

    };


    // ==========================================
    // HIDE CONTROLS AFTER 3 SECONDS
    // ==========================================

    const startHideControlsTimer = () => {

        // Agar purana timer chal raha hai
        // toh usko cancel karo
        clearTimeout(hideControlsTimer.current);

        // 3 second baad hide
        hideControlsTimer.current = setTimeout(() => {

            setShowControls(false);

        }, 3000);

    };


    // Component unmount hone par timer cleanup
    useEffect(() => {

        return () => {

            clearTimeout(hideControlsTimer.current);

        };

    }, []);


    // video url get

    const { data, isLoading, isError, error } = useLessonUrl({ courseId, lessonId: currentLesson?.id });


    const videoUrl = data?.videoUrl;


    if (isLoading) {
        return (
            <div className="video-player">
                Loading video...
            </div>
        );
    }

    if (isError) {
        return (
            <div className="video-player">
                {error?.response?.data?.message || "Video load failed"}
            </div>
        );
    }

    if (!videoUrl) {
        return (
            <div className="video-player">
                Video not available
            </div>
        );
    }

    return (
        <div
            className="video-player"

            onMouseEnter={showVideoControls}

            onMouseLeave={startHideControlsTimer}

            ref={containerRef}
        >

            {/* YouTube Video */}
            <YouTube
                key={videoUrl}
                videoId={videoUrl}
                opts={opts}
                onReady={onReady}
                onStateChange={onStateChange}
                className="youtube-player"
            />

            {/* Custom Controls */}
            <div
                className={`custom-controls ${showControls ? "controls-visible" : "controls-hidden"
                    }`}
            >

                <div className="progress-full">
                    <VideoProgressBar
                        playerRef={playerRef}
                    />
                </div>

                <VideoControls
                    togglePlay={togglePlay}
                    pause={pause}
                    seekBackward={seekBackward}
                    seekForward={seekForward}
                    replay={replay}
                    mute={mute}
                    fullscreen={fullscreen}
                    unMute={unMute}
                    qualities={qualities}
                    setPlaybackRate={setPlaybackRate}
                    isPlaying={isPlaying}
                    playerRef={playerRef}
                />

            </div>

            {showOverlay && (
                <NextLessonOverlay
                    currentLesson={currentLesson}
                    nextLessonData={nextLessonData}
                    onNextLesson={onNextLesson}
                    replay={replay}
                    setShowOverlay={setShowOverlay}
                />
            )}

        </div>
    );

};

export default VideoPlayer;