import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addNotification } from "../store/notificationSlice";
import axios from "axios";
import VidItem from "../Components/VidItem";
import { setLoading } from "../store/isLoadingSlice";

export default function VideoList() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [videoData, setVideoData] = useState({});
    const [relatedVid, setRelatedVid] = useState<vItemType[]>([]);

    const loadData = useCallback(
        async (id: string) => {
            try {
                dispatch(
                    setLoading({
                        value: true,
                        message: "fetching video information",
                    })
                );
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
                    title: data.data.videoDetails.title,
                    owner: data.data.videoDetails.ownerChannelName,
                    thumbnails: data.data.videoDetails.thumbnails,
                    length_seconds: data.data.videoDetails.lengthSeconds,
                    keywords: data.data.videoDetails.keywords,
                    description: data.data.videoDetails.description,
                    uploadDate: data.data.videoDetails.uploadDate,
                    url: data.data.url,
                };

                setVideoData(vData);
                setRelatedVid(
                    data.data.related_videos.map((e: any) => {
                        return {
                            title: e.title,
                            owner: e.author.name,
                            thumbnails: e.thumbnails,
                            length_seconds: e.length_seconds,
                            view_count: e.view_count,
                            id: e.id,
                        };
                    })
                );
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

    return (
        <div>
            <div>
                {relatedVid.map((e, i) => (
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
