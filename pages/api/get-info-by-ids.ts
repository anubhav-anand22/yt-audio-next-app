import type { NextApiRequest, NextApiResponse } from 'next'
import ytdl from 'ytdl-core'

type Data = {
  data?: ytdl.videoInfo[],
  error?: string,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const ids = typeof req.query.ids === 'string' ? req.query.ids : "";

  if(!ids) return res.status(400).send({error: "ids query is required", data: []});

  const idsArr = ids.split(' ').filter(e => e !== "")

  const idsArrPromise = idsArr.map(e => ytdl.getInfo(`https://www.youtube.com/watch?v=${e}`))

  const data = await Promise.all(idsArrPromise);

  res.send({data: data, error: ""})
}
