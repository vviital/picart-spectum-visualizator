import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import { connect } from 'react-redux';

class Experiment extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onFileChange = this.onFileChange.bind(this);
  }

  state = {
    open: false,
    fileId: ''
  }

  onFileChange(e) {
    const fileId = e.target.value;

    this.setState({fileId});
    this.props.getFileContent(fileId);
  }

  render() {
    return <div>
      <FormControl>
        <Select
          open={this.state.open}
          onClose={() => this.setState({open: false})}
          onOpen={() => this.setState({open: true})}
          value={this.state.fileId}
          onChange={this.onFileChange}
        >
          {
            this.props.files.map((file) => {
              return (<MenuItem value={file.id}>{file.title}</MenuItem>)
            })
          }
        </Select>
      </FormControl>
    </div>
  }
}

Experiment.defaultProps = {
  files: []
}

Experiment.propTypes = {
  files: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.string,
  })).isRequired,
  getFileContent: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  files: state.research.files,
});

const mapDispatchToProps = (dispatch) => ({
  getFileContent: (fileId) => dispatch({ type: 'GET_FILE_CONTENT', payload: {fileId}}),
});

export default connect(mapStateToProps, mapDispatchToProps)(Experiment);
