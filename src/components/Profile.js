import React from 'react';
import {PureComponent} from 'react';
import {compose} from 'redux';
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';
import Typography from "@material-ui/core/Typography";

import './styles/profile.css'
import {Card, CardContent} from "@material-ui/core";

class Profile extends PureComponent {
    componentDidMount() {
        this.number = this.props.match.params.number;
        this.props.getProfile(this.number);
    }

    render() {
        return (
            <div className='profile-content'>
                <Card>
                    <CardContent>
                        <Typography variant='h5'>
                            Profile information:
                        </Typography>
                        <Typography>
                            <b>User ID:</b> {this.props.profile.id}
                        </Typography>
                        <Typography>
                            <b>Login:</b> {this.props.profile.login}
                        </Typography>
                        <Typography>
                            <b>Name:</b> {this.props.profile.name}
                        </Typography>
                        <Typography>
                            <b>Surname:</b> {this.props.profile.surname}
                        </Typography>
                        <Typography>
                            <b>Email:</b> {this.props.profile.email}
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    profile: state.profile,
});

const mapDispatchToProps = (dispatch) => ({
    getProfile: (id) => dispatch({type: 'GET_PROFILE', payload: id}),
});

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Profile);
