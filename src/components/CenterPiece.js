import React from 'react'
import PieceSide from './PieceSide';

export default function CenterPiece(props) {
    return (
        <PieceSide color={props.color} position={props.position} rotation={props.rotation} />
    )
}
