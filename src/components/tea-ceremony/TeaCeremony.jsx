import React, {useContext, useEffect} from 'react';
import { TEContext } from '../TEContext.js';

const TeaCeremony = ( { children } ) => {
  const te = useContext(TEContext);

  useEffect(() => {
    te.run();
    return () => {
      te.stop();
    };
  }
  , [te]);

  return (
    <div>
      {children}
    </div>
  );
};

export default TeaCeremony;