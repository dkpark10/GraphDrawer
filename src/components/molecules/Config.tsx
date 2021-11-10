import Toggle from '../atoms/Toggle';
import Input from '../atoms/Input';
import { useDispatch, useSelector } from 'react-redux';
import { setDirected } from '../../redux/direct';
import { setShortestPath } from '../../redux/shortestpath';
import React, { useState } from 'react';
import { Dijkstra, DijkstraBuilder } from '../../modules/Dijkstra';
import { RootState } from '../../redux/index';

const LabelStyle = {
  margin: '12px',
  fontSize: '15px',
}

type changeEventInput = React.ChangeEvent<HTMLInputElement>;

interface InputList {
  from: string;
  to: string;
};

const Config = () => {

  const dispatch = useDispatch();
  const [inputList, setInputList] = useState<InputList>({
    from: '',
    to: '',
  });
  const { graphInfo } = useSelector((state: RootState) => ({
    graphInfo: state.graph.graph
  }));

  const toggleOnChange = (e: changeEventInput) => dispatch(setDirected(e.target.checked));

  const run = () => {

    const dijkstra: Dijkstra = new DijkstraBuilder()
      .setGraphInfo(graphInfo)
      .setFromVertex(inputList.from)
      .setToVertex(inputList.to)
      .build();

    const ret = dijkstra.run();

    if (ret !== false) {
      dispatch(setShortestPath({
        from: inputList.from,
        to: inputList.to,
        path: ret
      }));
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const { name, value } = e.target;

    if (name === 'path-from') {
      setInputList(prev => ({
        ...prev,
        from: value,
      }))

    } else {
      setInputList(prev => ({
        ...prev,
        to: value,
      }))
    }
  }


  return (
    <>
      <div className='config'>
        <label style={LabelStyle}>Undirected : Directed</label>
        <Toggle onChange={toggleOnChange} />
        <label style={LabelStyle}>Shortest Path Find</label>
        <div>
          <Input text='from' name='path-from' onChange={onChange} value={inputList.from} />
          <Input text='to' name='path-to' onChange={onChange} value={inputList.to} />
        </div>
        <button onClick={run}>Find</button>
        <img
          onClick={() => window.open('https://github.com/dkpark10/graphpainter', '_blank')}
          style={{ width: '45px', height: '45px', cursor: 'pointer' }}
          alt='my github'
          src='https://media.cdnandroid.com/item_images/1097581/imagen-github-0thumb.jpeg'>
        </img>
      </div>
    </>
  )
}

export default Config;
