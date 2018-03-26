import React from 'react';
import PropTypes from 'prop-types';
import TopNavigationBar from '../../TopNavigationBar/TopNavigationBar';
import DashboardPanel from '../../DashboardPanel/DashboardPanel';

import './DashboardPage.css';

export default class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedNodes: Array.from(this.props.location.state),
    };
  }

  render() {
    return (
      <div >
        <TopNavigationBar />
        <DashboardPanel selectedNodes={this.state.selectedNodes} />
      </div>
    );
  }
}

DashboardPage.propTypes = {
  location: PropTypes.object.isRequired,
};
