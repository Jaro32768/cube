import React from 'react';

export default function CubePiece(props) {
    return (
        <mesh rotation={[0, 0, 0]} position={props.position}>
            <boxBufferGeometry attach='geometry' args={[1, 1, 1]} />
            <meshLambertMaterial attach='material' color={props.color} />
        </mesh>
    )
}
