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
  { id: 'peak.x', numeric: true, disablePadding: false, label: 'Wave length' },
  { id: 'peak.y', numeric: true, disablePadding: false, label: 'Intensity' },
  { id: 'elements.length', numeric: true, disablePadding: false, label: 'Number of matched elements' },
];

class ElementsTable extends React.PureComponent {
  constructor(props) {
    super(props);

    this.setOrder = this.setOrder.bind(this);
    this.setOrderBy = this.setOrderBy.bind(this);
    this.handleRequestSort = this.handleRequestSort.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  state = {
    order: 'desc',
    orderBy: 'peak.x',
    page: 0,
    rowsPerPage: 20
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
  
  handleChangeRowsPerPage(event) {
    this.setState({
      page: 0,
      rowsPerPage: parseInt(event.target.value, 10)
    });
  }

  handleRequestSort(event, property) {
    const isAsc = this.state.orderBy === property && this.state.order === 'asc';
    this.setOrder(isAsc ? 'desc' : 'asc');
    this.setOrderBy(property);
  }

  handleClick(event, peak) {
    this.props.onClick(peak);
  };

  isCurrentPeak(peak) {;
    return (
      _.get(peak, 'peak.x') === _.get(this.props, 'selected.peak.x') &&
      _.get(peak, 'peak.y') === _.get(this.props, 'selected.peak.y')
    );
  }

  get emptyRows() {
    const {rowsPerPage, page} = this.state;
    const {elementsPerPeaks} = this.props;

    return rowsPerPage - Math.min(rowsPerPage, elementsPerPeaks.length - page * rowsPerPage);
  }
  
  get numberOfSelectedRows() {
    return _.sumBy(this.props.elementsPerPeaks, ({selected}) => selected ? 1 : 0);
  }

  render() {
    const {elementsPerPeaks} = this.props;
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
                numSelected={this.numberOfSelectedRows}
                onRequestSort={this.handleRequestSort}
                order={order}
                orderBy={orderBy}
                rowCount={elementsPerPeaks.length}
              />
              <TableBody>
                {stableSort(elementsPerPeaks, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((def, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;
  
                    return (
                      <TableRow
                        hover
                        onClick={event => this.handleClick(event, def)}
                        role="checkbox"
                        aria-checked={def.selected}
                        tabIndex={-1}
                        key={def._id}
                        selected={this.isCurrentPeak(def, this.props.selected)}
                      >
                        <TableCell component="th" id={labelId} scope="row" padding="none">
                          {_.round(def.peak.x, 5)}
                        </TableCell>
                        <TableCell align="right">{_.round(def.peak.y, 5)}</TableCell>
                        <TableCell align="right">{def.elements.length}</TableCell>
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
            rowsPerPageOptions={[20, 50, 100]}
            component="div"
            count={elementsPerPeaks.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    );
  }
}

ElementsTable.defaultProps = {
  elementsPerPeaks: [],
  selected: {},
};

const Coordinates = PropTypes.shape({
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
})

ElementsTable.propTypes = {
  elementsPerPeaks: PropTypes.arrayOf(PropTypes.shape({
    peak: Coordinates.isRequired,
    left: Coordinates.isRequired,
    right: Coordinates.isRequired,
    area: PropTypes.number.isRequired,
    totalElementsCount: PropTypes.number.isRequired
  })),
  selected: PropTypes.shape({
    peak: Coordinates
  }),
  onClick: PropTypes.func.isRequired,
};

export default ElementsTable;
