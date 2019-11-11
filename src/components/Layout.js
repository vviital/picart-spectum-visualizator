import React from 'react';
import SplitPane from 'react-split-pane';
import NavMenu from './NavMenu';
import './styles/layout.css';


class Layout extends React.PureComponent {
  render() {
    return (
      <div className="layout">
        <SplitPane split="vertical" minSize={0} defaultSize={80} maxSize={100}>
          <NavMenu />
          <div className="contents" id="contents">{this.props.content}</div>
        </SplitPane>
      </div>
    );
  }
}
export default Layout;
