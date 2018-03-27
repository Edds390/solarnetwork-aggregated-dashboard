import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import { Grid, Row, Col } from 'react-bootstrap';
import Toggle from 'material-ui/Toggle';
import Dygraph from 'dygraphs';
import _ from 'lodash';
import DataParser from '../../utils/DataParser';
import GraphTutorialPopover from '../GraphTutorialPopover/GraphTutorialPopover';
import nodeInfo from '../../utils/Data/nodeInfo';
import nodeInfo205 from '../../utils/Data/nodeInfo205';
import './MasterChart.css';

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
  }
  /**
   * Since Dygraph is injected into the div, it does not re-render.
   * Therefore, the graph must re-render when new props are passed into the component.
   */
  componentDidUpdate() {
    this.renderGraph();
  }

  handleStackViewChange = (event, isInputChecked) => {
    const { onStackToggle } = this.props;
    onStackToggle(isInputChecked);
  }

  /**
   * Filters the data based on the checklist provided.
   * I envision that when everything is plugged in, this
   * functionality will be moved up to DashboardPanel.
   */
  filterData = (dataWrapper, labels) => {
    const { checklistToggleMap } = this.props;
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

    return filteredData;
  }

  /**
   * Helper function used to inject the Dygraph into target div.
   */
  renderGraph = () => {
    const {
      data,
      startDate,
      endDate,
      aggregate,
      value,
      isStacked,
    } = this.props;
    // cloneDeep used as placeholder as later the parsed data will be passed in as a prop
    const dataWrapper = _.cloneDeep(DataParser(data, startDate, endDate, aggregate, value));
    const labels = ['Time'].concat(dataWrapper.labels);

    const filteredData = this.filterData(dataWrapper, labels);

    const dygraph = new Dygraph(
      this.chartRef,
      filteredData,
      {
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
        <Grid style={{ width: '100%' }}>
          <Row>
            <Col xs={11} md={8}>
              <div ref={chartRef} className="dygraph-xlabel dygraph-ylabel highlight" />
              <Grid>
                <Row className="show-grid">
                  <Col xs={2}>
                    <Toggle
                      label="Stack View"
                      defaultToggled
                      onToggle={(event, isInputChecked) =>
                        this.handleStackViewChange(event, isInputChecked)}
                    />
                  </Col>
                </Row>
              </Grid>
            </Col>
            <Col xs={12} md={3}>
              <div ref={legendRef} className="dygraph-legend" />
            </Col>
            <Col xs={1} style={{ position: 'relative' }}>
              <GraphTutorialPopover />
            </Col>
          </Row>
        </Grid>
      </Paper>

    );
  }
}

MasterChart.propTypes = {
  data: PropTypes.array, // combined data
  startDate: PropTypes.string.isRequired, // Format is yyyy-mm-dd
  endDate: PropTypes.string.isRequired, // same format as bove
  aggregate: PropTypes.string.isRequired, // either Hour or Day
  value: PropTypes.string.isRequired, // determines graph view
  checklistToggleMap: PropTypes.object.isRequired, // for filtering data
  isStacked: PropTypes.bool.isRequired,
  onStackToggle: PropTypes.func.isRequired, // callback function for toggling stack view
};
