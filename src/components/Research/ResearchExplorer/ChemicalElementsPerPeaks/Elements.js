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
  { id: 'element', numeric: false, disablePadding: false, label: 'Chemical element' },
  { id: 'similarity', numeric: true, disablePadding: false, label: 'Similarity to the peak' },
  { id: 'waveLength', numeric: true, disablePadding: false, label: 'Wave length' },
  { id: 'intensity', numeric: true, disablePadding: false, label: 'Intensity' },
  { id: 'stage', numeric: true, disablePadding: false, label: 'Ionization stage' },
  { id: 'matched', numeric: false, disablePadding: true, label: 'Matched by criteria' },
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

class ElementsTable extends React.PureComponent {
  constructor(props) {
    super(props);

    this.setOrder = this.setOrder.bind(this);
    this.setOrderBy = this.setOrderBy.bind(this);
    this.handleRequestSort = this.handleRequestSort.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleSelectAllClick = this.handleSelectAllClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.tableChangeSize = this.tableChangeSize.bind(this);
  }

  state = {
    order: 'desc',
    orderBy: 'similarity',
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
    const actualHeight = window.innerHeight - 165 - 50;
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

  handleSelectAllClick = (event) => {
    const nextElements = this.props.elements.map((el) => ({
      ...el,
      selected: event.target.checked
    }));
    this.props.updateElements(nextElements);
  };

  handleClick(event, element) {
    const nextElements = this.props.elements.map((el) => {
      if (el._id === element._id) {
        return {
          ...el,
          selected: !el.selected
        }
      }

      return el;
    });
    this.props.updateElements(nextElements);
  };

  get emptyRows() {
    const {rowsPerPage, page} = this.state;
    const {elements} = this.props;

    return rowsPerPage - Math.min(rowsPerPage, elements.length - page * rowsPerPage);
  }
  
  get numberOfSelectedRows() {
    return _.sumBy(this.props.elements, ({selected}) => selected ? 1 : 0);
  }

  render() {
    const {elements, suggestion} = this.props;
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
                numSelected={this.numberOfSelectedRows}
                onRequestSort={this.handleRequestSort}
                onSelectAllClick={this.handleSelectAllClick}
                order={this.state.order}
                orderBy={orderBy}
                rowCount={elements.length}
              />
              <TableBody>
                {stableSort(elements, getComparator(this.state.order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((def, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;
                    const suggested = isSuggested(def, suggestion.element);
  
                    return (
                      <TableRow
                        hover
                        onClick={event => this.handleClick(event, def)}
                        role="checkbox"
                        aria-checked={def.selected}
                        tabIndex={-1}
                        key={def._id}
                        selected={def.selected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={def.selected}
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </TableCell>
                        <TableCell component="th" id={labelId} scope="row" padding="none">
                          {def.element}
                          {
                            suggested &&
                              <HtmlTooltip
                                title={
                                  <React.Fragment>
                                    <Typography color="inherit">Suggested by the system</Typography>
                                  </React.Fragment>
                                }
                              >
                                <AnnouncementIcon style={{marginLeft: 12}} color="primary" />
                              </HtmlTooltip>
                          }
                        </TableCell>
                        <TableCell align="right">{_.round(def.similarity, 5)}</TableCell>
                        <TableCell align="right">{def.waveLength}</TableCell>
                        <TableCell align="right">{def.intensity}</TableCell>
                        <TableCell align="right">{def.stage}</TableCell>
                        <TableCell align="right">{def.matched ? 'YES' : 'NO'}</TableCell>
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
            count={elements.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={this.handleChangePage}
          />
        </Paper>
      </div>
    );
  }
}

ElementsTable.defaultProps = {
  elements: [],
  suggestion: {},
};

const Element = PropTypes.shape({
  element: PropTypes.string.isRequired,
  intensity: PropTypes.number.isRequired,
  stage: PropTypes.number.isRequired,
  matched: PropTypes.bool.isRequired,
  selected: PropTypes.bool.isRequired,
  similarity: PropTypes.number.isRequired,
  waveLength: PropTypes.number.isRequired,
});

ElementsTable.propTypes = {
  elements: PropTypes.arrayOf(Element),
  suggestion: PropTypes.shape({
    element: Element.isRequired,
  }),
};

export default ElementsTable;
