export const isShortestEdge = (
  shortestPath: { [key: string]: boolean },
  vertex: string,
  nextVertex: string,
): boolean => {
  const listShortestPath = Object.keys(shortestPath);
  const vertexCount = listShortestPath.length;

  if (vertexCount === 0) {
    return false;
  }

  const indexOfCurrentVertex = listShortestPath.indexOf(vertex);
  const indexOfNextVertex = listShortestPath.indexOf(nextVertex);

  if (indexOfCurrentVertex === -1 || indexOfNextVertex === -1) {
    return false;
  }

  return Math.abs(indexOfCurrentVertex - indexOfNextVertex) <= 1;
};
