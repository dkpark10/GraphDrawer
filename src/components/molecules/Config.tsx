import Toggle from '../atoms/Toggle';
import Input from '../atoms/Input';
import { useDispatch } from 'react-redux';
import { setDirected } from '../../redux/direct';
import React from 'react';

const LabelStyle = {
  margin: '10px',
  fontSize:'15px',
}

type changeEventInput = React.ChangeEvent<HTMLInputElement>;

const DoubleInput = () => {

  return (
    <>
      <div>
        <Input text='from' />
        <Input text='to' />
      </div>
    </>
  )
}

const Config = () => {

  const dispatch = useDispatch();

  const toggleOnChange = (e: changeEventInput) => dispatch(setDirected(e.target.checked));

  const run = () => {
    
  }

  return (
    <>
      <div className='config'>
        <label style={LabelStyle}>Undirected : Directed</label>
        <Toggle onChange={toggleOnChange} />
        <label style={LabelStyle}>Shortest Path</label>
        <DoubleInput />
        <label style={LabelStyle}>Set Tree</label>
        <div>
          <Input text='root node' />
        </div>
        <button onClick={run}>Run</button>
      </div>
    </>
  )
}

export default Config;