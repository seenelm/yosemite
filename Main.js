import React from 'react';
import Dashboard from './Dashboard';
import AppBar from './AppBar'
import History from './History';
import Schedule from './Schedule'
// import HistTotCases from './HistTotCases';

import { Switch, Route } from 'react-router-dom';


const Main = ({ onNavClick }) => {
  return (
    <div className="main">
      <AppBar onNavClick={onNavClick} />
      <Switch>
        <Route exact path='/dashboard' component={Dashboard} />
        <Route exact path='/calendar' component={Schedule} />
        <Route exact path='/history' component={History} />
        {/* <Route exact path='/logout' component={} /> */}
      </Switch>
    </div>
  );
};

export default Main;