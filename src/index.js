import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { store } from './store';
import { Provider } from 'react-redux';

var html = document.createElement('html');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  html,
);
document
  .getElementsByTagName('html')[0]
  .replaceChild(
    html.getElementsByTagName('body')[0],
    document.getElementsByTagName('body')[0],
  );
