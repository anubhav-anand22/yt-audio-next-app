import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { parseUrlInput } from "../helpers/parseUrlInput";
import style from "../styles/Home.module.css";

export default function Home() {
  const [url, setUrl] = useState('');
  const router = useRouter();

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!url) return;
    const data = parseUrlInput(url);
    if(data.listId) {
      router.push("/video-list-player?list=" + data.listId)
    } else if (data.videoId) {
      router.push('/video-player?vid=' + data.videoId)
    }
  }

    return (
        <div className={style.home}>
            <form className={style.form} onSubmit={onFormSubmit}>
                <input
                    type="text"
                    required
                    placeholder="Youtube video or playlist url"
                    value={url}
                    onChange={e => setUrl(e.currentTarget.value)}
                />
                <button>Go</button>
            </form>
        </div>
    );
}
