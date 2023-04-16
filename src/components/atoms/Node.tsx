import React, { useRef } from 'react';
import { MAINCOLOR } from '@/constants';

interface NodeProps {
  size: { y: number; x: number };
  value: string;
  onPointerDown: React.PointerEventHandler<SVGCircleElement>;
  onPointerUp: React.PointerEventHandler<SVGCircleElement>;
  onPointerMove: React.PointerEventHandler<SVGCircleElement>;
  isDraged: boolean;
  currentNode: (EventTarget & SVGCircleElement) | null;
  fromOrTo: boolean;
}

function Node({ size, value, onPointerDown, onPointerUp, onPointerMove, fromOrTo, isDraged, currentNode }: NodeProps) {
  const { y, x } = size;

  const ref = useRef<SVGCircleElement>(null);
  const textRef = useRef<SVGTextElement>(null);

  const onNodeMouseOver = (e: React.PointerEvent<SVGCircleElement>) => {
    if (fromOrTo === true) {
      return;
    }
    e.currentTarget.setAttribute('fill', '#ebe534');
    textRef.current?.setAttribute('fill', 'black');
  };

  const onNodeMouseOut = (e: React.PointerEvent<SVGCircleElement>) => {
    if (fromOrTo === true) {
      return;
    }
    e.currentTarget.setAttribute('fill', MAINCOLOR);
    textRef.current?.setAttribute('fill', 'white');
  };

  return (
    <g style={{ cursor: 'pointer' }}>
      <circle
        ref={ref}
        cy={x}
        cx={y}
        r="22"
        fill={fromOrTo === true ? '#ebe534' : MAINCOLOR}
        stroke="#020617"
        strokeWidth="2.5"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerMove={onPointerMove}
        onMouseOver={onNodeMouseOver}
        onMouseOut={onNodeMouseOut}
      />
      <text
        className="pointer-events-none"
        ref={textRef}
        y={x}
        x={y}
        dy=".35em"
        fontSize="15"
        fill={fromOrTo ? 'black' : 'white'}
        textAnchor="middle"
      >
        {value}
      </text>
    </g>
  );
}

export default React.memo(Node, (prev, next) => {
  return (
    prev.isDraged === next.isDraged &&
    prev.size.y === next.size.y &&
    prev.size.x === next.size.x &&
    prev.fromOrTo === next.fromOrTo
  );
});
