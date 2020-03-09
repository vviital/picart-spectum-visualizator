import React from 'react';
import { connect } from 'react-redux';
import lodash from 'lodash';
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
            <ResearchCard key={research.id} research={research} />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  researches: state.researches,
});

const mapDispatchToProps = (dispatch) => ({
  getResearches: () => {dispatch({ type:'GET_RESEARCHES' })},
  createResearch: (payload) => {dispatch({ type:'CREATE_RESEARCH', payload})}
});
export default connect(mapStateToProps, mapDispatchToProps)(Researches);
