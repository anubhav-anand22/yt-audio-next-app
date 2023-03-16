import type { NextApiRequest, NextApiResponse } from "next";
import ytdl from "ytdl-core";
import https from "node:https";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const id = typeof req.query.id === "string" ? req.query.id : "";

  if (!id)
    return res.status(400).send({ error: "id query is required", data: [] });

  const data = await ytdl.getInfo(`https://www.youtube.com/watch?v=${id}`);

  const obj = data.formats.find((e) => e.itag === 140);
  const range = req.headers.range
    ?.toLowerCase()
    .replace("bytes=", "")
    .split("-") || ["0", null];
  const start = range[0] || "0";
  const end = range[1] || parseInt(obj?.contentLength || "") - 1;

  if (!obj?.url) return res.status(404).send("");

  res.writeHead(206, "keep-alive", {
    "Content-Length": obj.contentLength,
    "Accept-Ranges": "bytes",
    "Content-Type": obj.mimeType,
    "Content-Range": `bytes ${start}-${end}/${obj.contentLength}`,
  });

  console.log(obj.mimeType, obj.url);

  https.get(
    obj.url,
    {
      headers: {
        range: `bytes=${start}-${end}`,
      },
    },
    (stream) => {
      stream.pipe(res);
    }
  );
}
