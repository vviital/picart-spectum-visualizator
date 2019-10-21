import React from 'react';
import {PureComponent} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import NavMenu from "./NavMenu";
import './styles/main.css'

class Profile extends PureComponent {
    render() {
        const {auth} = this.props;
        if (!auth.token) {
            return (<Redirect to='/auth'/>);
        }
        return (
            <div>
                <NavMenu/>
                <div>
                    <div>
                        <h4>Welcome back, {auth.login}!</h4>
                        <h6>Here is some information about your profile:</h6>
                        <List>
                            <ListItem>
                                <ListItemText
                                    primary="Your login:"
                                    secondary={auth.login}
                                />
                            </ListItem>
                            <Divider/>
                            <ListItem>
                                <ListItemText
                                    primary="Your UserID:"
                                    secondary={auth.id}
                                />
                            </ListItem>
                            <Divider/>
                            <ListItem>
                                <ListItemText
                                    primary="Your email:"
                                    secondary={auth.email}
                                />
                            </ListItem>
                        </List>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});
export default connect(mapStateToProps, )(Profile);
