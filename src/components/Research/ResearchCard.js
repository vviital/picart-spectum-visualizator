import React from 'react';
import Card from '@material-ui/core/Card';
import { CardActionArea, CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/research-card.css';

class ResearchCard extends React.PureComponent {
  render() {
    const { research } = this.props;
    return (
      <Card className="research-card">
        <CardActionArea className="research-card-area">
          <Link to={`/researches/${research.id}`} style={{ textDecoration: 'none' }}>
            <CardContent>
              <Typography variant="h6">
                {research.researchType}
              </Typography>
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

ResearchCard.propTypes = {
  research: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    researchType: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    ownerID: PropTypes.string.isRequired,
  }).isRequired,
};

export default ResearchCard;
