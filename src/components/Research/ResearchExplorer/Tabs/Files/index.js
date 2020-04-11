import React from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import {DropzoneArea} from 'material-ui-dropzone'

import { connect } from 'react-redux';

import ExistingFilesPanel from './ExistingFilesPanel';

import './files.css';

class Files extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.handleFileSelect = this.handleFileSelect.bind(this);
  }

  state = {
    title: '',
    description: '',
    file: null
  }

  handleFormChange(e) {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    const {name, value} = e.target;

    this.setState({ [name]: value })
  }

  handleFileSelect(files) {
    const file = _.first(files) || null;
    this.setState({ file });
  }

  handleFileUpload() {
    const meta = {
      title: this.state.title,
      description: this.state.description,
    };
    this.props.uploadFile(this.state.file, meta)
  }

  render() {
    return <div className="research-tab-container">
      <div>
        <Typography variant="h5" gutterBottom>
          Create new file
        </Typography>

        <FormControl fullWidth>
          <TextField
            onChange={this.handleFormChange}
            value={this.state.title}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Title"
            type="text"
            id="title"
            name="title"
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
          <DropzoneArea
            onChange={this.handleFileSelect}
            dropzoneText="Select a file with spectrum data"
            filesLimit={1}
            acceptedFiles={['.txt']}
          />
        </FormControl>
      </div>

      <Divider className="files-panel-divider" />

      <Button
          disabled={!this.state.file}
          fullWidth
          onClick={this.handleFileUpload}
          variant="contained"
          color="primary"
         >
           Save file
         </Button>

      <Divider className="files-panel-divider" />

      <div>
        <Typography variant="h5" gutterBottom>
          Saved files:
        </Typography>
        <div>
          <ExistingFilesPanel files={this.props.files} />
        </div>
      </div>
    </div>
  }
}

Files.propTypes = {
  files: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.string,
  })).isRequired,
  uploadFile: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  files: state.research.files,
});

const mapDispatchToProps = (dispatch) => ({
  uploadFile: (file, meta) => dispatch({ type: 'UPLOAD_RESEARCH_FILE', payload: {file, meta} }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Files);

