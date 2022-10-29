import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeNotification } from "../store/notificationSlice";
import style from "../styles/Components/Notification.module.css";

const Notification = () => {
    const { notification } = useSelector((state: GStateType) => state);

    return (
        <div className={style.notificationCont}>
            {notification.map((e) => (
                <NotificationItem data={e} key={"notification" + e.id} />
            ))}
        </div>
    );
};

interface NotificationItemProps {
    data: NotificationSliceType;
}

const NotificationItem = ({ data }: NotificationItemProps) => {
    const dispatch = useDispatch();
    const [isExit, setIsExit] = useState(false);
    const firstTimeoutId = useRef<number | undefined>();
    const secondTimeoutId = useRef<number | undefined>();

    const onClick = () => {
        if (firstTimeoutId.current) clearTimeout(firstTimeoutId.current);
        if (secondTimeoutId.current) clearTimeout(secondTimeoutId.current);
        setIsExit(true);
        setTimeout(() => {
            dispatch(removeNotification(data.id));
        }, 600);
    };

    useEffect(() => {
        firstTimeoutId.current = window.setTimeout(() => {
            setIsExit(true);
        }, 5600);
        secondTimeoutId.current = window.setTimeout(() => {
            dispatch(removeNotification(data.id));
        }, 6200);

        return () => {
            if (firstTimeoutId.current) {
                clearTimeout(firstTimeoutId.current);
                firstTimeoutId.current = undefined;
            }
            if (secondTimeoutId.current) {
                clearTimeout(secondTimeoutId.current);
                secondTimeoutId.current = undefined;
            }
        };
    }, [data.id, dispatch]);

    return (
        <div
            className={`${style.notificationItem} ${
                data.type === "danger"
                    ? style.notificationItemDanger
                    : style.notificationItemNormal
            } ${isExit ? style.exiting : ""}`}
            onClick={onClick}
        >
            <p className={style.notificationTitle}>{data.title}</p>
            <p className={style.notificationMessage}>{data.message}</p>
        </div>
    );
};

export default Notification;
