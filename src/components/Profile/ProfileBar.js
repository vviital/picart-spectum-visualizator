import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/profile-bar.css';

import {getLinkToProfilePhoto, sizes} from './utils';

class ProfileBar extends React.PureComponent {
  render() {
    const { profile } = this.props;
    if (profile.email === '') {
      return (<div />);
    }
    return (
      <Link to={`/users/${profile.id}`} style={{ textDecoration: 'none' }}>
        <div className="profile-bar">
          <div className="profile-bar-container">
            <img src={getLinkToProfilePhoto(profile, sizes.SMALL)} alt="Avatar" className="profile-bar-avatar" />
            <div className="profile-bar-info">
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
  profile: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    roles: PropTypes.array,
    surname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, null)(ProfileBar);
