import React from 'react';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import PropTypes from 'prop-types';

class Snack extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.getColor = this.getColor.bind(this);
  }

  handleClose() {
    const { dispatch } = this.props;
    dispatch({ type: 'CLEAR_SNACK' });
  }

  getColor(type) {
    switch (type) {
      case 'success': return 'green';
      case 'error': return 'firebrick';
      case 'warn': return 'orange';
      default: return 'black';
    }
  }

  render() {
    const { snack } = this.props;
    if (snack && snack.open) {
      return (
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open
          autoHideDuration={5000}
          onClose={this.handleClose}
        >
          <SnackbarContent
            style={{
              backgroundColor: this.getColor(snack.type),
            }}
            message={snack.message}
          />
        </Snackbar>
      );
    }
    return (<div className="snack" />);
  }
}

Snack.propTypes = {
  snack: PropTypes.shape({
    open: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  snack: state.snack,
});

export default connect(mapStateToProps)(Snack);
