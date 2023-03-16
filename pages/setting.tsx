import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dataDb } from "../db/dataDb";
import { parseBytes } from "../helpers/parseBytes";
import { initSetting, setIsDark } from "../store/settingSlice";
import style from "../styles/Pages/setting.module.css";

export default function Setting() {
  const gState = useSelector((state: GStateType) => state.setting);
  const dispatch = useDispatch();
  const [dataSize, setDataSize] = useState({ quota: 0, usage: 0 });

  const onThemeChange = () => {
    const val = !gState.isDark;
    dispatch(setIsDark(val));
    document.documentElement.setAttribute("data-theme", val ? "dark" : "light");
    dataDb.settingVars.update(1, { isDark: val });
  };

  useEffect(() => {
    navigator.storage.estimate().then((e) => {
      setDataSize({ quota: e.quota || 0, usage: e.usage || 0 });
    });
  }, []);

  return (
    <div className={style.settingPage}>
      <div className={style.itemBtn}>
        <p>Theme:</p>
        <button onClick={onThemeChange}>
          {gState.isDark ? "Dark" : "Light"}
        </button>
      </div>
      <div className={style.itemBtn}>
        <p>
          Export data:{" "}
          <span
            className="hint"
            data-hint="Export history, favourite and other data as a backup file"
          >
            ?
          </span>
        </p>
        <button>Export</button>
      </div>
      <div className={style.itemBtn}>
        <p>
          Import data:{" "}
          <span
            className="hint"
            data-hint="Import hisory, favoutire and other data as a backup file"
          >
            ?
          </span>
        </p>
        <button>Import</button>
      </div>
      <div className={style.itemBtn}>
        <p>Reset data and clear cache: </p>
        <button>Clear</button>
      </div>
      <div className={style.itemBtn}>
        <p>
          Cache audio: {"[ Aprox: "} {parseBytes(dataSize.usage)}/
          {parseBytes(dataSize.quota)} {"]"}{" "}
          <span className="hint" data-hint="Audio data cached during play">
            ?
          </span>
        </p>
        <input
          type="checkbox"
          data-on="ON"
          data-off="OFF"
          checked={gState.cacheAudio}
          onChange={(e) => {
            dispatch(initSetting({ cacheAudio: e.currentTarget.checked }));
            dataDb.settingVars.update(1, {
              cacheAudio: e.currentTarget.checked,
            });
            if (!e.currentTarget.checked) {
              dataDb.audioCache.clear().then((e) => {
                navigator.storage.estimate().then((e) => {
                  setDataSize({ quota: e.quota || 0, usage: e.usage || 0 });
                });
              });
            }
          }}
        />
      </div>
      <div className={style.itemBtn}>
        <p>
          Cache audio number:{" "}
          <span
            className="hint"
            data-hint="Number of audio file allowed to be cached"
          >
            ?
          </span>
        </p>
        <input
          type="number"
          value={gState.cacheAudioNumber}
          onInput={(e) => {
            dispatch(
              initSetting({
                cacheAudioNumber: e.currentTarget.valueAsNumber || 0,
              })
            );
            dataDb.settingVars.update(1, {
              cacheAudioNumber: e.currentTarget.valueAsNumber,
            });
          }}
        />
      </div>
    </div>
  );
}
