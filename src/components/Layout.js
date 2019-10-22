import React from 'react';
import { PureComponent } from 'react';
import NavMenu from "./NavMenu";
import './styles/layout.css'

class Layout extends PureComponent{
    render() {
        return (
            <div className='layout'>
                <NavMenu/>
                <div className='contents'>{this.props.content}</div>
            </div>
        );
    }
}
export default Layout;
