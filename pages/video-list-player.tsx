import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import AudioPlayer from "../Components/AudioPlayer";
import VidItem from "../Components/VidItem";
import { setLoading } from "../store/isLoadingSlice";
import { addNotification } from "../store/notificationSlice";
import style from "../styles/Pages/video-list-player.module.css";

const VideoListPlayer = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [videoDataIndex, setVideoDataIndex] = useState(0);
    const [videoList, setVideoList] = useState<any[]>([]);

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
                        message: "Checking chach",
                    })
                );

                let vidData: any;

                const storedDataJson = localStorage.getItem("YTA_YTD_DATA");
                const storedData = JSON.parse(
                    storedDataJson ||
                        `{"ids": "", "vidDataStored": {"data": [], "error": ""}, "ListId": "", "expires": 0}`
                );
                const date = new Date().getTime();

                if (
                    storedDataJson &&
                    storedData &&
                    storedData?.expires !== 0 &&
                    storedData?.expires > date &&
                    storedData?.ListId === id
                ) {
                    vidData = storedData.vidDataStored;
                } else {
                    dispatch(
                        setLoading({
                            value: true,
                            message: "Getting video data",
                        })
                    );
                    let outputDataPromises = []
                    const idDataLenght = idData.data.length;

                    for(let i = 0; i < Math.ceil(idDataLenght / 30); i++){
                        const res = axios(`/api/get-info-by-ids?ids=${idData.data.slice(i * 30, (i + 1) * 30).join("+")}`)
                        outputDataPromises.push(res);
                    }

                    const output = await Promise.all(outputDataPromises);

                    if (output[0]?.data?.error || !output[0]?.data?.data) {
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

                    let data:any = [];

                    for(let i of output){
                        data = [...data, ...i.data.data]
                    }

                    vidData = {data, error: ""};

                    localStorage.setItem(
                        "YTA_YTD_DATA",
                        JSON.stringify({
                            ids: idData.data.sort().join("+"),
                            vidDataStored: vidData,
                            ListId: id,
                            expires:
                                parseInt(
                                    vidData.data[0].url
                                        .split("?")[1]
                                        .split("&")
                                        .find((e: string) =>
                                            e.includes("expire=")
                                        )
                                        .split("=")[1] + "000"
                                ) - 900000,
                        })
                    );
                }

                dispatch(setLoading({ value: false, message: "" }));

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

    return (
        <div>
            <Head>
                <title>
                    {videoList[videoDataIndex]?.videoDetails?.title ||
                        "Playlist player"}
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
