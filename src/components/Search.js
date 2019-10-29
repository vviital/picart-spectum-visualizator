import React from 'react';
import {PureComponent} from 'react';
import {connect} from "react-redux";
import './styles/search.css'

class Search extends PureComponent{
    render() {
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
