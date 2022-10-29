import { useSelector } from "react-redux";
import style from "../styles/Components/GlobalLoading.module.css";

const GlobalLoading = () => {
    const { isLoading } = useSelector((state: GStateType) => state);

    return (
        <>
            {isLoading ? (
                <div className={style.loaderBack}>
                    <div className={style.loaderOut}>
                        <div className={style.loaderIn}></div>
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default GlobalLoading;
