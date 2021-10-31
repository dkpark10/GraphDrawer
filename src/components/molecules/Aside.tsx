import React, { useState } from "react";
import makeGraph from '../../modules/MakeGraph';
import { useDispatch } from 'react-redux';
import { setGraphInfo, Graph } from '../../redux/index';


const debounceIDinputCheck = (e: React.ChangeEvent<HTMLTextAreaElement>): Graph | undefined => {

  const inputValue: string[] = e.target.value.split('\n');
  const [nodecnt, edgecnt]: string[] = inputValue[0].split(" ");

  if (isNaN(Number(nodecnt)) === true || isNaN(Number(edgecnt))) {
    return undefined;
  }

  const graph = makeGraph(inputValue.splice(1));

  return {
    nodeCount: nodecnt,
    edgeCount: edgecnt,
    graph: graph
  };
}

const TextArea = () => {

  const dispatch = useDispatch();

  const [value, setValue] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {

    const ng: Graph | undefined = debounceIDinputCheck(e);
    
    if (ng !== undefined) {
      dispatch(setGraphInfo(ng as Graph));
    }

    setValue(prev => e.target.value);
  }

  return (
    <>
      <aside>
        <textarea style={{ resize: 'none' }} value={value} onChange={handleChange}></textarea>
        <div className = 'config'>
        </div>
      </aside>
    </>
  )
}

export default TextArea;