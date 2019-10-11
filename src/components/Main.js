import React from 'react';
import { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import { clearLocalStorage } from "../actions";

class Main extends Component {
    render() {
        const { auth } = this.props;
        if (auth.authorized) {
            return (
                <div>GREAT! YOU HAVE LOGGED IN!
                    <p>Your login: {auth.login}</p>
                    <p>Your userID: {auth.id}</p>
                    <p>Your email: {auth.email}</p>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.props.logout}
                    >
                        Logout
                    </Button>
                </div>
            );
        } else {
            return (<Redirect to='/auth'/>);
        }
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(clearLocalStorage()),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
