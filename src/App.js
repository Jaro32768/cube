import React, { useState, useEffect } from 'react';
import './css/App.css';
import Cube3x3x3 from './components/Cube3x3x3';
import InfoPopup from './components/popups/InfoPopup';
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

    const resetCube = () => {
        setIsLoggedIn(false);
        setTimeout(() => {
            setIsLoggedIn(true);
        }, 1);
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
            <Cube3x3x3 resetCube={resetCube} />

            <button className='logout-btn' onClick={logoutClicked}>
                Logout
            </button>
            <button className='info-btn' onClick={showInfo}>
                i
            </button>
            <InfoPopup isInfoVisible={isInfoVisible} setIsInfoVisible={setIsInfoVisible} />
        </div>
    );
}

export default App;
