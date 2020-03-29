import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

import ExistingExperimentsPanel from './ExistingExperimentsPanel';

class Experiment extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleExperimentCreation = this.handleExperimentCreation.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.isSaveButtonDisabled = this.isSaveButtonDisabled.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
  }

  state = {
    open: false,
    description: '',
    fileID: '',
    name: '',
  }

  onFileChange(e) {
    const fileID = e.target.value;

    this.setState({fileID});
    this.props.getFileContent(fileID);
  }

  handleFormChange(e) {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    const {name, value} = e.target;

    this.setState({ [name]: value })
  }

  isSaveButtonDisabled() {
    const {description, fileID, name} = this.state;
    return !(description && fileID && name);
  }

  handleExperimentCreation() {
    const payload = {
      description: this.state.description,
      fileID: this.state.fileID,
      name: this.state.name,
    };

    this.props.createExperiment(payload);

    this.setState({
      description: '',
      fileID: '',
      name: ''
    });
  }

  componentDidMount() {
    this.props.getExperiments();
  }

  render() {
    const {experiments, files} = this.props;

    return <div>
      <FormControl>
        <TextField
          onChange={this.handleFormChange}
          value={this.state.name}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Name"
          type="text"
          id="name"
          name="name"
        />
        <TextField
          onChange={this.handleFormChange}
          value={this.state.description}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Description"
          type="text"
          id="description"
          name="description"
        />
        <Select
          open={this.state.open}
          onClose={() => this.setState({open: false})}
          onOpen={() => this.setState({open: true})}
          value={this.state.fileID}
          onChange={this.onFileChange}
        >
          {
            files.map((file) => {
              return (<MenuItem key={file.id} value={file.id}>{file.title}</MenuItem>)
            })
          }
        </Select>
        <Button
          disabled={this.isSaveButtonDisabled()}
          fullWidth
          onClick={this.handleExperimentCreation}
          variant="contained"
         >
           Start experiment
         </Button>
      </FormControl>

      <ExistingExperimentsPanel experiments={experiments} />
    </div>
  }
}

Experiment.defaultProps = {
  experiments: [],
  files: [],
}

Experiment.propTypes = {
  files: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.string,
  })).isRequired,
  experiments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string,
    name: PropTypes.string,
  })),
  getFileContent: PropTypes.func.isRequired,
  createExperiment: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  files: state.research.files,
  experiments: state.experiments.items
});

const mapDispatchToProps = (dispatch) => ({
  getFileContent: (fileID) => dispatch({ type: 'GET_FILE_CONTENT', payload: {fileID}}),
  createExperiment: (payload) => dispatch({ type: 'CREATE_EXPERIMENT', payload }),
  getExperiments: () => dispatch({ type: 'GET_EXPERIMENTS' })
});

export default connect(mapStateToProps, mapDispatchToProps)(Experiment);
