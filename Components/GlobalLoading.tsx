import { useSelector } from "react-redux";
import style from "../styles/Components/GlobalLoading.module.css";

const GlobalLoading = () => {
    const { isLoading } = useSelector((state: GStateType) => state);

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
