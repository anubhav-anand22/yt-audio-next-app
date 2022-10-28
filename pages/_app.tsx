import "../styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import headerModule from "../styles/Header.module.css";
import Drawer from '../Components/Drawer'
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
    const [isDrawerShow, setIsDrawerShow] = useState(true);
    return (
        <div>
            <header className={headerModule.header}>
                <Link href="/"><h1>YTA</h1></Link>
                <nav className={headerModule.nav}>
                    <ul className={headerModule.navUl}>
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li>
                            <Link href="/setting">Setting</Link>
                        </li>
                        <li>
                            <Link href="/about">About me</Link>
                        </li>
                    </ul>
                </nav>
                <div className={headerModule.drawrIcon} onClick={() => setIsDrawerShow(true)}>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
            </header>
            <Drawer isDrawerShow={isDrawerShow} setIsDrawerShow={setIsDrawerShow} />
            <Component {...pageProps} />
        </div>
    );
}
