import React from 'react';
import { Component } from 'react';
import {connect} from "react-redux";
import { Switch, Route } from 'react-router-dom'
import Auth from "./Auth";
import Main from "./Main";
import NotFound from "./NotFound";
import Layout from "./Layout";
import Profile from "./Profile";
import Search from "./Search";


class App extends Component {
    constructor(props) {
        super(props);
        this.props.init();
    }

    render() {
        return (
            <Switch>
                <Route exact path='/auth' component={Auth}/>
                <Route exact path='/' render={() => (
                    <Layout content={<Main/>}/>
                )}/>
                <Route exact path='/profile' render={() => (
                    <Layout content={<Profile/>}/>
                )}/>
                <Route exact path='/search' render={() => (
                    <Layout content={<Search/>}/>
                )}/>
                <Route component={NotFound}/>
            </Switch>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    init: () => dispatch({ type: 'APP_INIT'})
});
export default connect(null, mapDispatchToProps)(App);
