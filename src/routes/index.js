import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import HomePage from '../components/pages/HomePage/HomePage';
import DashboardPage from '../components/pages/DashboardPage/DashboardPage';

export default () => (
  <Router>
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/home" component={HomePage} />
      <Route path="/dash" component={DashboardPage} />
    </Switch>
  </Router>
);
