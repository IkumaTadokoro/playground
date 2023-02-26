const express = require("express");
const api = require("./routes/api");

const app = express();
const port = 4949;

app.use("/api", api);
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.end("Top Page");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
