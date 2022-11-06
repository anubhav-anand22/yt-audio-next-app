import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const defaultSetting = {
    isDark: false
}

export const settingSlice = createSlice({
    name: "SETTING",
    initialState: defaultSetting,
    reducers: {
        setIsDark(state, action: PayloadAction<boolean>) {
            const newState = state;
            state.isDark = action.payload
            return newState
        },
        toggleIsDark(state) {
            const newState = state;
            state.isDark = !state.isDark;
            return newState;
        }
    },
});

export const { setIsDark, toggleIsDark } =
    settingSlice.actions;
export default settingSlice.reducer;
