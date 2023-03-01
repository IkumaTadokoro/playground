const express = require("express");
const crypto = require("crypto");
const api = require("./routes/api");
const csrf = require("./routes/csrf");

const app = express();
const port = 4949;

app.set("view engine", "ejs");
app.use("/api", api);
app.use("/csrf", csrf);
app.use(
  express.static("public", {
    setHeaders: (res, path, stat) => {
      res.header("X-Frame-Options", "DENY");
    },
  })
);

app.get("/", (req, res) => {
  res.end("Top Page");
});

app.get("/csp", (req, res) => {
  const nonceValue = crypto.randomBytes(16).toString("base64");
  res.header(
    "Content-Security-Policy",
    `script-src 'nonce-${nonceValue}' 'strict-dynamic';` +
      "object-src 'none';" +
      "base-uri 'none';" +
      "require-trusted-types-for 'script';"
  );
  res.render("csp", { nonce: nonceValue });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
