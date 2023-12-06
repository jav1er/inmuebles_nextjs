import fetch, { AbortError } from "node-fetch";

export default async function get_img_b64(req, res) {
  //console.log("ejemplo de como abortar un request");
  const controller = new AbortController();
  const timeout = setTimeout(() => {
    controller.abort();
  }, 88);

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      signal: controller.signal,
    });
    //console.log(response.status);
    const responseResult = await response.json();

    ////console.log(responseResult);
    if (responseResult.status === 200) {
      //console.log('en 200');
      return res.status(200).json({ data: result });
    }else{
      return res.status(500).json({ data: 'error' });
    }
    ////console.log(responseResult);
  } catch (error) {
    if (error instanceof AbortError) {
      //console.log("request was aborted");
      return res.status(500).json({ data: 'error' });
    }
  } finally {
    clearTimeout(timeout);
  }
}
