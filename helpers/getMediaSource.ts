import { dataDb } from "../db/dataDb";

const wait = (t: number) => new Promise((resove) => setTimeout(resove, t));

export const getMediaSource = (url: string, id: string, error: () => void) => {
  const mediaSource = new MediaSource();
  const newUrl = window.URL.createObjectURL(mediaSource);

  mediaSource.addEventListener("sourceopen", () => {
    console.log("%c Opened source", "background: #000; color: #fff"); //----console--
    dataDb.audioCache
      .get(id)
      .then(async (audioCache) => {
        console.log("%c audio cache", "background: #000; color: #fff"); //----console--
        console.log(audioCache); //----console--
        if (!audioCache || !audioCache.mime) throw new Error("no cache found");

        const sourceBuffer = mediaSource.addSourceBuffer(audioCache.mime);

        mediaSource.duration = audioCache.duration;

        for (let index in audioCache.buffer) {
          sourceBuffer.appendBuffer(audioCache.buffer[index]);
          await wait(100);
          console.log(
            "%c apend buffer " + index,
            "background: #000; color: #fff"
          ); //----console--
        }
      })
      .catch(async (e) => {
        console.log(e);
        const response = await fetch(url).catch((e) => {
          error();
          return e;
        });

        const body = response.body;

        const reader = body?.getReader();

        const mime = response.headers.get("Content-Type");

        if (!mime) return error();

        const newBuffer: any[] = [];

        let streamNotDone = true;

        const sourceBuffer = mediaSource.addSourceBuffer(mime);

        while (streamNotDone) {
          const data = await reader?.read();

          if (data) {
            if (data.done) {
              streamNotDone = false;
              dataDb.settingVars.get(1).then((e) => {
                if (e?.cacheAudio) {
                  dataDb.audioCache.add({
                    buffer: newBuffer,
                    duration: mediaSource.duration,
                    id,
                    mime,
                  });
                }
              });
              break;
            }

            await new Promise((resolve, reject) => {
              sourceBuffer.appendBuffer(data.value);
              newBuffer.push(data.value);

              sourceBuffer.onupdateend = () => {
                resolve(true);
              };
            });
          } else {
            error();
            console.log("NO data");
            streamNotDone = false;
            break;
          }
        }
      });
  });

  return newUrl;
};

/*
const mediaSource = new MediaSource();

  let streamNotDone = true;

  const newUrl = window.URL.createObjectURL(mediaSource);

  mediaSource.addEventListener("sourceopen", async () => {
    mediaSource.duration = duration;

    if (oldBuffer.length === 0) {
      const response = await fetch(url, {}).catch((e) => {
        error();
        console.log(e);
        return e;
      });

      const body = response.body;

      const reader = body?.getReader();

      const mime = response.headers.get("Content-Type") || "";

      const newBuffer: any[] = [];

      const sourceBuffer = mediaSource.addSourceBuffer(mime);

      while (streamNotDone) {
        const data = await reader?.read();

        if (data) {
          if (data.done) {
            cb(newBuffer, mime);
            streamNotDone = false;
            break;
          }

          await new Promise((resolve, reject) => {
            sourceBuffer.appendBuffer(data.value);
            newBuffer.push(data.value);

            sourceBuffer.onupdateend = () => {
              resolve(true);
            };
          });
        } else {
          error();
          console.log("NO data");
          streamNotDone = false;
          break;
        }
      }
    } else {
      const sourceBuffer = mediaSource.addSourceBuffer(mime);

      for (let index in oldBuffer) {
        sourceBuffer.appendBuffer(oldBuffer[index]);
      }
    }
  });

  return newUrl;
*/
