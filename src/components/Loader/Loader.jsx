import React from 'react';
import { Vortex } from 'react-loader-spinner';

export default function Loader() {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50% -50%)',
      }}
    >
      <Vortex
        visible={true}
        height="60"
        width="60"
        ariaLabel="vortex-loading"
        wrapperStyle={{}}
        wrapperClass="vortex-wrapper"
        colors={['cadetblue', 'white', 'blue', 'plum', 'deepskyblue', 'purple']}
      />
    </div>
  );
}
