import React from "react";
import Details from "./Details/Details";
import Comments from "./Comments/Comments";
import Upvotes from "./Upvotes/Upvotes";

function NewsCard({ newsItem }) {
  return (
    <div className="newsCard">
      <section className="newsCardMetric">
        <Upvotes count={newsItem.votes} />
        <Comments count={newsItem.comments} />
      </section>
      <section className="newsCardDetails">
        <h4 className="newsCardTitle">{newsItem.details}</h4>
        <Details
          url={newsItem.url}
          author={newsItem.author}
          timeStamp={newsItem.timeStamp}
        />
      </section>
    </div>
  );
}

export default NewsCard;
