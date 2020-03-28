import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import TemplateCard from './TemplateCard';

import '../styles/research-template.css'

const noop = (...args) => {
  console.error('onCreate method does not implemented', ...args);
};

class ResearchTemplates extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleClose = this.handleClose.bind(this);
    this.handleTemplateClick = this.handleTemplateClick.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleModalFormChange = this.handleModalFormChange.bind(this);
  }

  state = {
    modalOpened: false,
    form: {
      name: '',
      description: ''
    },
    selectedResearch: {}
  };

  research = [{
    type: 'zaidel',
    description: 'Create your zaidel research',
  }, {
    type: 'comparison',
    description: 'Compare your previous research with each other'
  }];

  handleClose() {
    this.setState({
      modalOpened: false,
      form: {
        name: '',
        description: '',
      }
    });
  }

  handleCreate() {
    this.props.onCreate({ 
      ...this.state.form,
      researchType: this.state.selectedResearch.type
    });
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
    return (
      <Dialog open={this.state.modalOpened} onClose={this.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{this.state.selectedResearch.type} research</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {this.state.selectedResearch.description}
          </DialogContentText>
          <TextField
            autoFocus
            fullWidth
            id="name"
            label="Research name"
            margin="dense"
            name="name"
            onChange={this.handleModalFormChange}
            type="text"
            value={this.state.form.name}
          />
          <TextField
            fullWidth
            id="description"
            label="Description"
            margin="dense"
            name="description"
            onChange={this.handleModalFormChange}
            type="text"
            value={this.state.form.description}
          />
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleCreate} color="primary">
              Create
            </Button>
        </DialogActions>
        </DialogContent>
      </Dialog>
    )
  }

  render() {
    return <div className="research-template-container">
      {this.renderDialog()}
      {
        this.research.map((research) => (
          <TemplateCard key={research.type} type={research.type} description={research.description} onClick={this.handleTemplateClick}/>
        ))
      }
    </div>
  }
}

ResearchTemplates.defaultProps = {
  onCreate: noop
};

ResearchTemplates.propTypes = {
  onCreate: PropTypes.func.isRequired,
};

export default ResearchTemplates;
