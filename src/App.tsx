import './css/App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import * as reducer from './redux/index';
import Aside from './components/molecules/Aside';
import Main from './components/molecules/Main';
import Nav from './components/molecules/Nav';

const App = () => {

  const title = "Graph Painter";

  return (
    <>
      <header>
        <h1>{title}</h1>
      </header>
      <div className='container'>
        <Aside />
        <Main />
      </div>
    </>
  )
}

export default App;