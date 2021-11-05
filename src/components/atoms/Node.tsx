interface NodeProp {
  size: { y: number, x: number }
  value: string;
};

const Node = ({ size, value }: NodeProp) => {
  
  const { y, x } = size;

  return (
    <>
      <g>
        <circle cy={x} cx={y} r="18" fill='#8638eb' ></circle>
        <path d="M 100 400 L 200 500" fill="none" stroke-width="2" stroke="yellow"></path>
        <path d="M 200 500 L 300 400" fill="none" stroke-width="2" stroke="yellow"></path>
        <path d="M 300 400 L 400 500" fill="none" stroke-width="2" stroke="yellow"></path>
        <path d="M 400 500 L 500 400" fill="none" stroke-width="2" stroke="yellow"></path>
        <path d="M 500 400 L 600 500" fill="none" stroke-width="2" stroke="yellow"></path>
        <text y={x} x={y} dy='.35em' fontSize="17" fill="white" textAnchor='middle'>{value}</text>
      </g>
    </>
  )
};

export default Node;