"use client";

import React, { useRef } from 'react';
import { VncScreen } from 'react-vnc';

function App() {
  const ref = useRef();

  return (
    <VncScreen
      url='ws://152.42.168.142:5901/'
      scaleViewport
      background="#000000"
      style={{
        width: '100vw',
        height: '100vh',
      }}
      ref={ref}
    />
  );
}

export default App;