//const request = require("request").defaults({ encoding: null });
import clipboardy from "clipboardy";
import fetch from "node-fetch";
export default async function get_img_b64(req, res) {
  //console.log("estas en  get_img_b64");
  const imageUrl = req.query.url;

  const imageUrlData = await fetch(imageUrl);

  if (imageUrlData.status === 200) {
    const buffer = await imageUrlData.arrayBuffer();
    const stringifiedBuffer = Buffer.from(buffer).toString("base64");
    const contentType = imageUrlData.headers.get("content-type");
    const imageBase64 = `data:${contentType};base64,${stringifiedBuffer}`;
    res.status(200).json({ data: { img_b64: imageBase64 } });
  }

  //clipboardy.writeSync(imageBase64);
}
