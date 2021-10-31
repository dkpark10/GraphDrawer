import React, { useRef, useEffect, useState } from 'react';
import Node from '../atoms/Node';
import { useSelector, useStore } from 'react-redux';
import { State } from '../../redux/index';
import { CoordCalculator, Size, Point, CoordCalculatorBuilder } from '../../modules/CalculCoord';

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

  console.log(graphInfo);

  const coordCalculator: CoordCalculator = new CoordCalculatorBuilder()
  .setNodeCount(Number(graphInfo.nodeCount))
  .setLeftTop(new Point(0, 0))
  .setRightBottom(new Point(size.width, size.height))
  .build();

  coordCalculator.calculRun();

  return (
    <>
      <main ref={ref}>
        <svg>
          <Node
            size={{ width: 23, height: 33 }}
          />
        </svg>
      </main>
    </>
  );
}

export default Main;
