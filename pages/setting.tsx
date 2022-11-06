import { useDispatch, useSelector } from "react-redux";
import { setIsDark, toggleIsDark } from "../store/settingSlice";
import style from '../styles/Pages/setting.module.css'

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
      <div className={style.itemBool}>
        <p>Theme:</p>
        <button onClick={onThemeChange}>{isDark ? "Dark" : "Light"}</button>
      </div>
      <div className={style.itemRange}>
        <p>Volume change rate:</p>
        <div className={style.itemRangeRangeCont}>
          <p>1</p>
          <input max={20} min={1} type="range" />
          <p>20</p>
        </div>
      </div>
    </div>
  );
}
