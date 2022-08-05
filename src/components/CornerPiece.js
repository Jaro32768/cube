import React from 'react'
import PieceSide from './PieceSide';

export default function CornerPiece(props) {
    return (
        <PieceSide color={props.color} position={[0, 0, 0]} />
    )
}
