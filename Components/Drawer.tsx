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
  route: NextRouter;
  onClick?(): void;
  isMobileOnly?: boolean;
}

const Drawer = ({ isDrawerShow, setIsDrawerShow }: DrawerProps) => {
  const route = useRouter();

  const onItemClick = () => {
    setIsDrawerShow(false);
  };
  return (
    <div
      className={`${style.drawer} ${
        isDrawerShow ? style.showDrawer : style.hideDrawer
      }`}
      onClick={() => setIsDrawerShow(false)}
    >
      <nav className={style.drawer_nav} onClick={(e) => e.stopPropagation()}>
        <div className={style.drawer_nav_search}>
          <input type="url" placeholder="Url" />
          <button>Go</button>
        </div>
        <ul className={style.drawer_nav_ul}>
          <LinkItem
            href="/"
            title="Home"
            route={route}
            onClick={onItemClick}
            isMobileOnly
          />
          <LinkItem
            href="/setting"
            title="Setting"
            route={route}
            onClick={onItemClick}
            isMobileOnly
          />
          <LinkItem
            href="/about"
            title="About me"
            route={route}
            onClick={onItemClick}
          />
          <LinkItem
            href="/history"
            title="History"
            route={route}
            onClick={onItemClick}
          />
        </ul>
      </nav>
    </div>
  );
};

const LinkItem = ({
  href,
  title,
  route,
  onClick = () => {},
  isMobileOnly,
}: LinkItemProps) => {
  return (
    <Link
      className={`${isMobileOnly ? style.mobileOnly : ""}`}
      onClick={onClick}
      href={href}
    >
      <li className={`${route.pathname === href ? style.activePathLi : ""}`}>
        {title}
      </li>
    </Link>
  );
};

export default Drawer;
