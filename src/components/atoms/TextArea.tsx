import { useEffect, useState } from 'react';
import { shallow } from 'zustand/shallow';
import { parseGraph } from '@/services/parse-graph';
import { useShortestPathStore, useGraphStore, shortestPathInitState } from '@/store';
import { useDebounce } from '@/hooks/use-debounce';

export default function TextArea(): JSX.Element {
  const initInputData = useGraphStore((state) => state.rawInputData);

  const setGraph = useGraphStore((state) => state.setGraph, shallow);

  const setShortestPath = useShortestPathStore((state) => state.setShortestPath);

  const [textAreaValue, setTextAreaValue] = useState(initInputData);

  const debouncedInputValue = useDebounce({ value: textAreaValue, delay: 250 });

  useEffect(() => {
    const pg = parseGraph(debouncedInputValue);
    if (pg !== undefined) {
      setGraph(pg, debouncedInputValue);
    }
    setShortestPath(shortestPathInitState);
  }, [debouncedInputValue, setGraph, setShortestPath]);

  return (
    <textarea
      className="resize-none w-[200px] h-[40%] p-2.5 text-white bg-slate-950"
      value={textAreaValue}
      onChange={(e) => {
        setTextAreaValue(e.target.value);
      }}
      id="input"
    />
  );
}
