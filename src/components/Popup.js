import React from 'react';
import '../css/Popup.css';

export default function Popup(props) {
    return (
        <div className='alert-content'>
            <div className='alert-title'>{props.title}</div>
            <div className='alert-text'>
                {props.text.map((text) => {
                    return (
                        <div key={text}>
                            <p>{text}</p>
                            <br />
                        </div>
                    );
                })}
            </div>
            <div className='alert-buttons'>
                <button className='alert-button' onClick={() => props.clicked()}>
                    {props.language === 'english' ? 'Got it!' : 'Rozumiem!'}
                </button>
            </div>
        </div>
    );
}
