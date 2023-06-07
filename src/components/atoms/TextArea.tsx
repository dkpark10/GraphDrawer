import React, { useCallback, useMemo, useEffect, useState } from 'react';
import { parseGraph } from '@/services/parse-graph';
import { useShortestPathStore, useGraphStore, shortestPathInitState } from '@/store';
import { debounce } from '@/utils';

export default function TextArea(): JSX.Element {
  const setGraph = useGraphStore((state) => state.setGraph);

  const setShortestPath = useShortestPathStore((state) => state.setShortestPath);

  const [textAreaValue, setTextAreaValue] = useState<string>(
    '6\n1 2 2\n2 3 8\n3 4 1\n1 4 9\n4 5 7\n5 6 2\n4 6 6\n3 6 9',
  );

  const debounceSetGraph = useMemo(
    () =>
      debounce((rawTextAreaValue: [string]) => {
        const pg = parseGraph(rawTextAreaValue[0]);
        if (pg !== undefined) {
          setGraph(pg, rawTextAreaValue[0]);
        }
        setShortestPath(shortestPathInitState);
      }, 550),
    [setGraph, setShortestPath],
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const {
        target: { value },
      } = event;

      setTextAreaValue(value);
      debounceSetGraph(value);
    },
    [debounceSetGraph],
  );

  useEffect(() => {
    debounceSetGraph(textAreaValue);
  });

  return (
    <textarea
      className="resize-none w-[200px] h-[40%] p-2.5 text-white bg-slate-950"
      value={textAreaValue}
      onChange={handleChange}
      id="input"
    />
  );
}
