import React from 'react';
import PropTypes from 'prop-types';
import DashboardLeftBar from '../DashboardLeftBar/DashboardLeftBar';

import './DashboardPanel.css';

export default function DashboardPanel(props) {
  const { selectedNodes } = props;
  return (
    <div className="dashboardPanelWrapper">
      <DashboardLeftBar selectedNodes={selectedNodes} />
      <div>This is where the graph and table goes</div>
    </div>
  );
}

DashboardPanel.propTypes = {
  selectedNodes: PropTypes.object,
};
