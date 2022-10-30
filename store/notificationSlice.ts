import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UpdateNotificationType {
    id: string;
    payload: NotificationSliceType;
}

export const notificationSlice = createSlice({
    name: "NOTIFICATION",
    initialState: <NotificationSliceType[]>[],
    reducers: {
        addNotification(state, action: PayloadAction<NotificationSliceType>) {
            return [action.payload, ...state].slice(0, 4);
        },
        removeNotification(state, action: PayloadAction<string>) {
            return state.filter((e) => e.id !== action.payload);
        },
        updateNotification(
            state,
            action: PayloadAction<UpdateNotificationType>
        ) {
            return state.map((e) =>
                e.id === action.payload.id ? action.payload.payload : e
            );
        },
    },
});

export const { addNotification, removeNotification, updateNotification } =
    notificationSlice.actions;
export default notificationSlice.reducer;
