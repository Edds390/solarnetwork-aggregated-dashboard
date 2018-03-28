import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Toggle from 'material-ui/Toggle';
import moment from 'moment';
import DashboardLeftBar from '../DashboardLeftBar/DashboardLeftBar';
import MasterChart from '../MasterChart/MasterChart';
import getNodeUsageData from '../../api/api';
import DataParser from '../../utils/DataParser';


import './DashboardPanel.css';

const DATEFORMAT = 'YYYY-MM-DD';

export default class DashboardPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataModel: [],
      parsedData: [],
      startDate: moment(this.props.startDate).format(DATEFORMAT),
      endDate: moment(this.props.endDate).format(DATEFORMAT),
      aggregate: 'Hour',
      value: 'voltage',
      checklistToggleMap: {
        'Node182 DB': true,
        'Node182 Ph1': true,
        'Node182 Ph2': true,
        'Node182 Ph3': true,
        'Node182 Solar': true,
        'Node182 Solar_SMA': true,
        'Node234 Main': true,
      },
      isStacked: true,
    };

    this.pullData = this.pullData.bind(this);
  }

  componentWillMount() {
    this.pullData();
  }

  /**
   * Pulls data for all nodes in selectedNodes. Async method, to wait for fetch to finish.
   */
  async pullData() {
    const promiseList = [];
    const {
      startDate,
      endDate,
      aggregate,
      value,
    } = this.state;
    this.props.selectedNodes.forEach((node) => {
      promiseList.push(getNodeUsageData(node, startDate, endDate));
    });
    const resultList = await Promise.all(promiseList);
    // Must return only a single array of data, for dygraph to paint, so concatenate results
    let finalData = [];
    resultList.forEach((rawData) => {
      finalData = finalData.concat(rawData.data.results);
    });
    // give an initial parse-through based on the first value then use it to
    // populate the toggle map
    const parsedData = DataParser(finalData, startDate, endDate, aggregate, value);
    const checklistToggleMap = {};
    const labels = _.cloneDeep(parsedData.labels);
    labels.forEach((label) => {
      checklistToggleMap[label] = true;
    });
    this.setState({ dataModel: finalData, checklistToggleMap, parsedData });
  }

  handleStackViewChange = (isInputChecked) => {
    this.setState({ isStacked: isInputChecked });
  }

  handleCheckboxCheck = (isInputChecked, nodeDsString) => {
    const checklistToggleMap = _.cloneDeep(this.state.checklistToggleMap);
    checklistToggleMap[nodeDsString] = isInputChecked;
    this.setState({ checklistToggleMap });
  }

  handleCheckboxBulkCheck = (isInputChecked, nodeString) => {
    const checklistToggleMap = _.cloneDeep(this.state.checklistToggleMap);
    Object.keys(checklistToggleMap).forEach((nodeIdDs) => {
      if (nodeString === nodeIdDs.substr(0, nodeIdDs.indexOf(' '))) {
        checklistToggleMap[nodeIdDs] = isInputChecked;
      }
    });
    this.setState({ checklistToggleMap });
  }


  render() {
    const { selectedNodes } = this.props;
    const {
      dataModel,
      startDate,
      endDate,
      aggregate,
      value,
      checklistToggleMap,
      isStacked,
    } = this.state;
    return (
      <div className="dashboardPanelWrapper">
        <DashboardLeftBar
          nodes={selectedNodes}
          checklistToggleMap={checklistToggleMap}
          onCheckboxCheck={this.handleCheckboxCheck}
          onCheckboxBulkCheck={this.handleCheckboxBulkCheck}
        />
        <MasterChart
          data={dataModel}
          startDate={startDate}
          endDate={endDate}
          aggregate={aggregate}
          value={value}
          checklistToggleMap={checklistToggleMap}
          isStacked={isStacked}
          onStackToggle={this.handleStackViewChange}
        />
      </div>
    );
  }
}

DashboardPanel.propTypes = {
  selectedNodes: PropTypes.object,
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date)
};
