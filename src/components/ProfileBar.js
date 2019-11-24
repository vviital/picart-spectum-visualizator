import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './styles/profile-bar.css';

class ProfileBar extends React.PureComponent {
  componentDidMount() {
    const { id, getProfile } = this.props;
    getProfile(id);
  }

  render() {
    const { profile } = this.props;
    if (profile.email === '') {
      return (<div />);
    }
    return (
      <Link to={`/users/${profile.id}`} style={{ textDecoration: 'none' }}>
        <div className="profile-bar">
          <div className="profile-container">
            <img src="/images/avatar-small.png" alt="Avatar" className="profile-avatar" />
            <div className="profile-info">
              <span>
                {profile.name} {profile.surname}
              </span>
              <span>{profile.roles[0]}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

ProfileBar.propTypes = {
  id: PropTypes.string.isRequired,
  profile: PropTypes.shape({
    id: PropTypes.string,
    login: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    roles: PropTypes.array.isRequired,
    surname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  getProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  id: state.user.id,
  profile: state.profile,
});

const mapDispatchToProps = (dispatch) => ({
  getProfile: (id) => dispatch({ type: 'GET_PROFILE', payload: id }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileBar);
