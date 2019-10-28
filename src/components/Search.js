import React from 'react';
import {PureComponent} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import './styles/search.css'

class Search extends PureComponent{
    render() {
        const token = window.localStorage.getItem('token');
        if (!token) {
            return (<Redirect to='/auth'/>);
        }
        return (
            <div className='search-content'>
                <form method='POST'>
                    <input type='search' placeholder='Search...' className='search-field'/>
                    <input type='submit' value='Search' className='search-button'/>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});
export default connect(mapStateToProps, )(Search);
