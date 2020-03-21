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
    this.handleMultiSliderChange = this.handleMultiSliderChange.bind(this);

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

  handleFormChange(updates = []) {
    const {experiment} = this.props;
    let prop = '';
    let next = _.cloneDeep(experiment);

    for (const update of updates) {
      const {name, value} = update;
      prop = _.first(_.split(name, '.'));
      next = _.merge({}, next, _.set({}, name, value));
    }

    if (prop) {
      this.props.editExperiment(prop, next[prop]);
      this.commitExperimentDebounced();
    }
  }

  handleSliderChange(name) {
    return (event, value) => {
      this.handleFormChange([{name, value}]);
    }
  }

  handleSwitchChange(name) {
    return (event) => {
      this.handleFormChange([{name, value: event.target.checked}]);
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

    const {peaksSearchSettings} = experiment;

    return (<FormControl>
      <FormLabel component="legend">Peak search config</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={<Switch
            checked={peaksSearchSettings.smoothMarkov}
            onChange={this.handleSwitchChange('peaksSearchSettings.smoothMarkov')}
            value="jason" />}
          label="Use Markov smooth"
        />
        <FormControlLabel
          control={
             <Slider
              value={peaksSearchSettings.averageWindow}
              step={1}
              min={0}
              max={20}
              valueLabelDisplay="auto"
              onChange={this.handleSliderChange('peaksSearchSettings.averageWindow')}
            />
          }
          labelPlacement="top"
          label="Use Markov smooth"
        />
        <FormControlLabel
          control={
             <Slider
              value={peaksSearchSettings.deconvolutionIterations}
              step={1}
              min={1}
              max={100}
              valueLabelDisplay="auto"
              onChange={this.handleSliderChange('peaksSearchSettings.deconvolutionIterations')}
            />
          }
          labelPlacement="top"
          label="Number of iterations"
        />
        <FormControlLabel
          control={
             <Slider
              value={peaksSearchSettings.sigma}
              step={0.5}
              min={1}
              max={100}
              valueLabelDisplay="auto"
              onChange={this.handleSliderChange('peaksSearchSettings.sigma')}
            />
          }
          labelPlacement="top"
          label="Sigma"
        />
        <FormControlLabel
          control={
             <Slider
              value={peaksSearchSettings.threshold}
              step={0.5}
              min={1}
              max={99}
              valueLabelDisplay="auto"
              onChange={this.handleSliderChange('peaksSearchSettings.threshold')}
            />
          }
          labelPlacement="top"
          label="Threshold"
        />
      </FormGroup>
    </FormControl>)
  }

  handleMultiSliderChange(scope, minName, maxName) {
    return (event, value) => {
      let [min, max] = value;
      if (min > max) {
        [max, min] = [min, max];
      }

      this.handleFormChange([
        {
          name: `${scope}.${minName}`,
          value: min
        },
        {
          name: `${scope}.${maxName}`,
          value: max
        }
      ])
    };
  }

  renderChemicalElementExperimentForm() {
    const {experiment} = this.props;
    if (!experiment.id) {
      return null;
    }

    const {chemicalElementsSettings} = experiment;

    return (<FormControl>
      <FormLabel component="legend">Chemical elements search config</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={<Switch
            checked={chemicalElementsSettings.searchInMostSuitableGroup}
            onChange={this.handleSwitchChange('chemicalElementsSettings.searchInMostSuitableGroup')}
             />}
          label="Search in most suitable groups"
        />
        <FormControlLabel
          control={
             <Slider
              value={chemicalElementsSettings.maxElementsPerPeak}
              step={1}
              min={0}
              max={100}
              valueLabelDisplay="auto"
              onChange={this.handleSliderChange('chemicalElementsSettings.maxElementsPerPeak')}
            />
          }
          labelPlacement="top"
          label="Max elements per peak"
        />
        <FormControlLabel
          control={
             <Slider
              value={[chemicalElementsSettings.minIntensity, chemicalElementsSettings.maxIntensity]}
              step={0.05}
              min={0}
              max={500}
              valueLabelDisplay="auto"
              onChange={this.handleMultiSliderChange('chemicalElementsSettings', 'minIntensity', 'maxIntensity')}
            />
          }
          labelPlacement="top"
          label="Intensity"
        />
        <FormControlLabel
          control={
             <Slider
              value={chemicalElementsSettings.maxIonizationLevel}
              step={1}
              min={0}
              max={500}
              valueLabelDisplay="auto"
              onChange={this.handleSliderChange('chemicalElementsSettings.maxIonizationLevel')}
            />
          }
          labelPlacement="top"
          label="Max ionization level"
        />
        <FormControlLabel
          control={
             <Slider
              value={chemicalElementsSettings.waveLengthRange}
              step={0.005}
              min={0}
              max={2}
              valueLabelDisplay="auto"
              onChange={this.handleSliderChange('chemicalElementsSettings.waveLengthRange')}
            />
          }
          labelPlacement="top"
          label="wave length range"
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
        {this.renderChemicalElementExperimentForm()}
    </div>
  }
}

Settings.defaultProps = {
  experiment: {
    peaksSearchSettings: {},
    chemicalElementsSettings: {}
  },
  experiments: [],
}

Settings.propTypes = {
  experiment: PropTypes.shape({
    peaksSearchSettings: PropTypes.shape({
      calculateBackground: PropTypes.bool.isRequired,
      smoothMarkov: PropTypes.bool.isRequired,
      averageWindow: PropTypes.number.isRequired,
      deconvolutionIterations: PropTypes.number.isRequired,
      sigma: PropTypes.number.isRequired,
      threshold: PropTypes.number.isRequired,
    }),
    chemicalElementsSettings: PropTypes.shape({
      searchInMostSuitableGroup: PropTypes.bool.isRequired,
      maxElementsPerPeak: PropTypes.number.isRequired,
      minIntensity: PropTypes.number.isRequired,
      maxIntensity: PropTypes.number.isRequired,
      maxIonizationLevel: PropTypes.number.isRequired,
      waveLengthRange: PropTypes.number.isRequired,
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
