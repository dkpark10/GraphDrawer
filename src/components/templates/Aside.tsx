import React from "react";
import Textarea from '../atoms/TextArea';
import Config from '../molecules/Config';
import { debounce, throttle } from 'lodash';

const Aside = () => {

  return (
    <>
      <aside>
        <Textarea />
        <Config />
      </aside>
    </>
  )
}

export default Aside;