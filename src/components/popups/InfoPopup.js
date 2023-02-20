import React from 'react';
import '../../css/Popup.css';
import Popup from '../Popup';

export default function InfoPopup(props) {
    const hideAlert = () => {
        props.setIsInfoVisible(false);
    };

    return (
        <div className='alert' style={{ display: props.isInfoVisible ? 'flex' : 'none' }}>
            <Popup
                title='This is a 3x3x3 Rubik`s Cube'
                text={[
                    'You can rotate the cube by dragging the mouse or you can use your keyboard (x, y, z). Difference is that by rotating cube with your mouse you only change where are you looking on the cube from. If you want to "regrip" the cube, you have to use keys. If you want to rotate the cube in a specific direction, you have to use your keyboard and it follows basic Rubik`s cube notation',
                    '(f - front, b - back, u - up, d - down, l - left, r - right, m - middle, e - equator, s - standing). That rotates sides clockwise. If you want to rotate cube in opposite direction, you can use capslock.',
                    'Buttons on the bottom of the page are colored to make it easier for you to remember which side is which.',
                    'If you make a mistake and you want to recount your progress, click on the hint box.',
                ]}
                clicked={() => hideAlert()}
            />
        </div>
    );
}
