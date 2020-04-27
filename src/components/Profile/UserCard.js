import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as _ from 'lodash';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import {getLinkToProfilePhoto, sizes} from './utils';

import '../styles/userCard.css';

class UserCard extends React.PureComponent {
  render() {
    const { onDelete, user, currentUser } = this.props;
    const cannotDelete = !currentUser.id || (currentUser.id === user.id) || !_.includes(currentUser.roles, 'admin');

    const action = !cannotDelete ? (
      <IconButton>
        <DeleteIcon onClick={() => onDelete(user.id)} />
      </IconButton>
    ) : null;

    return (
      <Card className="user-card">
        <CardHeader
          title={
            <Typography variant="h7" style={{paddingLeft: '12px'}}>
              {_.get(user, 'roles.[0]')}
            </Typography>
          }
          action={action}
          className="user-card-header"
        />
        <CardActionArea>
          <Link to={`/users/${user.id}`} style={{ textDecoration: 'none' }}>
            <CardContent>
              <img src={getLinkToProfilePhoto(user, sizes.MEDIUM)} alt="" className="user-card-avatar" />
              <Typography variant="h6" style={{paddingTop: 12}}>
                {user.name} {user.surname}
              </Typography>
              <Typography variant="h7" style={{paddingTop: 12}}>
                {user.email}
              </Typography>
            </CardContent>
          </Link>
        </CardActionArea>
      </Card>
    );
  }
}

UserCard.defaultProps = {
  currentUser: {},
  user: {}
}

UserCard.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired, 
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired
};

export default UserCard;
