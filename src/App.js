import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import Home from './containers/Home'
import Comics from './containers/Comics'
import Comic from './containers/Comic'
import Characters from './containers/Characters'
import Character from './containers/Character'
import Events from './containers/Events'
import Event from './containers/Event'

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
                <Route exact path="/characters/:id" component={ Character } />
                <Route exact path="/comics" component={ Comics } />
                <Route exact path="/comics/:id" component={ Comic } />
                <Route exact path="/events" component={ Events } />
                <Route exact path="/events/:id" component={ Event } />
              </Switch>
            </Router>
          </div>
        
      </div>
    )
  }

}

export default App;
