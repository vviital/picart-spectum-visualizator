import React from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';

import { lighten, withStyles, makeStyles } from '@material-ui/core/styles';
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
import Tooltip from '@material-ui/core/Tooltip';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import Typography from '@material-ui/core/Typography';

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
  return order === 'desc'
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
  { id: 'peak.peak.x', numeric: false, disablePadding: false, label: 'Wave length' },
  { id: 'peak.peak.y', numeric: true, disablePadding: false, label: 'Intensity' },
  { id: 'element.element', numeric: true, disablePadding: false, label: 'Matched chemical element' },
  { id: 'element.waveLength', numeric: true, disablePadding: false, label: 'Element wave length' },
  { id: 'element.intensity', numeric: true, disablePadding: false, label: 'Element relative intensity' },
  { id: 'element.stage', numeric: false, disablePadding: true, label: 'Element ionization stage' },
  { id: 'element.similarity', numeric: false, disablePadding: true, label: 'Similarity with the peak' },
  { id: 'fromSuggestions', numeric: false, disablePadding: true, label: 'Auto match' },
];

const isSuggested = (element, suggestion) => {
  const extractFields = (el) => _.pick(el, ['element', 'intensity', 'stage', 'matched', 'similarity', 'waveLength']);
  return _.isEqual(extractFields(element), extractFields(suggestion));
}

const HtmlTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

class ResultsTable extends React.PureComponent {
  constructor(props) {
    super(props);

    this.setOrder = this.setOrder.bind(this);
    this.setOrderBy = this.setOrderBy.bind(this);
    this.handleRequestSort = this.handleRequestSort.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
  }

  state = {
    order: 'desc',
    orderBy: 'similarity',
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

  get emptyRows() {
    const {rowsPerPage, page} = this.state;
    const {experimentResults} = this.props;

    return rowsPerPage - Math.min(rowsPerPage, experimentResults.length - page * rowsPerPage);
  }

  render() {
    const {experimentResults, suggestion} = this.props;
    const {orderBy, page, rowsPerPage} = this.state;
  
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
                order={this.state.order}
                orderBy={orderBy}
                rowCount={experimentResults.length}
              />
              <TableBody>
                {stableSort(experimentResults, getComparator(this.state.order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((def, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={def._id}
                      >
                        <TableCell component="th" id={labelId} scope="row" padding="none">
                          {_.round(def.peak.peak.x, 5)}
                        </TableCell>
                        <TableCell align="right">{_.round(def.peak.peak.y, 5)}</TableCell>
                        <TableCell align="right">{def.element.element}</TableCell>
                        <TableCell align="right">{def.element.waveLength}</TableCell>
                        <TableCell align="right">{def.element.intensity}</TableCell>
                        <TableCell align="right">{def.element.stage}</TableCell>
                        <TableCell align="right">{_.round(def.element.similarity, 5)}</TableCell>
                        <TableCell align="right">{def.fromSuggestions ? 'YES' : 'NO'}</TableCell>
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
            count={experimentResults.length}
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

ResultsTable.defaultProps = {
  experimentResults: [],
};

const Coordinates = PropTypes.shape({
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
});

const Element = PropTypes.shape({
  element: PropTypes.string.isRequired,
  intensity: PropTypes.number.isRequired,
  stage: PropTypes.number.isRequired,
  matched: PropTypes.bool.isRequired,
  selected: PropTypes.bool.isRequired,
  similarity: PropTypes.number.isRequired,
  waveLength: PropTypes.number.isRequired,
});

ResultsTable.propTypes = {
  experimentResults: PropTypes.arrayOf(PropTypes.shape({
    peak: PropTypes.shape({
      peak: Coordinates.isRequired,
      left: Coordinates.isRequired,
      right: Coordinates.isRequired,
      area: PropTypes.number.isRequired,
    }),
    element: PropTypes.shape(Element),
    fromSuggestions: PropTypes.bool.isRequired,
  }))
};

export default ResultsTable;
