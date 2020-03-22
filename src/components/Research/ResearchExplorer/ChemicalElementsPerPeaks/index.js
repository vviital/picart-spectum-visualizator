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
    this.props.commitExperiment();
  }

  updateElements(elements) {
    const updatedElementsPerPeaks = this.props.elementsPerPeaks.map((peak) => {
      if (this.isCurrentPeak(peak)) {
        console.log('--- next elements ---', elements, peak);
        return {...peak, elements};
      }
      return peak;
    });

    this.props.editExperiment('matchedElementsPerPeak', updatedElementsPerPeaks);
    this.commitExperimentDebounced();
  }

  isCurrentPeak(peak) {
    const {x, y} = peak;

    return (
      _.get(peak, 'peak.x') === _.get(this.state, 'selectedPeak.peak.x') &&
      _.get(peak, 'peak.y') === _.get(this.state, 'selectedPeak.peak.y')
    );
  }

  get peak() {
    const {elementsPerPeaks} = this.props;
    return elementsPerPeaks.find(this.isCurrentPeak);
  }

  render() {
    const {elementsPerPeaks} = this.props;
    const peak = this.peak;

    return (<div className="chemical-elements-container">
      <div className="chemical-elements-left-subcontainer">
        <Peaks
          elementsPerPeaks={elementsPerPeaks}
          onClick={(p) => this.setState({ selectedPeak: p })}
        />
      </div>
      <div className="chemical-elements-right-subcontainer">
        {
          peak &&
            <Elements
              elements={peak.elements}
              updateElements={this.updateElements}
            />
        }
      </div>
    </div>)
  }
}

ChemicalElementsPerPeaks.defaultProps = {
  elementsPerPeaks: []
}

const Coordinates = PropTypes.shape({
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
})

ChemicalElementsPerPeaks.propTypes = {
  elementsPerPeaks: PropTypes.arrayOf(PropTypes.shape({
    peak: Coordinates.isRequired,
    left: Coordinates.isRequired,
    right: Coordinates.isRequired,
    area: PropTypes.number.isRequired,
    elements: PropTypes.arrayOf(PropTypes.shape({
      element: PropTypes.string.isRequired,
      intensity: PropTypes.number.isRequired,
      ionizationStage: PropTypes.number.isRequired,
      isSearchCriteriaMatched: PropTypes.bool.isRequired,
      selected: PropTypes.bool.isRequired,
      similarity: PropTypes.number.isRequired,
      waveLength: PropTypes.number.isRequired,
    })),
    totalElementsCount: PropTypes.number.isRequired
  })),
  editExperiment: PropTypes.func.isRequired,
  commitExperiment: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  elementsPerPeaks: state.experiment.matchedElementsPerPeak
});

const mapDispatchToProps = (dispatch) => ({
  editExperiment: (key, value) => dispatch({ type: 'EDIT_EXPERIMENT', payload: {key, value} }),
  commitExperiment: () => dispatch({ type: 'COMMIT_EXPERIMENT' })
})

export default connect(mapStateToProps, mapDispatchToProps)(ChemicalElementsPerPeaks);
