import * as functions from "firebase-functions";
import fs from "fs";
import React from "react";
import { renderToString } from "react-dom/server";
import express from "express";
import App from "./components/App";
import axios from "axios";

const app = express();
let index = fs.readFileSync(__dirname + "/index.html", "utf-8");

app.use("/static", express.static("static"));

app.get("/", (req, res) => {
  fetchNews().then((news) => {
    const appString = renderToString(<App news={news.data} />);
    index = index.replace("<!--app-->", appString);
    index = index.replace('"SSR_DATA"', JSON.stringify(news.data));
    res.send(index);
  });
});

function fetchNews(page = 1) {
  const URL = "https://hn.algolia.com/api/v1/search_by_date";
  return axios.get(URL, {
    params: {
      query: "javascript",
      tags: "story",
      page: page,
    },
  });
}

exports.app = functions.https.onRequest(app);
