import React, { useCallback, useMemo, useEffect, useState } from 'react';
import { createGraph } from '@/services/create-graph';
import { useGraphStore, type GraphState } from '@/store';
import { debounce } from '@/utils';

export default function TextArea(): JSX.Element {
  const zsSetGraph = useGraphStore((state) => state.setGraph);

  const [value, setValue] = useState<string>('6\n1 2 2\n2 3 8\n3 4 1\n1 4 9\n4 5 7\n5 6 2\n4 6 6\n3 6 9');

  const debounceSetGraph = useMemo(
    () =>
      debounce((arg: string) => {
        const ng: GraphState | undefined = createGraph(arg[0]);
        if (ng !== undefined) {
          zsSetGraph(ng);
        }
      }, 550),
    [zsSetGraph],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
      debounceSetGraph(e.target.value);
    },
    [debounceSetGraph],
  );

  useEffect(() => {
    debounceSetGraph(value);
  });

  return (
    <textarea
      className="resize-none w-[200px] h-[40%] p-2.5 text-white bg-slate-950"
      value={value}
      onChange={handleChange}
      id="input"
    />
  );
}
