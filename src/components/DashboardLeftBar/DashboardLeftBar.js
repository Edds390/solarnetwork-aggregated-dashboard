import React from 'react';
import PropTypes from 'prop-types';

import './DashboardLeftBar.css';

export default class DashboardLeftBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedNodes: this.props.selectedNodes,
    }
  }

  render() {
    return (
      <div>{this.state.selectedNodes}</div>
    );
  }

}

DashboardLeftBar.propTypes = {
  selectedNodes: PropTypes.object,
}
