import React, { useState } from "react";
import makeGraph from '../../modules/MakeGraph';
import { useDispatch } from 'react-redux';
import { setGraphInfo, Graph } from '../../redux/index';
import { debounce, throttle } from 'lodash';

const NODELIMITCOUNT = 20 as const;

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
        <div className='config'>
          <div>
            <input type="checkbox" name="xxx" value="yyy" />
          </div>
          <div>
            <input type="checkbox" name="xxx" value="yyy" />
          </div>
          <div>
            <input type="checkbox" name="xxx" value="yyy" />
          </div>
          <div>
            <input type="checkbox" name="xxx" value="yyy" />
          </div>
        </div>
      </aside>
    </>
  )
}

export default TextArea;