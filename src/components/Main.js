import React from 'react';
import { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {connect} from "react-redux";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { clearLocalStorage } from "../actions";

class Main extends Component {
    render() {
        const { auth } = this.props;
        if (auth.authorized) {
            return (
                <div>
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
                                Welcome back, {auth.login}!
                            </Typography>
                            <Typography
                                variant="h6"
                                align="center"
                            >
                                Here is some information about your profile:
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemText
                                        primary="Your login:"
                                        secondary={auth.login}
                                    />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText
                                        primary="Your UserID:"
                                        secondary={auth.id}
                                    />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText
                                        primary="Your email:"
                                        secondary={auth.email}
                                    />
                                </ListItem>
                            </List>
                        </Container>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={this.props.logout}
                        >
                            Logout
                        </Button>
                    </Grid>
                </div>
            );
        } else {
            return (<Redirect to='/auth'/>);
        }
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(clearLocalStorage()),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
