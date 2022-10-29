import Image from "next/image";
import { parseNumTime } from "../helpers/parseTime";
import style from "../styles/Components/VidItem.module.css";

interface VidItemType {
    data: vItemType;
    index: number;
    onClick(index: number): void;
    activeIndex: number;
}

const VidItem = ({ data, index, onClick, activeIndex }: VidItemType) => {
    return (
        <div
            onClick={() => onClick(index)}
            className={`${style.item} ${
                index === activeIndex ? style.activeItem : ""
            }`}
        >
            <div className={style.imgCont}>
                <Image
                    className={style.img}
                    src={data.thumbnails[0].url}
                    alt={data.title}
                    width={data.thumbnails[0].width}
                    height={data.thumbnails[0].height}
                />
                <abbr title="Hour:Minute:Second">
                    <p>{parseNumTime(data.length_seconds)}</p>
                </abbr>
            </div>
            <div>
                <p className={style.title}>{data.title}</p>
                <p className={style.viewCount}>Views: {data.view_count}</p>
            </div>
        </div>
    );
};

export default VidItem;
