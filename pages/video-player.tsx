import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addNotification } from "../store/notificationSlice";
import axios from "axios";
import VidItem from "../Components/VidItem";
import { setLoading } from "../store/isLoadingSlice";
import style from "../styles/Pages/video-player.module.css";
import AudioPlayer from "../Components/AudioPlayer";
import Head from "next/head";

export default function VideoList() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [videoData, setVideoData] = useState<VideoDetailsType | null>(null);
    const [relatedVid, setRelatedVid] = useState<vItemType[]>([]);
    const [sortBy, setSortBy] = useState("name");
    const [searchQuery, setSearchQuery] = useState("");
    const [searchInpVal, setSearchInpVal] = useState("");

    const sort = useCallback((e: any, by: string) => {
        return e.sort((a: any, b: any) => {
            switch (by) {
                case "name": {
                    return a.title.localeCompare(b.title);
                }
                case "view": {
                    return parseInt(a.view_count) >
                        parseInt(b.view_count)
                        ? 1
                        : -1;
                }
                case "length": {
                    return a.length_seconds > b.length_seconds
                        ? 1
                        : -1;
                }
                default:
                    return 1;
            }
        })
    }, [])

    const loadData = useCallback(
        async (id: string) => {
            try {
                dispatch(
                    setLoading({
                        value: true,
                        message: "fetching video information",
                    })
                );
                setSortBy('name')
                const { data } = await axios(
                    "/api/get-info-by-id?id=" + id.slice(0, 11)
                );

                if (data?.error || !data.data) {
                    dispatch(
                        addNotification({
                            id: Math.random().toString(),
                            message:
                                "Something went wrong while fetching video data",
                            title: "Error",
                            type: "danger",
                        })
                    );
                }

                const vData = {
                    ...data.data.videoDetails,
                    audioUrl: data.data.url,
                };

                setVideoData(vData);

                const relData = data.data.related_videos.map((e: any) => {
                    return {
                        title: e.title,
                        owner: e.author.name,
                        thumbnails: e.thumbnails,
                        length_seconds: e.length_seconds,
                        view_count: e.view_count,
                        id: e.id,
                    };
                }).sort((a: any, b: any) => a.title.localeCompare(b.title))

                setRelatedVid(relData);
                dispatch(
                    setLoading({
                        value: false,
                        message: "",
                    })
                );
            } catch (e) {
                console.log(e);
                dispatch(
                    setLoading({
                        value: false,
                        message: "",
                    })
                );
                dispatch(
                    addNotification({
                        id: Math.random().toString(),
                        message:
                            "Something went wrong while fetching video information",
                        title: "Error",
                        type: "danger",
                    })
                );
            }
        },
        [dispatch]
    );

    useEffect(() => {
        const id = router.query?.vid;
        if (!id) return;
        if (typeof id === "string") {
            loadData(id);
        }
    }, [router, dispatch, loadData]);

    const onItemClick = (index: number) => {
        router.push("/video-player?vid=" + relatedVid[index].id);
    };

    const nextItem = () => {
        router.push("/video-player?vid=" + relatedVid[0].id);
    };

    const previousItem = () => {
        router.back();
    };

    const onSearchSubmit = (e: FormEvent) => {
        e.preventDefault();
        setSearchQuery(searchInpVal)
    }

    const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.currentTarget.value;
        setSortBy(value);
        setRelatedVid(pre => sort(pre, value))
    }

    return (
        <div>
            <Head>
                <title>{videoData?.title || "Audio player"}</title>
            </Head>
            {videoData ? (
                <AudioPlayer
                    data={videoData}
                    next={nextItem}
                    previous={previousItem}
                />
            ) : null}
            <div className={style.controlCont}>
                <div>
                    <select
                        value={sortBy}
                        onChange={onSelectChange}
                    >
                        <option value="name">By name</option>
                        <option value="view">By view count</option>
                        <option value="length">By video length</option>
                    </select>
                </div>
                <div>
                    <form onSubmit={onSearchSubmit}>
                        <input
                            type="search"
                            placeholder="Search"
                            value={searchInpVal}
                            onChange={(e) =>{
                                if(e.currentTarget.value === '') setSearchQuery("")
                                setSearchInpVal(e.currentTarget.value)
                            }}
                        />
                        <button>Go</button>
                    </form>
                </div>
            </div>
            <div className={style.itemCont}>
                {relatedVid
                    .filter(e => e.title.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((e, i) => (
                        <VidItem
                            onClick={onItemClick}
                            key={e.id}
                            data={e}
                            index={i}
                            activeIndex={-1}
                        />
                    ))}
            </div>
        </div>
    );
}
