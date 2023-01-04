import React, { useState, useEffect } from 'react';
import './css/App.css';
import Cube3x3x3 from './components/Cube3x3x3';
import InfoPopup from './components/popups/InfoPopup';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import LoginForm from './components/LoginForm';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isInfoVisible, setIsInfoVisible] = useState(false);

    const logoutClicked = () => {
        firebase.auth().signOut();
        setIsLoggedIn(false);
    };

    const showInfo = () => {
        setIsInfoVisible(true);
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
            <div className='toolbar'>
                <button className='toolbar-btn'>F</button>
                <button className='toolbar-btn'>U</button>
                <button className='toolbar-btn'>B</button>
                <button className='toolbar-btn'>D</button>
                <button className='toolbar-btn'>R</button>
                <button className='toolbar-btn'>L</button>
                <button className='toolbar-btn'>M</button>
                <button className='toolbar-btn'>E</button>
                <button className='toolbar-btn'>S</button>
                <button className='toolbar-btn'>x</button>
                <button className='toolbar-btn'>y</button>
                <button className='toolbar-btn'>z</button>

                <button className='toolbar-btn'>F'</button>
                <button className='toolbar-btn'>U'</button>
                <button className='toolbar-btn'>B'</button>
                <button className='toolbar-btn'>D'</button>
                <button className='toolbar-btn'>R'</button>
                <button className='toolbar-btn'>L'</button>
                <button className='toolbar-btn'>M'</button>
                <button className='toolbar-btn'>E'</button>
                <button className='toolbar-btn'>S'</button>
                <button className='toolbar-btn'>x'</button>
                <button className='toolbar-btn'>y'</button>
                <button className='toolbar-btn'>z'</button>
            </div>
            <button className='info-btn' onClick={showInfo}>
                i
            </button>
            <InfoPopup isInfoVisible={isInfoVisible} setIsInfoVisible={setIsInfoVisible} />
        </div>
    );
}

export default App;
