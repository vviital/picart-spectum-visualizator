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
import Button from '@material-ui/core/Button';

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
  { id: 'button', numeric: false, disablePadding: false, label: '' }
];

class ExperimentsTable extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleRequestSort = this.handleRequestSort.bind(this);
    this.setOrder = this.setOrder.bind(this);
    this.setOrderBy = this.setOrderBy.bind(this);
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

  handleClick(event, experiment) {
    this.props.onClick(experiment);
  };

  isCurrentSelection(item) {
    return _.get(this, 'props.selected.id') === item.id;
  }

  get emptyRows() {
    const {rowsPerPage, page} = this.state;
    const {experiments} = this.props;

    return rowsPerPage - Math.min(rowsPerPage, experiments.length - page * rowsPerPage);
  }

  formatText(text) {
    if (_.size(text) > 36) {
      return text.slice(0, 36) + '...'
    }
    return text;
  }

  render() {
    const {experiments} = this.props;
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
                rowCount={experiments.length}
              />
              <TableBody>
                {stableSort(experiments, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((experiment, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;
  
                    return (
                      <TableRow
                        hover
                        aria-checked={experiment.selected}
                        tabIndex={-1}
                        key={experiment.id}
                        selected={this.isCurrentSelection(experiment)}
                      >
                        <TableCell component="th" id={labelId} scope="row" padding="none">
                          {this.formatText(experiment.name)}
                        </TableCell>
                        <TableCell>{this.formatText(experiment.description)}</TableCell>
                        <TableCell style={{width: 158, padding: 0}}>
                          <div onClick={(event) => this.handleClick(event, experiment)}>
                            <Button size="small" variant="contained" color="primary">
                              Find similar
                            </Button>
                          </div>
                        </TableCell>
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
            rowsPerPageOptions={[]}
            component="div"
            count={experiments.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={this.handleChangePage}
          />
        </Paper>
      </div>
    );
  }
}

ExperimentsTable.defaultProps = {
  experiments: [],
  selected: {},
};

ExperimentsTable.propTypes = {
  experiments: PropTypes.arrayOf(PropTypes.shape({
    description: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })),
  selected: PropTypes.shape({
    id: PropTypes.string.isRequired
  }),
  onClick: PropTypes.func.isRequired,
};

export default ExperimentsTable;
