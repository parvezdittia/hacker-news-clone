import React, { Component } from "react";
import NewsCard from "./NewsCard/NewsCard";

class Content extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section>
        {this.props.news.map((item) => (
          <NewsCard newsItem={item} key={item.id} />
        ))}
      </section>
    );
  }
}

export default Content;
