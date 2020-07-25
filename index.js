import * as functions from "firebase-functions";
import fs from "fs";
import React from "react";
import { renderToString } from "react-dom/server";
import express from "express";
import App from "./src/App";

const INDEX = fs.readFileSync(__dirname + "/src/index.html", "utf-8");

const app = express();

app.use("/static", express.static("static"));

app.get("/", (req, res) => {
  const HTML = INDEX.replace("<!--app-->", renderToString(<App />));
  res.send(HTML);
});

exports.app = functions.https.onRequest(app);
