import { Graph } from '../redux/graph';

interface EdgeInfo {
  [key: string]: string[][];
};

export const inputValueParsing = (value: string): Graph | undefined => {
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

const makeGraph = (graph: string[]) => {
  return graph.reduce((acc: EdgeInfo, ele): EdgeInfo => {
    const [vertex1, vertex2, cost] = ele.split(' ');

    if(vertex1 === '')
      return acc;

    acc[vertex1] = acc[vertex1] || [];

    if (vertex2 === undefined && cost === undefined) 
      return acc;

    if (vertex2 === '')
      return acc;
    
    acc[vertex1].push([vertex2, cost]);

    return acc;
  }, {});
}
