import { Play, CirclePause, ChevronsLeft, ChevronsRight, RefreshCcw, VolumeOff, Volume2, Scaling, Settings } from 'lucide-react'
import { useState } from 'react';

const VideoControls = ({
    togglePlay,
    pause,
    seekBackward,
    seekForward,
    replay,
    mute,
    unMute,
    fullscreen,
    qualities,
    setPlaybackRate,
    isPlaying,
    playerRef
}) => {

    const [isOpenMute, setIsOpenMute] = useState(false)
    const [showSettings, setShowSettings] = useState(false);
    const [activeMenu, setActiveMenu] = useState("main");


    return (


        <div className="video-controls">

            <div className="control-left">

                {
                    isOpenMute ? <button onClick={() => {
                        unMute()
                        setIsOpenMute(!isOpenMute)
                    }
                    } ><VolumeOff size={25} /></button> : <button onClick={() => {
                        mute()
                        setIsOpenMute(!isOpenMute)
                    }
                    }><Volume2 size={25} /></button>
                }

            </div>

            <div className="control-center">

                <button onClick={seekBackward}><ChevronsLeft size={34} /></button>

                <button onClick={() => {
                    if (isPlaying) {
                        pause();
                    } else {
                        togglePlay();
                    }
                }}> {isPlaying ? <CirclePause size={28} /> : <Play size={28} />}</button>


                <button onClick={seekForward}><ChevronsRight size={34} /></button>

            </div>


            <div className="control-right">

                <button onClick={replay}><RefreshCcw /></button>
                <button onClick={() => {
                    setShowSettings(prev => !prev);
                    setActiveMenu("main");
                }}><Settings /></button>
                <button onClick={fullscreen}><Scaling /></button>

            </div>

            {/*  settings menu list here */}
            {
                showSettings && (

                    <div className="settings-menu">

                        {
                            activeMenu === "main" && (
                                <>
                                    <button onClick={() => setActiveMenu("speed")}>
                                        Playback Speed
                                    </button>

                                    <button onClick={() => setActiveMenu("quality")}>
                                        Quality
                                    </button>
                                </>
                            )
                        }

                    </div>

                )
            }

            {/*  speed list here */}
            {
                activeMenu === "speed" && (

                    <div className='speed-list'>

                        <button onClick={() => setActiveMenu("main")}>
                            ← Back
                        </button>

                        {
                            [0.5, 0.75, 1, 1.25, 1.5, 2].map(rate => (

                                <button
                                    key={rate}
                                    onClick={() => {
                                        setPlaybackRate(rate)
                                        setShowSettings(false)
                                        setActiveMenu('main')
                                    }}
                                >

                                    {rate}x

                                </button>

                            ))
                        }

                    </div>

                )
            }

            {/* quality list here */}
            {
                activeMenu === "quality" && (

                    <div className='quality-list'>

                        <button
                            onClick={() => setActiveMenu("main")}
                        >

                            ← Back

                        </button>

                        {

                            qualities.map(q => (

                                <button
                                    key={q}
                                    onClick={() => {
                                        playerRef.current?.setPlaybackQuality(q)
                                        setShowSettings(false)
                                        setActiveMenu('main')
                                    }
                                    }
                                >

                                    {q}

                                </button>

                            ))

                        }

                    </div>

                )
            }



        </div>
    )
};

export default VideoControls;