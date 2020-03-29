import React from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';

import { connect } from 'react-redux';

import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';

import ComparisonResultTable from './ComparisonResultsTable';

import './styles.css';

class ComparisonResult extends React.PureComponent {
  constructor(props) {
    super(props);

    this.fetchComparison = this.fetchComparison.bind(this);
  }

  componentDidMount() {
    const {research, comparison} = this.props;
    
    if (!this.timer && !comparison.finished) {
      this.timer = setInterval(this.fetchComparison, 1000);
    }
  }

  componentDidUpdate() {
    if (this.props.comparison.finished) {
      this.releaseTimer();
    }
  }

  componentWillUnmount() {
    this.releaseTimer();
  }

  releaseTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  fetchComparison() {
    this.props.getComparison(this.props.research.comparisonID);
  }

  formatTime(time) {
    if (time > 9) {
      return _.toString(time);
    }

    return `0${time}`;
  }

  renderProgress() {
    const {comparison} = this.props;
    if (comparison.finished || !comparison.total) {
      return null;
    }

    const percentage = Math.min(100 * _.round(comparison.processed / comparison.total, 2), 100);
    const elapsedTimeMs = new Date() - new Date(comparison.lockedAt);
    const itemsPerSecond = comparison.processed / (elapsedTimeMs / 1000);
    const timeToProcessedRemaining = (comparison.total - comparison.processed) / itemsPerSecond;
    const minutes = Math.floor(timeToProcessedRemaining / 60);
    const seconds = Math.round(timeToProcessedRemaining - minutes * 60);

    return (<div className="comparison-researches-countdown-container">
      <Paper elevation={3} className="comparison-researches-countdown-content">
        <LinearProgress className="comparison-researches-counter-progress" variant="determinate" value={percentage} />
        <div className="comparison-researches-countdown-time">
          <h2>Comparison is running</h2>
        </div>
        <div className="comparison-researches-countdown-time">
          <h1>{this.formatTime(minutes)}:{this.formatTime(seconds)}</h1>
        </div>
      </Paper>
    </div>);
  }

  render() {
    const {comparison} = this.props;

    return (<div>
      <div>
        {this.renderProgress()}
        {
          comparison.finished &&
            <ComparisonResultTable similarities={comparison.similarities} />
        }
      </div>
    </div>)
  }
}

ComparisonResult.defaultPropsTypes = {
  comparison: {},
  research: {},
};

ComparisonResult.propTypes = {
  comparison: PropTypes.shape({}),
  research: PropTypes.shape({}),
};

const mapStateToProps = (state) => ({
  comparison: state.comparison,
  research: state.research,
});

const mapDispatchToProps = (dispatch) => ({
  clearComparison: () => dispatch({ type: 'CLEAR_COMPARISON' }),
  getComparison: (id) => dispatch({ type:'GET_COMPARISON', payload: id }),
});


export default connect(mapStateToProps, mapDispatchToProps)(ComparisonResult);

