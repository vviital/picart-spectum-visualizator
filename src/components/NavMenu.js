import React from "react";
import {Component} from "react";
import {clearLocalStorage} from "../actions";
import {connect} from "react-redux";
import './styles/navbar.css'

class NavMenu extends Component {
    render() {
        return (
            <div className='nav-bar'>
                <div>
                    <img src='images/logo.png'
                         className='logo'
                         alt='PicArt'
                    />
                    <button className='nav-bar-button' id='search'>Search</button>
                    <button className='nav-bar-button' id='profile'>Profile</button>
                </div>
                <div>
                    <button
                        className='nav-bar-button'
                        onClick={this.props.logout}
                    >Logout</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(clearLocalStorage()),
});
export default connect(mapStateToProps, mapDispatchToProps)(NavMenu);
