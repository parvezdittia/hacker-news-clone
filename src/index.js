import * as functions from "firebase-functions";
import fs from "fs";
import React from "react";
import { renderToString } from "react-dom/server";
import express from "express";
import App from "./components/App";
import axios from "axios";

const app = express();
//Make async
let index = fs.readFileSync(__dirname + "/index.html", "utf-8");

app.use("/static", express.static("static"));

app.get("/", (req, res) => {
  fetchNews().then((response) => {
    const newsFeed = filter(response.data);
    const appString = renderToString(<App news={newsFeed} />);
    index = index.replace("<!--app-->", appString);
    index = index.replace('"SSR_DATA"', JSON.stringify(newsFeed));
    res.send(index);
  });
});

app.get("/getUpVotes", (req, res) => {
  res.send("Dummy API to get upVotes");
});

app.get("/setUpVotes", (req, res) => {
  res.send("Dummy API to get upVotes");
});

app.get("/robots.txt", (req, res) => {
  let robots = fs.readFileSync(__dirname + "/robots.txt", "utf-8");
  res.send(robots);
});

app.get("/page/:page", (req, res) => {
  let page = req.params.page;
  page = parseInt(page);
  console.log(page);
  if (!page || (page && page <= 1)) {
    page = Math.abs(page);
    res.redirect(`/`);
  }
  fetchNews(page).then((response) => {
    const newsFeed = filter(response.data);
    const appString = renderToString(<App news={newsFeed} />);
    index = index.replace("<!--app-->", appString);
    index = index.replace('"SSR_DATA"', JSON.stringify(newsFeed));
    res.send(index);
  });
});

app.all("**", (req, res) => {
  res.redirect("/");
});

function fetchNews(page = 0) {
  const URL = "https://hn.algolia.com/api/v1/search_by_date";
  return axios.get(URL, {
    params: {
      query: "javascript,css,html",
      tags: "story",
      page: page,
    },
  });
}

function filter(data) {
  let filteredData = [];

  data.hits.forEach((element) => {
    filteredData.push({
      id: element.objectID,
      comments: element.num_comments,
      votes: element.points,
      details: element.title,
      url: element.url,
      author: element.author,
      timeStamp: element.created_at_i,
    });
  });

  return filteredData;
}

exports.app = functions.https.onRequest(app);
