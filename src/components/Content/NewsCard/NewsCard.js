import React from "react";
import { render } from "react-dom";

function NewsCard(props) {
  console.log(props.newsItem);
  return (
    <div>
      {props.newsItem.id} {props.newsItem.comments}
      {props.newsItem.votes} {props.newsItem.details}
      {props.newsItem.url} {props.newsItem.author} {props.newsItem.timeStamp}
    </div>
  );
}

export default NewsCard;
