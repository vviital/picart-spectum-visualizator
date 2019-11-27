import React from 'react';
import { connect } from 'react-redux';
import lodash from 'lodash';
import Search from '../Search';
import ResearchCard from './ResearchCard';

class Researches extends React.PureComponent {
  componentDidMount() {
    const { getResearches } = this.props;
    getResearches();
  }

  render() {
    const { researches } = this.props;
    if (lodash.isEmpty(researches.items)) {
      return (
        <div className="profiles-content">
          Loading...
        </div>
      );
    }
    const cards = Array.from(Object.values(researches.items));
    return (
      <div className="profiles-content">
        <Search />
        <div className="profiles-wrapper">
          {cards.map((research) => (
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
});
export default connect(mapStateToProps, mapDispatchToProps)(Researches);
