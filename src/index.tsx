import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { store } from './state_management/store';
import { ConnectedControl } from './components/control';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux'


ReactDOM.render(
    <Provider store={store}>
        <ConnectedControl />
    </Provider>
, document.getElementById('root'));

