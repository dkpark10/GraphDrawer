import './styles/index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { miserbles } from '@/__mock__';

ReactDOM.render(
  <React.StrictMode>
    <App nodeList={miserbles} />
  </React.StrictMode>,
  document.getElementById('root'),
);
