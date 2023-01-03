import React, { useState, useEffect } from 'react';
import './css/App.css';
import Cube3x3x3 from './components/Cube3x3x3';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import LoginForm from './components/LoginForm';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const logoutClicked = () => {
        firebase.auth().signOut();
        setIsLoggedIn(false);
    };

    const infoClicked = () => {
        alert(
            'This is a 3x3x3 Rubik\'s Cube. You can rotate the cube by dragging the mouse or you can use your keyboard (x, y, z). Difference is that by rotating cube with your mouse you only change where are you looking from on the cube, if you want to "regrip" the cube, you have to use keys. If you want to rotate the cube in a specific direction, you have to use your keyboard and it follows basic Rubik\'s cube notation (f - front, b - back, u - up, d - down, l - left, r - right, m - middle, e - equator, s - standing). That rotates sides clockwise. If you want to rotate cube in opposite direction, you can use capslock.'
        );
    };

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            setIsLoggedIn(!!user);
        });
    }, []);
    if (!isLoggedIn) {
        return <LoginForm setIsLoggedIn={setIsLoggedIn} />;
    }
    return (
        <div className='canvas-container'>
            <Canvas className='canvas'>
                <OrbitControls enableZoom={false} enableDamping={false} enablePan={false} />
                <ambientLight intensity={0.5} />
                <Cube3x3x3 />
            </Canvas>

            <button className='logout-btn' onClick={logoutClicked}>
                Logout
            </button>
            <button className='info-btn' onClick={infoClicked}>
                i
            </button>
        </div>
    );
}

export default App;
