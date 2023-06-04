import React, { useCallback, useMemo, useEffect, useState } from 'react';
import { parseGraph, createGraph } from '@/services/parse-graph';
import { useGraphStore as useGraphStore2 } from '@/store/graph2';
import { useGraphStore } from '@/store/graph';
import { debounce } from '@/utils';

export default function TextArea(): JSX.Element {
  const setGraph = useGraphStore((state) => state.setGraph);

  const setGraph2 = useGraphStore2((state) => state.setGraph);

  const [textAreaValue, setTextAreaValue] = useState<string>(
    '6\n1 2 2\n2 3 8\n3 4 1\n1 4 9\n4 5 7\n5 6 2\n4 6 6\n3 6 9',
  );

  const debounceSetGraph = useMemo(
    () =>
      debounce((rawTextAreaValue: [string]) => {
        const ng = createGraph(rawTextAreaValue[0]);
        const ng2 = parseGraph(rawTextAreaValue[0]);
        if (ng !== undefined) {
          setGraph(ng);
        }

        if (ng2 !== undefined) {
          setGraph2(ng2, rawTextAreaValue[0]);
        }
      }, 550),
    [setGraph, setGraph2],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setTextAreaValue(e.target.value);
      debounceSetGraph(e.target.value);
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
