import React from 'react';

interface NodeProp {
  size: { y: number, x: number },
  value: string,
  onPointerDown: React.PointerEventHandler<SVGCircleElement>,
  onPointerUp: React.PointerEventHandler<SVGCircleElement>,
  onPointerMove: React.PointerEventHandler<SVGCircleElement>,
  color?: string
};

const Node = ({ size,
  value,
  onPointerDown,
  onPointerUp,
  onPointerMove,
  color = '#cfcfcf' }: NodeProp) => {

  const { y, x } = size;

  return (
    <>
      <g>
        <circle
          style={{ cursor: 'pointer' }}
          cy={x}
          cx={y}
          r='22'
          fill='#16afc0'
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
          fill='white'
          textAnchor='middle'>{value}</text>
      </g>
    </>
  )
};

export default Node;