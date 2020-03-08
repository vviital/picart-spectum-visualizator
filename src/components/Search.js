import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {debounce} from 'lodash';

import './styles/search.css';

const noop = (...args) => {
  console.log('On search does not implementing', ...args);
};

class Search extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClickDebounced = debounce(this.handleClick, 500);
  }

  state = {
    value: ''
  }

  handleClick(e) {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    const value = this.state.value;
    this.props.onSearch(value);
  }

  handleChange(e) {
    this.setState({value: e.target.value}, () => {
      if (!this.props.autoSearch) {
        return;
      }

      this.handleClickDebounced();
    });
  }

  render() {
    return (
      <div className="search-content">
        <form method="POST">
          <input type="search" value={this.state.value} onChange={this.handleChange} placeholder="Search..." className="search-field" />
          <input type="submit" value="Search" className="search-button" onClick={this.handleClick}/>
        </form>
      </div>
    );
  }
}

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
  autoSearch: PropTypes.bool,
};

Search.defaultProps = {
  autoSearch: true,
  onSearch: noop,
}

const mapStateToProps = (state) => ({
  user: state.user,
});
export default connect(mapStateToProps)(Search);
