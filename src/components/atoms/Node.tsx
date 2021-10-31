interface NodeProp {
  size: { width: number, height: number }
};

const Node = ({ size }: NodeProp) => {

  const { width, height } = size;

  return (
    <>
      <g>
        <circle cx="400" cy="400" r="20" stroke="black" fill="red" />
        <text x="400" y="400" textAnchor="middle" fill="white" fontSize="14px" fontFamily="Arial" dy=".3em">BC</text>
        <circle cx="50" cy="50" r="20" stroke="black" fill="green" />
      </g>
    </>
  )
};

export default Node;