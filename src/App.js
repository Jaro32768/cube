import React from 'react';
import './css/App.css';
import Cube3x3x3 from './components/Cube3x3x3';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function App() {
  return (
    <div className='canvas-container'>
      <Canvas className='canvas'>
        <OrbitControls enableZoom={false} enableDamping={false} enablePan={false} />
        <ambientLight intensity={0.5} />
        <Cube3x3x3></Cube3x3x3>
      </Canvas>
    </div>
  );
}

export default App;
