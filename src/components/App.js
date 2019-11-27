import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Auth from './Auth';
import WithAuth from './WithAuth';
import Main from './Main';
import NotFound from './NotFound';
import Layout from './Layout';
import Profiles from './Profile/Profiles';
import Search from './Search';
import Profile from './Profile/Profile';

class App extends React.Component {
  constructor(props) {
    super(props);
    const { init } = this.props;
    init();
  }

  render() {
    return (
      <Switch>
        <Route exact path="/auth" component={Auth} />
        <Route
          exact
          path="/"
          render={() => (
            <WithAuth content={<Layout content={<Main />} />} />
          )}
        />
        <Route
          exact
          path="/users"
          render={() => (
            <WithAuth content={<Layout content={<Profiles />} />} />
          )}
        />
        <Route
          path="/users/:number"
          render={() => (
            <WithAuth content={<Layout content={<Profile />} />} />
          )}
        />
        <Route
          exact
          path="/researches"
          render={() => (
            <WithAuth content={<Layout content={<Search />} />} />
          )}
        />

        <Route component={NotFound} />
      </Switch>
    );
  }
}

App.propTypes = {
  init: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  init: () => dispatch({ type: 'APP_INIT' }),
});
export default connect(null, mapDispatchToProps)(App);
