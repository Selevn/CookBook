import React from 'react';
import ReactDOM from 'react-dom';
import './constants.css';
import './index.css';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './Redux';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
