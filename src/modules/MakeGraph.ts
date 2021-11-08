interface EdgeInfo {
  [key: string]: string[][];
};

const makeGraph = (graph: string[]) => {

  return graph.reduce((acc: EdgeInfo, ele, dix): EdgeInfo => {
    
    const [vertex1, vertex2, cost] = ele.split(' ');

    if(vertex1 === '')
      return acc;

    acc[vertex1] = acc[vertex1] || [];

    if (vertex2 === undefined && cost === undefined) {
      return acc;
    }
    
    acc[vertex1].push([vertex2, cost]);

    return acc;
  }, {});
}

export default makeGraph;