import React from 'react';
import PropTypes from 'prop-types';

import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

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

  handleFileSelect(e) {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    const file = e.target.files[0];

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
    return <div>
      <div>
        Create new file

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
        <Input
          label="File upload"
          type="file"
          onChange={this.handleFileSelect}
        />
         <Button
          disabled={!this.state.file}
          fullWidth
          onClick={this.handleFileUpload}
          variant="contained"
         >
           Upload file
         </Button>
      </div>

      <Divider className="files-panel-divider" />

      <div>
        Uploaded files:
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

