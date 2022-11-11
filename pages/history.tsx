import Image from "next/image";
import { useRouter } from "next/router";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { dataDb } from "../db/dataDb";
import { formatTime } from "../helpers/formatTime";
import style from "../styles/Pages/history.module.css";

const OPTIONS = {
  video: "video",
  playlist: "playlist",
  search: "your search",
};

type ItemType = "LIST" | "VIDEO" | "SEARCH";

const History = () => {
  const [hisType, setHisType] = useState(OPTIONS.video);
  const [playlistHisList, setPlaylistHisList] = useState<HistoryDbListType[]>(
    []
  );
  const [videoHisList, setVideoHisList] = useState<HistoryDbVideoType[]>([]);
  const [searchHisList, setSearchHisList] = useState<HistoryDbSearchType[]>([]);
  const [searchQue, setSearchQue] = useState("");

  const router = useRouter();

  const setListVal = useCallback(async () => {
    setVideoHisList([]);
    setPlaylistHisList([]);
    setSearchHisList([]);
    if (hisType === OPTIONS.video) {
      const val = await dataDb.historyVideo.toArray();
      setVideoHisList(val);
    } else if (hisType === OPTIONS.playlist) {
      const val = await dataDb.historyList.toArray();
      setPlaylistHisList(val);
    } else if (hisType === OPTIONS.search) {
      const val = await dataDb.historySearch.toArray();
      setSearchHisList(val);
    }
  }, [hisType]);

  const onItemClick = async (type: ItemType, val: string) => {
    if (type === "SEARCH") {
      router.push("/?q=" + val);
    } else if (type === "LIST") {
      router.push("/video-player?vid=" + val);
    } else if (type === "VIDEO") {
      router.push("/video-list-player?list=" + val);
    }
  };

  useEffect(() => {
    setListVal();
  }, [hisType, setListVal]);

  return (
    <div>
      <div className={style.controlsCont}>
        <select
          value={hisType}
          onChange={(e) => setHisType(e.currentTarget.value)}
        >
          <option value={OPTIONS.video}>Video</option>
          <option value={OPTIONS.playlist}>Playlist</option>
          <option value={OPTIONS.search}>Search</option>
        </select>
        <div>
          <input
            value={searchQue}
            onChange={(e) => setSearchQue(e.currentTarget.value)}
            type="text"
            placeholder={`Search ${hisType} history`}
          />
        </div>
      </div>
      <div>
        <div className={style.vidItemCont}>
          {playlistHisList
            .filter((e) =>
              e.title.toLowerCase().includes(searchQue.toLowerCase())
            )
            .map((e) => (
              <HistoryVideoItem
                onClick={onItemClick}
                type="LIST"
                data={{ ...e, owner: "" }}
                key={e.id}
              />
            ))}
        </div>
        <div className={style.vidItemCont}>
          {videoHisList
            .filter(
              (e) =>
                e.title.toLowerCase().includes(searchQue.toLowerCase()) ||
                e.owner.toLowerCase().includes(searchQue.toLowerCase())
            )
            .map((e) => (
              <HistoryVideoItem
                onClick={onItemClick}
                type="VIDEO"
                data={e}
                key={e.id}
              />
            ))}
        </div>
        <div className={style.serachItemCont}>
          {searchHisList
            .filter((e) =>
              e.query.toLowerCase().includes(searchQue.toLowerCase())
            )
            .map((e) => (
              <HistorySearchItem
                onClick={onItemClick}
                data={e}
                key={e.query + e.time}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

interface HistoryVideoItemProps {
  data: HistoryDbVideoType;
  onClick(type: ItemType, val: string): void;
  type: "VIDEO" | "LIST";
}

const HistoryVideoItem = ({
  data,
  type,
  onClick = () => {},
}: HistoryVideoItemProps) => {
  return (
    <div className={style.vidItem} onClick={() => onClick(type, data.id)}>
      <div>
        <Image src={data.thumbnail} width={160} height={90} alt={data.title} />
      </div>
      <div className={style.vidItemInfo}>
        <p>{data.title}</p>
        <div className={style.vidItemOwnerTimeP}>
          <p>{data.owner}</p>
          <abbr title="HOUR:MINUTE:SECOND DAY-MONTH-YEAR">
            <p>{formatTime(data.time)}</p>
          </abbr>
        </div>
      </div>
    </div>
  );
};

interface HistorySearchItemProps {
  data: HistoryDbSearchType;
  onClick?(type: ItemType, val: string): void;
}

const HistorySearchItem = ({
  data,
  onClick = () => {},
}: HistorySearchItemProps) => {
  return (
    <div
      className={style.serachItem}
      onClick={() => onClick("SEARCH", data.query)}
    >
      <p>{data.query}</p>
      <div className={style.searchItemTimeFreP}>
        <abbr title="HOUR:MINUTE:SECOND DAY-MONTH-YEAR">
          <p>{formatTime(data.time)}</p>
        </abbr>
        <p>{data.freq}</p>
      </div>
    </div>
  );
};

export default History;
