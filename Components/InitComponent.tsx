import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { dataDb } from "../db/dataDb";
import { defaultSettingData } from "../helpers/CONSTANTS";
import { initSetting } from "../store/settingSlice";

export const InitComponent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dataDb.settingVars.toArray().then(async (e) => {
      if (e.length === 0) {
        const isSystemDarkMode = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        defaultSettingData.isDark = isSystemDarkMode;
        await dataDb.settingVars.add(defaultSettingData);
        dispatch(initSetting(defaultSettingData));
        document.documentElement.setAttribute(
          "data-theme",
          isSystemDarkMode ? "dark" : "light"
        );
      } else {
        dispatch(initSetting(e[0]));
        document.documentElement.setAttribute(
          "data-theme",
          e[0].isDark ? "dark" : "light"
        );
      }
    });
  }, [dispatch]);
  return <div></div>;
};
