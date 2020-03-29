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
    const { match, research, getResearch } = this.props;
    const {id} = match.params;
    
    if (research.id && research.id !== id) {
      this.cleanUp();

      getResearch(id);
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
  getResearch: (id) => dispatch({ type: 'GET_RESEARCH', payload: id }),
  clearExperiment: () => dispatch({ type: 'CLEAR_EXPERIMENT' }),
  clearFile: () => dispatch({ type: 'CLEAR_FILE' }),
  clearResearch: () => dispatch({ type: 'CLEAR_RESEARCH' }),
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(Research);
