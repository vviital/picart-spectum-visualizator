import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { getTokenAsync } from '../actions';
import Snack from './Snack';
import './styles/auth.css';

class Auth extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleFormChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleClick(e) {
    e.preventDefault();
    const { sendRequest } = this.props;
    const { email, password } = this.state;
    sendRequest(email, password);
  }

  render() {
    const { user } = this.props;
    const { email, password } = this.state;
    if (user.id !== '') {
      return (<Redirect to="/" />);
    }
    return (
      <div className="Auth">
        <header className="App-header">
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '90vh' }}
          >
            <img src="/images/logo.png" alt="PicArt" className="auth-logo" />
            <Container component="main" maxWidth="sm">
              <form>
                <TextField
                  onChange={this.handleFormChange}
                  value={email}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  onChange={this.handleFormChange}
                  value={password}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={this.handleClick}
                >
                  Sign In
                </Button>
              </form>
            </Container>
          </Grid>
        </header>
        <Snack />
      </div>
    );
  }
}

Auth.propTypes = {
  user: PropTypes.shape({ id: PropTypes.string.isRequired }).isRequired,
  sendRequest: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  sendRequest: (email, password) => dispatch(getTokenAsync(email, password)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
