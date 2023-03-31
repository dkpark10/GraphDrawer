import React from 'react';

interface ToggleProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export default function Toggle({ onChange }: ToggleProps) {
  return (
    <label className="direct-button" htmlFor="direction">
      <input type="checkbox" onChange={onChange} id="direction" />
      <span className="onoff-switch" />
    </label>
  );
}
