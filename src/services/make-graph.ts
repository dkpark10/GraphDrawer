interface EdgeInfo {
  [key: string]: string[][];
}

const makeGraph = (graph: string[]): EdgeInfo => {
  return graph.reduce((acc: EdgeInfo, ele) => {
    const [vertex1, vertex2, cost] = ele.split(' ');

    if (vertex1 === '') return acc;

    acc[vertex1] = acc[vertex1] || [];

    if (vertex2 === undefined && cost === undefined) return acc;

    if (vertex2 === '') return acc;

    acc[vertex1].push([vertex2, cost]);

    return acc;
  }, {});
};

export const inputValueParsing = (value: string) => {
  const inputValue: string[] = value.split('\n');
  const [vertexCount, edgecnt]: string[] = inputValue[0].split(' ');

  if (Number.isNaN(Number(vertexCount)) === true && Number.isNaN(Number(edgecnt)) === true) {
    return undefined;
  }

  const graph = makeGraph(inputValue.splice(1));

  return {
    vertexCount,
    edgeCount: edgecnt,
    graph,
  };
};
