import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import Auth from './Auth';
import store from "./store";


ReactDOM.render(
    <Provider store={store}>
        <Auth />
    </Provider>,
    document.getElementById('root')
);