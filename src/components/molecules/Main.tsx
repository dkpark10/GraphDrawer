import React, { useRef, useEffect, useState, JSXElementConstructor } from 'react';
import Node from '../atoms/Node';
import { useSelector, useStore } from 'react-redux';
import { State } from '../../redux/index';
import { CoordCalculator, Point, CoordCalculatorBuilder, Vertex } from '../../modules/CalculCoord';

const BOARDSIZE = 20 as const;

export interface Size {
  width: number;
  height: number;
}
const Main = () => {

  const ref = useRef<any>(null);
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });
  const { graphInfo } = useSelector((state: State) => ({
    graphInfo: state.graph
  }));

  useEffect(() => {

    console.log(`width == ${ref.current.offsetWidth} height == ${ref.current.offsetHeight}`);

    setSize(prev => ({
      ...prev,
      width: ref.current.offsetWidth,
      height: ref.current.offsetHeight
    }))

  }, [ref]);

  const coordCalculator: CoordCalculator = new CoordCalculatorBuilder()
    .setGraphInfo(graphInfo)
    .setLeftTop(new Point(0 + BOARDSIZE, 0 + BOARDSIZE))
    .setRightBottom(new Point(size.width - BOARDSIZE, size.height - BOARDSIZE))
    .build();

  const vertexInfo: Vertex[] = coordCalculator.run();

  const nodeList: JSX.Element[] = vertexInfo.map((ele, idx) => {
    
    const { y, x } = ele.coord;
    const value = ele.value;

    return (
      <Node
        key={idx}
        size={{ y: y, x: x }}
        value={value}
      />
    )
  })

  
  return (
    <>
      <main ref={ref}>
        <svg style={{ width: size.width, height: size.height }}>
          {nodeList}
        </svg>
      </main>
    </>
  );
}

export default Main;
