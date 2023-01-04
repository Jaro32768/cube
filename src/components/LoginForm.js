import React, { useState } from 'react';
import '../css/LoginForm.css';
import firebaseConfig from '../firebaseConfig.json';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

firebase.initializeApp(firebaseConfig);

export default function LoginForm(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch((error) => setError(error));
    };

    const handleSignUp = () => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .catch((error) => setError(error));
    };
    return (
        <>
            <form class='login-form'>
                <label class='login-label'>
                    Email:
                    <input class='login-input' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label class='login-label'>
                    Password:
                    <input class='login-input' type='current-password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                {error && <p class='login-error'>{error.message}</p>}
                <button class='login-button' type='button' onClick={handleLogin}>
                    Login
                </button>
                <button class='login-button' type='button' onClick={handleSignUp}>
                    Sign Up
                </button>
                <button class='login-button secondary' type='button' onClick={() => props.setIsLoggedIn(true)}>
                    Continue as a guest
                </button>
            </form>
        </>
    );
}
