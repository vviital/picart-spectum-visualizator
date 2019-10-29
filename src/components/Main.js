import React from 'react';
import {PureComponent} from 'react';
import {connect} from "react-redux";
import './styles/main.css'

class Main extends PureComponent {
    render() {
        return (
            <div className='main'>
                Here is the main page.
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
});
export default connect(mapStateToProps, )(Main);
