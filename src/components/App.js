import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import Auth from './Auth';
import WithAuth from './WithAuth';
import Main from './Main';
import NotFound from './NotFound';
import Layout from './Layout';
import Profiles from './Profiles';
import Search from './Search';
import Profile from './Profile';
import EditProfile from './EditProfile';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.props.init();
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
          path="/profiles"
          render={() => (
            <WithAuth content={<Layout content={<Profiles />} />} />
          )}
        />
        <Route
          path="/profiles/:number"
          render={() => (
            <WithAuth content={<Layout content={<Profile />} />} />
          )}
        />
        <Route
          exact
          path="/edit-profile"
          render={() => (
            <WithAuth content={<Layout content={<EditProfile />} />} />
          )}
        />
        <Route
          exact
          path="/search"
          render={() => (
            <WithAuth content={<Layout content={<Search />} />} />
          )}
        />

        <Route component={NotFound} />
      </Switch>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  init: () => dispatch({ type: 'APP_INIT' }),
});
export default connect(null, mapDispatchToProps)(App);
