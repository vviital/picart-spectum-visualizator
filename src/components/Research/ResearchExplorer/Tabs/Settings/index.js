import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as _ from 'lodash';

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Slider from '@material-ui/core/Slider';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';

class Settings extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onExperimentChange = this.onExperimentChange.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.commitExperiment = this.commitExperiment.bind(this);
    this.handleSliderChange = this.handleSliderChange.bind(this);
    this.handleSwitchChange = this.handleSwitchChange.bind(this);

    this.commitExperimentDebounced = _.debounce(this.commitExperiment, 100);
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

  commitExperiment() {
    this.props.commitExperiment();
  }

  handleFormChange(name, update) {
    const {experiment} = this.props;
    let prop = name;

    if (_.includes(name, '.')) {
      prop = _.first(_.split(prop, '.'));
      update = _.merge({}, experiment, _.set({}, name, update))[prop];
    }

    this.props.editExperiment(prop, update);
    this.commitExperimentDebounced();
  }

  handleSliderChange(name) {
    return (event, value) => {
      this.handleFormChange(name, value);
    }
  }

  handleSwitchChange(name) {
    return (event) => {
      this.handleFormChange(name, event.target.checked);
    }
  }

  componentDidMount() {
    this.props.getExperiments();
  }

  renderPeaksExperimentForm() {
    const {experiment} = this.props;
    if (!experiment.id) {
      return null;
    }

    const {settings} = experiment;

    return (<FormControl>
      <FormLabel component="legend">Peak search config</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={<Switch
            checked={settings.smoothMarkov}
            onChange={this.handleSwitchChange('settings.smoothMarkov')}
            value="jason" />}
          label="Use Markov smooth"
        />
        <FormControlLabel
          control={
             <Slider
              value={settings.averageWindow}
              step={1}
              min={0}
              max={20}
              valueLabelDisplay="auto"
              onChange={this.handleSliderChange('settings.averageWindow')}
            />
          }
          labelPlacement="top"
          label="Use Markov smooth"
        />
        <FormControlLabel
          control={
             <Slider
              value={settings.deconvolutionIterations}
              step={1}
              min={1}
              max={100}
              valueLabelDisplay="auto"
              onChange={this.handleSliderChange('settings.deconvolutionIterations')}
            />
          }
          labelPlacement="top"
          label="Number of iterations"
        />
        <FormControlLabel
          control={
             <Slider
              value={settings.sigma}
              step={0.5}
              min={1}
              max={100}
              valueLabelDisplay="auto"
              onChange={this.handleSliderChange('settings.sigma')}
            />
          }
          labelPlacement="top"
          label="Sigma"
        />
        <FormControlLabel
          control={
             <Slider
              value={settings.threshold}
              step={0.5}
              min={1}
              max={99}
              valueLabelDisplay="auto"
              onChange={this.handleSliderChange('settings.threshold')}
            />
          }
          labelPlacement="top"
          label="Threshold"
        />
      </FormGroup>
    </FormControl>)
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
        {this.renderPeaksExperimentForm()}
    </div>
  }
}

Settings.defaultProps = {
  experiment: {
    settings: {}
  },
  experiments: [],
}

Settings.propTypes = {
  experiment: PropTypes.shape({
    settings: PropTypes.shape({
      calculateBackground: PropTypes.bool.isRequired,
      smoothMarkov: PropTypes.bool.isRequired,
      averageWindow: PropTypes.number.isRequired,
      deconvolutionIterations: PropTypes.number.isRequired,
      sigma: PropTypes.number.isRequired,
      threshold: PropTypes.number.isRequired,
    })
  }),
  experiments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string,
    name: PropTypes.string,
  })),
}

const mapStateToProps = (state) => ({
  experiment: state.experiment,
  experiments: state.experiments.items
});

const mapDispatchToProps = (dispatch) => ({
  getExperiment: (id) => dispatch({ type: 'GET_EXPERIMENT', payload: id }),
  getExperiments: () => dispatch({ type: 'GET_EXPERIMENTS' }),
  editExperiment: (key, value) => dispatch({ type: 'EDIT_EXPERIMENT', payload: {key, value} }),
  commitExperiment: () => dispatch({ type: 'COMMIT_EXPERIMENT' })
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
