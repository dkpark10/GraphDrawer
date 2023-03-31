/* eslint-disable react/no-array-index-key */
import React, { useRef, useEffect, useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import Node from '../atoms/Node';
import Edge from '../atoms/Edge';
import { RootState } from '../../store/index';
import { CoordCalculator, Point, CoordCalculatorBuilder, Vertex } from '../../services/coord-calculator';

const BOARDSIZE = 20 as const;

export interface Size {
  width: number;
  height: number;
}

const isShortestEdge = (shortestPath: { [key: string]: boolean }, vertex: string, nextVertex: string): boolean => {
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

const outofRange = (value: number, size: Size): number => {
  if (value <= BOARDSIZE) return BOARDSIZE * 2;
  if (value >= size.height - BOARDSIZE) return size.height - BOARDSIZE * 2;

  return value;
};

export interface IDragNode {
  dragActive: boolean;
  currentNode: (EventTarget & SVGCircleElement) | null;
}

export default function Main(): JSX.Element {
  const ref = useRef<HTMLElement>(null);
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });
  const [vertexInfo, setVertexInfo] = useState<{ [key: string]: Vertex }>({});
  const [dragActive, setdragActive] = useState<IDragNode>({ dragActive: false, currentNode: null });
  const [off, setOff] = useState<number[]>([0, 0]);

  const { graphInfo, shortestPath } = useSelector(
    (state: RootState) => ({
      graphInfo: state.graph,
      shortestPath: state.shortestPath,
    }),
    shallowEqual,
  );

  useEffect(() => {
    setSize((prev) => ({
      ...prev,
      width: (ref.current as HTMLElement).offsetWidth,
      height: (ref.current as HTMLElement).offsetHeight,
    }));

    const coordCalculator: CoordCalculator = new CoordCalculatorBuilder()
      .setGraphInfo(graphInfo)
      .setLeftTop({ y: 0 + BOARDSIZE * 2, x: 0 + BOARDSIZE * 2 })
      .setRightBottom({ y: size.width - BOARDSIZE * 2, x: size.height - BOARDSIZE * 2 })
      .build();

    setVertexInfo((prev) => ({ ...coordCalculator.run() }));
  }, [ref, graphInfo, size.width, size.height]);

  const handlePointerDown = (e: React.PointerEvent<SVGCircleElement>) => {
    const box = e.currentTarget.getBoundingClientRect();
    const offX = e.clientX - box.left;
    const offY = e.clientY - box.top;

    e.currentTarget.setPointerCapture(e.pointerId);

    setOff([offX, offY]);
    setdragActive((prev) => ({
      ...prev,
      dragActive: true,
      currentNode: e.currentTarget,
    }));
  };

  const handlePointerUp = () => {
    setdragActive((prev) => ({
      ...prev,
      dragActive: false,
      currentNode: null,
    }));
  };

  const handlePointerMove = (e: React.PointerEvent<SVGCircleElement>, data: [string, Vertex]) => {
    e.preventDefault();
    const [vertex, value] = data;

    const xx = e.movementX + off[1];
    const yy = e.movementY + off[0];

    if (dragActive.dragActive) {
      const toff = [...off];
      const moveY = outofRange(value.coord.y - (toff[1] - xx), size);
      const moveX = outofRange(value.coord.x - (toff[0] - yy), size);

      setVertexInfo((prev) => ({
        ...prev,
        [vertex]: {
          ...vertexInfo[vertex],
          coord: { y: moveY, x: moveX },
        },
      }));
    }
  };

  const nodeList: JSX.Element[] = Object.entries(vertexInfo).map((ele, idx) => {
    const [vertex, value] = ele;
    const fromTo = shortestPath.from === vertex || shortestPath.to === vertex;

    return (
      <Node
        key={idx}
        size={{
          y: value.coord.y,
          x: value.coord.x,
        }}
        value={vertex}
        onPointerMove={(e: React.PointerEvent<SVGCircleElement>) => handlePointerMove(e, ele)}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        isDraged={dragActive}
        fromOrTo={fromTo}
      />
    );
  });

  const edgeList: JSX.Element[][] = Object.entries(vertexInfo).map((ele, idx1, self) => {
    const [vertex, value] = ele;
    const p1: Point = value.coord;

    return value.connectedList.map((connectedVertex, idx2) => {
      const [nextVertex, cost] = connectedVertex;
      const p2: Point = vertexInfo[nextVertex].coord;
      const color = isShortestEdge(shortestPath.path, vertex, nextVertex) ? '#ebe534' : '#cfcfcf';

      return <Edge key={idx1 * self.length + idx2} from={[p1.y, p1.x]} to={[p2.y, p2.x]} cost={cost} color={color} />;
    });
  });

  return (
    <main ref={ref}>
      <svg style={{ width: size.width, height: size.height }}>
        {edgeList}
        {nodeList}
      </svg>
    </main>
  );
}
