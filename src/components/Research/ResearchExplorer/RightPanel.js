import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import IconButton from '@material-ui/core/IconButton';

import ResearchIcon from './icons/Research';
import FileIcon from './icons/File';
import ExperimentIcon from './icons/Experiment';
import SettingsIcon from './icons/Settings';
import ResultsIcon from './icons/Results';

import './styles/right-panel.css';

const noop = (...args) => {
  console.error('Method does not implemented', ...args);
};

class RightPanel extends React.PureComponent {
  constructor(props) {
    super(props);

    this.selectTab = this.selectTab.bind(this);
  }

  selectTab(name) {
    return (e) => {
      if (e && e.preventDefault) {
        e.preventDefault();
      }

      this.props.onChangeTab(name);
    }
  }

  tabs = [
    {
      Renderer: ResearchIcon,
      name: 'research'
    },
    {
      Renderer: FileIcon,
      name: 'files'
    },
    {
      Renderer: ExperimentIcon,
      name: 'experiment'
    },
    {
      Renderer: SettingsIcon,
      name: 'settings'
    },
    {
      Renderer: ResultsIcon,
      name: 'results'
    }
  ];

  render() {
    return <div className="right-panel-container">
      <div className="extendable-panel">
        {this.props.tab}
      </div>
      <div className="icon-panel">
        {this.tabs.map((tab) => {
          const {Renderer} = tab;
          const isActive = tab.name === this.props.activeTab;
          const styles = classNames({ 'active-tab-icon': isActive });

          return (<IconButton key={tab.name} size="small" className={styles} onClick={this.selectTab(tab.name)}>
            <Renderer />
          </IconButton>);
        })}
      </div>
    </div>
  }
}

RightPanel.defaultProps = {
  activeTab: 'research',
  onChangeTab: noop,
};

RightPanel.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onChangeTab: PropTypes.func.isRequired,
  tab: PropTypes.node.isRequired
};

export default RightPanel;
