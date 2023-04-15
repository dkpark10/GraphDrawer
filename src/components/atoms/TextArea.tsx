import React, { useCallback, useMemo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createGraph } from '../../services/create-graph';
import { setGraph, type GraphState } from '../../store/graph';
import { debounce } from '../../utils';

export default function TextArea(): JSX.Element {
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>('6\n1 2 2\n2 3 8\n3 4 1\n1 4 9\n4 5 7\n5 6 2\n4 6 6\n3 6 9');

  const debounceSetGraph = useMemo(
    () =>
      debounce((arg: string) => {
        const ng: GraphState | undefined = createGraph(arg[0]);
        if (ng !== undefined) {
          dispatch(setGraph(ng));
        }
      }, 550),
    [dispatch],
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

  return <textarea style={{ resize: 'none' }} value={value} onChange={handleChange} id="input" />;
}
