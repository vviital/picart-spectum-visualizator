import React from 'react';
import { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Auth from "./Auth";
import Success from "./Success";

class App extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={Auth}/>
                <Route exact path='/success' component={Success}/>
            </Switch>
        );
    }
}

export default App;