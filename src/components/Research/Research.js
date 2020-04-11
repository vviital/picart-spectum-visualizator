import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as _ from 'lodash';

import ResearchExplorer from './ResearchExplorer';
import ComparisonResearchExplorer from './ComparisonResearchExplorer';

const renderersMapping = {
  'zaidel': ResearchExplorer,
  'comparison': ComparisonResearchExplorer,
};

class Research extends React.PureComponent {
  componentDidMount() {
    const { match, getResearch } = this.props;
    const {id} = match.params;
    getResearch(id);
  }

  componentDidUpdate(prevProps) {
    const { match, research, getResearch, getExperiment, location } = this.props;
    const {id} = match.params;
    const experimentID = (new URLSearchParams(location.search)).get('experimentID');
    
    if (research.id && research.id !== id) {
      this.cleanUp();

      getResearch(id);
    }

    if (research.id && research.id === id && experimentID) {
      getExperiment(experimentID);
    }
  }

  componentWillUnmount() {
    this.cleanUp();
  }

  cleanUp() {
    this.props.clearExperiment();
    this.props.clearFile();
    this.props.clearResearch();
  }

  render() {
    if (!this.props.research.id) {
      // TODO: think about something better here
      return null;
    }

    const Renderer = renderersMapping[this.props.research.researchType] || ResearchExplorer;

    return (<Renderer />);
  }
}

Research.defaultProps = {
  research: {}
}

Research.propTypes = {
  research: PropTypes.shape({
    id: PropTypes.string,
    researchType: PropTypes.string.isRequired,
  }).isRequired,
  getResearch: PropTypes.func.isRequired,
  clearExperiment: PropTypes.func.isRequired,
  clearFile: PropTypes.func.isRequired,
  clearResearch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  research: state.research,
});

const mapDispatchToProps = (dispatch) => ({
  getExperiment: (id) => dispatch({ type: 'GET_EXPERIMENT', payload: id }),
  getResearch: (id) => dispatch({ type: 'GET_RESEARCH', payload: id }),
  clearExperiment: () => dispatch({ type: 'CLEAR_EXPERIMENT' }),
  clearFile: () => dispatch({ type: 'CLEAR_FILE' }),
  clearResearch: () => dispatch({ type: 'CLEAR_RESEARCH' }),
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(Research);
