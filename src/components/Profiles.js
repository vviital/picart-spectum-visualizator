import React from 'react';
import {PureComponent} from 'react';
import {connect} from "react-redux";
import lodash from 'lodash';
import UserCard from "./UserCard";
import './styles/profiles.css'
import Search from "./Search";

class Profiles extends PureComponent {
    componentDidMount() {
        this.props.getProfiles();
    }

    render() {
        if (lodash.isEmpty(this.props.profiles)) {
            return (
                <div className='profiles-content'>
                    Loading...
                </div>
            );
        }
        const userCards = Array.from(Object.values(this.props.profiles));
        return (
            <div className='profiles-content'>
                <Search/>
                <div className='profiles-wrapper'>
                    {userCards.map((user) => {
                        return (
                            <UserCard user={user}/>
                        );
                    })}
                </div>
            </div>
        );

    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    profiles: state.profiles,
});

const mapDispatchToProps = (dispatch) => ({
    getProfiles: () => dispatch({type: 'GET_PROFILES'}),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);
