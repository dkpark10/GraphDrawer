interface NodeProp {
  size: { y: number, x: number }
  value: string;
};

const Node = ({ size, value }: NodeProp) => {

  const { y, x } = size;

  return (
    <>
      <g>
        <circle cy={x}
          cx={y}
          r="20"
          fill='#8638eb'
          stroke="#cfcfcf"
          strokeWidth='2'></circle>
        <text y={x}
          x={y}
          dy='.35em'
          fontSize="17"
          fill="#cfcfcf"
          textAnchor='middle'>{value}</text>
      </g>
    </>
  )
};

export default Node;