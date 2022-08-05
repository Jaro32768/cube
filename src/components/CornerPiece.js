import React from 'react'
import PieceSide from './PieceSide';

export default function CornerPiece(props) {
    return (
        <>
            <PieceSide color={props.color} position={props.position1} rotation={[Math.PI / 2, 0, 0]} />
            <PieceSide color={props.color} position={props.position2} rotation={[0, Math.PI / 2, 0]} />
            <PieceSide color={props.color} position={props.position3} rotation={[0, 0, Math.PI / 2]} />
        </>
    )
}
