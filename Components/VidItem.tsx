import Image from "next/image";

interface VidItemType {
    data: vItemType;
    index: number;
}

const VidItem = ({ data }: VidItemType) => {
    return (
        <div>
            <div>
                <Image
                    src={data.thumbnails[0].url}
                    alt={data.title}
                    width={data.thumbnails[0].width}
                    height={data.thumbnails[0].height}
                />
                <p>{data.length_seconds}</p>
            </div>
            <div>
                <p>{data.title}</p>
                <p>{data.view_count}</p>
            </div>
        </div>
    );
};

export default VidItem;
