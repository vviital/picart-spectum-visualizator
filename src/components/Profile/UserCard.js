import React from 'react';
import Card from '@material-ui/core/Card';
import { CardActionArea, CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {getLinkToProfilePhoto, sizes} from './utils';

import '../styles/userCard.css';

class UserCard extends React.PureComponent {
  render() {
    const { user } = this.props;
    return (
      <Card className="user-card">
        <CardActionArea>
          <Link to={`/users/${user.id}`} style={{ textDecoration: 'none' }}>
            <CardContent>
              <img src={getLinkToProfilePhoto(user, sizes.MEDIUM)} alt="" className="user-card-avatar" />
              <Typography variant="h6" style={{paddingTop: 12}}>
                {user.name} {user.surname}
              </Typography>
            </CardContent>
          </Link>
        </CardActionArea>
      </Card>
    );
  }
}

UserCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserCard;
