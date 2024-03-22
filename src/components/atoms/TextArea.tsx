import React, { useState } from 'react';
import { parseGraph } from '@/services/parse-graph';
import { useShortestPathStore, useGraphStore, shortestPathInitState } from '@/store';
import { useDebounce } from '@/hooks/use-debounce';

export default function TextArea(): JSX.Element {
  const setGraph = useGraphStore((state) => state.setGraph);

  const setShortestPath = useShortestPathStore((state) => state.setShortestPath);

  const [textAreaValue, setTextAreaValue] = useState<string>('1 2 2\n2 3 8\n3 4 1\n1 4 9\n4 5 7\n5 6 2\n4 6 6\n3 6 9');
  const debouncedTextAreaValue = useDebounce(textAreaValue, 550);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaValue(event.target.value);
    const pg = parseGraph(debouncedTextAreaValue);
    if (pg !== undefined) {
      setGraph(pg, debouncedTextAreaValue);
    }
    setShortestPath(shortestPathInitState);
  };

  return (
    <textarea
      className="resize-none w-[200px] h-[40%] p-2.5 text-white bg-slate-950"
      value={textAreaValue}
      onChange={handleChange}
      id="input"
    />
  );
}
