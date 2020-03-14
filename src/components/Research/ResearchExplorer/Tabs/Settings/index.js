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

class Settings extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onExperimentChange = this.onExperimentChange.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
  }

  state = {
    open: false,
    experimentID: '',
  }

  onExperimentChange(e) {
    const experimentID = e.target.value;

    this.setState({experimentID});
    this.props.getExperiment(experimentID);
  }

  handleFormChange(e) {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    const {name, value} = e.target;

    this.setState({ [name]: value })
  }

  componentDidMount() {
    this.props.getExperiments();
  }

  render() {
    const {experiments} = this.props;

    return <div>
        <Select
          open={this.state.open}
          onClose={() => this.setState({open: false})}
          onOpen={() => this.setState({open: true})}
          value={this.state.experimentID}
          onChange={this.onExperimentChange}
        >
          {
            experiments.map((experiment) => {
              return (<MenuItem key={experiment.id} value={experiment.id}>{experiment.name}</MenuItem>)
            })
          }
        </Select>

      <FormControl>
        Here we'll have a form
      </FormControl>
    </div>
  }
}

Settings.defaultProps = {
  experiment: {},
  experiments: [],
}

Settings.propTypes = {
  experiment: PropTypes.shape({

  }),
  experiments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string,
    name: PropTypes.string,
  })),
}

const mapStateToProps = (state) => ({
  experiment: state.research.experiment,
  experiments: state.experiments.items
});

const mapDispatchToProps = (dispatch) => ({
  getExperiment: (id) => dispatch({ type: 'GET_EXPERIMENT', payload: id }),
  getExperiments: () => dispatch({ type: 'GET_EXPERIMENTS' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
