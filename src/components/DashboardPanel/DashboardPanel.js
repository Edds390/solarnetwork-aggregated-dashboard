import React from 'react';
import PropTypes from 'prop-types';
import DashboardLeftBar from '../DashboardLeftBar/DashboardLeftBar';
import MasterChart from '../MasterChart/MasterChart';

import './DashboardPanel.css';

export default function DashboardPanel(props) {
  const { nodes } = props;
  return (
    <div className="dashboardPanelWrapper">
      <DashboardLeftBar nodes={nodes} />
      <MasterChart />
    </div>
  );
}

DashboardPanel.propTypes = {
  nodes: PropTypes.array,
};
