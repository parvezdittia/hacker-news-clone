import React, { Component } from "react";
import NewsCard from "./NewsCard/NewsCard";

class Content extends Component {
  constructor(props) {
    super(props);
  }

  render() {
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
        {this.props.news.map((item) => (
          <NewsCard newsItem={item} key={item.id} />
        ))}
      </section>
    );
  }
}

export default Content;
