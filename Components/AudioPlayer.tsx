import style from "../styles/Components/AudioPlayer.module.css";
import {
    FaPlay,
    FaDownload,
    FaPause,
    FaVolumeUp,
    FaFastBackward,
    FaFastForward,
    FaVolumeDown,
} from "react-icons/fa";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";
import { BiSkipNext, BiSkipPrevious, BiArrowBack } from "react-icons/bi";
import { useRef, useState } from "react";
import { parseNumTime } from "../helpers/parseTime";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addNotification } from "../store/notificationSlice";

interface AudioPlayerProps {
    data: VideoDetailsType;
    next(): void;
    previous(): void;
}

type negativePositiveType = "+" | "-";

const AudioPlayer = ({ data, next, previous }: AudioPlayerProps) => {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const thumbnails = data.thumbnails[data.thumbnails.length - 1];
    const audioEl = useRef<HTMLAudioElement>(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const dispatch = useDispatch();

    const toggleFullscreenHandler = () => {
        setIsFullScreen((e) => !e);
    };

    const playPauseHandler = () => {
        if (isPlaying) {
            audioEl.current?.pause();
        } else {
            audioEl.current?.play();
        }
    };

    const setVolumeHandler = (type: negativePositiveType) => {
        let nextVolume = Math.floor((audioEl.current?.volume || 1) * 100);
        if (type === "+") {
            nextVolume = nextVolume + 5 > 100 ? 100 : nextVolume + 5;
        } else {
            nextVolume = nextVolume - 5 < 0 ? 0 : nextVolume - 5;
        }

        if (audioEl.current?.volume) {
            dispatch(
                addNotification({
                    id: Math.random().toString(),
                    title: "Alert",
                    message: `Volume: ${nextVolume}%`,
                    type: "normal",
                })
            );
            audioEl.current.volume = nextVolume / 100;
        }
    };

    const setPlaybackHandler = (type: negativePositiveType) => {
        let nextVal = audioEl.current?.playbackRate ?? 1;
        if (type === "+") {
            nextVal = nextVal + 0.25 > 8 ? 8 : nextVal + 0.25;
        } else {
            nextVal = nextVal - 0.25 < 0 ? 0 : nextVal - 0.25;
        }
        if (audioEl.current?.playbackRate !== undefined) {
            const a = `${nextVal}`.split(".");
            nextVal = parseFloat(`${a[0]}.${a[1] ? a[1].slice(0, 2) : 0}`);
            dispatch(
                addNotification({
                    id: Math.random().toString(),
                    title: "Alert",
                    message: `Playback rate: ${nextVal}x`,
                    type: "normal",
                })
            );
            audioEl.current.playbackRate = nextVal;
        }
    };

    const onEnd = () => {
        setIsPlaying(false);
        next();
    };

    const onTimeUpdate = () => {
        setCurrentTime(audioEl.current?.currentTime || 0);
    };

    const onLoadedMetadata = async () => {
        setDuration(audioEl.current?.duration || 0);
        const img = data.thumbnails.map(e => {
            return {
                src: e.url,
                sizes: e.width + "x" + e.height,
                type: "image/png"
            }
        })

        if ("mediaSession" in navigator) {
            const mediaMetaData = {
                title: data.title,
                artist: data.author.name,
                artwork: img
            }
            console.log(mediaMetaData)
            navigator.mediaSession.metadata = new MediaMetadata(mediaMetaData);
            navigator.mediaSession.setActionHandler("play", () => {
                audioEl.current?.play()
            });
            navigator.mediaSession.setActionHandler("pause", () => {
                audioEl.current?.pause();
            });
            navigator.mediaSession.setActionHandler("nexttrack", next);
            navigator.mediaSession.setActionHandler("previoustrack", previous);
            navigator.mediaSession.setActionHandler("seekbackward", () => {
                const t = audioEl.current?.currentTime || 0
                if(!audioEl.current?.currentTime) return
                audioEl.current.currentTime = t > 10 ? t - 10 : 0
            });
            navigator.mediaSession.setActionHandler("seekforward", () => {
                const t = audioEl.current?.currentTime || 0
                const d = audioEl.current?.duration || 0
                if(!audioEl.current?.currentTime) return
                audioEl.current.currentTime = t > (d - 10) ? d : t + 10
            });
        }
    };

    const downloadHandler = () => {
        const a = document.createElement("a");
        a.href = data.audioUrl;
        a.target = "_black";
        a.download = data.title + ".mp3";
        a.click();
    };

    const onAudioError = (e: HTMLAudioElement) => {
        if(e.src){
            e.src = `/api/get-audio-by-id?id=${data.videoId}`
        }
    }

    return (
        <div
            className={`${style.player} ${
                isFullScreen ? style.fullScreen : ""
            }`}
        >
            <audio
                ref={audioEl}
                className={style.audioEl}
                src={data.audioUrl || ""}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={onEnd}
                onTimeUpdate={onTimeUpdate}
                onLoadedMetadata={onLoadedMetadata}
                autoPlay
                onError={(e) => onAudioError(e.currentTarget)}
            ></audio>
            <div className={style.playerBack}>
                <div className={style.playerBackBackBtnCont}>
                    <button
                        className={style.playerBackBackBtn}
                        onClick={toggleFullscreenHandler}
                    >
                        <BiArrowBack size={20} />
                    </button>
                </div>
                <div className={style.palyerBackMain}>
                    <div>
                        <div className={style.playerBackImgCont}>
                            <Image
                                src={thumbnails.url}
                                width={thumbnails.width}
                                height={thumbnails.height}
                                alt={data.title}
                                className={style.playerBackImg}
                            />
                        </div>
                        <div>
                            <p className={style.playerBackTitle}>
                                {data.title}
                            </p>
                            <div className={style.playerBackOwnerCont}>
                                <Image
                                    src={data.author.thumbnails[0].url}
                                    width={40}
                                    height={40}
                                    alt={data.author.name}
                                    className={style.playerBackOwnerImg}
                                />
                                <a href={data.author.channel_url}>
                                    {data.author.name}
                                    <p>
                                        {" ("}
                                        {data.author.subscriber_count}
                                        {")"}
                                    </p>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className={style.description}>{data.description}</p>
                    </div>
                </div>
            </div>
            <div className={style.playerMain}>
                <div>
                    <p className={style.playerMainTitle}>{data.title}</p>
                </div>
                <div className={style.playerMainBtnCont}>
                    <button onClick={downloadHandler}>
                        <FaDownload size={16} />
                    </button>
                    <button onClick={() => setVolumeHandler("-")}>
                        <FaVolumeDown size={16} />
                    </button>
                    <button onClick={() => setPlaybackHandler("-")}>
                        <FaFastBackward size={16} />
                    </button>
                    <button onClick={previous}>
                        <BiSkipPrevious size={22} />
                    </button>
                    <button onClick={playPauseHandler}>
                        {isPlaying ? <FaPause /> : <FaPlay />}
                    </button>
                    <button onClick={next}>
                        <BiSkipNext size={22} />
                    </button>
                    <button onClick={() => setPlaybackHandler("+")}>
                        <FaFastForward size={16} />
                    </button>
                    <button onClick={() => setVolumeHandler("+")}>
                        <FaVolumeUp size={16} />
                    </button>
                    <button onClick={toggleFullscreenHandler}>
                        {isFullScreen ? (
                            <MdFullscreenExit size={20} />
                        ) : (
                            <MdFullscreen size={20} />
                        )}
                    </button>
                </div>
                <div className={style.playerIndicatorCont}>
                    <p>{parseNumTime(currentTime)}</p>
                    <input
                        type="range"
                        value={currentTime}
                        max={duration}
                        onInput={(e) =>
                            audioEl.current?.currentTime
                                ? (audioEl.current.currentTime =
                                      parseInt(e.currentTarget.value) || 0)
                                : e
                        }
                    />
                    <p>{parseNumTime(duration)}</p>
                </div>
            </div>
        </div>
    );
};

export default AudioPlayer;
