import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Toggle from 'material-ui/Toggle';
import DashboardLeftBar from '../DashboardLeftBar/DashboardLeftBar';
import MasterChart from '../MasterChart/MasterChart';
import nodeInfo from '../../utils/Data/nodeInfo';
import nodeInfo205 from '../../utils/Data/nodeInfo205';
import getNodeUsageData from '../../api/api';

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
        'Node182 Ph2': true,
        'Node182 Ph3': true,
        'Node182 Solar': true,
        'Node182 Solar_SMA': true,
      },
      isStacked: true,
    };

    this.pullData = this.pullData.bind(this);
  }

  componentWillMount() {
    this.pullData();
  }

  async pullData() {
    const promiseList = [];
    this.props.selectedNodes.forEach((node) => {
      promiseList.push(getNodeUsageData(node, this.state.startDate, this.state.endDate));
    });
    const resultList = await Promise.all(promiseList);
    let finalData = [];
    resultList.forEach((rawData) => {
      finalData = finalData.concat(rawData.data.results);
    });
    this.setState({ dataModel: finalData });
  }

  handleStackViewChange = (event, isInputChecked) => {
    console.log(isInputChecked);
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
      <div className="dashboardPanelWrapper">
        <DashboardLeftBar selectedNodes={selectedNodes} />
        <div>This is where the graph and table goes</div>
        <MasterChart
          data={dataModel}
          startDate={startDate}
          endDate={endDate}
          aggregate={aggregate}
          value={value}
          checklistToggleMap={checklistToggleMap}
          isStacked={isStacked}
        />
        <Toggle
          label="Toggled by default"
          defaultToggled
          onToggle={(event, isInputChecked) => this.handleStackViewChange(event, isInputChecked)}
        />
      </div>
    );
  }
}

DashboardPanel.propTypes = {
  selectedNodes: PropTypes.object,
};
