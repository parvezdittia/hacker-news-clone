import React, { Component } from "react";
import NewsCard from "./NewsCard/NewsCard";

function Content(props) {
  return (
    <section className="newsContainer">
      <div className="headings">
        <div className="headingsMetric">
          <div>Comments</div>
          <div>Vote Count</div>
          <div>Upvote</div>
        </div>
        <div className="headingsDetails">News Details</div>
      </div>
      {props.news.map((item) => {
        let isHidden = 0;

        if (props.hiddenNewsItems[item.id]) {
          isHidden = props.hiddenNewsItems[item.id];
        }

        if (isHidden === 0) {
          return (
            <NewsCard
              newsItem={item}
              key={item.id}
              voteUp={props.voteUp}
              id={item.id}
              userUpVotes={
                props.userUpVotes[item.id] ? props.userUpVotes[item.id] : 0
              }
              hideNewsItems={props.hideNewsItems}
            />
          );
        } else {
          return null;
        }
      })}
    </section>
  );
}

export default Content;
