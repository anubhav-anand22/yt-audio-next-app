import axios from "axios";
import { useRouter } from "next/router";
import { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import VidItem from "../Components/VidItem";
import { setLoading } from "../store/isLoadingSlice";
import { addNotification } from "../store/notificationSlice";
import style from "../styles/Pages/video-list-player.module.css";

const VideoListPlayer = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [videoDataIndex, setVideoDataIndex] = useState(0);
    const [videoList, setVideoList] = useState([]);

    const loadData = useCallback(
        async (id: string) => {
            try {
                dispatch(
                    setLoading({
                        value: true,
                        message: "Getting ids from playlist",
                    })
                );

                const { data: idData } = await axios(
                    "/api/get-ids-from-playlist?id=" + id
                );

                if (idData?.error || !idData.data) {
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

                dispatch(
                    setLoading({
                        value: true,
                        message: "Getting video data",
                    })
                );

                const { data: vidData } = await axios(
                    `/api/get-info-by-ids?ids=${idData.data.join("+")}`
                );

                if (vidData?.error || !vidData.data) {
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

                dispatch(setLoading({ value: false, message: "" }));

                console.log(vidData);

                setVideoList(vidData.data);
            } catch (e) {
                console.log(e);
                dispatch(setLoading({ value: false, message: "" }));
            }
        },
        [dispatch]
    );

    useEffect(() => {
        const id = router.query?.list;
        if (!id) return;
        if (typeof id === "string") {
            loadData(id);
        }
    }, [router, dispatch, loadData]);

    const onItemClick = (index: number) => {
        setVideoDataIndex(index);
    };

    return (
        <div>
            <div className={style.itemCont}>
                {videoList.map((e: any, i) => (
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
