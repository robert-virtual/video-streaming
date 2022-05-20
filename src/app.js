const express = require("express");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.get("/video", (req, res) => {
  let stream = fs.createReadStream("videos/video.mp4");
  stream.pipe(res);
});
app.listen(port, () => {
  console.log("aplicacion ejecutandose en el puerto: ", port);
});
