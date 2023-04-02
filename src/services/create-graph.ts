export interface ConnectedInfo {
  [key: string]: Array<{ vertex: string; cost: string }>;
}

export const LIMIT_VERTEX_COUNT = 100;

/**
 * @description 중복 및 정점 갯수를 정리하는 함수
   1. 중복되는 정점 연결이 있는지 확인하기 위해 정점을 추출해 정렬한다.
   2. 중복 정점을 찾아낸다.
 */
export const getVertexList = (inputValue: string[]) => {
  return inputValue
    .map((item) => {
      const [vertex1, vertex2, cost] = item.split(' ');
      return vertex1 < vertex2 ? `${vertex1} ${vertex2} ${cost}` : `${vertex2} ${vertex1} ${cost}`;
    })
    .reduce((acc, item) => {
      const [vertex1, vertex2] = item.split(' ');
      const vertexs = `${vertex1}${vertex2}`;

      const x = acc.find((v) => {
        const [v1, v2] = v.split(' ');
        const vs = `${v1}${v2}`;
        return vertexs === vs;
      });

      if (!x) {
        return [...acc, item];
      }

      return acc;
    }, [] as string[]);
};

export const createGraph = (textAreaContent: string) => {
  const inputValue = textAreaContent.split('\n');
  const [vertexCount] = inputValue[0].split(' ');

  if (Number.isNaN(Number(vertexCount)) === true) {
    return undefined;
  }

  const restInputValue = inputValue.splice(1);

  const vertexList = getVertexList(restInputValue);

  const graph = vertexList.reduce((acc: ConnectedInfo, item) => {
    const [vertex1, vertex2, cost] = item.split(' ');

    if (vertex1 === '') return acc;

    acc[vertex1] = acc[vertex1] || [];

    if (vertex2 === undefined && cost === undefined) return acc;

    if (vertex2 === '') return acc;

    acc[vertex1].push({ vertex: vertex2, cost });

    return acc;
  }, {});

  return {
    vertexCount,
    graph,
  };
};
