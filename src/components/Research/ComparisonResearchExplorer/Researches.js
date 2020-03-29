import React from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';

import { connect } from 'react-redux';

import Search from '../../Search';
import ResearchesTable from './ResearchesTable';
import ExperimentsTable from './ExperimentsTable';

class Researches extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onSearch = this.onSearch.bind(this);
    this.onResearchClick = this.onResearchClick.bind(this);
    this.onExperimentSelect = this.onExperimentSelect.bind(this);
  }

  state = {
    selectedResearch: null
  }

  componentDidMount() {
    // TODO: Clear existing researches and experiments from the redux

    const { getResearches } = this.props;
    getResearches({ withExperiments: true });
  }

  onSearch(value) {
    this.props.getResearches({ withExperiments: true })
  }

  onResearchClick(research) {
    this.setState({ selectedResearch: research });
    this.props.getExperiments(research.id);
  }

  onExperimentSelect(experiment) {
    this.setState({ selectedResearch: null });
    this.props.createComparison({
      baseResearchID: experiment.researchID,
      experimentID: experiment.id, 
      researchID: this.props.research.id,
    });
  }

  shouldRenderExperiments() {
    return !!this.state.selectedResearch && _.every(this.props.experiments, (experiment) => {
      return experiment.researchID === this.state.selectedResearch.id;
    });
  }

  render() {
    const { query, researches, experiments } = this.props;

    return (<div>
      <Search
        onValueChange={this.props.onSearchValueChange}
        onSearch={this.onSearch}
        value={query}
      />
      <div className="comparison-researches-container">
        <div className="comparison-researches-left-subcontainer">
          <ResearchesTable
            researches={researches}
            onClick={this.onResearchClick}
            selected={_.set({}, 'id', _.get(this.state, 'selectedResearch.id', null))}
          />
        </div>
        <div className="chemical-elements-right-subcontainer">
            {
              this.shouldRenderExperiments() &&
                <ExperimentsTable
                  experiments={experiments}
                  onClick={this.onExperimentSelect}
                 />
            }
        </div>
      </div>
    </div>)
  }
}

Researches.defaultPropsTypes = {
  research: {},
  researches: [],
  experiments: [],
  query: '',
};

Researches.propTypes = {
  research: PropTypes.shape({}),
  researches: PropTypes.arrayOf(PropTypes.shape({})),
  experiments: PropTypes.arrayOf(PropTypes.shape({})),
  query: PropTypes.string
}

const mapStateToProps = (state) => ({
  research: state.research,
  researches: _.filter(state.researches.items, (research) => research.researchType === 'zaidel'),
  experiments: state.experiments.items,
  query: state.researches.query,
});

const mapDispatchToProps = (dispatch) => ({
  createComparison: (payload) => dispatch({ type: 'CREATE_COMPARISON', payload }),
  getExperiments: (id) => dispatch({ type: 'GET_EXPERIMENTS', payload: {id} }),
  getResearches: (options) => dispatch({ type:'GET_RESEARCHES', payload: {options} }),
  onSearchValueChange: (value) => dispatch({ type: 'RESEARCHES_QUERY_CHANGE', payload: {value}}),
});


export default connect(mapStateToProps, mapDispatchToProps)(Researches);
