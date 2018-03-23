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
      <Route path="/" exact component={HomePage} />
      <Route path="/home" exact component={HomePage} />
      <Route path="/dash" exact component={DashboardPage} />
    </Switch>
  </Router>
);
