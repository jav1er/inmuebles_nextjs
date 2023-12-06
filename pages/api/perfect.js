import fetch, { AbortError } from "node-fetch";

export default async function get_img_b64(req, res) {
  //console.log("entro a handle get");
  const imageUrl = req.query.url;
  const controller = new AbortController();
  const timeout = setTimeout(() => {
    controller.abort();
  }, 4000);

  try {
    const imageUrlData = await fetch(imageUrl, {
      signal: controller.signal,
    });
    //console.log(imageUrlData.status);
    if (imageUrlData.status === 200) {
      const buffer = await imageUrlData.arrayBuffer();
      const stringifiedBuffer = Buffer.from(buffer).toString("base64");
      const contentType = imageUrlData.headers.get("content-type");
      const imageBase64 = `data:${contentType};base64,${stringifiedBuffer}`;
      res.status(200).json({ data: { img_b64: imageBase64 } });
    } else {
      return res.status(404).json({ data: "error" });
    }
    ////console.log(responseResult);
  } catch (error) {
    if (error instanceof AbortError) {
      //console.log("request was aborted");
      return res.status(500).json({ data: "request was aborted" });
    }
  } finally {
    clearTimeout(timeout);
  }
}
