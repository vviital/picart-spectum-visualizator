import React from 'react';
import { Component } from 'react';
import { connect } from "react-redux";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { getToken } from "./actions";

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            token: ''
        };
        this.handleFormChange = this.handleFormChange.bind(this);
    }

    render() {
        const { sendRequest } = this.props;
        return (
            <div className="Auth">
                <header className="App-header">
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justify="center"
                        style={{minHeight: '90vh'}}
                    >
                        <Container component="main" maxWidth="sm">
                            <Typography
                                variant="h4"
                                align="center"
                            >
                                Login to PicArt
                            </Typography>
                            <form>
                                <TextField
                                    onChange={this.handleFormChange}
                                    value={this.state.email}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email or login"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                />
                                <TextField
                                    onChange={this.handleFormChange}
                                    value={this.state.password}
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
                                    onClick={ sendRequest(this.state.email, this.state.password) }
                                >
                                    Sign In
                                </Button>
                            </form>
                            {/* DEV ---> */}
                            <div>
                                Received token: {this.state.token}
                            </div>
                            {/* <---DEV */}
                        </Container>
                    </Grid>
                </header>
            </div>
        );
    }

    handleFormChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
}

const mapStateToProps = (state) => ({
    token: state.token,
});

const mapDispatchToProps = (dispatch) => {
    return {
        sendRequest: (email, password) => dispatch(getToken(email, password))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
