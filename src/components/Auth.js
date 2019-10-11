import React from 'react';
import { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { getTokenAsync } from "../actions";

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
        this.handleFormChange = this.handleFormChange.bind(this);
    }

    render() {
        if (this.props.auth.authorized === true) {
            return (<Redirect to='/'/>)
        } else {
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
                                        onClick={this.handleClick.bind(this)}
                                    >
                                        Sign In
                                    </Button>
                                </form>
                            </Container>
                        </Grid>
                    </header>
                </div>
            );
        }
    }

    handleFormChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleClick(e) {
        this.props.sendRequest(this.state.email, this.state.password);
        e.preventDefault();
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});

const mapDispatchToProps = (dispatch) => {
    return {
        sendRequest: (email, password) => dispatch(getTokenAsync(email, password)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
