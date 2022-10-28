import style from "../styles/Components/Drawer.module.css";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { NextRouter, useRouter } from "next/router";

interface DrawerProps {
    isDrawerShow: boolean;
    setIsDrawerShow: Dispatch<SetStateAction<boolean>>;
}

interface LinkItemProps {
    title: string;
    href: string;
    route: NextRouter
}

const Drawer = ({ isDrawerShow, setIsDrawerShow }: DrawerProps) => {
    const route = useRouter();
    return (
        <div
            className={`${style.drawer} ${
                isDrawerShow ? style.showDrawer : style.hideDrawer
            }`}
            onClick={() => setIsDrawerShow(false)}
        >
            <nav
                className={style.drawer_nav}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={style.drawer_nav_search}>
                    <input type="url" placeholder="Url" />
                    <button>Go</button>
                </div>
                <ul className={style.drawer_nav_ul}>
                    <LinkItem href="/" title="Home" route={route} />
                    <LinkItem href="/setting" title="Setting" route={route}  />
                    <LinkItem href="/about" title="About me" route={route}  />
                </ul>
            </nav>
        </div>
    );
};

const LinkItem = ({ href, title, route }: LinkItemProps) => {
    return (
        <li className={`${route.pathname === href ? style.activePathLi : ""}`}>
            <Link href={href}>{title}</Link>
        </li>
    );
};

export default Drawer;
