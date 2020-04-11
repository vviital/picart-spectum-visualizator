import React from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';
import * as _ from 'lodash';

import { connect } from 'react-redux';

const reservedWidth = 525;
const reservedHeight = 100;

class Canvas extends React.PureComponent {
  constructor(props) {
    super(props);
    
    this.updateCanvasSize = this.updateCanvasSize.bind(this);
  }

  state = {
    width: 1000,
    height: 1000
  }

  updateCanvasSize() {
    const obj = {
      height: window.innerHeight - reservedHeight,
      width: window.innerWidth - reservedWidth
    };
    this.setState(obj);
  }

  componentDidMount() {
    this.updateCanvasSize();
    window.addEventListener('resize', this.updateCanvasSize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateCanvasSize);
  }
  
  render() {
    const {experimentResults, file} = this.props;

    if (_.isEmpty(file)) {
      return <div>
        Please upload a file
      </div>
    }

    const peaks = _.map(experimentResults, 'peak');
    const elements = _.map(experimentResults, 'element');

    return (
      <Plot
        data={[
          {
            marker: {color: 'red'},
            mode: 'lines',
            type: 'scatter',
            x: _.map(file.content, 'x'),
            y: _.map(file.content, 'y'),
          },
          {
            marker: {color: 'blue'},
            mode: 'markers+text',
            text: _.map(elements, 'element'),
            textposition: 'top',
            type: 'scatter',
            x: _.map(peaks, 'peak.x'),
            y: _.map(peaks, 'peak.y'),
          }
        ]}
        layout={{width: this.state.width, height: this.state.height, title: 'Spectrum visualization'}}
      />
    );
  }
}

Canvas.defaultProps = {
  file: [],
  peaks: []
}

Canvas.propTypes = {
  file: PropTypes.shape({
    content: PropTypes.arrayOf(PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }))
  }),
  peaks: PropTypes.arrayOf(PropTypes.shape({
    peak: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),
    left: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),
    right: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),
    area: PropTypes.number,
  })),
}

const mapStateToProps = (state) => ({
  file: state.files.contents[state.files.currentFile] || {},
  peaks: state.experiment.peaks,
  experimentResults: state.experiment.experimentResults,
});

const mapDispatchToProps = (dispatch) => ({
  getFileContent: (fileID) => dispatch({ type: 'GET_FILE_CONTENT', payload: {fileID}}),
});

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
