import fetch, { AbortError } from "node-fetch";
export default async function get_image(req, res) {
 // console.log("estas en traer endpoint");
  const controller = new AbortController();
  const timeout = setTimeout(() => {
    controller.abort();
  }, 4000);
  const params = req.query;

  const p = JSON.parse(params.params);
  const t = new URLSearchParams(p);

  const query = `${"https://643c5bc8f0ec48ce9042d8f2.mockapi.io/digital/posts/"}?${t}`;
  //console.log(p);
  //console.log(params);
  //console.log(query);

  try {
    const response = await fetch(
      query,
      {
        signal: controller.signal,
      }
    );

    const responseData = await response.json();

    if (response.status === 200) {
      //console.log("estas en 200");
      //console.log(responseData);
      res.status(200).json(responseData);
    } else {
      res.status(500).json({ error: "Error loading image" });
    }
    ////console.log(responseResult);
  } catch (error) {
    if (error instanceof AbortError) {
      //console.log(" 504 request was aborted");
      res.status(504).json({ msg: "Gateway Timeout" });
    }
  } finally {
    clearTimeout(timeout);
  }
}
