import React from 'react';
import TopNavigationBar from '../../TopNavigationBar/TopNavigationBar';
import MasterChart from '../../MasterChart/MasterChart';
import DropDownNodeMenu from '../../DataTable/DropDownNodeMenu';

import './DashboardPage.css';

export default function DashboardPage() {
  return (
    <div >
      <TopNavigationBar />
      <div>This is where the SolarNetwork Dash will be!</div>
      <MasterChart />
      <DropDownNodeMenu />
    </div>
  );
}
