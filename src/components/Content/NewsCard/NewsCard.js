import React from "react";
import { render } from "react-dom";

function NewsCard(props) {
  return (
    <div className="newsCard">
      <h4 className="newsCardTitle">{props.newsItem.details}</h4>
      {props.newsItem.id} {props.newsItem.comments}
      {props.newsItem.votes}
      {props.newsItem.url} {props.newsItem.author} {props.newsItem.timeStamp}
    </div>
  );
}

export default NewsCard;
