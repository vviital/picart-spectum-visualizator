import React from 'react';
import { connect } from 'react-redux';
import lodash from 'lodash';
import PropTypes from 'prop-types';
import UserCard from './UserCard';
import '../styles/profiles.css';
import Search from '../Search';

class Profiles extends React.PureComponent {
  constructor(props) {
    super(props);
    
    this.onSearch = this.onSearch.bind(this);
  }

  componentDidMount() {
    const { getProfiles } = this.props;
    getProfiles();
  }

  onSearch(query) {
    this.props.getProfiles();
  }

  render() {
    const { profiles } = this.props;

    return (
      <div className="profiles-content">
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
  profiles: PropTypes.shape({}).isRequired,
  getProfiles: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  profiles: state.profiles,
});

const mapDispatchToProps = (dispatch) => ({
  getProfiles: () => dispatch({ type: 'GET_PROFILES' }),
  onProfilesQueryChange: (value) => dispatch({ type: 'PROFILES_QUERY_CHANGE', payload: {value}}),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);
