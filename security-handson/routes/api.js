const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.setHeader("X-Timestamp", Date.now());
  let message = req.query.message;
  const lang = req.headers["X-Lang"];

  if (!message) {
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
