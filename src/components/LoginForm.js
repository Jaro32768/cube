import React, { useRef } from 'react';
import '../css/LoginForm.css';

export default function LoginForm() {
    const login = useRef(null);
    const password = useRef(null);

    const users = [
        ['aaa', 'aaa'],
        ['bbb', 'bbb'],
        ['ccc', 'ccc'],
    ];

    const onClick = (e) => {
        e.preventDefault();
        let loggedIn = false;
        users.forEach((user) => {
            if (user[0] === login.current.value && user[1] === password.current.value) {
                console.log('logged in!');
                loggedIn += 1;
            }
        });
        if (!loggedIn) console.log('incorrect login or password');
    };
    return (
        <>
            <form>
                <div className='form-child'>
                    <p>LOGIN</p>
                    <input ref={login} placeholder='login' />
                </div>
                <div className='form-child'>
                    <p>PASSWORD</p>
                    <input ref={password} type='password' placeholder='password' />
                </div>
                <div className='form-child'>
                    <button onClick={onClick}>LOGIN</button>
                </div>
            </form>
        </>
    );
}
