// server.js
import express from "express";
import cors from "cors";
// const http = require("http");

const app = express();

app.use(express.json());
app.use(express.text());

app.use(
  cors({
    origin: "http://127.0.0.1:5501",
    method: ["OPTIONS", "POST", "GET", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

let data = { message: "여러분 화이팅!" };

app.get("/", (req, res) => {
  res.status(200).json(data);
});

app.put("/", (req, res) => {
  data.message = req.body;
  res.status(200).json(data);
});

app.delete("/", (req, res) => {
  data.message = "";
  res.status(200).json(data);
});

app.listen(3000, () => {
  console.log("서버가 http://localhost:3000/ 에서 실행 중입니다.");
});
