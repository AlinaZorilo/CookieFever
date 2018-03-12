import React, { Component } from 'react';
import scss from './scss/index.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Recipes from './components/pages/Recipes/index.jsx';
import Recipe from './components/pages/Recipe/index.jsx';
export default class App extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            title: 'Recipes'
        };
        
        this.setTitle = this.setTitle.bind(this);
    }
    
    setTitle(title) {
        this.setState({
            title
        });
    }
    
    render() {
        return (
            <body>
               	<style>{scss.toString()}</style>
                <header>{this.state.title}</header>
                <Router>
                    <Switch>
                        <Route path="/" exact render={() => <Recipes />} />
                        <Route path="/recipe/:id([0-9]+)" render={(props) => <Recipe {...props}/>} />
                    </Switch>
                </Router>
            </body>
        )
    }
}