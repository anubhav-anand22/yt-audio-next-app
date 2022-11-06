import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsDark } from "../store/settingSlice";
import style from "../styles/Components/GlobalLoading.module.css";

const GlobalLoading = () => {
    const { isLoading } = useSelector((state: GStateType) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        const isDark = localStorage.getItem("IS_DARK_MODE");
        const isSystemDarkMode = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
    
        if (isDark && isDark === "true") {
          document.documentElement.setAttribute("data-theme", "dark");
          dispatch(setIsDark(true));
        } else if (isDark && isDark === "false") {
          document.documentElement.setAttribute("data-theme", "light");
          dispatch(setIsDark(false));
        } else if (!isDark && isSystemDarkMode) {
          document.documentElement.setAttribute("data-theme", "dark");
          localStorage.setItem("IS_DARK_MODE", "true");
          dispatch(setIsDark(true));
        } else {
          document.documentElement.setAttribute("data-theme", "light");
          localStorage.setItem("IS_DARK_MODE", "false");
          dispatch(setIsDark(false));
        }
      }, [dispatch]);

    return (
        <>
            {isLoading.value ? (
                <div className={style.loaderBack}>
                    <div className={style.loaderCont}>
                        <div className={style.loaderOut}>
                            <div className={style.loaderIn}></div>
                        </div>
                        <p>{isLoading.message}</p>
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default GlobalLoading;
