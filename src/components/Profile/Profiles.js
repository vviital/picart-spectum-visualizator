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
    this.props.getProfiles({ query });
  }

  render() {
    const { profiles } = this.props;

    return (
      <div className="profiles-content">
        <Search onSearch={this.onSearch} />
        <div className="profiles-wrapper">
          {profiles.map((user) => (
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
  profiles: state.profiles.items,
});

const mapDispatchToProps = (dispatch) => ({
  getProfiles: (options = {}) => dispatch({ type: 'GET_PROFILES', payload: { options } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);
