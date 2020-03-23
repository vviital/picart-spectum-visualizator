import React from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';

import { connect } from 'react-redux';

import Elements from './Elements';
import Peaks from './Peaks';

import './styles.css';

class ChemicalElementsPerPeaks extends React.PureComponent {
  constructor(props) {
    super(props);
    
    this.updateElements = this.updateElements.bind(this);
    this.isCurrentPeak = this.isCurrentPeak.bind(this);
    this.commitExperiment = this.commitExperiment.bind(this);
    this.commitExperimentDebounced = _.debounce(this.commitExperiment, 100);
  }

  state = {
    selectedPeak: null
  }

  commitExperiment() {
    this.props.commitExperiment({ fields: ['matchedElementsPerPeak'] });
  }

  updateElements(elements) {
    const updatedElementsPerPeaks = this.props.elementsPerPeaks.map((peak) => {
      if (this.isCurrentPeak(peak)) {
        return {...peak, elements};
      }
      return peak;
    });

    this.props.editExperiment('matchedElementsPerPeak', updatedElementsPerPeaks);
    this.commitExperiment();
  }

  isCurrentPeak(peak) {
    return (
      _.get(peak, 'peak.x') === _.get(this.state, 'selectedPeak.peak.x') &&
      _.get(peak, 'peak.y') === _.get(this.state, 'selectedPeak.peak.y')
    );
  }

  get peak() {
    const {elementsPerPeaks} = this.props;
    return elementsPerPeaks.find(this.isCurrentPeak);
  }

  get suggestion() {
    return _.find(this.props.autoSuggestions, ({peak}) => this.isCurrentPeak(peak));
  }

  render() {
    const {elementsPerPeaks} = this.props;
    const peak = this.peak;

    return (<div className="chemical-elements-container">
      <div className="chemical-elements-left-subcontainer">
        <Peaks
          elementsPerPeaks={elementsPerPeaks}
          onClick={(p) => this.setState({ selectedPeak: p })}
          selected={peak}
        />
      </div>
      <div className="chemical-elements-right-subcontainer">
        {
          peak &&
            <Elements
              elements={peak.elements}
              suggestion={this.suggestion}
              updateElements={this.updateElements}
            />
        }
      </div>
    </div>)
  }
}

ChemicalElementsPerPeaks.defaultProps = {
  elementsPerPeaks: [],
  autoSuggestions: [],
}

const Coordinates = PropTypes.shape({
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
});

const Element = PropTypes.shape({
  element: PropTypes.string.isRequired,
  intensity: PropTypes.number.isRequired,
  stage: PropTypes.number.isRequired,
  matched: PropTypes.bool.isRequired,
  selected: PropTypes.bool.isRequired,
  similarity: PropTypes.number.isRequired,
  waveLength: PropTypes.number.isRequired,
});

ChemicalElementsPerPeaks.propTypes = {
  elementsPerPeaks: PropTypes.arrayOf(PropTypes.shape({
    peak: Coordinates.isRequired,
    left: Coordinates.isRequired,
    right: Coordinates.isRequired,
    area: PropTypes.number.isRequired,
    elements: PropTypes.arrayOf(Element),
    totalElementsCount: PropTypes.number.isRequired
  })),
  autoSuggestions: PropTypes.arrayOf(PropTypes.shape({
    peak: PropTypes.shape({
      peak: Coordinates.isRequired,
      left: Coordinates.isRequired,
      right: Coordinates.isRequired,
      area: PropTypes.number.isRequired,
    }).isRequired,
    element: Element.isRequired,
  })),
  editExperiment: PropTypes.func.isRequired,
  commitExperiment: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  autoSuggestions: state.experiment.autoSuggestions,
  elementsPerPeaks: state.experiment.matchedElementsPerPeak,
});

const mapDispatchToProps = (dispatch) => ({
  editExperiment: (key, value) => dispatch({ type: 'EDIT_EXPERIMENT', payload: {key, value} }),
  commitExperiment: (payload) => dispatch({ type: 'COMMIT_EXPERIMENT', payload })
})

export default connect(mapStateToProps, mapDispatchToProps)(ChemicalElementsPerPeaks);
