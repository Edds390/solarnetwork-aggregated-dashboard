import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DashboardLeftBar from '../DashboardLeftBar/DashboardLeftBar';
import MasterChart from '../MasterChart/MasterChart';
import nodeInfo from '../../utils/Data/nodeInfo';
import nodeInfo205 from '../../utils/Data/nodeInfo205';
import PanelSet from '../DataTable/PanelCards/PanelSet';
import './DashboardPanel.css';



export default class DashboardPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataModel: nodeInfo.data.results,
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
  }

  handleStackViewChange = (isInputChecked) => {
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
