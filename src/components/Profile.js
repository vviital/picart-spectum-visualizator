import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './styles/profile.css';

class Profile extends React.PureComponent {
  componentDidMount() {
    const { match } = this.props;
    this.number = match.params.number;
  }

  render() {
    console.log('requested');
    const { profile } = this.props;
    return (
      <div className="profile-content">
        <div id="profile-name">
          {profile.name} {profile.surname}
        </div>
        <div className="profile-container">
          <div className="profile-column">
            <img src="/images/avatar.png" alt="Your avatar" className="profile-avatar" />
          </div>
          <div className="profile-column">
            <input type="text" value={profile.name} className="profile-input" />
            <input type="text" value={profile.surname} className="profile-input" />
            <input type="text" value="Title" className="profile-input" />
            <input type="text" value={profile.email} className="profile-input" />
            <input type="text" value="Role" className="profile-input" />
            <input type="text" value="Organisation" className="profile-input" />
            <input type="text" value="About you" className="profile-input" />
            <input type="button" className="profile-button-edit" value="Edit profile" />
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.shape({
    id: PropTypes.string,
    login: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      number: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default compose(
  withRouter,
  connect(mapStateToProps, null),
)(Profile);
