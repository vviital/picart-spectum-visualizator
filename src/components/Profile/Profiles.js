import React from 'react';
import { connect } from 'react-redux';
import lodash from 'lodash';
import PropTypes from 'prop-types';
import UserCard from './UserCard';

import Search from '../Search';
import ProfileTemplate from './ProfileTemplate';

import '../styles/profiles.css';

class Profiles extends React.PureComponent {
  constructor(props) {
    super(props);
    
    this.createProfile = this.createProfile.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  componentDidMount() {
    const { getProfiles } = this.props;
    getProfiles();
  }

  onSearch(query) {
    this.props.getProfiles();
  }

  createProfile(profile) {
    this.props.createProfile(profile);
  }

  render() {
    const { user: currentUser, profiles } = this.props;

    return (
      <div className="profiles-content">
        <ProfileTemplate onCreate={this.createProfile} />
        <Search
          onSearch={this.onSearch}
          onValueChange={this.props.onProfilesQueryChange}
          value={this.props.profiles.query}
        />
        <div className="profiles-wrapper">
          {profiles.items.map((user) => (
            <UserCard
              currentUser={currentUser}
              key={user.id}
              onDelete={this.props.deleteProfile}
              user={user}
            />
          ))}
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
  createProfile: PropTypes.func.isRequired,
  deleteProfile: PropTypes.func.isRequired,
  getProfiles: PropTypes.func.isRequired,
  profiles: PropTypes.shape({}).isRequired,
};

const mapStateToProps = (state) => ({
  profiles: state.profiles,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  createProfile: (payload) => dispatch({type: 'CREATE_PROFILE', payload}),
  deleteProfile: (id) => dispatch({type: 'DELETE_PROFILE', payload: {id}}),
  getProfiles: () => dispatch({ type: 'GET_PROFILES' }),
  onProfilesQueryChange: (value) => dispatch({ type: 'PROFILES_QUERY_CHANGE', payload: {value}}),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);
