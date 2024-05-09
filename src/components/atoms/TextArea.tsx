import { useEffect, useState } from 'react';
import { shallow } from 'zustand/shallow';
import { parseGraph } from '@/services/parse-graph';
import { useGraphStore } from '@/store';
import { useDebounce } from '@/hooks/use-debounce';

export default function TextArea(): JSX.Element {
  const initInputData = useGraphStore((state) => state.rawInputData);

  const setGraph = useGraphStore((state) => state.setGraph, shallow);

  const [textAreaValue, setTextAreaValue] = useState(initInputData);

  const debouncedInputValue = useDebounce({ value: textAreaValue, delay: 250 });

  useEffect(() => {
    const pg = parseGraph(debouncedInputValue);
    setGraph(pg, debouncedInputValue);
  }, [debouncedInputValue, setGraph]);

  return (
    <textarea
      className="resize-none w-[200px] h-[40%] p-2.5 text-white bg-slate-950"
      value={textAreaValue}
      onChange={(e) => {
        setTextAreaValue(e.target.value);
      }}
    />
  );
}
