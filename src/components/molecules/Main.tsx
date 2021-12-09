import React, { useRef, useEffect, useState } from 'react';
import Node from '../atoms/Node';
import Edge from '../atoms/Edge';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/index';
import { GraphState } from '../../redux/graph';
import { debounce, throttle } from 'lodash';
import { CoordCalculator, Point, CoordCalculatorBuilder, Vertex } from '../../modules/CoordCalculator';

const BOARDSIZE = 20 as const;

export interface Size {
  width: number;
  height: number;
}

const isShortestEdge = (
  shortestPath: { [key: string]: boolean },
  vertex: string,
  nextVertex: string): boolean => {
  
  const vertexCount = Object.keys(shortestPath).length;

  if (shortestPath[vertex] && shortestPath[nextVertex] && vertexCount > 2)
    return false;
  return Object.keys(shortestPath).includes(vertex) && Object.keys(shortestPath).includes(nextVertex);
}

const outofRange = (value: number, size: Size): number => {

  if (value <= BOARDSIZE)
    value = BOARDSIZE * 2;
  if (value >= size.height - BOARDSIZE)
    value = size.height - BOARDSIZE * 2;

  return value;
}


const Main = () => {

  const ref = useRef<any>(null);
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });
  const [vertexInfo, setVertexInfo] = useState<{ [key: string]: Vertex }>({});
  const [dragActive, setdragActive] = useState<boolean>(false);

  const { graphInfo, shortestPath } = useSelector((state: RootState) => ({
    graphInfo: state.graph.graph,
    shortestPath: state.path
  }));

  useEffect(() => {

    setSize(prev => ({
      ...prev,
      width: ref.current.offsetWidth,
      height: ref.current.offsetHeight
    }))

    const coordCalculator: CoordCalculator = new CoordCalculatorBuilder()
      .setGraphInfo(graphInfo)
      .setLeftTop(new Point(0 + BOARDSIZE * 2, 0 + BOARDSIZE * 2))
      .setRightBottom(new Point(size.width - BOARDSIZE * 2, size.height - BOARDSIZE * 2))
      .build();

    setVertexInfo(prev => ({ ...coordCalculator.run() }));

  }, [ref, graphInfo, size.width, size.height]);

  const handlePointerDown = () => setdragActive(true);
  const handlePointerUp = () => setdragActive(false);
  const handlePointerMove = debounce((e: React.PointerEvent<SVGCircleElement>, data: [string, Vertex]) => {

    e.stopPropagation();    
    const [vertex, value] = data;

    const y = outofRange(value.coord.y + e.movementX, size);
    const x = outofRange(value.coord.x + e.movementY, size);

    if (dragActive) {
      setVertexInfo(prev => ({
        ...prev,
        [vertex]: {
          ...vertexInfo[vertex],
          coord: new Point(y, x)
        }
      }))
    }
  }, 0);

  const nodeList: JSX.Element[] = Object.entries(vertexInfo).map((ele, idx) => {

    const [vertex, value] = ele;

    return (
      <Node
        key={idx}
        size={{
          y: value.coord.y,
          x: value.coord.x
        }}
        value={vertex}
        onPointerMove={(e: React.PointerEvent<SVGCircleElement>) => handlePointerMove(e, ele)}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      />
    )
  })

  const edgeList: JSX.Element[][] = Object.entries(vertexInfo).map((ele, idx1, self) => {

    const [vertex, value] = ele;
    const p1: Point = value.coord;

    return value.connectedList.map((connectedVertex, idx2) => {

      const [nextVertex, cost] = connectedVertex;
      const p2: Point = vertexInfo[nextVertex].coord;

      const color = isShortestEdge(shortestPath.path, vertex, nextVertex) ? '#ebe534' : undefined;

      return (
        <Edge
          key={idx1 * self.length + idx2}
          from={[p1.y, p1.x]}
          to={[p2.y, p2.x]}
          cost={cost}
          color={color}
        />
      )
    })
  });

  return (
    <>
      <main ref={ref}>
        <svg
          style={{ width: size.width, height: size.height }}
          onClick={() => setdragActive(false)}>
          {edgeList}
          {nodeList}
        </svg>
      </main>
    </>
  );
}

export default Main;
