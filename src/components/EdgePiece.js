import React from 'react'
import PieceSide from './PieceSide';

export default function (props) {
    return (
        <>
            <PieceSide color={props.color} position={props.position1} rotation={props.rotation1} />
            <PieceSide color={props.color} position={props.position2} rotation={props.rotation2} />
        </>
    )
}
