import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Dygraph from 'dygraphs';
import _ from 'lodash';
import DataParser from '../../utils/DataParser';
import nodeInfo from '../../utils/Data/nodeInfo';
import nodeInfo205 from '../../utils/Data/nodeInfo205';
import './MasterChart.css';

const GRAPH_WIDTH = 450;
const GRAPH_HEIGHT = 320;

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
    this.renderGraph();
    console.log("HI");
  }
  componentDidUpdate() {
    this.renderGraph();
    console.log("HII");
  }

  renderGraph = () => {
    const {
      data,
      startDate,
      endDate,
      aggregate,
      value,
      checklistToggleMap,
      isStacked,
    } = this.props;
    const dataWrapper = DataParser(data, startDate, endDate, aggregate, value);
    const labels = ['Time'].concat(dataWrapper.labels);
    const indicesToRemove = [];
    Object.keys(checklistToggleMap).forEach((nodeDataSourceCode) => {
      if (!checklistToggleMap[nodeDataSourceCode]) {
        indicesToRemove.push(labels.indexOf(nodeDataSourceCode));
      }
    });
    _.pullAt(labels, indicesToRemove);
    const filteredData = _.cloneDeep(dataWrapper.data);
    filteredData.forEach((timeObservations) => {
      _.pullAt(timeObservations, indicesToRemove);
    });

    const dygraph = new Dygraph(
      this.chartRef,
      filteredData,
      {
        width: GRAPH_WIDTH,
        height: GRAPH_HEIGHT,
        animatedZooms: true,
        stackedGraph: isStacked,
        labels,
        labelsKMB: true,
        labelsDiv: this.legendRef,
        labelsSeparateLines: true,
        xlabel: 'Date',
        ylabel: value,
        highlightCircleSize: 2,
        strokeWidth: 1,
        strokeBorderWidth: isStacked ? null : 1,
        legend: 'always',
        highlightSeriesOpts: {
          strokeWidth: 3,
          strokeBorderWidth: 1,
          highlightCircleSize: 5,
        },
      },
    );
  }

  render() {
    const chartRef = (ref) => {
      this.chartRef = ref;
    };
    const legendRef = (ref) => {
      this.legendRef = ref;
    };
    return (
      <Paper className="paper">
        <div style={{ display: 'flex', flexDirection: 'horizontal' }}>
          <div ref={chartRef} className="dygraph-xlabel dygraph-ylabel highlight" />
          <div ref={legendRef} className="dygraph-legend" />
        </div>
      </Paper>

    );
  }
}

MasterChart.propTypes = {
  data: PropTypes.arrayOf(), // combined data
  startDate: PropTypes.string.isRequired, // Format is yyyy-mm-dd
  endDate: PropTypes.string.isRequired, // same format as bove
  aggregate: PropTypes.string.isRequired, // either Hour or Day
  value: PropTypes.string.isRequired, // determines graph view
  checklistToggleMap: PropTypes.object.isRequired, // for filtering data
  isStacked: PropTypes.bool.isRequired,
};
