import React from 'react';
import PropTypes from 'prop-types';
import TopNavigationBar from '../../TopNavigationBar/TopNavigationBar';
import DashboardPanel from '../../DashboardPanel/DashboardPanel';
import DropDownNodeMenu from '../../DataTable/DropDownNodeMenu/DropDownNodeMenu';

import './DashboardPage.css';

export default class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedNodes: this.props.location.state.selectedNodes,
      startDate: this.props.location.state.startDate,
      endDate: this.props.location.state.endDate,
    };
  }

  render() {
    return (
      <div >
        <TopNavigationBar />
        <DashboardPanel selectedNodes={this.state.selectedNodes} startDate={this.state.startDate} endDate={this.state.endDate} />
        <DropDownNodeMenu />
      </div>
    );
  }
}

DashboardPage.propTypes = {
  location: PropTypes.object.isRequired,
};
