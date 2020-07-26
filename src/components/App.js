import React, { Component } from "react";
import Header from "./Header/Header";
import Content from "./Content/Content";
import Navigation from "./Navigation/Navigation";
import Chart from "./Chart/Chart";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.navigate = this.navigate.bind(this);
    this.state = {
      news: this.props.news,
    };
  }

  componentDidMount() {
    window.addEventListener("popstate", this.handleBackbutton);
  }

  handleBackbutton(event) {
    console.log("here");
    // this.setState({
    //   new: event.state,
    // });
  }

  getCurrentPage(pathname) {
    const page = parseInt(pathname.split("/")[2]);
    if (page) {
      return Math.abs(page);
    } else {
      return 0;
    }
  }

  navigate(direction) {
    const page = this.getCurrentPage(window.location.pathname);
    let newPage = 0;
    if (direction === "previous") {
      newPage = page - 1;
    } else if (direction === "next") {
      newPage = page + 1;
    }
    this.fetchNews(newPage).then((response) => {
      const news = this.filter(response.data);
      history.pushState(news, "", `/page/${newPage}`);
      this.setState({
        news: news,
      });
    });
  }

  filter(data) {
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

  fetchNews(page = 0) {
    const URL = "https://hn.algolia.com/api/v1/search_by_date";
    return axios.get(URL, {
      params: {
        query: "javascript",
        tags: "story",
        page: page,
      },
    });
  }

  render() {
    return (
      <>
        <Header />
        <Content news={this.state.news} />
        <Navigation navigate={this.navigate} />
        <Chart />
      </>
    );
  }
}

export default App;
