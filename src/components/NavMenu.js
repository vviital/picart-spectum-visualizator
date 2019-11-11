import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearLocalStorage } from '../actions';
import './styles/navbar.css';

class NavMenu extends React.PureComponent {
  render() {
    return (
      <div className="nav-bar" id="nav-bar">
        <div>
          <a href="/">
            <img
              src="images/logo.png"
              className="logo"
              alt="PicArt"
            />
          </a>
          <ul className="nav-list">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/search">Search</Link>
            </li>
            <li>
              <Link to="/profiles">Profiles</Link>
            </li>
          </ul>
        </div>
        <div>
          <button
            className="logout-button"
            onClick={this.props.logout}
          >
Logout
          </button>
        </div>
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(clearLocalStorage()),
});
export default connect(null, mapDispatchToProps)(NavMenu);
