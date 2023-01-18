import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  useState,
  useCallback,
  useEffect,
  FormEvent,
  useRef,
  ChangeEvent,
} from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import AudioPlayer from "../Components/AudioPlayer";
import VidItem from "../Components/VidItem";
import { dataDb } from "../db/dataDb";
import { setLoading } from "../store/isLoadingSlice";
import { addNotification } from "../store/notificationSlice";
import style from "../styles/Pages/video-list-player.module.css";

const VideoListPlayer = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [videoDataIndex, setVideoDataIndex] = useState(0);
  const [videoList, setVideoList] = useState<VieoItemResDataRootObject[]>([]);
  const [sortBy, setSortBy] = useState("position");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInpVal, setSearchInpVal] = useState("");
  const firstAbortController = useRef<AbortController>(new AbortController());
  const secondAbortController = useRef<AbortController>(new AbortController());
  const [isFavList, setIsFavList] = useState(false);

  const loadData = useCallback(
    async (id: string) => {
      try {
        const joinIds = (a: string[]) =>
          a.sort((a, b) => a.localeCompare(b)).join("");
        dispatch(
          setLoading({
            value: true,
            message: "Getting ids from playlist",
          })
        );
        setSortBy("position");

        const { data: idData } = await axios.get(
          "/api/get-ids-from-playlist?id=" + id,
          {
            signal: firstAbortController.current.signal,
          }
        );

        if (idData?.error || !idData.data) {
          dispatch(
            addNotification({
              id: Math.random().toString(),
              message: "Something went wrong while fetching video data",
              title: "Error",
              type: "danger",
            })
          );
          dispatch(
            setLoading({
              value: false,
              message: "",
            })
          );
        }

        dispatch(
          setLoading({
            value: true,
            message: "Checking chach",
          })
        );

        let vidData: VieoItemResDataRootObject[];

        const date = new Date().getTime();
        const storedData = await dataDb.videoDetails.get(id);

        if (
          storedData &&
          storedData.expires > date &&
          storedData.ids === joinIds(idData.data)
        ) {
          vidData = storedData.data;
        } else {
          if (storedData) {
            dataDb.videoDetails.delete(id);
          }
          dispatch(
            setLoading({
              value: true,
              message: "Getting video data",
            })
          );
          let outputDataPromises = [];
          const idDataLenght = idData.data.length;

          for (let i = 0; i < Math.ceil(idDataLenght / 30); i++) {
            const res = axios.get(
              `/api/get-info-by-ids?ids=${idData.data
                .slice(i * 30, (i + 1) * 30)
                .join("+")}`,
              {
                signal: secondAbortController.current.signal,
              }
            );
            outputDataPromises.push(res);
          }

          const output = await Promise.all(outputDataPromises);

          if (output[0]?.data?.error || !output[0]?.data?.data) {
            dispatch(
              addNotification({
                id: Math.random().toString(),
                message: "Something went wrong while fetching video data",
                title: "Error",
                type: "danger",
              })
            );
          }

          let data: VieoItemResDataRootObject[] = [];

          for (let i of output) {
            data = [...data, ...i.data.data];
          }

          vidData = data.map((e) => ({
            ...e,
            position: idData.data.findIndex(
              (i: string) => i === e.videoDetails.videoId
            ),
          }));

          dataDb.videoDetails.add({
            data: vidData,
            listId: id,
            expires:
              parseInt(
                vidData[0].url
                  .split("?")[1]
                  .split("&")
                  .find((e: string) => e.includes("expire="))
                  ?.replace("expire=", "") + "000"
              ) - 900000 || 0,
            ids: joinIds(idData.data),
          });
          const listDbdata = await dataDb.historyList.get(id);
          if (listDbdata && listDbdata.id) {
            dataDb.historyList.update(id, {
              thumbnail: vidData[0].videoDetails.thumbnails[0].url,
              time: new Date().getTime(),
              title: vidData[0].videoDetails.title,
            });
          } else {
            dataDb.historyList.add({
              id,
              thumbnail: vidData[0].videoDetails.thumbnails[0].url,
              time: new Date().getTime(),
              title: vidData[0].videoDetails.title,
            });
          }
        }

        dispatch(setLoading({ value: false, message: "" }));

        setVideoList(
          vidData.sort((a: any, b: any) => (a.position > b.position ? 1 : -1))
        );
      } catch (e) {
        dispatch(setLoading({ value: false, message: "" }));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    console.log("init");
    const id = router.query?.list;
    if (!id) return;
    if (typeof id === "string") {
      loadData(id);
    }
    () => {
      firstAbortController.current.abort();
      secondAbortController.current.abort();
    };
  }, [router, dispatch, loadData]);

  const onItemClick = (index: number) => {
    setVideoDataIndex(index);
  };

  const nextItem = () => {
    setVideoDataIndex((pre) => {
      if (videoList.length <= pre + 1) {
        return 0;
      } else {
        return pre + 1;
      }
    });
  };

  const previousItem = () => {
    setVideoDataIndex((pre) => {
      if (pre <= 0) {
        return videoList.length - 1;
      } else {
        return pre - 1;
      }
    });
  };

  const onSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInpVal);
  };

  const sort = (e: VieoItemResDataRootObject[], by: string) => {
    console.log(e);
    return e.sort((a: any, b: any) => {
      switch (by) {
        case "name": {
          return a.videoDetails.title.localeCompare(b.videoDetails.title);
        }
        case "view": {
          return parseInt(a.videoDetails.viewCount) >
            parseInt(b.videoDetails.viewCount)
            ? 1
            : -1;
        }
        case "length": {
          return a.videoDetails.lengthSeconds > b.videoDetails.lengthSeconds
            ? 1
            : -1;
        }
        case "date": {
          return a.videoDetails.uploadDate.localeCompare(
            b.videoDetails.uploadDate
          );
        }
        case "owner": {
          return a.videoDetails.ownerChannelName.localeCompare(
            b.videoDetails.ownerChannelName
          );
        }
        case "category": {
          return a.videoDetails.category.localeCompare(b.videoDetails.category);
        }
        case "position": {
          return a.position > b.position ? 1 : -1;
        }
        default:
          return 1;
      }
    });
  };

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.currentTarget.value;
    setSortBy(value);
    setVideoList((pre) => sort(pre, value));
  };

  const onFavChange = () => {
    setIsFavList((pre) => {
      const val = !pre;
      if (val) {
        dataDb.favList.add({
          id: router.query?.list?.toString() || "",
          thumbnail: videoList[0].videoDetails.thumbnails[0].url,
          title: videoList[0].videoDetails.title,
        });
      } else {
        dataDb.favList.delete(router.query?.list?.toString() || "");
      }
      return val;
    });
  };

  useEffect(() => {
    dataDb.favList.get(router.query?.list?.toString() || "").then((fav) => {
      if (fav && fav.id) {
        setIsFavList(true);
      } else {
        setIsFavList(false);
      }
    });
  }, [router.query?.list]);

  return (
    <div>
      <Head>
        <title>
          {videoList[videoDataIndex]?.videoDetails?.title || "Playlist player"}
        </title>
      </Head>
      {videoList.length === 0 ? null : (
        <AudioPlayer
          data={{
            ...videoList[videoDataIndex].videoDetails,
            audioUrl: videoList[videoDataIndex].url,
          }}
          next={nextItem}
          previous={previousItem}
        />
      )}
      <div className={style.controlCont}>
        <div className={style.controlsSelectFavBtn}>
          <select
            value={sortBy}
            onChange={onSelectChange}
            disabled={videoList.length === 0}
          >
            <option value="position">By position</option>
            <option value="name">By name</option>
            <option value="view">By view count</option>
            <option value="length">By video length</option>
            <option value="owner">By video owner</option>
            <option value="date">By upload date</option>
            <option value="category">By category</option>
          </select>
          <button
            onClick={onFavChange}
            className={style.listFavBtn}
            disabled={videoList.length === 0}
          >
            {isFavList ? <FaHeart size={28} /> : <FaRegHeart size={28} />}
          </button>
        </div>
        <div>
          <form onSubmit={onSearchSubmit}>
            <input
              disabled={videoList.length === 0}
              type="search"
              placeholder="Search"
              value={searchInpVal}
              onChange={(e) => {
                if (e.currentTarget.value === "") setSearchQuery("");
                setSearchInpVal(e.currentTarget.value);
              }}
            />
            <button>Go</button>
          </form>
        </div>
      </div>
      <div className={style.itemCont}>
        {videoList
          .filter((e) =>
            e.videoDetails.title
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          )
          .map((e: any, i) => (
            <VidItem
              key={e.videoDetails.videoId}
              data={{
                title: e.videoDetails.title,
                thumbnails: e.videoDetails.thumbnails,
                id: e.videoDetails.videoId,
                length_seconds: e.videoDetails.lengthSeconds,
                view_count: e.videoDetails.viewCount,
              }}
              index={i}
              onClick={onItemClick}
              activeIndex={videoDataIndex}
            />
          ))}
      </div>
    </div>
  );
};

export default VideoListPlayer;
