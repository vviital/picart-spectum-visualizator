import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class WithAuth extends React.PureComponent {
  render() {
    if (!this.props.isAuthenticated) {
      return (<Redirect to="/auth" />);
    }
    return this.props.content;
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.id !== '',
});
export default connect(mapStateToProps)(WithAuth);
