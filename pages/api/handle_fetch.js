// implementacion incompleta
// el mismo funciona, pero por causas descocidad 
//la funcion no es cancelada como en el ejemplo de la docuemntacion siguiente:
// https://simonplend.com/how-to-cancel-an-http-request-in-node-js/

import clipboardy from "clipboardy";
import fetch from "node-fetch";
import { AbortError } from "node-fetch";

import { setTimeout } from "node:timers/promises";

const cancelRequest = new AbortController();
const cancelTimeout = new AbortController();

async function makeRequest(url) {
  try {
    const response = await fetch(url, { signal: cancelRequest.signal });
    const responseData = await response.json();

    return responseData;
  } finally {
    cancelTimeout.abort();
  }
}

async function timeout(delay) {
  try {
    await setTimeout(delay, undefined, { signal: cancelTimeout.signal });

    cancelRequest.abort();
  } catch (error) {
    return;
  }

  throw new Error(`Request aborted as it took longer than ${delay}ms`);
}

export default async function get_img_b64(req, res) {
  //console.log("entro a handle get");
  const imageUrl = req.query.url;

  try {
    const url = "https://jsonplaceholder.typicode.com/posts";
    //console.log("entro en el try");

    const result = await Promise.race([makeRequest(url), timeout(5000)]);
    ////console.log(result);
    //console.log({ result });

    // if (
    //   responseResult.status === "fulfilled" &&
    //   responseResult.value.status === 200
    // ) {
    //   return res.status(200).json({ data: result });
    // }
    throw new Error("Error al cargar la imagen");
  } catch (error) {
    if (error.message.includes("Request aborted")) {
      //console.log("La petición fue abortada");
    } else {
      //console.log("Ocurrió un error:", error);
    }
    return res.status(500).json({ error: "Error al cargar la imagen" });
  }
}
