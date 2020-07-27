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
      upVotes: {},
      hiddenNewsItems: {},
      page: 0,
    };
    this.navigate = this.navigate.bind(this);
    this.handleNativeNavigation = this.handleNativeNavigation.bind(this);
    this.voteUp = this.voteUp.bind(this);
    this.hideNewsItems = this.hideNewsItems.bind(this);
    this.UPVOTES = "upVotes";
    this.HIDE = "hiddenNewsItems";
  }

  getUpvotes() {
    return axios.get("/getUpVotes").then((res) => {
      if (res.data.upVotes) {
        return res.data.upVotes;
      } else {
        try {
          return JSON.parse(localStorage[this.UPVOTES]);
        } catch (e) {
          return null;
        }
      }
    });
  }

  setUpVotes() {
    axios
      .get("/setUpVotes", {
        upVotes: this.state.upVotes,
      })
      .then((res) => {});
    localStorage[this.UPVOTES] = JSON.stringify(this.state.upVotes);
  }

  getHiddenNewsItems() {
    try {
      return JSON.parse(localStorage[this.HIDE]);
    } catch (e) {
      return null;
    }
  }

  setHiddenNewsItems() {
    localStorage[this.HIDE] = JSON.stringify(this.state.hiddenNewsItems);
  }

  componentDidMount() {
    const page = this.getCurrentPage(window.location.pathname);
    window.STORE[page] = [...window.SSR_DUMP];
    window.SSR_DUMP = null;

    this.getUpvotes().then((res) => {
      const upVotes = res;
      if (!upVotes) {
        localStorage[this.UPVOTES] = JSON.stringify(null);
      }
      this.setState({
        upVotes: upVotes ? upVotes : {},
      });
    });

    const hiddenNewsItems = this.getHiddenNewsItems();
    if (!hiddenNewsItems) {
      localStorage[this.HIDE] = JSON.stringify(null);
    }
    this.setState({
      hiddenNewsItems: hiddenNewsItems ? hiddenNewsItems : {},
    });

    this.setState({
      page: this.getCurrentPage(location.pathname),
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
        page: this.getCurrentPage(location.pathname),
      });
    } else {
      this.fetchNews(newPage).then((response) => {
        const news = this.filter(response.data);
        window.STORE[newPage] = [...news];
        this.setState({
          news: news,
          page: this.getCurrentPage(location.pathname),
        });
      });
    }
    if (!isNativeNavigation) {
      if (newPage >= 1) {
        history.pushState(newPage, "", `/page/${newPage}`);
      } else {
        history.pushState(newPage, "", "/");
      }
    }
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

  hideNewsItems(id) {
    let temp = this.state.hiddenNewsItems;
    temp[id] = 1;
    this.setState(
      {
        upVotes: { ...temp },
      },
      this.setHiddenNewsItems
    );
  }

  render() {
    return (
      <>
        <Header />
        <Content
          news={this.state.news}
          voteUp={this.voteUp}
          userUpVotes={this.state.upVotes}
          hiddenNewsItems={this.state.hiddenNewsItems}
          hideNewsItems={this.hideNewsItems}
        />
        <Navigation navigate={this.navigate} page={this.state.page} />
        <Chart />
      </>
    );
  }
}

export default App;
