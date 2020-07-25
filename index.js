import * as functions from "firebase-functions";
import fs from "fs";
import React from "react";
import { renderToString } from "react-dom/server";
import App from "./src/App";

const INDEX = fs.readFileSync(__dirname + "/src/index.html", "utf-8");

exports.app = functions.https.onRequest((request, response) => {
  const HTML = INDEX.replace("<!--app-->", renderToString(<App />));
  response.send(HTML);
});
