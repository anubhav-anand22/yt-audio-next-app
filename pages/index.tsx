import { useRouter } from "next/router";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { parseUrlInput } from "../helpers/parseUrlInput";
import style from "../styles/Home.module.css";
import Head from "next/head";
import { useDispatch } from "react-redux";
import { addNotification } from "../store/notificationSlice";
import { setLoading } from "../store/isLoadingSlice";
import axios from "axios";
import SearchItem from "../Components/SearchItem";
import { dataDb } from "../db/dataDb";

export default function Home() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [item, setItem] = useState<SearchItemTypeData[]>([]);

  const dispatch = useDispatch();

  const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!url) return alert("No url");
    const data = parseUrlInput(url);
    if (data.listId) {
      router.push("/video-list-player?list=" + data.listId);
    } else if (data.videoId) {
      router.push("/video-player?vid=" + data.videoId);
    } else if (data.query) {
      onQuerySearch(data.query);
    }
  };

  const onQuerySearch = useCallback(
    async (q: string) => {
      try {
        dispatch(
          setLoading({
            value: true,
            message: "Fetching searched data",
          })
        );

        const urlObj = new URL(location.href);
        const url = new URL(
          `${urlObj.protocol}//${urlObj.host}/api/yt-search?q=${q}`
        );

        const { data } = await axios(url.href);
        const resData: SearchItemTypeRootObj = data;
        setItem(
          resData.data.map((e) => {
            return {
              channelId: e.snippet.channelId,
              channelTitle: e.snippet.channelTitle,
              description: e.snippet.description,
              id: e.id.playlistId || e.id.videoId || "",
              type: e.id.playlistId ? "playlist" : "video",
              publishTime: e.snippet.publishTime,
              thumbnails: e.snippet.thumbnails,
              title: e.snippet.title,
            };
          })
        );

        const que = await dataDb.historySearch.get(q);
        if (que) {
          dataDb.historySearch.update(q, {
            query: q,
            time: new Date().getTime(),
            freq: que.freq + 1,
          });
        } else {
          dataDb.historySearch.add({
            query: q,
            time: new Date().getTime(),
            freq: 1,
          });
        }

        dispatch(
          setLoading({
            value: false,
            message: "",
          })
        );
      } catch (e) {
        console.log(e);
        dispatch(
          addNotification({
            id: Math.random().toString(),
            message: "Something went wrong while fetching search data",
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
    },
    [dispatch]
  );

  const onItemClick = (type: SearchItemTypetype, id: string) => {
    if (type === "playlist") {
      router.push(`/video-list-player?list=${id}`);
    } else {
      router.push(`/video-player?vid=${id}`);
    }
  };

  useEffect(() => {
    const val = typeof router.query?.q === "string" ? router.query?.q : "";
    if (val) {
      setUrl(val);
      onQuerySearch(val);
    }
  }, [router.query?.q, onQuerySearch]);

  return (
    <div className={style.home}>
      <Head>
        <title>YTA</title>
      </Head>
      <form className={style.form} onSubmit={onFormSubmit}>
        <input
          type="text"
          required
          placeholder="Youtube video or playlist url"
          value={url}
          onChange={(e) => setUrl(e.currentTarget.value)}
        />
        <button type="submit">GO</button>
      </form>
      <div className={style.itemCont}>
        {item.map((e) => (
          <SearchItem onClick={onItemClick} data={e} key={e.id} />
        ))}
      </div>
    </div>
  );
}
