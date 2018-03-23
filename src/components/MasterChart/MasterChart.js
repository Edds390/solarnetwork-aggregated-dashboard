import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Dygraph from 'dygraphs';

const data = [
  [1, 10, 100],
  [2, 20, 80],
  [3, 50, 60],
  [4, 70, 80],
];
const labels = {
  labels: ["x", "A", "B"],
};

export default class MasterChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedNodes: new Set(),
    };
  }

  componentDidMount() {
    const dygraph = new Dygraph(this.chartRef, data, labels);
  }

  render() {
    const chartRef = (el) => {
      this.chartRef = el;
    };
    return (
      <Paper className="paper">
        <div ref={chartRef} />
      </Paper>

    );
  }
}
