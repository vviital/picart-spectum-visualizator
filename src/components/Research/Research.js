import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/research.css';

class Research extends React.PureComponent {
  constructor(props) {
    super(props);
    this.parseDate = this.parseDate.bind(this);
  }

  componentDidMount() {
    const { match, getResearch } = this.props;
    const id = match.params.number;
    getResearch(id);
  }

  parseDate(date) {
    const dt = new Date(date);
    return `${dt.getDate()}.${dt.getMonth()}.${dt.getFullYear()} ${dt.getHours()}:${dt.getMinutes()}`;
  }

  render() {
    const { research } = this.props;
    if (research.id === '') {
      return (<div>Loading..</div>);
    }
    let createdAt = '';
    let updatedAt = '';
    if (research.createdAt) {
      createdAt = this.parseDate(research.createdAt);
      updatedAt = this.parseDate(research.updatedAt);
    }
    return (
      <div className="research-info">
        <div className="research-table-container">
        <table className="research-table">
          <tbody>
            <tr>
              <td>Type:</td>
              <td>{research.researchType}</td>
            </tr>
            <tr>
              <td>Name</td>
              <td>{research.name}</td>
            </tr>
            <tr>
              <td>Description</td>
              <td>{research.description}</td>
            </tr>
            <tr>
              <td>ID</td>
              <td>{research.id}</td>
            </tr>
            <tr>
              <td>Owner ID</td>
              <td>{research.ownerID}</td>
            </tr>
            <tr>
              <td>Created</td>
              <td>{createdAt}</td>
            </tr>
            <tr>
              <td>Updated</td>
              <td>{updatedAt}</td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
    );
  }
}

Research.propTypes = {
  research: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    researchType: PropTypes.string.isRequired,
    description: PropTypes.string,
    ownerID: PropTypes.number,
    createdAt: PropTypes.number,
    updatedAt: PropTypes.number,
  }).isRequired,
  getResearch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  research: state.research,
});

const mapDispatchToProps = (dispatch) => ({
  getResearch: (id) => dispatch({ type: 'GET_RESEARCH', payload: id }),
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(Research);
