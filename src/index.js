import * as functions from "firebase-functions";
import fs from "fs";
import React from "react";
import { renderToString } from "react-dom/server";
import express from "express";
import App from "./components/App";

const app = express();
const INDEX = fs.readFileSync(__dirname + "/index.html", "utf-8");
const appString = renderToString(<App />);

app.use("/static", express.static("static"));

app.get("**", (req, res) => {
  const HTML = INDEX.replace("<!--app-->", appString);
  res.send(HTML);
});

exports.app = functions.https.onRequest(app);
