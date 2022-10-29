import "../styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import headerModule from "../styles/Header.module.css";
import Drawer from "../Components/Drawer";
import { useState } from "react";
import { NextRouter, useRouter } from "next/router";
import { Provider } from "react-redux";
import store from "../store/store";
import GlobalLoading from "../Components/GlobalLoading";
import Notification from "../Components/Notification";

export default function App({ Component, pageProps }: AppProps) {
    const [isDrawerShow, setIsDrawerShow] = useState(false);
    const route = useRouter();
    return (
        <Provider store={store}>
            <div>
                <header className={headerModule.header}>
                    <Link href="/">
                        <h1>YTA</h1>
                    </Link>
                    <nav className={headerModule.nav}>
                        <ul className={headerModule.navUl}>
                            <LinkItem href="/" title="Home" route={route} />
                            <LinkItem
                                href="/setting"
                                title="Setting"
                                route={route}
                            />
                            <LinkItem
                                href="/about"
                                title="About me"
                                route={route}
                            />
                        </ul>
                    </nav>
                    <div
                        className={headerModule.drawrIcon}
                        onClick={() => setIsDrawerShow(true)}
                    >
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </header>
                <Drawer
                    isDrawerShow={isDrawerShow}
                    setIsDrawerShow={setIsDrawerShow}
                />
                <GlobalLoading />
                <Notification />
                <Component {...pageProps} />
            </div>
        </Provider>
    );
}

interface LinkItemProps {
    title: string;
    href: string;
    route: NextRouter;
}

const LinkItem = ({ href, title, route }: LinkItemProps) => {
    return (
        <Link href={href}>
            <li
                className={`${
                    route.pathname === href ? headerModule.activePathLi : ""
                }`}
            >
                {title}
            </li>
        </Link>
    );
};
