import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as _ from 'lodash';
import * as emailValidator from 'email-validator';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import '../styles/edit-profile-popup.css';

const defaultErrors = {
  email: [],
  newPassword: [],
  newPasswordConfirm: [],
  password: [],
};

class EditPopup extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleConfirmButton = this.handleConfirmButton.bind(this);
  }

  state = {
    email: '',
    newPassword: '',
    newPasswordConfirm: '',
    password: '',
    errors: null
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  validate() {
    const {email, password, newPassword, newPasswordConfirm} = this.state;
    const errors = _.cloneDeep(defaultErrors);

    if (!password) {
      errors.password.push('Password is required');
    }

    if (email && !emailValidator.validate(email)) {
      errors.email.push('Email has a bad format');
    }

    if (!email && !newPassword && !newPasswordConfirm) {
      errors.email.push('Email is missing');
      errors.newPassword.push('New password is missing');
      errors.newPasswordConfirm.push('Password confirmation is missing');
    }

    if (newPassword && !newPasswordConfirm) {
      errors.newPasswordConfirm.push('Password confirmation is missing');
    }

    if (newPassword && newPasswordConfirm && newPassword !== newPasswordConfirm) {
      errors.newPasswordConfirm.push('Does not match the new password');
    }

    const ok = _.isEqual(errors, defaultErrors);

    this.setState({errors: ok ? null : errors });

    return ok
  }

  handleConfirmButton() {
    const ok = this.validate();
    if (!ok) {
      return;
    }


    const {email, password, newPassword, newPasswordConfirm} = this.state;
    const {id, updateEmail, updatePassword, close} = this.props;


    if (email !== '') {
      updateEmail(id, password, email);
    }
    if (newPassword !== '') {
      updatePassword(id, password, newPassword);
    }
    close();
  }

  hasError(property) {
    const value = _.get(this.state.errors, property);
    return !_.isEmpty(value);
  }

  errorMessage(property) {
    const value = _.get(this.state.errors, property);
    return _.join(value, ','); 
  }

  render() {
    const { close } = this.props;
    const { errors } = this.state;

    return (
      <div className="profile-popup">
        <Paper elevation={3}>
          <TextField
            name="email"
            error={this.hasError('email')}
            fullWidth
            helperText={this.errorMessage('email')}
            label="New email"
            margin="normal"
            onChange={this.handleInputChange}
            type="email"
            value={this.state.email}
            variant="outlined"
          />
          <TextField
            name="password"
            error={this.hasError('password')}
            fullWidth
            helperText={this.errorMessage('password')}
            label="Password"
            margin="normal"
            onChange={this.handleInputChange}
            required
            type="password"
            value={this.state.password}
            variant="outlined"
          />
          <TextField
            name="newPassword"
            error={this.hasError('newPassword')}
            fullWidth
            helperText={this.errorMessage('newPassword')}
            label="New password"
            margin="normal"
            onChange={this.handleInputChange}
            type="password"
            value={this.state.newPassword}
            variant="outlined"
          />
          <TextField
            name="newPasswordConfirm"
            error={this.hasError('newPasswordConfirm')}
            fullWidth
            helperText={this.errorMessage('newPasswordConfirm')}
            label="New password confirmation"
            margin="normal"
            onChange={this.handleInputChange}
            type="password"
            value={this.state.newPasswordConfirm}
            variant="outlined"
          />
          <div className="profile-edit-popup-button-group">
            <Button 
              color="primary"
              fullWidth
              onClick={this.props.close}
            >
              Cancel
            </Button>
            <Button 
            color="primary"
            fullWidth
            onClick={this.handleConfirmButton}
          >
            Confirm
          </Button>
          </div>
        </Paper>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateEmail: (id, password, email) => dispatch({ type: 'UPDATE_EMAIL', payload: { id, password, email } }),
  updatePassword: (id, password, newPassword) => dispatch({ type: 'UPDATE_PASSWORD', payload: { id, password, newPassword } }),
});

EditPopup.propTypes = {
  id: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
  updateEmail: PropTypes.func.isRequired,
  updatePassword: PropTypes.func.isRequired,
};
export default connect(null, mapDispatchToProps)(EditPopup);
