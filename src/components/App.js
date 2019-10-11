import React from 'react';
import { Component } from 'react';
import {connect} from "react-redux";
import { Switch, Route } from 'react-router-dom'
import Auth from "./Auth";
import Main from "./Main";
import {getLocalStorage} from "../actions";


class App extends Component {
    render() {
        this.props.syncStorage();
        return (
            <Switch>
                <Route exact path='/auth' component={Auth}/>
                <Route exact path='/' component={Main}/>
            </Switch>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        syncStorage: () => dispatch(getLocalStorage())
    }
};
export default connect(null, mapDispatchToProps)(App);
