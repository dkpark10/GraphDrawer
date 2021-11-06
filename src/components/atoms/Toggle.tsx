import React from "react";

interface ToggleProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const Toggle = ({ onChange }: ToggleProps) => {

  return (
    <>
      <label className='direct-button'>
        <input type='checkbox' onChange={onChange}/>
        <span className='onoff-switch' />
      </label>
    </>
  )
}

export default Toggle;