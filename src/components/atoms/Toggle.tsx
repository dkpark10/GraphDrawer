import React from "react";

interface ToggleProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const Toggle = ({ onChange }: ToggleProps) => {

  return (
    <>
      <label className='direct-button' htmlFor='direction'>
        <input type='checkbox' onChange={onChange} id='direction' />
        <span className='onoff-switch' />
      </label>
    </>
  )
}

export default Toggle;