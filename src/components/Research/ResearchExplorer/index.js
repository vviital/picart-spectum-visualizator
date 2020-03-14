import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import RightPanel from './RightPanel';
import Canvas from './Canvas';

import ExperimentRenderer from './Tabs/Experiment/index';
import FilesRenderer from './Tabs/Files/index';
import ResearchRenderer from './Tabs/Research/index';
import ResultsRenderer from './Tabs/Results';
import SettingsRenderer from './Tabs/Settings/index';

import '../../styles/research.css';
import './styles/research-explorer.css';

class Research extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onChangeTab = this.onChangeTab.bind(this);
  }

  state = {
    activeTab: 'research',
  }

  mapping = {
    experiment: ExperimentRenderer,
    files: FilesRenderer,
    research: ResearchRenderer,
    results: ResultsRenderer,
    settings: SettingsRenderer,
  }

  componentDidMount() {
    const { match, getResearch } = this.props;
    const {id} = match.params;
    getResearch(id);
  }

  onChangeTab(tab) {
    this.setState({ activeTab: tab });
  }

  render() {
    if (!this.props.research.id) {
      // TODO: think about something better here
      return null;
    }

    const Renderer = this.mapping[this.state.activeTab];

    return (<div className="research-explorer-container">
      <div className="research-explorer-canvas-container">
        <Canvas />
      </div>
      <RightPanel
        tab={<Renderer />}
        activeTab={this.state.activeTab}
        onChangeTab={this.onChangeTab}
      />
    </div>);
  }
}

Research.propTypes = {
  research: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    researchType: PropTypes.string.isRequired,
    description: PropTypes.string,
    ownerID: PropTypes.string.isRequired,
    createdAt: PropTypes.number,
    updatedAt: PropTypes.number,
  }).isRequired,
  getResearch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  research: state.research,
});

const mapDispatchToProps = (dispatch) => ({
  getResearch: (id) => dispatch({ type: 'GET_RESEARCH', payload: id }),
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(Research);
