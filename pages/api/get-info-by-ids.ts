import type { NextApiRequest, NextApiResponse } from 'next'
import ytdl from 'ytdl-core'

type Data = {
  data?: any,
  error?: string,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const ids = typeof req.query.ids === 'string' ? req.query.ids : "";

  if(!ids) return res.status(400).send({error: "ids query is required", data: []});

  const dataPromiseArr = ids.split(' ').map(e => ytdl.getInfo(`https://www.youtube.com/watch?v=${e}`));

  const data = await Promise.all(dataPromiseArr);

  res.send({
    data: data.map(e => {
        return {
            videoDetails: e.videoDetails,
            related_videos: e.related_videos,
            url: e.formats.find(e => e.itag === 140)?.url
          }
    }),
    error: ""
  })

  
}
