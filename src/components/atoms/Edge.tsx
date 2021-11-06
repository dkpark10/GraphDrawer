import { useSelector } from 'react-redux';
import { RootState } from '../../redux/index';

interface EdgeProp {
  from: number[];
  to: number[];
};

const Edge = ({ from, to }: EdgeProp) => {

  const { direct } = useSelector((state: RootState) => ({
    direct: state.direct.directed
  }));

  const [fromY, fromX] = from;
  const [toY, toX] = to;

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
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#cfcfcf" />
          </marker>
        </defs>
        <path d={coord}
          strokeWidth="2"
          stroke="#cfcfcf"
          markerEnd={arrowMark} 
        />
      </g>
    </>
  )
};

export default Edge;
