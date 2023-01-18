import { useEffect, useState } from "react";
import { dataDb } from "../db/dataDb";
import Image from "next/image";
import Link from "next/link";
import style from "../styles/Pages/fav.module.css";
import { delayedInput } from "../helpers/delayedInput";

type FavListType = "VIDEO" | "LIST";

const FavPage = () => {
  const [listType, setListType] = useState<FavListType>("VIDEO");
  const [favList, setFavList] = useState<FavDbListType[] | FavDbVideoType[]>(
    []
  );
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (listType === "LIST") {
      dataDb.favList.toArray().then((e) => setFavList(e));
    } else {
      dataDb.favVideo.toArray().then((e) => setFavList(e));
    }
  }, [listType]);

  return (
    <div>
      <div className={style.controlsCont}>
        <div>
          <select
            value={listType}
            onChange={(e) =>
              setListType(e.currentTarget.value === "VIDEO" ? "VIDEO" : "LIST")
            }
          >
            <option value="VIDEO">Video</option>
            <option value="LIST">List</option>
          </select>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search"
            onChange={(e) =>
              delayedInput(setSearch, 300, [e.currentTarget.value])
            }
          />
        </div>
      </div>
      <div className={style.favListCont}>
        {favList
          .filter((e) => e.title.toLowerCase().includes(search.toLowerCase()))
          .map((e) => (
            <Link
              href={
                listType === "VIDEO"
                  ? `/video-player?vid=${e.id}`
                  : `/video-list-player?list=${e.id}`
              }
              key={e.id}
            >
              <div className={style.favItem}>
                <Image
                  src={e.thumbnail}
                  alt={e.title}
                  width={100}
                  height={100}
                />
                <p>{e.title}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default FavPage;
