import React, { useState } from 'react';
import '../css/LoginForm.css';
import firebaseConfig from '../data/firebaseConfig.json';
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
            <form className='login-form'>
                <label className='login-label'>
                    Email:
                    <input className='login-input' type='email' autoComplete='username' value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label className='login-label'>
                    {props.language === 'english' ? 'Password:' : 'Heslo:'}
                    <input
                        className='login-input'
                        type='password'
                        autoComplete='current-password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                {error && <p className='login-error'>{error.message}</p>}
                <button className='login-button' type='button' onClick={handleLogin}>
                    {props.language === 'english' ? 'Login' : 'Prihlásiť sa'}
                </button>
                <button className='login-button' type='button' onClick={handleSignUp}>
                    {props.language === 'english' ? 'Sign up' : 'Registrovať sa'}
                </button>
                <button className='login-button secondary' type='button' onClick={() => props.setIsLoggedIn(true)}>
                    {props.language === 'english' ? 'Continue as a guest' : 'Pokračovať ako hosť'}
                </button>
            </form>
        </>
    );
}
