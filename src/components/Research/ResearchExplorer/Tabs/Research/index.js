import React from 'react';
import PropTypes from 'prop-types';
import {debounce} from 'lodash';

import TextField from '@material-ui/core/TextField';

import { connect } from 'react-redux';

import './style/index.css';

class Research extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleFormChange = this.handleFormChange.bind(this);
    this.commitEdit = this.commitEdit.bind(this);
    this.commitEditDebounced = debounce(this.commitEdit, 500);
  }

  commitEdit() {
    this.props.commitEdit();
  }

  handleFormChange(e) {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    const {name, value} = e.target;

    this.props.editResearch({key: name, value});
    this.commitEditDebounced();
  }

  render() {
    const {research} = this.props;

    return (<div className="research-tab-container">
      Research tab
      <TextField
        onChange={this.handleFormChange}
        value={research.name}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Name"
        type="text"
        id="name"
        name="name"
        autoComplete="current-password"
      />
      <TextField
        onChange={this.handleFormChange}
        value={research.description}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Description"
        type="text"
        id="description"
        name="description"
        autoComplete="current-password"
      />
    </div>)
  }
}

Research.propTypes = {
  research: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    researchType: PropTypes.string.isRequired,
    description: PropTypes.string,
    ownerID: PropTypes.string.isRequired,
    createdAt: PropTypes.number,
    updatedAt: PropTypes.number,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  research: state.research,
});

const mapDispatchToProps = (dispatch) => ({
  editResearch: (payload) => dispatch({ type: 'EDIT_RESEARCH', payload}),
  commitEdit: () => dispatch({ type: 'COMMIT_RESEARCH_EDIT'})
});

export default connect(mapStateToProps, mapDispatchToProps)(Research);

