import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Search from '../Search';
import ResearchCard from './ResearchCard';
import ResearchTemplates from './ResearchTemplates';

import '../styles/researches.css';

class Researches extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onSearch = this.onSearch.bind(this);
  }

  componentDidMount() {
    const { getResearches } = this.props;
    getResearches();
  }

  onSearch(value) {
    this.props.getResearches()
  }

  render() {
    const { researches } = this.props;

    return (
      <div className="researches-content">
        <ResearchTemplates onCreate={this.props.createResearch} />
        <Search
          onValueChange={this.props.onSearchValueChange}
          onSearch={this.onSearch}
          value={researches.query}
        />
        <div className="researches-wrapper">
          {researches.items.map((research) => (
            <ResearchCard key={research.id} research={research} onDelete={this.props.deleteResearch} />
          ))}
        </div>
      </div>
    );
  }
}

Researches.propTypes = {
  createResearch: PropTypes.func.isRequired,
  deleteResearch: PropTypes.func.isRequired,
  getResearches: PropTypes.func.isRequired,
  onSearchValueChange: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  researches: state.researches,
});

const mapDispatchToProps = (dispatch) => ({
  createResearch: (payload) => dispatch({ type:'CREATE_RESEARCH', payload}),
  deleteResearch: (id) => dispatch({ type:'DELETE_RESEARCH', payload: {id}}),
  getResearches: (options) => dispatch({ type:'GET_RESEARCHES', payload: {options} }),
  onSearchValueChange: (value) => dispatch({ type: 'RESEARCHES_QUERY_CHANGE', payload: {value}}),
});

export default connect(mapStateToProps, mapDispatchToProps)(Researches);
