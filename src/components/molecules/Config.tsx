import { useRef, useState } from 'react';
import { shallow } from 'zustand/shallow';
import { Switch } from '@headlessui/react';
import { DijkstraBuilder2 } from '@/utils/dijkstra2';
import { useArrowStore, useShortestPathStore, useGraphStore } from '@/store';

type InputTuple = {
  from: HTMLInputElement | null;
  to: HTMLInputElement | null;
};

export default function Config() {
  const inputFromToRef = useRef<InputTuple>({
    from: null,
    to: null,
  });

  const { isArrow, setArrowDirect } = useArrowStore((state) => ({
    setArrowDirect: state.setArrowDirect,
    isArrow: state.isArrow,
  }));

  const setShortestPath = useShortestPathStore((state) => state.setShortestPath);

  const [invalidInputNodes, setInvalidInputNodes] = useState(false);

  const { nodes, rawInputData } = useGraphStore((state) => state, shallow);

  const isExistNodes = () =>
    nodes.some((node) => node.value === inputFromToRef.current.from?.value) &&
    nodes.some((node) => node.value === inputFromToRef.current.to?.value);

  const findShortestPath = () => {
    if (!inputFromToRef.current.from || !inputFromToRef.current.to || !isExistNodes()) {
      setInvalidInputNodes(true);
      return;
    }

    setInvalidInputNodes(false);

    const dijkstra = new DijkstraBuilder2()
      .setGraphRawData(rawInputData)
      .setFromVertex(inputFromToRef.current.from?.value)
      .setToVertex(inputFromToRef.current.to?.value)
      .build();

    setShortestPath({
      from: inputFromToRef.current.from?.value,
      to: inputFromToRef.current.to?.value,
      shortestPath: dijkstra.run(),
    });
  };

  return (
    <div className="mt-[20px] w-[200px] h-[292px] p-2.5 flex items-center border border-main-color flex-col">
      <div className="m-3 text-sm">arrow marker</div>
      <Switch
        checked={isArrow}
        onChange={() => setArrowDirect()}
        className="group inline-flex h-6 w-14 items-center rounded-full bg-gray-400 transition data-[checked]:bg-pink-600"
      >
        <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-9" />
      </Switch>

      <div className="m-3 text-sm">find shortest path</div>
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
      {invalidInputNodes && <div className="text-xs text-error-color h-3">invalid input</div>}
      <button
        className="bg-main-color text-white w-[90%] h-8 rounded-md my-5 hover:bg-pink-600"
        type="button"
        onClick={findShortestPath}
      >
        find
      </button>
    </div>
  );
}
