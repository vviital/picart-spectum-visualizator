import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Search from '../Search';
import ResearchCard from './ResearchCard';
import ResearchTemplates from './ResearchTemplates';

import '../styles/researches.css';

class Researches extends React.PureComponent {
  componentDidMount() {
    const { getResearches } = this.props;
    getResearches();
  }

  componentWillUnmount() {
    console.log('--- unmounting ---');
  }

  render() {
    const { researches } = this.props;

    return (
      <div className="researches-content">
        <ResearchTemplates onCreate={this.props.createResearch} />
        <Search />
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
}

const mapStateToProps = (state) => ({
  researches: state.researches,
});

const mapDispatchToProps = (dispatch) => ({
  createResearch: (payload) => {dispatch({ type:'CREATE_RESEARCH', payload})},
  deleteResearch: (id) => {dispatch({ type:'DELETE_RESEARCH', payload: {id}})},
  getResearches: () => {dispatch({ type:'GET_RESEARCHES' })},
});

export default connect(mapStateToProps, mapDispatchToProps)(Researches);
