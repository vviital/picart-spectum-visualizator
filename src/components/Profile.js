import React from 'react';
import {PureComponent} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import './styles/profile.css'

class Profile extends PureComponent {
    render() {
        const token = window.localStorage.getItem('token');
        if (!token) {
            return (<Redirect to='/auth'/>);
        }
        return (
            <div className='profile-content'>
                <h4>Profile information:</h4>
                <List>
                    <ListItem>
                        <ListItemText
                            primary="Your login:"
                            secondary={this.props.user.login}
                        />
                    </ListItem>
                    <Divider/>
                    <ListItem>
                        <ListItemText
                            primary="Your UserID:"
                            secondary={this.props.user.id}
                        />
                    </ListItem>
                    <Divider/>
                    <ListItem>
                        <ListItemText
                            primary="Your email:"
                            secondary={this.props.user.email}
                        />
                    </ListItem>
                </List>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps, )(Profile);
