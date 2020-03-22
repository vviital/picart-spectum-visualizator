import React from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';
import * as _ from 'lodash';

import { connect } from 'react-redux';

class Canvas extends React.PureComponent {
  render() {
    const {peaks, file} = this.props;

    if (_.isEmpty(file)) {
      return <div>
        Please upload a file
      </div>
    }

    return (
      <Plot
        data={[
          {
            x: _.map(file.content, 'x'),
            y: _.map(file.content, 'y'),
            type: 'scatter',
            mode: 'lines',
            marker: {color: 'red'},
          },
          {
            x: _.map(peaks, 'peak.x'),
            y: _.map(peaks, 'peak.y'),
            type: 'scatter',
            mode: 'markers',
            marker: {color: 'blue'},
          }
        ]}
        layout={ {width: 1000, height: 1000, title: 'Spectrum visualization'} }
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
  peaks: state.experiment.peaks
});

const mapDispatchToProps = (dispatch) => ({
  getFileContent: (fileID) => dispatch({ type: 'GET_FILE_CONTENT', payload: {fileID}}),
});

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
