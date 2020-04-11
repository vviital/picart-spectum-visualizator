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
import ExperimentResults from './ExperimentResults/index';

import ExperimentRenderer from './Tabs/Experiment/index';
import FilesRenderer from './Tabs/Files/index';
import ResearchRenderer from './Tabs/Research/index';
import SettingsRenderer from './Tabs/Settings/index';

import '../../styles/research.css';
import './styles/research-explorer.css';

const tabsMapping = {
  0: 'canvas',
  1: 'elements',
  2: 'results',
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
    settings: SettingsRenderer,
  }

  onChangeRightTab(tab) {
    this.setState({ activeRightTab: tab });
  }

  onChangeTopTab(e, tab) {
    this.setState({ activeTopTab: tabsMapping[tab] });
  }

  render() {
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
          {!!this.props.experiment.id && <Tab label="Experiment results" />}
        </Tabs>
        {this.state.activeTopTab === 'canvas' && <Canvas />}
        {this.state.activeTopTab === 'elements' && <ChemicalElementsPerPeaks />}
        {this.state.activeTopTab === 'results' && <ExperimentResults />}
      </div>
      <RightPanel
        activeTab={this.state.activeRightTab}
        experimentID={this.props.experiment.id}
        onChangeTab={this.onChangeRightTab}
        tab={<Renderer />}
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
};

const mapStateToProps = (state) => ({
  research: state.research,
  experiment: state.experiment,
});

export default compose(
  withRouter,
  connect(mapStateToProps, null),
)(Research);
