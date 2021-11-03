interface EdgeInfo {
  [key: string]: string[][];
};

const makeGraph = (graph: string[]) => {

  return graph.reduce((acc: EdgeInfo, ele, dix): EdgeInfo => {
    const [a, b, c] = ele.split(' ');
    acc[a] = acc[a] || [];

    if(b === undefined && c === undefined){
      return acc;
    }
    
    acc[a].push([b, c]);

    return acc;
  }, {});
}

export default makeGraph;