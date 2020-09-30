import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Home from '../../pages/home/index.jsx';
import Vehicles from '../../pages/vehicles/index.jsx';
import Vehicle from '../../pages/vehicle/index.jsx';

class Body extends Component {
  render () {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/vehicles" component={Vehicles} />
          <Route exact path="/vehicle" component={Vehicle} />
          <Route exact path="/vehicle/:vehicleId" component={Vehicle} />
          <Redirect from="*" to="/" />
        </Switch>
      </div>
    );
  }
}

export default Body;
