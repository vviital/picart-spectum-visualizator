import React from 'react';
import {PureComponent} from 'react';
import {connect} from "react-redux";
import Typography from "@material-ui/core/Typography";
import './styles/profile.css'

class Profile extends PureComponent {
    componentDidMount() {
        this.props.getProfile(this.props.user.id);
    }

    render() {
        return (
            <div className='profile-content'>
                <h4>Profile information:</h4>
                <Typography>
                    User ID: {this.props.user.id}
                </Typography>
                <Typography>
                    Login: {this.props.profile.login}
                </Typography>
                <Typography>
                    Name: {this.props.profile.name}
                </Typography>
                <Typography>
                    Surname: {this.props.profile.surname}
                </Typography>
                <Typography>
                    Email: {this.props.profile.email}
                </Typography>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    profile: state.profile,
});

const mapDispatchToProps = (dispatch) => ({
    getProfile: (id) => dispatch({ type: 'GET_PROFILE', payload: id}),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
