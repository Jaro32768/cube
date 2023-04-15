import React, { useState, useEffect } from 'react';
import './css/App.css';
import Cube3x3x3 from './components/Cube3x3x3';
import Settings from './components/Settings';
import InfoPopup from './components/popups/InfoPopup';
import SolvedPopup from './components/popups/SolvedPopup';
import LoginForm from './components/LoginForm';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isInfoVisible, setIsInfoVisible] = useState(false);
    const [isSolvedVisible, setIsSolvedVisible] = useState(false);
    const [areSettingsVisible, setAreSettingsVisible] = useState(false);
    const [language, setLanguage] = useState('english');

    const logoutClicked = () => {
        firebase.auth().signOut();
        setIsLoggedIn(false);
    };

    const showInfo = () => setIsInfoVisible(true);

    const showSolved = () => setIsSolvedVisible(true);

    const resetCube = () => {
        setIsLoggedIn(false);
        setTimeout(() => {
            setIsLoggedIn(true);
        }, 1);
    };

    const showSettings = () => {
        setAreSettingsVisible(true);
    };

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            setIsLoggedIn(!!user);
        });
    }, []);
    if (!isLoggedIn) return <LoginForm setIsLoggedIn={setIsLoggedIn} />;

    if (areSettingsVisible) return <Settings areSettingsVisible={areSettingsVisible} setAreSettingsVisible={setAreSettingsVisible} setLanguage={setLanguage} />;

    return (
        <div className='canvas-container'>
            <Cube3x3x3 resetCube={resetCube} showSolved={showSolved} showSettings={showSettings} />

            <button className='logout-btn' onClick={logoutClicked}>
                Logout
            </button>
            <button className='info-btn' onClick={showInfo}>
                i
            </button>
            <InfoPopup isInfoVisible={isInfoVisible} setIsInfoVisible={setIsInfoVisible} />
            <SolvedPopup isSolvedVisible={isSolvedVisible} setIsSolvedVisible={setIsSolvedVisible} />
        </div>
    );
}

export default App;
