import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { store } from './state_management/store';
import { ConnectedControl } from './components/control';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux'


ReactDOM.render(
    <Provider store={store}>
        <ConnectedControl />
    </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
