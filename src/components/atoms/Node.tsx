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
        <circle cy={x}
          cx={y}
          r="20"
          fill='#8638eb'
          stroke={color}
          strokeWidth='2'
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerMove={onPointerMove}
        />
        <text y={x}
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