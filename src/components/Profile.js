import React from 'react';
import {PureComponent} from 'react';
import {connect} from "react-redux";
import Typography from "@material-ui/core/Typography";
import './styles/profile.css'

class Profile extends PureComponent {
    render() {
        return (
            <div className='profile-content'>
                <h4>Profile information:</h4>
                <Typography>
                    Your ID: {this.props.user.id}
                </Typography>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps, )(Profile);
