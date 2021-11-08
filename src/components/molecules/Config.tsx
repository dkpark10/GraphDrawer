import Toggle from '../atoms/Toggle';
import Input from '../atoms/Input';
import { useDispatch, useSelector } from 'react-redux';
import { setDirected } from '../../redux/direct';
import { setShortestPath } from '../../redux/shortestpath';
import React, { useState } from 'react';
import { Dijkstra, DijkstraBuilder } from '../../modules/Dijkstra';
import { RootState } from '../../redux/index';

const LabelStyle = {
  margin: '10px',
  fontSize: '15px',
}

type changeEventInput = React.ChangeEvent<HTMLInputElement>;

interface InputList {
  from: string;
  to: string;
  tree: string;
};

const Config = () => {

  const dispatch = useDispatch();
  const [inputList, setInputList] = useState<InputList>({
    from: '',
    to: '',
    tree: ''
  });
  const { graphInfo } = useSelector((state: RootState) => ({
    graphInfo: state.graph.graph
  }));

  const toggleOnChange = (e: changeEventInput) => dispatch(setDirected(e.target.checked));

  const run = () => {

    // 다익스트라를 돌려 최단경로를 뽑아낸다.
    if (inputList.tree === '') {

      const dijkstra: Dijkstra = new DijkstraBuilder()
        .setGraphInfo(graphInfo)
        .setFromVertex(inputList.from)
        .setToVertex(inputList.to)
        .build();

        const ret = dijkstra.run();

        if(ret !== false){
          dispatch(setShortestPath({
            from: inputList.from,
            to: inputList.to,
            path: ret
          }));
        }

    // 트리로 돌린다.
    } else {

    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const { name, value } = e.target;

    if (name === 'tree-root') {
      setInputList(prev => ({
        ...prev,
        from: '', to: '',
        tree: value
      }))

    } else if (name === 'path-from') {
      setInputList(prev => ({
        ...prev,
        from: value,
        tree: ''
      }))

    } else {
      setInputList(prev => ({
        ...prev,
        to: value,
        tree: ''
      }))
    }
  }


  return (
    <>
      <div className='config'>
        <label style={LabelStyle}>Undirected : Directed</label>
        <Toggle onChange={toggleOnChange} />
        <label style={LabelStyle}>Shortest Path</label>
        <div>
          <Input text='from' name='path-from' onChange={onChange} value={inputList.from} />
          <Input text='to' name='path-to' onChange={onChange} value={inputList.to} />
        </div>
        <label style={LabelStyle}>Set Tree</label>
        <div>
          <Input text='root node' name='tree-root' onChange={onChange} value={inputList.tree} />
        </div>
        <button onClick={run}>Run</button>
      </div>
    </>
  )
}

export default Config;