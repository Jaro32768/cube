import React from 'react';
import PieceSide from './PieceSide';

export default function CornerPiece(props) {
    return (
        <>
            <PieceSide color={props.color1} position={props.position1} rotation={props.rotation1} /> {/* [Math.PI / 2, 0, 0] */}
            <PieceSide color={props.color2} position={props.position2} rotation={props.rotation2} /> {/* [0, Math.PI / 2, 0] */}
            <PieceSide color={props.color3} position={props.position3} rotation={props.rotation3} /> {/* [0, 0, Math.PI / 2] */}
        </>
    );
}
