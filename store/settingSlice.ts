import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const defaultSetting = {
  isDark: false,
  cacheAudio: true,
  cacheAudioNumber: 100,
  id: 1,
};

export const settingSlice = createSlice({
  name: "SETTING",
  initialState: defaultSetting,
  reducers: {
    setIsDark(state, action: PayloadAction<boolean>) {
      const newState = state;
      state.isDark = action.payload;
      return newState;
    },
    toggleIsDark(state) {
      const newState = state;
      state.isDark = !state.isDark;
      return newState;
    },
    initSetting(state, action: PayloadAction<SettingVarsU>) {
      const newState = { ...defaultSetting, ...state, ...action.payload };
      return newState;
    },
  },
});

export const { setIsDark, toggleIsDark, initSetting } = settingSlice.actions;
export default settingSlice.reducer;
