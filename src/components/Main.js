import React from 'react';
import {PureComponent} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import './styles/main.css'

class Main extends PureComponent {
    render() {
        const {auth} = this.props;
        if (!auth.token) {
            return (<Redirect to='/auth'/>);
        }
        return (
            <div className='main'>
                Here is the main page.
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});
export default connect(mapStateToProps, )(Main);
