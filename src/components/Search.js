import React from 'react';
import PropTypes from 'prop-types';
import {debounce} from 'lodash';

import TextField from '@material-ui/core/TextField';

import './styles/search.css';

const noop = (...args) => {
  console.log('Method does not implemented', ...args);
};

class Search extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClickDebounced = debounce(this.handleClick, 500);
  }

  handleClick(e) {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    const value = this.props.value;
    this.props.onSearch(value);
  }

  handleChange(e) {
    this.props.onValueChange(e.target.value);
    this.handleClickDebounced();
  }

  render() {
    return (
      <div className="search-content">
        <TextField
          placeholder="Search..."
          value={this.props.value}
          onChange={this.handleChange}
          className="search-field"
        />
      </div>
    );
  }
}

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

Search.defaultProps = {
  onSearch: noop,
  onValueChange: noop,
  value: '',
}

export default Search;
