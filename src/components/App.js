import React from 'react';
import { Component } from 'react';
import {connect} from "react-redux";
import { Switch, Route } from 'react-router-dom'
import Auth from "./Auth";
import Main from "./Main";
import NotFound from "./NotFound";
import {getLocalStorage} from "../actions";


class App extends Component {
    constructor(props) {
        super(props);
        this.props.syncStorage();
    }

    render() {
        return (
            <Switch>
                <Route exact path='/auth' component={Auth}/>
                <Route exact path='/' component={Main}/>
                <Route component={NotFound}/>
            </Switch>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    syncStorage: () => dispatch(getLocalStorage())
});
export default connect(null, mapDispatchToProps)(App);
