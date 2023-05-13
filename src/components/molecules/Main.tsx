/* eslint-disable react/no-array-index-key */
import React, { useRef, useEffect, useState } from 'react';
import { shallow } from 'zustand/shallow';
import { Point, Vertex, Size } from 'global-type';
import Node from '@/components/atoms/Node';
import Edge from '@/components/atoms/Edge';
import { useGraphStore, useShortestPathStore } from '@/store';
import { VertexCoordCalculator, VertexCoordCalculatorBuilder, isShortestEdge } from '@/services';
import { BOARD_SIZE, MAIN_COLOR, SECOND_COLOR } from '@/constants';

const outOfRange = (value: number, size: Size): number => {
  if (value <= BOARD_SIZE) return BOARD_SIZE * 2;
  if (value >= size.height - BOARD_SIZE) return size.height - BOARD_SIZE * 2;
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

  const [dragActive, setDragActive] = useState<IDragNode>({ dragActive: false, currentNode: null });

  const [off, setOff] = useState<number[]>([0, 0]);

  const graphInfo = useGraphStore(({ graph, vertexCount }) => ({ vertexCount, graph }), shallow);

  const shortestPath = useShortestPathStore(({ from, to, path }) => ({ from, to, path }), shallow);

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
      .setLeftTop({ y: 0 + BOARD_SIZE * 2, x: 0 + BOARD_SIZE * 2 })
      .setRightBottom({ y: mainSize.width - BOARD_SIZE * 2, x: mainSize.height - BOARD_SIZE * 2 })
      .build();

    setVertexInfo((prev) => ({ ...prev, ...vertexCoordCalculator.run() }));
  }, [graphInfo, mainSize.width, mainSize.height]);

  const handlePointerDown = (e: React.PointerEvent<SVGCircleElement>) => {
    const box = e.currentTarget.getBoundingClientRect();
    const offX = e.clientX - box.left;
    const offY = e.clientY - box.top;

    e.currentTarget.setPointerCapture(e.pointerId);

    setOff([offX, offY]);
    setDragActive((prev) => ({
      ...prev,
      dragActive: true,
      currentNode: e.currentTarget,
    }));
  };

  const handlePointerUp = () => {
    setDragActive((prev) => ({
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
      const moveY = outOfRange(value.coord.y - (toff[1] - xx), mainSize);
      const moveX = outOfRange(value.coord.x - (toff[0] - yy), mainSize);

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
        isDragged={dragActive.dragActive}
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
    <main ref={mainRef} className="w-[600px] h-[600px] border border-main-color rounded-xl">
      <svg width={mainSize.width} height={mainSize.height} viewBox="0 0 600 600">
        {edgeList}
        {nodeList}
      </svg>
    </main>
  );
}
