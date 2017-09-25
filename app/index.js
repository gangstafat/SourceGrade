import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import { AUTH_USER } from './actions/types';

import reducers from './reducers';
import routes from './routes';
import reduxThunk from 'redux-thunk';

// Load foundation
require('foundation-sites/dist/css/foundation.min.css');
$(document).foundation();

// App css
require('./styles/styles.scss');

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
// If token exists, user is logged in
if(token) {
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
  , document.getElementById('app'));
