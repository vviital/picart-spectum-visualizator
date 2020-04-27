import React from 'react';
import PropTypes from 'prop-types';
import emailValidator from 'email-validator';
import * as _ from 'lodash';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import TemplateCard from './TemplateCard';

import '../styles/profile-template.css'

const noop = (...args) => {
  console.error('onCreate method does not implemented', ...args);
};

const defaultFormState = {
  email: '',
  name: '',
  surname: ''
};

class ProfileTemplates extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleClose = this.handleClose.bind(this);
    this.handleTemplateClick = this.handleTemplateClick.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleModalFormChange = this.handleModalFormChange.bind(this);
  }

  state = {
    modalOpened: false,
    form: _.cloneDeep(defaultFormState),
    selectedResearch: {}
  };

  handleClose() {
    this.setState({
      modalOpened: false,
      form: _.cloneDeep(defaultFormState)
    });
  }

  handleCreate() {
    this.props.onCreate({...this.state.form});
    this.handleClose();
  }

  handleTemplateClick(desc = {}) {
    if (!desc.type) {
      return;
    }

    this.setState({
      selectedResearch: desc,
      modalOpened: true
    });
  }

  handleModalFormChange(e) {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
  
    const { name, value } = e.target;

    this.setState({
      form: {...this.state.form, [name]: value}
    });
  }

  renderDialog() {
    const {form} = this.state;
    const {email} = form;
    const hasError = !emailValidator.validate(email);
    const needMoreFields = !email || !form.name || !form.surname;
    console.log('--- form ---', form);;

    return (
      <Dialog open={this.state.modalOpened} onClose={this.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{this.state.selectedResearch.type} creation</DialogTitle>
        <DialogContent style={{width: 420}}>
          <DialogContentText>
            {this.state.selectedResearch.description}
          </DialogContentText>
          <TextField
            error={email ? hasError : false}
            autoFocus
            fullWidth
            id="email"
            label="User email"
            margin="dense"
            name="email"
            onChange={this.handleModalFormChange}
            type="text"
            value={email}
          />
          <TextField
            autoFocus
            fullWidth
            id="name"
            label="Name"
            margin="dense"
            name="name"
            onChange={this.handleModalFormChange}
            type="text"
            value={form.name}
          />
          <TextField
            autoFocus
            fullWidth
            id="surname"
            label="Surname"
            margin="dense"
            name="surname"
            onChange={this.handleModalFormChange}
            type="text"
            value={form.surname}
          />
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleCreate} color="primary" disabled={needMoreFields || hasError}>
              Create
            </Button>
        </DialogActions>
        </DialogContent>
      </Dialog>
    )
  }

  render() {
    return <div className="profile-template-container">
      {this.renderDialog()}
      <TemplateCard
        description="Create a new user profile"
        onClick={this.handleTemplateClick}
        type="Profile"
      />
    </div>
  }
}

ProfileTemplates.defaultProps = {
  onCreate: noop
};

ProfileTemplates.propTypes = {
  onCreate: PropTypes.func.isRequired,
};

export default ProfileTemplates;
