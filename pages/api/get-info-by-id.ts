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
  const id = typeof req.query.id === 'string' ? req.query.id : "";

  if(!id) return res.status(400).send({error: "id query is required", data: []});

  const data = await ytdl.getInfo(`https://www.youtube.com/watch?v=${id}`)

  res.send({
    data: {
      videoDetails: data.videoDetails,
      related_videos: data.related_videos,
      url: data?.formats?.filter((e: any) => e?.hasAudio && !e?.hasVideo)[0]?.url || ""
    },
    error: ""
  })

  
}
