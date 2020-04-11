import React from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';

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

import './styles.css';

import EnhancedTableHead from './TableHeader';

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
  { id: 'name', numeric: false, disablePadding: false, label: 'Title' },
  { id: 'description', numeric: false, disablePadding: false, label: 'Description' },
];

class ResearchesTable extends React.PureComponent {
  constructor(props) {
    super(props);

    this.setOrder = this.setOrder.bind(this);
    this.setOrderBy = this.setOrderBy.bind(this);
    this.handleRequestSort = this.handleRequestSort.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.tableChangeSize = this.tableChangeSize.bind(this);
  }

  state = {
    order: 'desc',
    orderBy: 'name',
    page: 0,
    rowsPerPage: 20
  }

  componentDidMount() {
    this.tableChangeSize();
    window.addEventListener('resize', this.tableChangeSize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.tableChangeSize);
  }

  tableChangeSize() {
    const actualHeight = window.innerHeight - 230 - 50;
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

  handleClick(event, research) {
    this.props.onClick(research);
  };

  isCurrentSelection(item) {
    return _.get(this, 'props.selected.id') === item.id;
  }

  get emptyRows() {
    const {rowsPerPage, page} = this.state;
    const {researches} = this.props;

    return rowsPerPage - Math.min(rowsPerPage, researches.length - page * rowsPerPage);
  }

  formatText(text) {
    if (_.size(text) > 32) {
      return text.slice(0, 32) + '...'
    }
    return text;
  }

  render() {
    const {researches} = this.props;
    const {order, orderBy, page, rowsPerPage} = this.state;
  
    return (
      <div style={{width: '100%'}}>
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
                rowCount={researches.length}
              />
              <TableBody>
                {stableSort(researches, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((research, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;
  
                    return (
                      <TableRow
                        hover
                        onClick={event => this.handleClick(event, research)}
                        aria-checked={research.selected}
                        tabIndex={-1}
                        key={research.id}
                        selected={this.isCurrentSelection(research)}
                      >
                        <TableCell component="th" id={labelId} scope="row" padding="none">
                          {this.formatText(research.name)}
                        </TableCell>
                        <TableCell>{this.formatText(research.description)}</TableCell>
                      </TableRow>
                    );
                  })}
                {this.emptyRows > 0 && (
                  <TableRow style={{ height: 33 * this.emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={researches.length}
            onChangePage={this.handleChangePage}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[]}
          />
        </Paper>
      </div>
    );
  }
}

ResearchesTable.defaultProps = {
  researches: [],
  selected: {},
};

ResearchesTable.propTypes = {
  researches: PropTypes.arrayOf(PropTypes.shape({
    description: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })),
  selected: PropTypes.shape({
    id: PropTypes.string
  }),
  onClick: PropTypes.func.isRequired,
};

export default ResearchesTable;
