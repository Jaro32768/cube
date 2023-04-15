import React from 'react';
import Popup from '../Popup';

export default function SolvedPopup(props) {
    const hideAlert = () => {
        props.setIsSolvedVisible(false);
    };

    return (
        <div className='alert' style={{ display: props.isSolvedVisible ? 'flex' : 'none' }}>
            <Popup
                title={props.language === 'english' ? ['Congratulations!'] : ['Gratulujem!']}
                text={props.language === 'english' ? ['You have solved the cube!'] : ['Rubiková kocka bola zložená!']}
                clicked={() => hideAlert()}
                language={props.language}
            />
        </div>
    );
}
