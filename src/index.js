import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

var html = document.createElement('html');

ReactDOM.render(<App />, html);
document.getElementsByTagName('html')[0].replaceChild(html.getElementsByTagName('body')[0], document.getElementsByTagName('body')[0]);