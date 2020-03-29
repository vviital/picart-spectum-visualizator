import React from 'react';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import ResearchIcon from './ResearchIcon';
import ComparisonIcon from './ComparisonIcon';

import '../styles/research-card.css';

const noop = (...args) => {
  console.error('onDelete method does not implemented', args);
};

const typeIconMapping = {
  'zaidel': ResearchIcon,
  'comparison': ComparisonIcon
}

class ResearchCard extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onDelete = this.onDelete.bind(this);
  }

  onDelete(e) {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    this.props.onDelete(this.props.research.id);
  }

  render() {
    const { research } = this.props;
    const Icon = typeIconMapping[research.researchType] || ResearchIcon;

    return (
      <Card className="research-card">
        <CardHeader
          title={
            <Typography variant="h7" style={{paddingLeft: '12px'}}>
              {research.researchType}
            </Typography>
          }
          action={
            <IconButton>
              <DeleteIcon onClick={this.onDelete} />
            </IconButton>
          }
          className="research-card-header"
        />
        <CardActionArea className="research-card-area">
          <Link to={`/researches/${research.id}`} style={{ textDecoration: 'none' }}  className="research-card-content">
            <CardContent>
              <div className="research-icon-container-wrapper">
                <div className="research-icon-container">
                  <Icon />
                </div>
              </div>
              <Typography>
                {research.name}
              </Typography>
            </CardContent>
          </Link>
        </CardActionArea>
      </Card>
    );
  }
}

ResearchCard.defaultProps = {
  onDelete: noop
};

ResearchCard.propTypes = {
  research: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    researchType: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    ownerID: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired
};

export default ResearchCard;
