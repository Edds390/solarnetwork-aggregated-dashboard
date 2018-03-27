import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Toggle from 'material-ui/Toggle';
import DashboardLeftBar from '../DashboardLeftBar/DashboardLeftBar';
import MasterChart from '../MasterChart/MasterChart';
import getNodeUsageData from '../../api/api';
import PanelSet from '../DataTable/PanelCards/PanelSet';
import './DashboardPanel.css';

export default class DashboardPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataModel: [],
      startDate: '2018-03-19',
      endDate: '2018-03-24',
      aggregate: 'Hour',
      value: 'voltage',
      checklistToggleMap: {
        'Node182 DB': true,
        'Node182 Ph1': true,
        'Node182 Ph2': false,
        'Node182 Ph3': true,
        'Node182 Solar': true,
        'Node182 Solar_SMA': false,
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
    const { startDate, endDate } = this.state;
    this.props.selectedNodes.forEach((node) => {
      promiseList.push(getNodeUsageData(node, startDate, endDate));
    });
    const resultList = await Promise.all(promiseList);
    // Must return only a single array of data, for dygraph to paint, so concatenate results
    let finalData = [];
    resultList.forEach((rawData) => {
      finalData = finalData.concat(rawData.data.results);
    });
    this.setState({ dataModel: finalData });
  }

  handleStackViewChange = (isInputChecked) => {
    this.setState({ isStacked: isInputChecked });
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
      <div>
      <div className="dashboardPanelWrapper">
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
        
        <PanelSet checklistToggleMap={checklistToggleMap} />
     
      </div>
    );
  }
}

DashboardPanel.propTypes = {
  selectedNodes: PropTypes.object,
};
