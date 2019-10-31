import React from "react";
import { PureComponent } from 'react'
import Card from "@material-ui/core/Card";
import {CardActionArea, CardContent} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import './styles/userCard.css'

class UserCard extends PureComponent{
    render() {
        return (
            <Card className='user-card'>
                <CardActionArea>
                    <Link to={`/profiles/${this.props.user.id}`} style={{textDecoration: 'none'}}>
                <CardContent>
                    <Typography variant='h5'>
                        {this.props.user.name}
                    </Typography>
                    <Typography>
                        {this.props.user.email}
                    </Typography>
                </CardContent>
                    </Link>
                </CardActionArea>
            </Card>
        );
    };
}
export default UserCard;
