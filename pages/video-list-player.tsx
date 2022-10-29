import axios from "axios";
import { useRouter } from "next/router";
import { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "../store/isLoadingSlice";
import { addNotification } from "../store/notificationSlice";

const VideoListPlayer = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [videoDataIndex, setVideoDataIndex] = useState(0);
    const [videoList, setVideoList] = useState<vItemType[]>([]);

    const loadData = useCallback(
        async (id: string) => {
            try {
                dispatch(
                    setLoading({ value: true, message: "Getting list items" })
                );

                const { data } = await axios(
                    "/api/get-data-from-playlist?id=" + id
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

                const ids = data.data.map(
                    (e: any) => e.snippet.resourceId.videoId
                );

                dispatch(
                    setLoading({
                        value: true,
                        message: "Getting list items data",
                    })
                );

                const { data: vidData } = await axios(
                    `/api/get-info-by-ids?ids=${ids.join("+")}`
                );

                dispatch(setLoading({ value: false, message: "" }));

                setVideoList(vidData.data.map((e: any) => {
                    return {

                    }
                }))
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
            // loadData(id);
        }
    }, [router, dispatch, loadData]);

    return (
        <div>
            <p>video-list-player</p>
        </div>
    );
};

export default VideoListPlayer;
