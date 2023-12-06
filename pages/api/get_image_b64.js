const request = require("request").defaults({ encoding: null });
import clipboardy from "clipboardy";

export default async function x(req, res) {
  const imageUrl = req.query.url;

  return new Promise((resolve, reject) => {
    request.get(imageUrl, function (error, response, body) {
      //console.log(response.statusCode);
      if (error) reject(error);
      if (!error && response.statusCode == 200) {
        const data =
          "data:" +
          response.headers["content-type"] +
          ";base64," +
          Buffer.from(body).toString("base64");
        clipboardy.writeSync(data);
        resolve(res.status(200).json({ data: { img_b64: data } }));
      }
    });
  });
}
