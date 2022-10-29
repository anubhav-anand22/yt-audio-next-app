interface GStateType {
    isLoading: {value: boolean, message: string};
    notification: NotificationSliceType[];
}

interface NotificationSliceType {
    id: string;
    title: string;
    message: string;
    type: "normal" | "danger";
}

interface ThumbnailsType {
    height: number;
    url: string;
    width: number;
}

interface vItemType {
    title: string;
    thumbnails: ThumbnailsType[];
    view_count: number;
    length_seconds: number;
    id: string;
}
