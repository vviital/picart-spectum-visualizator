import React from 'react';
import PropTypes from 'prop-types';

import { Card, CardActionArea, CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import ResearchIcon from './ResearchIcon';
import ComparisonIcon from './ComparisonIcon';

import '../styles/research-template-card.css';

const noop = (...args) => {
  console.error('onClick method does not implemented', ...args);
}

const typeIconMapping = {
  'zaidel': ResearchIcon,
  'comparison': ComparisonIcon
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
    const Icon = typeIconMapping[type] || ResearchIcon;

    return (
      <Card className="research-template-card">
      <CardActionArea className="research-template-card-area">
        <CardContent onClick={this.onClick} className="research-template-card-content">
          <div className="research-template-icon-container">
            <Icon />
          </div>
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
