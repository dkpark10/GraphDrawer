export interface EdgeInfo {
  [key: string]: string[][];
}

const createGraph = (graph: string[]): EdgeInfo => {
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
  const inputValue = value.split('\n');
  const [vertexCount] = inputValue[0].split(' ');

  if (Number.isNaN(Number(vertexCount)) === true) {
    return undefined;
  }

  const graph = createGraph(inputValue.splice(1));

  return {
    vertexCount,
    graph,
  };
};
