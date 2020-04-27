import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { clearLocalStorage } from '../actions';

import Button from '@material-ui/core/Button';

import './styles/navbar.css';

class NavMenu extends React.PureComponent {
  render() {
    const { logout } = this.props;
    return (
      <div className="nav-bar" id="nav-bar">
        <div>
          <Link to="/">
            <img
              src="/images/logo.png"
              className="logo"
              alt="PicArt"
            />
          </Link>
          <ul className="nav-list">
            <li>
            <Link to="/">
                <Button color="primary" fullWidth>
                Home
                </Button>
              </Link>
            </li>
            <li>
              <Link to="/researches">
                <Button color="primary" fullWidth>
                Researches
                </Button>
              </Link>
            </li>
            <li>
              <Link to="/users">
                <Button color="primary" fullWidth>
                  Users
                </Button>
              </Link>
            </li>
          </ul>
        </div>

        <Button
          className="logout-button"
          color="primary"
          fullWidth
          onClick={logout}
        >
          Logout
        </Button>
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
