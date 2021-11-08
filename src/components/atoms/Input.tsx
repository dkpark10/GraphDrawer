interface InputProps {
  text: string;
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  width?: string;
}

const Input = ({ text, name, onChange, value }: InputProps) => {

  return (
    <>
      <label style={{ fontSize: '13px' }}> {text} </label>
      <input type='text' name={name} onChange={onChange} value={value} style={{ width: '40px', height: '25px' }}>
      </input>
    </>
  )
}

export default Input;