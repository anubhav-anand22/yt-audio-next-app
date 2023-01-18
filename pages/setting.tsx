import { useDispatch, useSelector } from "react-redux";
import { setIsDark, toggleIsDark } from "../store/settingSlice";
import style from "../styles/Pages/setting.module.css";

export default function Setting() {
  const { isDark } = useSelector((state: GStateType) => state.setting);
  const dispatch = useDispatch();

  const onThemeChange = () => {
    const val = !isDark;
    dispatch(setIsDark(val));
    document.documentElement.setAttribute("data-theme", val ? "dark" : "light");
    localStorage.setItem("IS_DARK_MODE", val ? "true" : "false");
  };

  return (
    <div className={style.settingPage}>
      <div className={style.itemBtn}>
        <p>Theme:</p>
        <button onClick={onThemeChange}>{isDark ? "Dark" : "Light"}</button>
      </div>
      <div className={style.itemBtn}>
        <p>Export data:</p>
        <button>Export</button>
      </div>
      <div className={style.itemBtn}>
        <p>Import data:</p>
        <button>Import</button>
      </div>
    </div>
  );
}
