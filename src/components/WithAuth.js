import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

class WithAuth extends React.PureComponent {
  render() {
    const { content, isAuthenticated } = this.props;
    if (!isAuthenticated) {
      return (<Redirect to="/auth" />);
    }
    return content;
  }
}

WithAuth.propTypes = {
  content: PropTypes.element.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.id !== '',
});

export default connect(mapStateToProps)(WithAuth);
