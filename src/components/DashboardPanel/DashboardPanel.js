import React from 'react';
import PropTypes from 'prop-types';

export default function DashboardPanel(props) {
  const { selectedNodes } = props;
  return (
    <div>
      This is the dashboardPanel
      {selectedNodes}
    </div>
  );
}

DashboardPanel.propTypes = {
  selectedNodes: PropTypes.object,
};
