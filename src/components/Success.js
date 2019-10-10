import React from 'react';
import { Component } from 'react';
import {connect} from "react-redux";

class Success extends Component {
    render() {
        return (<div>GREAT! YOU HAVE LOGGED IN!</div>);
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, )(Success);
