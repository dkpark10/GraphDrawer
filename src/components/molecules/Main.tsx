/* eslint-disable react/no-array-index-key */
import React, { useRef, useEffect, useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Point, Vertex, Size } from 'global-type';
import Node from '../atoms/Node';
import Edge from '../atoms/Edge';
import { RootState } from '@/store';
import { VertexCoordCalculator, VertexCoordCalculatorBuilder, isShortestEdge } from '@/services';
import { BOARDSIZE, MAIN_COLOR, SECOND_COLOR } from '@/constants';

const outofRange = (value: number, size: Size): number => {
  if (value <= BOARDSIZE) return BOARDSIZE * 2;
  if (value >= size.height - BOARDSIZE) return size.height - BOARDSIZE * 2;
  return value;
};

interface IDragNode {
  dragActive: boolean;
  currentNode: (EventTarget & SVGCircleElement) | null;
}

export default function Main(): JSX.Element {
  const mainRef = useRef<HTMLElement>(null);

  const [mainSize, setMainSize] = useState<Size>({ width: 0, height: 0 });

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
    setMainSize((prev) => ({
      ...prev,
      width: (mainRef.current as HTMLElement).offsetWidth,
      height: (mainRef.current as HTMLElement).offsetHeight,
    }));
  }, []);

  useEffect(() => {
    const vertexCoordCalculator: VertexCoordCalculator = new VertexCoordCalculatorBuilder()
      .setGraphInfo(graphInfo)
      .setLeftTop({ y: 0 + BOARDSIZE * 2, x: 0 + BOARDSIZE * 2 })
      .setRightBottom({ y: mainSize.width - BOARDSIZE * 2, x: mainSize.height - BOARDSIZE * 2 })
      .build();

    setVertexInfo((prev) => ({ ...prev, ...vertexCoordCalculator.run() }));
  }, [graphInfo, mainSize.width, mainSize.height]);

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
      const moveY = outofRange(value.coord.y - (toff[1] - xx), mainSize);
      const moveX = outofRange(value.coord.x - (toff[0] - yy), mainSize);

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
        isDraged={dragActive.dragActive}
        currentNode={dragActive.currentNode}
        fromOrTo={fromTo}
      />
    );
  });

  const edgeList: JSX.Element[][] = Object.entries(vertexInfo).map((ele, idx1, self) => {
    const [vertex, value] = ele;
    const p1: Point = value.coord;

    return value.connectedList.map((connectedVertex, idx2) => {
      const p2: Point = vertexInfo[connectedVertex.vertex].coord;
      const color = isShortestEdge(shortestPath.path, vertex, connectedVertex.vertex) ? SECOND_COLOR : MAIN_COLOR;

      return (
        <Edge
          key={idx1 * self.length + idx2}
          from={[p1.y, p1.x]}
          to={[p2.y, p2.x]}
          cost={connectedVertex.cost}
          color={color}
        />
      );
    });
  });

  return (
    <main ref={mainRef} className="w-[600px] h-[600px] border-2 border-main-color rounded-xl">
      <svg width={mainSize.width} height={mainSize.height}>
        {edgeList}
        {nodeList}
      </svg>
    </main>
  );
}
