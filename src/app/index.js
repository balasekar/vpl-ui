import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';

import { history } from '../utils/history';
import Header from '../components/header/index.jsx';
import Body from '../components/body/index.jsx';
import 'semantic-ui-less/semantic.less';

class App extends Component {
  render () {
    return (
      <div>
        <Router history={history}>
          <Header />
          <Body />
        </Router>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
