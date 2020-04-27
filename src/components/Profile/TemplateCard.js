import React from 'react';
import PropTypes from 'prop-types';

import { Card, CardActionArea, CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import {getLinkToProfilePhoto} from './utils';

import '../styles/user-template-card.css';

const noop = (...args) => {
  console.error('onClick method does not implemented', ...args);
}

class TemplateCard extends React.PureComponent {
  constructor(props) {
    super(props);
    
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    this.props.onClick({
      type: this.props.type,
      description: this.props.description,
    });
  }

  render() {
    const {type, description} = this.props;

    return (
      <Card className="user-template-card">
      <CardActionArea className="user-template-card-area">
        <CardContent onClick={this.onClick} className="user-template-card-content">
            <img className="user-card-avatar" src={getLinkToProfilePhoto()} />
          <Typography variant="h6">
            {type}
          </Typography>
          <Typography>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    )
  }
}

TemplateCard.defaultProps = {
  onClick: noop
}

TemplateCard.propTypes = {
  type: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default TemplateCard;
