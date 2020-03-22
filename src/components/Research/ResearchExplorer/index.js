import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as _ from 'lodash';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import RightPanel from './RightPanel';
import Canvas from './Canvas/index';
import ChemicalElementsPerPeaks from './ChemicalElementsPerPeaks/index';

import ExperimentRenderer from './Tabs/Experiment/index';
import FilesRenderer from './Tabs/Files/index';
import ResearchRenderer from './Tabs/Research/index';
import ResultsRenderer from './Tabs/Results';
import SettingsRenderer from './Tabs/Settings/index';

import '../../styles/research.css';
import './styles/research-explorer.css';

const tabsMapping = {
  0: 'canvas',
  1: 'elements'
};

const revTabMapping = _.transform(tabsMapping, (res, value, key) => {
  res[value] = +key;
}, {});

class Research extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onChangeRightTab = this.onChangeRightTab.bind(this);
    this.onChangeTopTab = this.onChangeTopTab.bind(this);
  }

  state = {
    activeRightTab: 'research',
    activeTopTab: 'canvas'
  }

  mapping = {
    experiment: ExperimentRenderer,
    files: FilesRenderer,
    research: ResearchRenderer,
    results: ResultsRenderer,
    settings: SettingsRenderer,
  }

  componentWillUnmount() {
    this.props.clearExperiment();
    this.props.clearFile();
    this.props.clearResearch();
  }

  componentDidMount() {
    const { match, getResearch } = this.props;
    const {id} = match.params;
    getResearch(id);
  }

  onChangeRightTab(tab) {
    this.setState({ activeRightTab: tab });
  }

  onChangeTopTab(e, tab) {
    this.setState({ activeTopTab: tabsMapping[tab] });
  }

  render() {
    if (!this.props.research.id) {
      // TODO: think about something better here
      return null;
    }

    const Renderer = this.mapping[this.state.activeRightTab];

    return (<div className="research-explorer-container">
      <div className="research-explorer-canvas-container">
        <Tabs
          value={revTabMapping[this.state.activeTopTab]}
          indicatorColor="primary"
          textColor="primary"
          onChange={this.onChangeTopTab}
          aria-label="disabled tabs example"
        >
          <Tab label="Canvas" />
          {!!this.props.experiment.id && <Tab label="Chemical elements" />}
        </Tabs>
        {this.state.activeTopTab === 'canvas' && <Canvas />}
        {this.state.activeTopTab === 'elements' && <ChemicalElementsPerPeaks />}
      </div>
      <RightPanel
        tab={<Renderer />}
        activeTab={this.state.activeRightTab}
        onChangeTab={this.onChangeRightTab}
      />
    </div>);
  }
}

Research.defaultProps = {
  research: {},
  experiment: {},
}

Research.propTypes = {
  research: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    researchType: PropTypes.string.isRequired,
    description: PropTypes.string,
    ownerID: PropTypes.string.isRequired,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
  }).isRequired,
  experiment: PropTypes.shape({
    id: PropTypes.string.isRequired
  }),
  getResearch: PropTypes.func.isRequired,
  clearExperiment: PropTypes.func.isRequired,
  clearFile: PropTypes.func.isRequired,
  clearResearch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  research: state.research,
  experiment: state.experiment,
});

const mapDispatchToProps = (dispatch) => ({
  getResearch: (id) => dispatch({ type: 'GET_RESEARCH', payload: id }),
  clearExperiment: () => dispatch({ type: 'CLEAR_EXPERIMENT' }),
  clearFile: () => dispatch({ type: 'CLEAR_FILE' }),
  clearResearch: () => dispatch({ type: 'CLEAR_RESEARCH' }),
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(Research);
