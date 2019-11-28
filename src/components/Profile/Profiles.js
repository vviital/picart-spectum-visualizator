import React from 'react';
import { connect } from 'react-redux';
import lodash from 'lodash';
import PropTypes from 'prop-types';
import UserCard from './UserCard';
import '../styles/profiles.css';
import Search from '../Search';

class Profiles extends React.PureComponent {
  componentDidMount() {
    const { getProfiles } = this.props;
    getProfiles();
  }

  render() {
    const { profiles } = this.props;
    if (lodash.isEmpty(profiles)) {
      return (
        <div className="profiles-content">
                    Loading...
        </div>
      );
    }
    const userCards = Array.from(Object.values(profiles));
    return (
      <div className="profiles-content">
        <Search />
        <div className="profiles-wrapper">
          {userCards.map((user) => (
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);
