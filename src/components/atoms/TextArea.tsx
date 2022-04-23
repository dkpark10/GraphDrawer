import React, { useCallback, useMemo, useEffect, useState } from "react";
import makeGraph from '../../modules/MakeGraph';
import { useDispatch } from 'react-redux';
import { setShortestPath, initialState } from '../../redux/shortestpath';
import { setGraphInfo, Graph } from '../../redux/graph';
import { debounce } from "lodash";

export default function TextArea(): JSX.Element {

  const dispatch = useDispatch();
  const [value, setValue] = useState<string>('6\n1 2 2\n2 3 8\n3 4 1\n1 4 9\n4 5 7\n5 6 2\n4 6 6\n3 6 9');

  const inputValueParsing = (value: string): Graph | undefined => {

    const inputValue: string[] = value.split('\n');
    const [vertexCount, edgecnt]: string[] = inputValue[0].split(" ");

    if (isNaN(Number(vertexCount)) === true && isNaN(Number(edgecnt)) === true) {
      return undefined;
    }

    const graph = makeGraph(inputValue.splice(1));

    return {
      vertexCount: vertexCount,
      edgeCount: edgecnt,
      graph: graph
    };
  }

  const debounceSetGraph = useMemo(() => debounce((arg) => {
    const ng: Graph | undefined = inputValueParsing(arg);
    if (ng !== undefined) {
      dispatch(setGraphInfo(ng as Graph));
      dispatch(setShortestPath(initialState));
    }
  }, 550), [dispatch]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    debounceSetGraph(e.target.value);
  }, [debounceSetGraph]);

  useEffect(() => {
    debounceSetGraph(value);
  });

  return (
    <>
      <textarea
        style={{ resize: 'none' }}
        value={value}
        onChange={handleChange}
        id='input'
      />
      <label htmlFor='input'/>
    </>
  )
}