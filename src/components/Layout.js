import React from 'react';
import SplitPane from 'react-split-pane';
import PropTypes from 'prop-types';
import NavMenu from './NavMenu';
import ProfileBar from './Profile/ProfileBar';
import Snack from './Snack';
import './styles/layout.css';


class Layout extends React.PureComponent {
  render() {
    const { content } = this.props;
    return (
      <div className="layout">
        <SplitPane split="vertical" minSize={0} defaultSize={150} maxSize={150}>
          <NavMenu />
          <div
            className="contents"
            id="contents"
          >
            <ProfileBar />
            <div>
              {content}
            </div>
          </div>
        </SplitPane>
        <Snack />
      </div>
    );
  }
}

Layout.propTypes = {
  content: PropTypes.element.isRequired,
};

export default Layout;
