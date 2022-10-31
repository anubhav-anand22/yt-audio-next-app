import "../styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import headerModule from "../styles/Header.module.css";
import Drawer from "../Components/Drawer";
import { useEffect, useState } from "react";
import { NextRouter, useRouter } from "next/router";
import { Provider } from "react-redux";
import store from "../store/store";
import GlobalLoading from "../Components/GlobalLoading";
import Notification from "../Components/Notification";
import Head from "next/head";
import { parseUrlInput } from "../helpers/parseUrlInput";

export default function App({ Component, pageProps }: AppProps) {
    const [isDrawerShow, setIsDrawerShow] = useState(false);
    const route = useRouter();

    useEffect(() => {
        const parsedUrl = new URL(window.location.href);
        const text = parsedUrl.searchParams.get("text");
        if (text) {
            const parsedData = parseUrlInput(text);
            if (parsedData.listId) {
                window.location.href = `${parsedUrl.protocol}//${parsedUrl.hostname}${parsedUrl.port ? ":" + parsedUrl.port : ""}/video-list-player?list=${parsedData.listId}`;
            } else if (parsedData.videoId) {
                window.location.href = `${parsedUrl.protocol}//${parsedUrl.hostname}${parsedUrl.port ? ":" + parsedUrl.port : ""}/video-player?vid=${parsedData.videoId}`;
            }
        }
    }, []);

    return (
        <Provider store={store}>
            <div>
                <Head>
                    <link
                        rel="apple-touch-icon"
                        href="icons/apple-icon-180.png"
                    />

                    <meta name="apple-mobile-web-app-capable" content="yes" />
                    
                    <link rel="manifest" href="manifest.json" />
                    <link
                        rel="apple-touch-startup-image"
                        href="icons/apple-splash-2048-2732.jpg"
                        media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        href="icons/apple-splash-2732-2048.jpg"
                        media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        href="icons/apple-splash-1668-2388.jpg"
                        media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        href="icons/apple-splash-2388-1668.jpg"
                        media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        href="icons/apple-splash-1536-2048.jpg"
                        media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        href="icons/apple-splash-2048-1536.jpg"
                        media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        href="icons/apple-splash-1668-2224.jpg"
                        media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        href="icons/apple-splash-2224-1668.jpg"
                        media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        href="icons/apple-splash-1620-2160.jpg"
                        media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        href="icons/apple-splash-2160-1620.jpg"
                        media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        href="icons/apple-splash-1290-2796.jpg"
                        media="(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        href="icons/apple-splash-2796-1290.jpg"
                        media="(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        href="icons/apple-splash-1179-2556.jpg"
                        media="(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        href="icons/apple-splash-2556-1179.jpg"
                        media="(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        href="icons/apple-splash-1284-2778.jpg"
                        media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        href="icons/apple-splash-2778-1284.jpg"
                        media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        href="icons/apple-splash-1170-2532.jpg"
                        media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        href="icons/apple-splash-2532-1170.jpg"
                        media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        href="icons/apple-splash-1125-2436.jpg"
                        media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        href="icons/apple-splash-2436-1125.jpg"
                        media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        href="icons/apple-splash-1242-2688.jpg"
                        media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        href="icons/apple-splash-2688-1242.jpg"
                        media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        href="icons/apple-splash-828-1792.jpg"
                        media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        href="icons/apple-splash-1792-828.jpg"
                        media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        href="icons/apple-splash-1242-2208.jpg"
                        media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        href="icons/apple-splash-2208-1242.jpg"
                        media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        href="icons/apple-splash-750-1334.jpg"
                        media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        href="icons/apple-splash-1334-750.jpg"
                        media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        href="icons/apple-splash-640-1136.jpg"
                        media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        href="icons/apple-splash-1136-640.jpg"
                        media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                    />
                </Head>
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
