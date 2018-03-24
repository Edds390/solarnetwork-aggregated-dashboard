import React from 'react';
import './App.css';
import Dashboard from '../Dashboard/Dashboard';
import Home from '../Home/Home';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MasterChart from '../MasterChart/MasterChart';
import DataParserSample from '../../Data/DataParserSample';


export default function App() {
  return (
    <MuiThemeProvider className="App">
      <DataParserSample />
    </MuiThemeProvider>
  );
}
