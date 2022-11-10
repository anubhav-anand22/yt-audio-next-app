import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchItemTypeRootObj>
) {
  try {
    const q = typeof req.query.q === "string" ? req.query.q : "";

    if (!q)
      return res.status(400).send({ error: "query is required", data: [] });

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${q}&type=video&type=playlist&key=${process.env.YT_API_KEY}`;

    const { data } = await axios(url);

    res.send({ data: data.items, error: "" });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send({
        data: [],
        error: "Something went wrong! please try againg after some time",
      });
  }
}
