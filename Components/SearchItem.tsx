import Image from "next/image";
import VidItemStyle from "../styles/Components/VidItem.module.css";
import style from "../styles/Components/searchItem.module.css";
import { MdOutlinePlaylistPlay } from "react-icons/md";

const SearchItem = ({ data, onClick }: SearchItemType) => {
  return (
    <div
      onClick={() => onClick(data.type, data.id)}
      className={`${VidItemStyle.item} ${style.item}`}
    >
      {data.type === "playlist" ? (
        <div className={style.listIndicator}>
          <MdOutlinePlaylistPlay className={style.icon} color="#ffffff" />
        </div>
      ) : (
        ""
      )}
      <div className={VidItemStyle.imgCont}>
        <Image
          className={VidItemStyle.img}
          src={data.thumbnails.default.url}
          alt={data.title}
          width={data.thumbnails.default.width}
          height={data.thumbnails.default.height}
        />
      </div>
      <div>
        <a
          className={style.channelName}
          href={`https://youtube.com/channel/${data.channelId}`}
          target="blank"
        >
          {data.channelTitle}
        </a>
        <p className={style.title}>{data.title}</p>
      </div>
    </div>
  );
};

export default SearchItem;
