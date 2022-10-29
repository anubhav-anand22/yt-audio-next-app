interface GStateType {
    isLoading: boolean,
    notification: NotificationSliceType[] 
}

interface NotificationSliceType {
    id: string;
    title: string;
    message: string;
    type: "normal" | "danger" 
}