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
            <form>
                <label>
                    Email:
                    <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label>
                    Password:
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                {error && <p>{error.message}</p>}
                <button type='button' onClick={handleLogin}>
                    Login
                </button>
                <button type='button' onClick={handleSignUp}>
                    Sign Up
                </button>
            </form>
            <button type='button' onClick={() => props.setIsLoggedIn(true)}>
                Continue without logging in
            </button>
        </>
    );
}
