import React, { useEffect, useRef } from 'react';
import { IDragNode } from '../molecules/Main';

interface NodeProp {
  size: { y: number, x: number },
  value: string,
  onPointerDown: React.PointerEventHandler<SVGCircleElement>,
  onPointerUp: React.PointerEventHandler<SVGCircleElement>,
  onPointerMove: React.PointerEventHandler<SVGCircleElement>,
  isDraged: IDragNode;
  color?: string
};

const Node = ({ size,
  value,
  onPointerDown,
  onPointerUp,
  onPointerMove,
  isDraged,
  color = '#cfcfcf' }: NodeProp) => {

  const { y, x } = size;
  const ref = useRef<any>(null);

  const isDraggedNode = isDraged.dragActive && isDraged.currentNode === ref.current;

  useEffect(() => {
    return(() => {
      ref.current = null;
    })
  }, []);

  return (
    <>
      <g>
        <circle
          ref={ref}
          style={{ cursor: 'pointer' }}
          cy={x}
          cx={y}
          r='22'
          fill={isDraggedNode ? '#ebe534' : '#16afc0'}
          stroke={color}
          strokeWidth='2.5'
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerMove={onPointerMove}
        />
        <text
          style={{ cursor: 'pointer' }}
          y={x}
          x={y}
          dy='.35em'
          fontSize="17"
          fill={isDraggedNode ? 'black' : 'white'}
          textAnchor='middle'>{value}</text>
      </g>
    </>
  )
};

export default Node;