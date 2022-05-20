const express = require("express");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 4000;

app.use(express.static("public"));
app.get("/video", (req, res) => {
  let { range } = req.headers;
  if (!range) {
    return res.status(400).send("Requires Range header");
  }

  let videoSize = fs.statSync("videos/video.mp4").size;
  // parse range
  // ejemplo: "Bytes=32324-"
  const CHUNK_SIZE = 10 ** 6; // 1MB
  const start = Number(range.replace(/\D/g, "")); // remover todos los caracteres que no son numeros o digitos
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };
  res.writeHead(206, headers);

  let stream = fs.createReadStream("videos/video.mp4", { start, end });
  stream.pipe(res);
});
app.listen(port, () => {
  console.log("aplicacion ejecutandose en el puerto: ", port);
});
