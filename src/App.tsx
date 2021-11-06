import './css/App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import * as reducer from './redux/index';
import Aside from './components/templates/Aside';
import Header from './components/templates/Header';
import Main from './components/molecules/Main';

const App = () => {

  console.log('App render');

  return (
    <>
      <Header />
      <div className='container'>
        <Aside />
        <Main />
      </div>
    </>
  )
}

export default App;

// 5 6
// 1
// 5 1 1
// 1 2 2
// 1 3 3
// 2 3 4
// 2 4 5
// 3 4 6