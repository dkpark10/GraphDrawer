import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import { setArrowDirect } from '../../store/node-arrow';
import { setShortestPath } from '../../store/shortestpath';
import { DijkstraBuilder } from '../../utils/dijkstra';
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
    const dijkstra = new DijkstraBuilder()
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

      return;
    }
    setInputList((prev) => ({
      ...prev,
      to: value,
    }));
  };

  return (
    <div className="mt-[20px] w-[200px] h-[292px] p-2.5 flex items-center border-2 border-indigo-600 flex-col tarnslate-x-[-20%]">
      <div style={LabelStyle}>Undirected : Directed</div>
      <label className="direct-button" htmlFor="direction">
        <input type="checkbox" onChange={toggleOnChange} id="direction" />
        <span className="onoff-switch" />
      </label>
      <div style={LabelStyle}>Shortest Path Find</div>
      <div>
        <label style={{ fontSize: '13px' }} htmlFor="from">
          from
          <input
            type="text"
            name="path-from"
            onChange={onChange}
            value={inputList.from}
            id="from"
            style={{ width: '40px', height: '25px' }}
          />
        </label>
        <label style={{ fontSize: '13px' }} htmlFor="to">
          to
          <input
            type="text"
            name="path-to"
            onChange={onChange}
            value={inputList.to}
            id="to"
            style={{ width: '40px', height: '25px' }}
          />
        </label>
      </div>
      <button
        className="bg-indigo-600 text-white w-[90%] h-8 rounded-md my-5 hover:bg-pink-600"
        type="button"
        onClick={run}
      >
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
