const express = require("express");
const router = express.Router();

const allowList = [
  // Q. これって、http://127.0.0.1:4949だとどうなる？
  // A. Origin違いとみなされて、CORSエラーになる
  "http://localhost:4949",
  "http://site.example:4949",
];

router.use((req, res, next) => {
  if (req.headers.origin && allowList.includes(req.headers.origin)) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
  }
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Headers", "X-Token");
  }
  next();
});

router.get("/", (req, res) => {
  res.setHeader("X-Timestamp", Date.now());
  let message = req.query.message;
  const lang = req.headers["X-Lang"];

  if (message === "") {
    res.status(400);
    if (lang === "ja") {
      message = "クエリ文字列が空です";
    } else {
      message = "Query string is empty";
    }
  }
  res.send({ message });
});

router.use(express.json());
router.post("/", (req, res) => {
  const body = req.body;
  console.log(body);
  res.end();
});

module.exports = router;
