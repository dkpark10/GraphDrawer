import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import { setArrowDirect } from '@/store/node-arrow';
import { setShortestPath } from '@/store/shortestpath';
import { DijkstraBuilder } from '@/utils/dijkstra';
import { RootState } from '@/store/index';

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

  const arrowToggle = () => dispatch(setArrowDirect());

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
    <div className="mt-[20px] w-[200px] h-[292px] p-2.5 flex items-center border border-main-color flex-col">
      <div className="m-3 text-sm">Undirected : Directed</div>
      <label className="arrow-button relative inline-block w-15 h-[22px]" htmlFor="direction">
        <input type="checkbox" onChange={arrowToggle} id="direction" />
        <span className="onoff-switch" />
      </label>
      <div className="m-3 text-sm">Shortest Path Find</div>
      <div className="flex w-full justify-center">
        {['from', 'to'].map((ele) => (
          <label className="text-sm" htmlFor={ele} key={ele}>
            <span className="p-1">{ele}</span>
            <input
              className="w-10 h-6 outline-main-color bg-slate-950 text-white px-1 rounded-md"
              type="text"
              name={`path-${ele}`}
              onChange={onChange}
              value={ele === 'from' ? inputList.from : inputList.to}
              id={ele}
            />
          </label>
        ))}
      </div>
      <button
        className="bg-main-color text-white w-[90%] h-8 rounded-md my-5 hover:bg-pink-600"
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
