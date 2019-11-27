import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import EditPopup from './EditPopup';
import '../styles/profile.css';

class Profile extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      isEditing: false,
      gotInfo: false,
    };
    this.togglePopup = this.togglePopup.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleConfirmButton = this.handleConfirmButton.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    this.number = match.params.number;
  }

  componentDidUpdate() {
    const { profile } = this.props;
    const { gotInfo } = this.state;
    if (!gotInfo) {
      this.setState({
        profileData: profile,
        gotInfo: true,
      });
    }
  }

  togglePopup() {
    const { showPopup } = this.state;
    this.setState({
      showPopup: !showPopup,
    });
  }

  toggleEdit() {
    const { isEditing } = this.state;
    this.setState({
      isEditing: !isEditing,
    });
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    const { profileData } = this.state;
    const currState = profileData;
    currState[name] = value;
    this.setState({
      profileData: currState,
    });
  }

  handleConfirmButton() {
    const { updateProfile } = this.props;
    const { profileData } = this.state;
    updateProfile(profileData);
    this.toggleEdit();
    this.setState({
      gotInfo: false,
    });
  }

  render() {
    const { profile } = this.props;
    const { showPopup, isEditing } = this.state;
    if (!profile.roles) {
      return (
        <div />
      );
    }
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
            <input type="text" name="name" defaultValue={profile.name} className="profile-input" disabled={!isEditing} onChange={this.handleInputChange} />
            <input type="text" name="surname" defaultValue={profile.surname} className="profile-input" disabled={!isEditing} onChange={this.handleInputChange} />
            <input type="text" name="title" defaultValue="Title" className="profile-input" disabled={!isEditing} onChange={this.handleInputChange} />
            <input type="text" name="email" defaultValue={profile.email} className="profile-input" disabled onChange={this.handleInputChange} />
            <input type="text" defaultValue={profile.roles[0]} className="profile-input" disabled />
            <input type="text" name="organization" defaultValue="Organization" className="profile-input" disabled={!isEditing} onChange={this.handleInputChange} />
            <input type="text" name="about" defaultValue="About you" className="profile-input" disabled={!isEditing} onChange={this.handleInputChange} />
            {isEditing ? <input type="button" className="profile-button-edit" value="Confirm" onClick={this.handleConfirmButton} onChange={this.handleInputChange} />
              : <input type="button" className="profile-button-edit" value="Edit profile" onClick={this.toggleEdit} onChange={this.handleInputChange} /> }
            <input type="button" className="profile-button-edit" value="Edit email/password" onClick={this.togglePopup} onChange={this.handleInputChange} />
          </div>
        </div>
        { showPopup ? <EditPopup close={this.togglePopup} id={profile.id} /> : null }
      </div>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.shape({
    id: PropTypes.string,
    login: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    roles: PropTypes.array,
    surname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      number: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  updateProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

const mapDispatchToProps = (dispatch) => ({
  updateProfile: (data) => dispatch({ type: 'UPDATE_PROFILE_INFO', payload: data }),
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(Profile);
