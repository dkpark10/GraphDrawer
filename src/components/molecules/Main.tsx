import React, { useRef, useEffect, useState } from 'react';
import Node from '../atoms/Node';
import Edge from '../atoms/Edge';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/index';
import { GraphState } from '../../redux/graph';
import { CoordCalculator, Point, CoordCalculatorBuilder, Vertex } from '../../modules/CoordCalculator';

const BOARDSIZE = 20 as const;

export interface Size {
  width: number;
  height: number;
}

const Main = () => {

  const ref = useRef<any>(null);
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });
  const [vertexInfo, setVertexInfo] = useState<{ [key: string]: Vertex }>({});

  const { graphInfo } = useSelector((state: RootState) => ({
    graphInfo: state.graph.graph
  }));

  useEffect(() => {

    console.log(`width == ${ref.current.offsetWidth} height == ${ref.current.offsetHeight}`);

    setSize(prev => ({
      ...prev,
      width: ref.current.offsetWidth,
      height: ref.current.offsetHeight
    }))

    const coordCalculator: CoordCalculator = new CoordCalculatorBuilder()
      .setGraphInfo(graphInfo)
      .setLeftTop(new Point(0 + BOARDSIZE, 0 + BOARDSIZE))
      .setRightBottom(new Point(size.width - BOARDSIZE * 2, size.height - BOARDSIZE * 2))
      .build();

    const tmp: { [key: string]: Vertex } = coordCalculator.run();
    setVertexInfo(prev => ({ ...tmp }));

  }, [ref, graphInfo, size.width, size.height]);

  console.log('main render');

  const nodeList: JSX.Element[] = Object.entries(vertexInfo).map((ele, idx) => {

    const [key, value] = ele;

    return (
      <Node
        key={idx}
        size={{
          y: value.coord.y,
          x: value.coord.x
        }}
        value={key}
      />
    )
  })

  const edgeList: JSX.Element[][] = Object.entries(vertexInfo).map((ele, idx1, self) => {

    const [_, value] = ele;
    const p1: Point = value.coord;

    return value.connectedList.map((connectedVertex, idx2) => {

      const p2: Point = vertexInfo[connectedVertex].coord;
      return (
        <Edge
          key={idx1 * self.length + idx2}
          from={[p1.y, p1.x]}
          to={[p2.y, p2.x]}
        />
      )
    })
  });

  return (
    <>
      <main ref={ref}>
        <svg style={{ width: size.width, height: size.height }}>
          {edgeList}
          {nodeList}
        </svg>
      </main>
    </>
  );
}

export default Main;
