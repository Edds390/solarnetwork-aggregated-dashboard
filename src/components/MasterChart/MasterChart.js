import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Toggle from 'material-ui/Toggle';
import Dygraph from 'dygraphs';
import _ from 'lodash';
import DataParser from '../../utils/DataParser';
import nodeInfo from '../../utils/Data/nodeInfo';
import nodeInfo205 from '../../utils/Data/nodeInfo205';

const GRAPH_WIDTH = 480;
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
    const checklistToggleMap = {
      'Node182 DB': false,
      'Node182 Ph1': true,
      'Node182 Ph2': true,
      'Node182 Ph3': false,
      'Node182 Solar': false,
      'Node182 Solar_SMA': true,
    };

    filterData()
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
        <Toggle
          label="Toggled by default"
          defaultToggled
        />
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
