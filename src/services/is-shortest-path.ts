// export const isShortestEdge = (
//   shortestPath: { [key: string]: boolean },
//   vertex: string,
//   nextVertex: string,
// ): boolean => {
//   const listShortestPath = Object.keys(shortestPath);
//   const vertexCount = listShortestPath.length;

//   if (vertexCount === 0) {
//     return false;
//   }

//   const indexOfCurrentVertex = listShortestPath.indexOf(vertex);
//   const indexOfNextVertex = listShortestPath.indexOf(nextVertex);

//   if (indexOfCurrentVertex === -1 || indexOfNextVertex === -1) {
//     return false;
//   }

//   return Math.abs(indexOfCurrentVertex - indexOfNextVertex) <= 1;
// };

/**
 * @description 해당 엣지가 최단경로 루트인지 확인하는 함수
 * 최단경로는 역순으로 정점 스트링 배열이 주어지므로 소스와 타켓의 인덱스 차이를 계산하여 1이하 이면 최단경로 판별
 */
export const isShortestEdge = (source: string, target: string, shortestPathList: Array<string>) => {
  if (shortestPathList.length <= 0) {
    return false;
  }
  const sourceIndex = shortestPathList.findIndex((ele) => ele === source);
  const targetIndex = shortestPathList.findIndex((ele) => ele === target);

  return (
    Math.abs(sourceIndex - targetIndex) <= 1 &&
    shortestPathList.some((ele) => ele === source) &&
    shortestPathList.some((ele) => ele === target)
  );
};
