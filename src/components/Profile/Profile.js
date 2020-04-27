import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as _ from 'lodash';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import EditPopup from './EditPopup';
import ProfileImage from './ProfileImage';

import '../styles/profile.css';

class Profile extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleConfirmButton = this.handleConfirmButton.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onImageCropped = this.onImageCropped.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
  }

  state = {
    gotInfo: false,
    isEditing: false,
    profileData: {},
    showPopup: false
  };

  componentDidMount() {
    const { match } = this.props;
    this.props.getProfile(match.params.id)
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
      profileData: !isEditing ? this.props.profile : {}
    });
  }

  setProfileData(key, value) {
    const {profileData} = this.state;
    this.setState({
      profileData: {
        ...profileData,
        [key]: value
      }
    });
  } 

  handleInputChange(event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    
    const { name, value } = event.target;
    this.setProfileData(name, value);
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

  onImageCropped(blob) {
    this.setProfileData('imageBlob', blob);
  }

  renderButtons() {
    const { isAdmin, isCurrentUser, profile } = this.props;
    const isOperationsSupported = isAdmin || isCurrentUser;
    if (!isOperationsSupported) {
      return null;
    }

    const {isEditing} = this.state;

    return <React.Fragment>
      <Button 
        color="primary"
        fullWidth
        onClick={isEditing ? this.handleConfirmButton : this.toggleEdit}
      >
        {isEditing ? 'Confirm' : 'Edit profile'}
      </Button>
      {
        !isEditing && (
          <Button 
            color="primary"
            fullWidth
            onClick={this.togglePopup}
          >
            Edit email/password
          </Button>
        )
      }
    </React.Fragment>
  }

  render() {
    const { profile } = this.props;
    const { profileData, showPopup, isEditing } = this.state;
    if (!profile.roles) {
      return (
        <div />
      );
    }

    const source = isEditing ? profileData : profile;

    return (
      <div className="profile-content">
        <div id="profile-name">
          {profile.name} {profile.surname}
        </div>
        <div className="profile-container">
          <div className="profile-column">
            <ProfileImage isEditing={isEditing} onImageCropped={this.onImageCropped} profile={profile} />
          </div>
          <div className="profile-column">
            <div className="profile-column-fields">
              <TextField
                name="name"
                disabled={!isEditing} 
                fullWidth
                label="Name"
                margin="normal"
                onChange={this.handleInputChange}
                value={source.name}
                variant="outlined"
              />
              <TextField
                name="surname"
                disabled={!isEditing} 
                fullWidth
                label="Surname"
                margin="normal"
                onChange={this.handleInputChange}
                value={source.surname}
                variant="outlined"
              />
              <TextField
                name="title"
                disabled={!isEditing} 
                fullWidth
                label="Title"
                margin="normal"
                onChange={this.handleInputChange}
                value={source.title}
                variant="outlined"
              />
              <TextField
                name="email"
                disabled
                fullWidth
                label="Email"
                margin="normal"
                value={source.email}
                variant="outlined"
              />
              <TextField
                name="roles"
                disabled
                fullWidth
                label="Roles"
                margin="normal"
                value={_.join(_.get(source, 'roles'), ',')}
                variant="outlined"
              />
              <TextField
                name="organization"
                disabled={!isEditing} 
                fullWidth
                label="Organization"
                margin="normal"
                multiline
                onChange={this.handleInputChange}
                rows={2}
                value={source.organization}
                variant="outlined"
              />
              <TextField
                name="about"
                disabled={!isEditing} 
                fullWidth
                label="About"
                margin="normal"
                multiline
                onChange={this.handleInputChange}
                rows={4}
                value={source.about}
                variant="outlined"
              />
              {this.renderButtons()}
            </div>
          </div>
        </div>
        { showPopup ? <EditPopup close={this.togglePopup} id={profile.id} /> : null }
      </div>
    );
  }
}

Profile.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  isCurrentUser: PropTypes.bool.isRequired,
  profile: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    title: PropTypes.string,
    roles: PropTypes.array,
    organization: PropTypes.string,
    surname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    about: PropTypes.string,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  getProfile: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.selectedProfile,
  isAdmin: _.includes(state.profile.roles, 'admin'),
  isCurrentUser: state.profile.id === state.selectedProfile.id
});

const mapDispatchToProps = (dispatch) => ({
  getProfile: (id) => dispatch({ type: 'GET_PROFILE', payload: {id, selected: true} }),
  updateProfile: (data) => dispatch({ type: 'UPDATE_PROFILE_INFO', payload: data }),
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(Profile);
