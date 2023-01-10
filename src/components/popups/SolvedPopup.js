import React from 'react';
import Popup from '../Popup';

export default function SolvedPopup(props) {
    const hideAlert = () => {
        props.setIsSolvedVisible(false);
    };

    return (
        <div className='alert' style={{ display: props.isSolvedVisible ? 'flex' : 'none' }}>
            <Popup title='Congratulation!' text='You have solved the cube' clicked={() => hideAlert()} />
        </div>
    );
}
