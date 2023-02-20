import React from 'react';
import '../css/Popup.css';

export default function Popup(props) {
    const hideAlert = () => {
        props.setIsInfoVisible(false);
    };

    return (
        <div className='alert-content'>
            <div className='alert-title'>{props.title}</div>
            <div className='alert-text'>
                {props.text.map((text) => {
                    {
                        return (
                            <>
                                <p>{text}</p>
                                <br />
                            </>
                        );
                    }
                })}
            </div>
            <div className='alert-buttons'>
                <button className='alert-button' onClick={() => props.clicked()}>
                    Got it!
                </button>
            </div>
        </div>
    );
}
