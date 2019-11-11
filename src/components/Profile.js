import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import './styles/profile.css';
import { Card, CardContent } from '@material-ui/core';
import PropTypes from 'prop-types';

class Profile extends React.PureComponent {
  componentDidMount() {
    const { getProfile, match } = this.props;
    this.number = match.params.number;
    getProfile(this.number);
  }

  render() {
    const { profile } = this.props;
    return (
      <div className="profile-content">
        <Card>
          <CardContent>
            <Typography variant="h5">
                            Profile information:
            </Typography>
            <Typography>
              <b>User ID:</b>
              {' '}
              {profile.id}
            </Typography>
            <Typography>
              <b>Login:</b>
              {' '}
              {profile.login}
            </Typography>
            <Typography>
              <b>Name:</b>
              {' '}
              {profile.name}
            </Typography>
            <Typography>
              <b>Surname:</b>
              {' '}
              {profile.surname}
            </Typography>
            <Typography>
              <b>Email:</b>
              {' '}
              {profile.email}
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.shape({
    id: PropTypes.string.isRequired,
    login: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      number: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  getProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

const mapDispatchToProps = (dispatch) => ({
  getProfile: (id) => dispatch({ type: 'GET_PROFILE', payload: id }),
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(Profile);
