import React from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';

import { connect } from 'react-redux';

import Results from './Results';

import './styles.css';

class ExperimentResults extends React.PureComponent {
  render() {
    const {experimentResults} = this.props;

    return (<div className="results-container">
      <Results
        experimentResults={experimentResults}
      />
    </div>)
  }
}

ExperimentResults.defaultProps = {
  experimentResults: []
};

const Coordinates = PropTypes.shape({
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
});

const Element = PropTypes.shape({
  element: PropTypes.string.isRequired,
  intensity: PropTypes.number.isRequired,
  stage: PropTypes.number.isRequired,
  matched: PropTypes.bool.isRequired,
  similarity: PropTypes.number.isRequired,
  waveLength: PropTypes.number.isRequired,
});

ExperimentResults.propTypes = {
  experimentResults: PropTypes.arrayOf(PropTypes.shape({
    peak: PropTypes.shape({
      peak: Coordinates.isRequired,
      left: Coordinates.isRequired,
      right: Coordinates.isRequired,
      area: PropTypes.number.isRequired,
    }),
    element: PropTypes.shape(Element),
    fromSuggestions: PropTypes.bool.isRequired,
  }))
}

const mapStateToProps = (state) => ({
  experimentResults: state.experiment.experimentResults,
});

export default connect(mapStateToProps, null)(ExperimentResults);
