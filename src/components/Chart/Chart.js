import React, { Component } from "react";
import Chart from "chart.js";

class LineChart extends Component {
  constructor(props) {
    super(props);
    this.chart;
  }

  componentDidMount() {
    let points = this.props.news.map((item) => {
      return (
        item.votes +
        (this.props.userUpVotes[item.id] ? this.props.userUpVotes[item.id] : 0)
      );
    });
    let labels = this.props.news.map((ele) => ele.id);

    this.chart = new Chart("myChart", {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            labels: "# of Votes",
            data: points,
            backgroundColor: "rgba(256, 256, 256, 0)",
            borderColor: "rgba(255, 102, 0, 1)",
            lineTension: 0,
          },
        ],
      },
      options: {
        legend: false,
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Votes",
                fontColor: "rgba(255, 102, 0, 1)",
                fontSize: 15,
              },
            },
          ],
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Story ID",
                fontColor: "rgba(255, 102, 0, 1)",
                fontSize: 15,
              },
            },
          ],
        },
      },
    });
  }

  componentDidUpdate() {
    let points = this.props.news.map((item) => {
      return (
        item.votes +
        (this.props.userUpVotes[item.id] ? this.props.userUpVotes[item.id] : 0)
      );
    });
    let labels = this.props.news.map((ele) => ele.id);

    this.chart.data.labels = labels;
    this.chart.data.datasets[0].data = points;

    this.chart.update();
  }

  render() {
    return (
      <div className="chart">
        <canvas id="myChart"></canvas>
      </div>
    );
  }
}

export default LineChart;
