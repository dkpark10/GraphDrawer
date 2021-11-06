interface InputProps {
  text: string;
  width?: string;
}

const Input = ({ text }: InputProps) => {

  return (
    <>
      <label style={{ fontSize: '13px' }}> {text} </label>
      <input type='text' style={{ width: '40px', height: '25px' }}>
      </input>
    </>
  )
}

export default Input;