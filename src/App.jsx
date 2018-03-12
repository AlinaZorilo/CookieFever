import React, { Component } from 'react';
import scss from './scss/index.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Recipes from './components/pages/Recipes/index.jsx';
import Recipe from './components/pages/Recipe/index.jsx';
export default class App extends Component {
  state = {
    title: 'Recipes',
  };

  setTitle(title) {
    this.setState({
      title,
    });
  }

  render() {
    return (
      <body>
        <header>{this.state.title}</header>
        <Router>
          <Switch>
            <Route path="/" exact render={() => <Recipes />} />
            <Route
              path="/recipe/:id([0-9]+)"
              render={(props) => <Recipe {...props} />}
            />
          </Switch>
        </Router>
      </body>
    );
  }
}
