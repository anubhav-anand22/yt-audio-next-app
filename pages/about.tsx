import Image from "next/image";
import { IoLogoInstagram, IoLogoGithub } from "react-icons/io";
import { MdOutlineMail } from "react-icons/md";
import styles from "../styles/Pages/about.module.css";

export default function About() {
  return (
    <div className={styles.outer}>
      <div className={styles.main}>
        <div>
          <Image
            width={100}
            height={100}
            alt="Anubhav Anand profile pic"
            src="/profilepic.jpg"
            className={styles.propic}
          />
        </div>
        <div className={styles.txtCont}>
          <p className={styles.txthi}>Hi there</p>
          <p className={styles.txtName}>
            {"I'm"}{" "}
            <span>
              <a href="#">Anubhav Anand</a>
            </span>
          </p>
          <p className={styles.txtint}>
            A <span>fullstack web developer</span> passionate about creating
            fullstack responsive web apps or hybrid mobile and desktop app with
          </p>
          <div className={styles.mystack}>
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="https://reactjs.org/"
            >
              Reactjs
            </a>
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="https://www.solidjs.com/"
            >
              Solidjs
            </a>
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="https://nodejs.org/en/"
            >
              Nodejs
            </a>
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="https://reactnative.dev/"
            >
              React native
            </a>
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="https://www.electronjs.org/"
            >
              Electron
            </a>
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="https://tauri.app/"
            >
              Tauri
            </a>
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="https://www.google.com/search?q=vanilla+js"
            >
              Vanelajs
            </a>
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="https://www.google.com/search?q=html"
            >
              HTML
            </a>
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="https://www.google.com/search?q=css"
            >
              CSS
            </a>
          </div>
          <div className={styles.contactA}>
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="https://www.instagram.com/ak7488_/"
            >
              <IoLogoInstagram size={32} />
            </a>
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="mailto:anubhav.ak22@gmail.com?subject=From%20ak-audio%20app"
            >
              <MdOutlineMail size={32} />
            </a>
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="https://github.com/anubhav-anand22"
            >
              <IoLogoGithub size={32} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
