import style from "../styles/Components/AudioPlayer.module.css";
import {
  FaPlay,
  FaDownload,
  FaPause,
  FaFastBackward,
  FaFastForward,
  FaHeart,
  FaRegHeart,
  FaVolumeUp,
} from "react-icons/fa";
import {
  MdFullscreen,
  MdFullscreenExit,
  MdOutlineRepeat,
  MdOutlineRepeatOne,
} from "react-icons/md";
import { BiSkipNext, BiSkipPrevious, BiArrowBack } from "react-icons/bi";
import { useEffect, useRef, useState } from "react";
import { parseNumTime } from "../helpers/parseTime";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addNotification } from "../store/notificationSlice";
import { delayedInput } from "../helpers/delayedInput";
import { dataDb } from "../db/dataDb";
import { getMediaSource } from "../helpers/getMediaSource";

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
  const [soundInpValOne, setSoundInpValOne] = useState(100);
  const [soundInpValTwo, setSoundInpValTwo] = useState(100);
  const [isFav, setIsFav] = useState(false);
  const [isLoop, setIsLoop] = useState(false);
  const dispatch = useDispatch();
  const [audioUrl, setAudioUrl] = useState("");

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

  const onVolumeChange = (e: string) => {
    const vol = parseInt(e);
    console.log(e, vol);
    if (audioEl.current?.volume) {
      dispatch(
        addNotification({
          id: Math.random().toString(),
          title: "Alert",
          message: `Volume: ${vol}%`,
          type: "normal",
        })
      );
      audioEl.current.volume = vol / 100;
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
    if (isLoop) {
      if (audioEl.current?.currentTime) audioEl.current.currentTime = 0;
      if (audioEl.current?.play) audioEl.current?.play();
    } else {
      setIsPlaying(false);
      next();
    }
  };

  const onTimeUpdate = () => {
    setCurrentTime(audioEl.current?.currentTime || 0);
    console.log(audioEl.current?.currentTime, audioEl.current?.duration);
  };

  const onLoadedMetadata = async () => {
    setDuration(audioEl.current?.duration || 0);
    const img = data.thumbnails.map((e) => {
      return {
        src: e.url,
        sizes: e.width + "x" + e.height,
        type: "image/png",
      };
    });

    if ("mediaSession" in navigator) {
      const mediaMetaData = {
        title: data.title,
        artist: data.author.name,
        artwork: img,
      };
      console.log(mediaMetaData);
      navigator.mediaSession.metadata = new MediaMetadata(mediaMetaData);
      navigator.mediaSession.setActionHandler("play", () => {
        audioEl.current?.play();
      });
      navigator.mediaSession.setActionHandler("pause", () => {
        audioEl.current?.pause();
      });
      navigator.mediaSession.setActionHandler("nexttrack", next);
      navigator.mediaSession.setActionHandler("previoustrack", previous);
      navigator.mediaSession.setActionHandler("seekbackward", () => {
        const t = audioEl.current?.currentTime || 0;
        if (!audioEl.current?.currentTime) return;
        audioEl.current.currentTime = t > 10 ? t - 10 : 0;
      });
      navigator.mediaSession.setActionHandler("seekforward", () => {
        const t = audioEl.current?.currentTime || 0;
        const d = audioEl.current?.duration || 0;
        if (!audioEl.current?.currentTime) return;
        audioEl.current.currentTime = t > d - 10 ? d : t + 10;
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

  const onFavChange = () => {
    setIsFav((pre) => {
      const val = !pre;

      if (val) {
        dataDb.favVideo.add({
          id: data.videoId,
          owner: data.ownerChannelName,
          thumbnail: data.thumbnails[0].url,
          title: data.title,
        });
      } else {
        dataDb.favVideo.delete(data.videoId);
      }
      return val;
    });
  };

  const onLoopChange = () => {
    setIsLoop((pre) => {
      return !pre;
    });
  };

  const onAudioError = (e: HTMLAudioElement) => {
    // if (e.src) {
    //   const urlObj = new URL(location.href);
    //   const url = `${urlObj.protocol}//${urlObj.host}/api/get-audio-by-id?id=${data.videoId}`;
    //   e.src = getMediaSource(url, data.videoId, () => {
    //     console.log("unable to get secnond url");
    //   });
    // }
  };

  useEffect(() => {
    dataDb.favVideo.get(data.videoId).then((fav) => {
      if (fav && fav.id) {
        setIsFav(true);
      } else {
        setIsFav(false);
      }
    });
  }, [data.videoId]);

  useEffect(() => {
    const urlObj = new URL(location.href);
    const urle = `${urlObj.protocol}//${urlObj.host}/api/get-audio-by-id?id=${data.videoId}`;
    const url = getMediaSource(urle, data.videoId, () => {
      console.log("unable to get url");
    });
    setAudioUrl(url);
  }, [data.videoId]);

  return (
    <div className={`${style.player} ${isFullScreen ? style.fullScreen : ""}`}>
      <audio
        id="audio"
        ref={audioEl}
        className={style.audioEl}
        src={audioUrl || ""}
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
              <div className={style.basicInfoTxt}>
                <p className={style.playerBackTitle}>{data.title}</p>
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
              <div className={style.volumeInpCont}>
                <p className={style.volumeInpContLabel}>
                  Volume <FaVolumeUp /> {"(" + soundInpValTwo + "%)"}
                </p>
                <div className={style.volumeInpContOne}>
                  <p>10</p>
                  <input
                    value={soundInpValOne}
                    step={10}
                    onChange={(e) => {
                      setSoundInpValTwo(parseInt(e.currentTarget.value));
                      setSoundInpValOne(parseInt(e.currentTarget.value));
                      delayedInput(onVolumeChange, 150, [
                        e.currentTarget.value,
                      ]);
                    }}
                    max={100}
                    min={10}
                    type="range"
                  />
                  <p>100</p>
                </div>
                <div className={style.volumeInpContTwo}>
                  <p>{parseInt(soundInpValOne + "") - 10}</p>

                  <input
                    value={soundInpValTwo}
                    type="range"
                    min={parseInt(soundInpValOne + "") - 10}
                    max={parseInt(soundInpValOne + "")}
                    onChange={(e) => {
                      setSoundInpValTwo(parseInt(e.currentTarget.value));
                      delayedInput(onVolumeChange, 150, [
                        e.currentTarget.value,
                      ]);
                    }}
                  />
                  <p>{soundInpValOne}</p>
                </div>
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
          <button onClick={onLoopChange}>
            {isLoop ? (
              <MdOutlineRepeatOne size={20} />
            ) : (
              <MdOutlineRepeat size={20} />
            )}
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
          <button onClick={onFavChange}>
            {isFav ? <FaHeart size={16} /> : <FaRegHeart size={16} />}
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
