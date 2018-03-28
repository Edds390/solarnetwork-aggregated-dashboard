import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'react-bootstrap';
import TopNavigationBar from '../../TopNavigationBar/TopNavigationBar';
import DashboardPanel from '../../DashboardPanel/DashboardPanel';
import DropDownNodeMenu from '../../DataTable/DropDownNodeMenu/DropDownNodeMenu';

import './DashboardPage.css';

export default class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedNodes: this.props.location.state,
    };
  }

  render() {
    return (
      <div className="dashboard-page">
        <TopNavigationBar />
        <DashboardPanel selectedNodes={this.state.selectedNodes} />
        <DropDownNodeMenu />
      </div>
    );
  }
}

DashboardPage.propTypes = {
  location: PropTypes.object.isRequired,
};
