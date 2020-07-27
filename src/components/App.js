import React, { Component } from "react";
import Header from "./Header/Header";
import Content from "./Content/Content";
import Navigation from "./Navigation/Navigation";
import Chart from "./Chart/Chart";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: this.props.news,
      upVotes: null,
    };
    this.navigate = this.navigate.bind(this);
    this.handleNativeNavigation = this.handleNativeNavigation.bind(this);
    this.voteUp = this.voteUp.bind(this);
    this.UPVOTES = "upVotes";
  }

  getUpvotes() {
    try {
      return JSON.parse(localStorage[this.UPVOTES]);
    } catch (e) {
      return null;
    }
  }

  setUpVotes() {
    localStorage[this.UPVOTES] = JSON.stringify(this.state.upVotes);
  }

  componentDidMount() {
    const page = this.getCurrentPage(window.location.pathname);
    window.STORE[page] = [...window.SSR_DUMP];
    window.SSR_DUMP = null;

    const upVotes = this.getUpvotes();
    if (!upVotes) {
      localStorage[this.UPVOTES] = JSON.stringify(null);
    }
    this.setState({
      upVotes: upVotes ? upVotes : {},
    });

    window.addEventListener("popstate", this.handleNativeNavigation);
  }

  handleNativeNavigation(event) {
    this.updatePage(this.getCurrentPage(location.pathname), true);
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
    this.updatePage(newPage, false);
  }

  updatePage(newPage, isNativeNavigation) {
    if (STORE[newPage]) {
      this.setState({
        news: STORE[newPage],
      });
    } else {
      this.fetchNews(newPage).then((response) => {
        const news = this.filter(response.data);
        window.STORE[newPage] = [...news];
        this.setState({
          news: news,
        });
      });
    }
    if (!isNativeNavigation) history.pushState(newPage, "", `/page/${newPage}`);
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

  voteUp(id) {
    let temp = this.state.upVotes;
    temp[id] = temp[id] ? temp[id] + 1 : 1;
    this.setState(
      {
        upVotes: { ...temp },
      },
      this.setUpVotes
    );
  }

  render() {
    return (
      <>
        <Header />
        <Content news={this.state.news} voteUp={this.voteUp} />
        <Navigation navigate={this.navigate} />
        <Chart />
      </>
    );
  }
}

export default App;
