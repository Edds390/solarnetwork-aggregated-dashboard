import React from 'react';
import PropTypes from 'prop-types';
import DashboardLeftBar from '../DashboardLeftBar/DashboardLeftBar';

export default function DashboardPanel(props) {
  const { selectedNodes } = props;
  return (
    <div>
      <DashboardLeftBar selectedNodes={selectedNodes} />
    </div>
  );
}

DashboardPanel.propTypes = {
  selectedNodes: PropTypes.object,
};
