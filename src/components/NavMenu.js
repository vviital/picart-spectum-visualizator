import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { clearLocalStorage } from '../actions';
import './styles/navbar.css';

class NavMenu extends React.PureComponent {
  render() {
    const { logout } = this.props;
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
              <Link to="/researches">Researches</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </div>
        <button
          className="logout-button"
          onClick={logout}
          type="button"
        >
          Logout
        </button>
      </div>
    );
  }
}

NavMenu.propTypes = {
  logout: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(clearLocalStorage()),
});

export default connect(null, mapDispatchToProps)(NavMenu);
