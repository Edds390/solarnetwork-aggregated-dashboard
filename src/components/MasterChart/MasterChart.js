import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Dygraph from 'dygraphs';
import DataParser from '../../utils/DataParser';
import nodeInfo from '../../utils/Data/nodeInfo';
import nodeInfo205 from '../../utils/Data/nodeInfo205';

/**
 * Master chart used as a single view of a data VALUE (voltage, power, etc).
 */
export default class MasterChart extends Component {
  /**
   * Dygraph must be added after the component is mounted so that the componet ref can be
   * used to inject the dygraph.
   * You can play around with the Dygraph API for different appearances.
   */
  componentDidMount() {
    const dataWrapper = DataParser([nodeInfo, nodeInfo205], '2018-03-19', '2018-03-24', 'Hour', 'voltage');
    const isStacked = true;
    const labels = ['Time'].concat(dataWrapper.labels);
    const dygraph = new Dygraph(
      this.chartRef,
      dataWrapper.data,
      {
        width: 480,
        height: 320,
        labels,
        stackedGraph: isStacked,

        highlightCircleSize: 2,
        strokeWidth: 1,
        strokeBorderWidth: isStacked ? null : 1,

        highlightSeriesOpts: {
          strokeWidth: 3,
          strokeBorderWidth: 1,
          highlightCircleSize: 5,
        },
      },
    );
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
