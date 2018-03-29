import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Grid, Row, Col } from 'react-bootstrap';
import moment from 'moment';
import DashboardLeftBar from '../DashboardLeftBar/DashboardLeftBar';
import MasterChart from '../MasterChart/MasterChart';
import getNodeUsageData from '../../api/api';
import DataParser from '../../utils/DataParser';

import PanelSet from '../DataTable/PanelCards/PanelSet';
import ValueNavigationList from '../ValueNavigationList/ValueNavigationList';
import DropDownNodeMenu from '../DataTable/DropDownNodeMenu/DropDownNodeMenu';

import './DashboardPanel.css';

const VALUES = [
  'watts',
  'current',
  'voltage',
  'frequency',
  'realPower',
  'watts_max',
  'watts_min',
  'current_max',
  'current_min',
  'powerFactor',
  'voltage_max',
  'voltage_min',
  'phaseVoltage',
  'apparentPower',
  'frequency_max',
  'frequency_min',
  'reactivePower',
  'realPower_max',
  'realPower_min',
  'powerFactor_max',
  'powerFactor_min',
  'phaseVoltage_max',
  'phaseVoltage_min',
  'apparentPower_max',
  'apparentPower_min',
  'reactivePower_max',
  'reactivePower_min',
  'effectivePowerFactor',
  'effectivePowerFactor_max',
  'effectivePowerFactor_min',
  'wattHours',
  'wattHoursReverse',
  'phase',
];
const DATEFORMAT = 'YYYY-MM-DD';

export default class DashboardPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataModel: [],
      parsedData: {},
      startDate: moment(this.props.startDate).format(DATEFORMAT),
      endDate: moment(this.props.endDate).format(DATEFORMAT),
      aggregate: 'Hour',
      values: VALUES,
      value: 'voltage',
      checklistToggleMap: {},
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
    // populate the toggle map. Initial parse-through is necessary to populate
    // the keys of the checklist map.
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

  handleValueChange = (value) => {
    const {
      dataModel,
      startDate,
      endDate,
      aggregate,
    } = this.state;
    const parsedData = DataParser(dataModel, startDate, endDate, aggregate, value);
    this.setState({ value, parsedData });
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
      values,
      parsedData
    } = this.state;
    return (
      <div className="dashboardPanelWrapper">
        <DashboardLeftBar
          nodes={selectedNodes}
          checklistToggleMap={checklistToggleMap}
          onCheckboxCheck={this.handleCheckboxCheck}
          onCheckboxBulkCheck={this.handleCheckboxBulkCheck}
        />
        <Grid style={{ width: '100%' }}>
          <Row>
            <Col xs={2} id="value-nav">
              <ValueNavigationList
                listItems={values}
                selectedItem={value}
                onValueChange={this.handleValueChange}
              />
                <DropDownNodeMenu checklistToggleMap={checklistToggleMap}/>
            </Col>
            <Col xs={10} id="graph-area">
              <MasterChart
                data={dataModel}
                startDate={startDate}
                endDate={endDate}
                aggregate={aggregate}
                value={value}
                checklistToggleMap={checklistToggleMap}
                isStacked={isStacked}
                onStackToggle={this.handleStackViewChange}
                id="master-chart"
              />    
            </Col>
          </Row>
          <Row>
          <Col xs={10} id="nodes">
        
          </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

DashboardPanel.propTypes = {
 selectedNodes: PropTypes.object,
 startDate: PropTypes.instanceOf(Date),
 endDate: PropTypes.instanceOf(Date)
}