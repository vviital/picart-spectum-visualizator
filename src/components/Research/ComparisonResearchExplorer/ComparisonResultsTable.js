import React from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';
import * as lunr from 'lunr';

import { Link } from 'react-router-dom';

import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import LinkIcon from '@material-ui/icons/Link';

import './styles.css';

import EnhancedTableHead from './TableHeader';
import Search from '../../Search';

function descendingComparator(a, b, orderBy) {
  if (_.get(b, orderBy) < _.get(a, orderBy)) {
    return -1;
  }
  if (_.get(b, orderBy) > _.get(a, orderBy)) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'asc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

const headCells = [
  { id: 'rName', numeric: false, disablePadding: false, label: 'Research name' },
  { id: 'eName', numeric: false, disablePadding: false, label: 'Experiment name' },
  { id: 'p', numeric: false, disablePadding: false, label: 'Similarity' },
  { id: 'link', numeric: false, disablePadding: false, label: 'Link to experiment' },
];

class ComparisonResultsTable extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleRequestSort = this.handleRequestSort.bind(this);
    this.onQueryChange = this.onQueryChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.setOrder = this.setOrder.bind(this);
    this.setOrderBy = this.setOrderBy.bind(this);
    this.tableChangeSize = this.tableChangeSize.bind(this);
  }

  state = {
    order: 'desc',
    orderBy: 'name',
    page: 0,
    rowsPerPage: 20,
    query: '',
    similarities: []
  }

  componentDidMount() {
    this.tableChangeSize();
    window.addEventListener('resize', this.tableChangeSize);

    this.buildIndexes();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.tableChangeSize);
  }

  buildIndexes() {
    const {similarities} = this.props;
    const docs = _.keyBy(similarities, (doc) =>  `${doc.eID}_${doc.rID}`);

    const idx = lunr(function() {
      this.ref('id');
      this.field('eName');
      this.field('rName');

      _.forEach(similarities, (doc) => {
        this.add({
          eName: doc.eName,
          rName: doc.rName,
          id: `${doc.eID}_${doc.rID}`
        });
      });
    });

    this.lunrIndexes = {docs, idx};
  }

  tableChangeSize() {
    const actualHeight = window.innerHeight - 250 - 50;
    const maxRows = _.floor(actualHeight / 33);
    this.setState({page: 0, rowsPerPage: maxRows});
  }

  setOrder(order) {
    this.setState({order})
  }

  setOrderBy(orderBy) {
    this.setState({orderBy});
  }

  handleChangePage(event, page) {
    this.setState({page});
  }

  handleRequestSort(event, property) {
    const isAsc = this.state.orderBy === property && this.state.order === 'asc';
    this.setOrder(isAsc ? 'desc' : 'asc');
    this.setOrderBy(property);
  }

  emptyRows(similarities) {
    const {rowsPerPage, page} = this.state;

    return rowsPerPage - Math.min(rowsPerPage, similarities.length - page * rowsPerPage);
  }

  formatText(text) {
    if (_.size(text) > 36) {
      return text.slice(0, 36) + '...'
    }
    return text;
  }

  onSearch() {
    const {docs, idx} = this.lunrIndexes;

    let searchQuery = this.state.query && `*${_.split(this.state.query, '').join('*')}*`;
    const matches = _.map(idx.search(searchQuery), (match) => docs[match.ref]);

    this.setState({similarities: matches});
  }

  onQueryChange(query) {
    this.setState({query});
  }

  render() {
    const {order, orderBy, page, rowsPerPage} = this.state;

    const similarities = this.state.query ? this.state.similarities : this.props.similarities;
  
    return (
      <div className="comparison-table-container">
        <Search
          onSearch={this.onSearch}
          onValueChange={this.onQueryChange}
          value={this.state.query}
        />
        <Paper>
          <TableContainer>
            <Table
              aria-labelledby="tableTitle"
              size={'small'}
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                headCells={headCells}
                onRequestSort={this.handleRequestSort}
                order={order}
                orderBy={orderBy}
                rowCount={similarities.length}
              />
              <TableBody>
                {stableSort(similarities, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((similarity, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;
  
                    return (
                      <TableRow
                        hover
                        aria-checked={similarity.selected}
                        tabIndex={-1}
                        key={similarity.eID}
                      >
                        <TableCell component="th" id={labelId} scope="row">
                          {this.formatText(similarity.rName)}
                        </TableCell>
                        <TableCell component="th" id={labelId} scope="row">
                          {this.formatText(similarity.eName)}
                        </TableCell>
                        <TableCell style={{width: 172}}>{_.round(similarity.p, 5)}</TableCell>
                        <TableCell style={{width: 172, paddingTop: 0, paddingLeft: 12, paddingBottom: 0}}>
                          <Link
                            to={`/researches/${similarity.rID}?experimentID=${similarity.eID}`}
                            style={{ textDecoration: 'none' }}
                          >
                            <LinkIcon />
                          </Link>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {this.emptyRows(similarities) > 0 && (
                  <TableRow style={{ height: 33 * this.emptyRows(similarities) }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[]}
            component="div"
            count={similarities.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={this.handleChangePage}
          />
        </Paper>
      </div>
    );
  }
}

ComparisonResultsTable.defaultProps = {
  similarities: [],
};

ComparisonResultsTable.propTypes = {
  similarities: PropTypes.arrayOf(PropTypes.shape({
    eID: PropTypes.string.isRequired,
    eName: PropTypes.string.isRequired,
    p: PropTypes.number.isRequired,
    rID: PropTypes.string.isRequired,
    rName: PropTypes.string.isRequired,
  })),
};

export default ComparisonResultsTable;
