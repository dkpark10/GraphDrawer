import { useRef } from 'react';
import { shallow } from 'zustand/shallow';
import { DijkstraBuilder } from '@/utils/dijkstra';
import { DijkstraBuilder2 } from '@/utils/dijkstra2';
import { useArrowStore, useGraphStore, useShortestPathStore } from '@/store';
import { useGraphStore as useGraphStore2 } from '@/store/graph2';

type InputTuple = {
  from: HTMLInputElement | null;
  to: HTMLInputElement | null;
};

export default function Config() {
  const inputFromToRef = useRef<InputTuple>({
    from: null,
    to: null,
  });

  const setArrowDirect = useArrowStore((state) => state.setArrowDirect);

  const setShortestPath = useShortestPathStore((state) => state.setShortestPath);

  const graphInfo = useGraphStore(({ graph, vertexCount }) => ({ vertexCount, graph }));

  const { nodes, links, rawInputData } = useGraphStore2((state) => state, shallow);

  const arrowToggle = () => setArrowDirect();

  const isExistNodes = () => {
    return (
      nodes.some((node) => node.id === inputFromToRef.current.from?.value) &&
      nodes.some((node) => node.id === inputFromToRef.current.to?.value)
    );
  };

  const findShortestPath = () => {
    if (!inputFromToRef.current.from || !inputFromToRef.current.to) {
      return;
    }

    if (!isExistNodes()) {
      return;
    }

    const dijkstra = new DijkstraBuilder()
      .setGraphInfo(graphInfo)
      .setFromVertex(inputFromToRef.current.from?.value)
      .setToVertex(inputFromToRef.current.from?.value)
      .build();

    const ret = dijkstra.run();

    if (ret !== false) {
      setShortestPath({
        from: inputFromToRef.current.from?.value,
        to: inputFromToRef.current.to?.value,
        path: ret,
      });
    }

    const dijkstra2 = new DijkstraBuilder2()
      .setGraphInfo({ nodes, links })
      .setFromVertex(inputFromToRef.current.from?.value)
      .setToVertex(inputFromToRef.current.from?.value)
      .build();

    const result2 = dijkstra2.run();
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
              ref={(el) => {
                inputFromToRef.current[ele as 'to' | 'from'] = el;
              }}
              id={ele}
            />
          </label>
        ))}
      </div>
      <button
        className="bg-main-color text-white w-[90%] h-8 rounded-md my-5 hover:bg-pink-600"
        type="button"
        onClick={findShortestPath}
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
