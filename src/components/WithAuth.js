import {connect} from "react-redux";
import React, {PureComponent} from "react";
import {Redirect} from 'react-router-dom';

class WithAuth extends PureComponent {
    render() {
        if (!this.props.isAuthenticated) {
            return (<Redirect to='/auth'/>)
        }
        return this.props.content;
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.user.id !== ''
});
export default connect(mapStateToProps)(WithAuth);
