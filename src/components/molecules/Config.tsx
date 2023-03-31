import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import Toggle from '../atoms/Toggle';
import Input from '../atoms/Input';
import { setArrowDirect } from '../../store/node-arrow';
import { setShortestPath } from '../../store/shortestpath';
import { Dijkstra, DijkstraBuilder } from '../../utils/dijkstra';
import { RootState } from '../../store/index';

const LabelStyle = {
  margin: '12px',
  fontSize: '15px',
};

interface InputList {
  from: string;
  to: string;
}

export default function Config() {
  const dispatch = useDispatch();
  const [inputList, setInputList] = useState<InputList>({
    from: '',
    to: '',
  });

  const { graphInfo } = useSelector((state: RootState) => ({
    graphInfo: state.graph,
  }));

  const toggleOnChange = () => dispatch(setArrowDirect());

  const run = () => {
    const dijkstra: Dijkstra = new DijkstraBuilder()
      .setGraphInfo(graphInfo)
      .setFromVertex(inputList.from)
      .setToVertex(inputList.to)
      .build();

    const ret = dijkstra.run();

    if (ret !== false) {
      dispatch(
        setShortestPath({
          from: inputList.from,
          to: inputList.to,
          path: ret,
        }),
      );
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'path-from') {
      setInputList((prev) => ({
        ...prev,
        from: value,
      }));
    } else {
      setInputList((prev) => ({
        ...prev,
        to: value,
      }));
    }
  };

  return (
    <div className="config">
      <div style={LabelStyle}>Undirected : Directed</div>
      <Toggle onChange={toggleOnChange} />
      <div style={LabelStyle}>Shortest Path Find</div>
      <div>
        <Input text="from" name="path-from" onChange={onChange} value={inputList.from} />
        <Input text="to" name="path-to" onChange={onChange} value={inputList.to} />
      </div>
      <button type="button" onClick={run}>
        Find
      </button>
      <a href="https://github.com/dkpark10/graphpainter" target="_blank" rel="noreferrer">
        <img
          style={{ width: '45px', height: '45px', cursor: 'pointer' }}
          alt="my github"
          src="https://media.cdnandroid.com/item_images/1097581/imagen-github-0thumb.jpeg"
        />
      </a>
    </div>
  );
}
