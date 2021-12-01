import React, { useEffect, useState } from "react";
import makeGraph from '../../modules/MakeGraph';
import { useDispatch } from 'react-redux';
import { setShortestPath, initialState } from '../../redux/shortestpath';
import { setGraphInfo, Graph } from '../../redux/graph';

const debounceIDinputCheck = (e: React.ChangeEvent<HTMLTextAreaElement>): Graph | undefined => {

  const inputValue: string[] = e.target.value.split('\n');
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

const Textarea = () => {

  const dispatch = useDispatch();
  const init = '6\n1 2 2\n2 3 8\n3 4 1\n1 4 9\n4 5 7\n5 6 2\n4 6 6\n3 6 9';
  const [value, setValue] = useState<string>(init);

  useEffect(() => {

    const inputValue = value.split('\n');
    const graph = makeGraph(inputValue.splice(1));

    dispatch(setGraphInfo({
      vertexCount: '6',
      edgeCount: '',
      graph
    }));

  }, [value, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {

    const ng: Graph | undefined = debounceIDinputCheck(e);
    if (ng !== undefined) {
      dispatch(setGraphInfo(ng as Graph));
      dispatch(setShortestPath(initialState));
    }

    setValue(prev => e.target.value);
  }

  return (
    <>
      <textarea
        style={{ resize: 'none' }}
        value={value}
        onChange={handleChange} />
    </>
  )
}

export default Textarea;