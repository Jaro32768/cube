import React from 'react';
import './App.css';
import Cube3x3x3 from './components/Cube3x3x3';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function App() {
  return (
    <>
      <Canvas className='canvas'>
        <OrbitControls enableZoom={false} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[-2, 0, 2]} intensity={1} />
        <Cube3x3x3></Cube3x3x3>
      </Canvas>
    </>
  );
}

export default App;
