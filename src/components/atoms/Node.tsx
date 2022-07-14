import React, { useEffect, useRef } from 'react';
import { IDragNode } from '../molecules/Main';

interface Props {
  size: { y: number, x: number },
  value: string,
  onPointerDown: React.PointerEventHandler<SVGCircleElement>,
  onPointerUp: React.PointerEventHandler<SVGCircleElement>,
  onPointerMove: React.PointerEventHandler<SVGCircleElement>,
  isDraged: IDragNode;
  fromOrTo: boolean;
  color?: string
};

const Node = ({
  size,
  value,
  onPointerDown,
  onPointerUp,
  onPointerMove,
  fromOrTo,
  color = '#cfcfcf' }: Props) => {
  const { y, x } = size;
  const ref = useRef<any>(null);
  const textRef = useRef<any>(null);

  useEffect(() => {
    return (() => {
      ref.current = null;
      textRef.current = null;
    })
  }, []);

  const onNodeMouseOver = (e: React.PointerEvent<SVGCircleElement>) => {
    if (fromOrTo === true) {
      return;
    }
    e.currentTarget.setAttribute('fill', '#ebe534');
    textRef.current.setAttribute('fill', 'black');
  }

  const onNodeMouseOut = (e: React.PointerEvent<SVGCircleElement>) => {
    if (fromOrTo === true) {
      return;
    }
    e.currentTarget.setAttribute('fill', '#16afc0');
    textRef.current.setAttribute('fill', 'white');
  }

  return (
    <g
      style={{ cursor: 'pointer' }}
    >
      <circle
        ref={ref}
        cy={x}
        cx={y}
        r='22'
        fill={fromOrTo === true ? '#ebe534' : '#16afc0'}
        stroke={color}
        strokeWidth='2.5'
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerMove={onPointerMove}
        onMouseOver={onNodeMouseOver}
        onMouseOut={onNodeMouseOut}
      />
      <text
        ref={textRef}
        y={x}
        x={y}
        dy='.35em'
        fontSize="15"
        fill={fromOrTo ? 'black' : 'white'}
        textAnchor='middle'
      >
        {value}
      </text>
    </g>
  )
};

export default React.memo(Node, (prev, next) => {
  return prev.isDraged.dragActive === next.isDraged.dragActive &&
    prev.size.y === next.size.y &&
    prev.size.x === next.size.x &&
    prev.fromOrTo === next.fromOrTo;
});