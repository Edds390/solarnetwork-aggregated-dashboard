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
      nodes: this.props.location.state.nodes,
    };
  }
  render() {
    const { nodes } = this.state;
    return (
      <div>
        <TopNavigationBar />
        <DashboardPanel nodes={nodes} />
        <DropDownNodeMenu />
      </div>
    );
  }
}

DashboardPage.propTypes = {
  location: PropTypes.object.isRequired,
};
