import React from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import './styles/edit-profile.css';

class EditProfile extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      surname: '',
    };
    this.gotProfile = false;
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { getProfile } = this.props;
    const { user } = this.props;
    getProfile(user);
  }

  componentDidUpdate(prevProps, prevState) {
    const { profile } = this.props;
    if (profile.id && !this.gotProfile) {
      this.setState({
        name: profile.name,
        surname: profile.surname,
      });
      this.gotProfile = true;
    }
  }

  handleFormChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleClick(e) {
    e.preventDefault();
    const { updateProfile, profile } = this.props;
    const { name, surname } = this.state;
    console.log(name, surname);
    updateProfile(profile.id, name, surname);
  }

  render() {
    const { profile } = this.props;
    if (!profile.id) {
      return (
        <div className="edit-content">
          Loading..
        </div>
      );
    }
    return (
      <div className="edit-content">
        <form className="edit-form">
          <Typography variant="h5">
            Update your profile information:
          </Typography>
          <TextField
            onChange={this.handleFormChange}
            variant="outlined"
            margin="normal"
            fullWidth
            required
            defaultValue={profile.name}
            id="name"
            label="Name"
            name="name"
          />
          <TextField
            onChange={this.handleFormChange}
            variant="outlined"
            margin="normal"
            fullWidth
            required
            defaultValue={profile.surname}
            id="surname"
            label="Surname"
            name="surname"
          />
          <TextField
            onChange={this.handleFormChange}
            variant="outlined"
            margin="normal"
            fullWidth
            id="about"
            label="About you"
            name="about"
            multiline
          />
          <Button
            onClick={this.handleClick}
            fullWidth
            className="edit-line"
            type="submit"
            variant="contained"
            color="primary"
          >
            Update
          </Button>
        </form>
      </div>
    );
  }
}

EditProfile.propTypes = {
  user: PropTypes.string.isRequired,
  profile: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
  }).isRequired,
  getProfile: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  user: state.user.id,
});

const mapDispatchToProps = (dispatch) => ({
  getProfile: (id) => dispatch({ type: 'GET_PROFILE', payload: id }),
  updateProfile: (id, name, surname) => dispatch({ type: 'UPDATE_PROFILE', payload: { id, name, surname } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
