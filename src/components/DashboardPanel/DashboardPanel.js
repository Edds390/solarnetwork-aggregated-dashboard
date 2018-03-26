import React from 'react';
import PropTypes from 'prop-types';
import DashboardLeftBar from '../DashboardLeftBar/DashboardLeftBar';
import MasterChart from '../MasterChart/MasterChart';

import './DashboardPanel.css';

export default function DashboardPanel(props) {
  const { selectedNodes } = props;
  return (
    <div className="dashboardPanelWrapper">
      <DashboardLeftBar selectedNodes={selectedNodes} />
      <MasterChart />
    </div>
  );
}

DashboardPanel.propTypes = {
  selectedNodes: PropTypes.array,
};
