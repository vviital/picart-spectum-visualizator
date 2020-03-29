import React from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';

import { connect } from 'react-redux';

import Researches from './Researches';
import ComparisonResult from './ComparisonResult';

class ComparisonResearchExplorer extends React.PureComponent {
  componentDidMount() {
    const { research, getComparison, getResearches } = this.props;

    this.props.clearComparison();
    getResearches();

    if (research.comparisonID) {
      getComparison(research.comparisonID);
    }
  }

  render() {
    const Renderer = this.props.research.comparisonID ? ComparisonResult : Researches;

    return <Renderer />
  }
}

ComparisonResearchExplorer.defaultProps = {
  comparison: {},
  research: {}
}

ComparisonResearchExplorer.propTypes = {
  research: PropTypes.shape({}),
  comparison: PropTypes.shape({}),
}

const mapStateToProps = (state) => ({
  research: state.research,
  comparison: state.comparison,
});

const mapDispatchToProps = (dispatch) => ({
  clearComparison: () => dispatch({ type: 'CLEAR_COMPARISON' }),
  createComparison: (fileID) => dispatch({ type: 'CREATE_COMPARISON' }),
  getComparison: (id) => dispatch({ type: 'GET_COMPARISON', payload: id}),
  getResearches: (options) => dispatch({ type:'GET_RESEARCHES', payload: {options} }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ComparisonResearchExplorer);
