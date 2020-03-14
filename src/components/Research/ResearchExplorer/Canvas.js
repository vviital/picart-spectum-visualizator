import React from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';
import * as _ from 'lodash';

import { connect } from 'react-redux';

class Canvas extends React.PureComponent {
  render() {
    const {file} = this.props;

    if (_.isEmpty(file)) {
      return <div>
        Please upload a file
      </div>
    }

    return (
      <Plot
        data={[
          {
            x: _.map(this.props.file.content, 'x'),
            y: _.map(this.props.file.content, 'y'),
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'red'},
          },
        ]}
        layout={ {width: 1000, height: 1000, title: 'Spectrum visualization'} }
      />
    );
  }
}

Canvas.propTypes = {
  file: PropTypes.shape({

  }),
}

const mapStateToProps = (state) => ({
  file: state.files.contents[state.files.currentFile] || {},
});

const mapDispatchToProps = (dispatch) => ({
  getFileContent: (fileID) => dispatch({ type: 'GET_FILE_CONTENT', payload: {fileID}}),
});

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
