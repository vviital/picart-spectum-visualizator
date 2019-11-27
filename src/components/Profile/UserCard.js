import React from 'react';
import Card from '@material-ui/core/Card';
import { CardActionArea, CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/userCard.css';

class UserCard extends React.PureComponent {
  render() {
    const { user } = this.props;
    return (
      <Card className="user-card">
        <CardActionArea>
          <Link to={`/users/${user.id}`} style={{ textDecoration: 'none' }}>
            <CardContent>
              <Typography variant="h5">
                {user.name}
              </Typography>
              <Typography>
                {user.email}
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
