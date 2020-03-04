import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import Home from './containers/Home'
import Comics from './containers/Comics'
import Characters from './containers/Characters'
import Events from './containers/Events'

import NavBar from './components/NavBar'

require('dotenv').config()


class App extends Component {


  render() {
    return (
      <div className="App">
        <h1>Marvel App</h1>
          <div className="container">
            <Router>
              <NavBar />
              <Switch>
                <Route exact path="/" component={ Home } />
                <Route exact path="/characters" component={ Characters } />
                <Route exact path="/comics" component={ Comics } />
                <Route exact path="/events" component={ Events } />
              </Switch>
            </Router>
          </div>
        
      </div>
    )
  }

}

export default App;
