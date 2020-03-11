import React from 'react';
import PropTypes from 'prop-types';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class ExistingFilesPanel extends React.PureComponent {
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
    const {files} = this.props;

    return (<div>
      {
        files.map((file) => {
          const id = file.id;
          return <ExpansionPanel key={id} expanded={id === this.state.expanded} onChange={this.handleChange(id)}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{file.title}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                {file.description}
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        })
      }
    </div>)
  }
}

ExistingFilesPanel.defaultProps = {
  files: []
}

ExistingFilesPanel.propTypes = {
  files: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.string,
  })).isRequired,
}

export default ExistingFilesPanel;
