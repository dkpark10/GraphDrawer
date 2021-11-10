import { useSelector } from 'react-redux';
import { RootState } from '../../redux/index';

interface EdgeProp {
  from: number[];
  to: number[];
  cost: string;
  color? : string;
};

const calculCostCoord = (from: number[], to: number[]) => {

  const maxY = Math.max(from[0], to[0]);
  const maxX = Math.max(from[1], to[1]);
  const minY = Math.min(from[0], to[0]);
  const minX = Math.min(from[1], to[1]);

  // cost 위치 미세조정
  let gap = 0;
  if (to[0] > from[0] && to[1] > from[1])
    gap += 15;
  else if (to[0] < from[0] && to[1] < from[1])
    gap += 12;

  return [((maxY - minY) / 2) + minY - gap, ((maxX - minX) / 2) + minX + gap];
}

const Edge = ({ from, to, cost, color = '#cfcfcf'}: EdgeProp) => {

  const { direct } = useSelector((state: RootState) => ({
    direct: state.direct.directed
  }));

  const [fromY, fromX] = from;
  const [toY, toX] = to;
  const [costY, costX] = calculCostCoord(from, to);

  const coord = `M ${fromY} ${fromX} L ${toY} ${toX}`;
  const arrowMark = direct === true ? "url(#arrow)" : "";

  return (
    <>
      <g>
        <defs>
          <marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="23"
            refY="5"
            markerWidth="8"
            markerHeight="8"
            orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill='#cfcfcf' />
          </marker>
        </defs>
        <path d={coord}
          strokeWidth="2"
          stroke={color}
          markerEnd={arrowMark}
        />
        <text y={costX}
          x={costY}
          dx='.3em'
          dy='.9em'
          fontSize="17"
          fill={color}
          textAnchor='right'>{cost}</text>
      </g>
    </>
  )
};

export default Edge;