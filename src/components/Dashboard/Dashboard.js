import React from 'react';
import './Dashboard.css';
import DropDownNodeMenu from '../DataTable/DropDownNodeMenu';

const nodeMap = [
  {
       title: 'Node 263',
       minPower: 'Min Power: 288 Watts',
       maxPower: 'Max Power: 465 Watts'
      },
     {
       title: 'Node 5',
       minPower: 'Min Power: 123 Watts',
       maxPower: 'Max Power: 354 Watts'     
     },
      {
       title: 'Node 135',
       minPower: 'Min Power: 7 Watts',
       maxPower: 'Max Power: 45 Watts'       
     }
  
   ] ;

export default function Dashboard() {
  return (
    <div className="dashboardContainer">
      <img
        className="backgroundImage"
        src="https://images.unsplash.com/photo-1504115744733-85e946e6c323?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8eca9826b744c33a29fd9d4d70b47ec7&auto=format&fit=crop&w=1051&q=80"
        alt="the sun"
      />
      <div className="header">
        SolarNode <br />
        Aggregated <br />
        Dash
        <DropDownNodeMenu nodeMap={nodeMap}/>
       
      </div>
    
    </div>
  );
}
