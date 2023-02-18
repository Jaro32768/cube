import React from 'react';
import PieceSide from './PieceSide';

export default function CornerPiece(props) {
    return (
        <>
            <PieceSide color={props.color1} position={props.position1} rotation={props.rotation1} />
            <PieceSide color={props.color2} position={props.position2} rotation={props.rotation2} />
            <PieceSide color={props.color3} position={props.position3} rotation={props.rotation3} />
        </>
    );
}
