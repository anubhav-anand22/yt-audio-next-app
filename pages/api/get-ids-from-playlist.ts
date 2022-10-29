import type { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios'

type Data = {
    data?: any;
    error?: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const key = process.env.YT_API_KEY;
    const playlistid = typeof req.query.id === "string" ? req.query.id : "";

    if (!key) return res.status(500).send({ error: "", data: [] });
    if (!playlistid) return res.status(400).send({error: "Id is required", data: []});

    let 
    url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistid}&key=${process.env.YT_API_KEY}`;

    const helper = (nextPageToken: string = '') => {
        return new Promise((resolve, reject) => {
            if(nextPageToken) url = url + "&pageToken=" + nextPageToken
            axios.get(url).then(async (e) => {
                const pageToken = e.data.nextPageToken;
                let nextData: any = [];
                if(pageToken) nextData = await helper(pageToken);
                resolve([...e.data.items, ...nextData])
            }).catch(reject)
        });
    }
    
    const data: any = await helper('')

    res.send({error: "", data: data.map(
        (e: any) => e.snippet.resourceId.videoId
    )})
}
