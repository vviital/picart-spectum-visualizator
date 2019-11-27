import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/edit-profile-popup.css';

class EditPopup extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      newPassword: '',
      newPasswordConfirm: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleConfirmButton = this.handleConfirmButton.bind(this);
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleConfirmButton() {
    const {email, password, newPassword, newPasswordConfirm} = this.state;
    const {id, updateEmail, updatePassword, close} = this.props;
    if (email !== '') {
      updateEmail(id, password, email);
    }
    if (newPassword !== '') {
      if (newPassword === newPasswordConfirm) {
        updatePassword(id, password, newPassword);
      } else {
        alert('Passwords do not match! Aborting.');
      }
    }
    close();
  }

  render() {
    const { close } = this.props;
    return (
      <div className="popup">
        <form className="popup-inner">
          <input type="text" name="email" defaultValue="" placeholder="New email" className="profile-input" onChange={this.handleInputChange} />
          <input type="password" name="password" defaultValue="" placeholder="Enter your current password" className="profile-input" onChange={this.handleInputChange} required />
          <input type="password" name="newPassword" defaultValue="" placeholder="New Password" className="profile-input" onChange={this.handleInputChange} />
          <input type="password" name="newPasswordConfirm" defaultValue="" placeholder="Confirm your new password" className="profile-input" onChange={this.handleInputChange} />
          <input type="button" className="profile-button-popup" value="Confirm" onClick={this.handleConfirmButton} />
          <input type="button" className="profile-button-popup" value="Cancel" onClick={close} />
        </form>
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
