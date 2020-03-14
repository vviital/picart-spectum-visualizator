import React from 'react';
import PropTypes from 'prop-types';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class ExistingExperimentsPanel extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    expanded: ''
  }

  handleChange(panel) {
    return (event, isExpanded) => {
      this.setState({expanded: isExpanded ? panel : ''});
    }
  }

  render() {
    const {experiments} = this.props;

    return (<div>
      {
        experiments.map((experiment) => {
          const id = experiment.id;
          return <ExpansionPanel key={id} expanded={id === this.state.expanded} onChange={this.handleChange(id)}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{experiment.name}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                {experiment.description}
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        })
      }
    </div>)
  }
}

ExistingExperimentsPanel.defaultProps = {
  experiments: []
}

ExistingExperimentsPanel.propTypes = {
  experiments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string,
    name: PropTypes.string
  })).isRequired,
}

export default ExistingExperimentsPanel;
