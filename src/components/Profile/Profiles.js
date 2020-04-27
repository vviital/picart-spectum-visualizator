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
    
    this.onSearch = this.onSearch.bind(this);
    this.createProfile = this.createProfile.bind(this);
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
    const { profiles } = this.props;

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
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getProfiles: PropTypes.func.isRequired,
  profiles: PropTypes.shape({}).isRequired,
};

const mapStateToProps = (state) => ({
  profiles: state.profiles,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  createProfile: (payload) => dispatch({type: 'CREATE_PROFILE', payload}),
  getProfiles: () => dispatch({ type: 'GET_PROFILES' }),
  onProfilesQueryChange: (value) => dispatch({ type: 'PROFILES_QUERY_CHANGE', payload: {value}}),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);
