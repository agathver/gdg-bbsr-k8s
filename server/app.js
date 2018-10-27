const express = require("express");

const app = express();

const stage = process.env.NODE_ENV || "development";
const prod = process.env.NODE_ENV === "production";

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Hello World!",
    stage,
    nowIs: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.get("/fortune", (req, res) => {
  res.json(process.env.FORTUNE || "None");
});

app.use((req, res) => {
  res.status(404).send("Not found");
});

app.use((err, req, res, next) => {
  const response = {
    message: err.message || "Internal server error"
  };

  if (!prod) {
    response._debug = err;
  }
  res.status(err.status || 500).json(response);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
