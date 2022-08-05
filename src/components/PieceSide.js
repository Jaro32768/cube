import React from 'react';

export default function PieceSide(props) {
    return (
        <>
            <mesh rotation={props.rotation} position={props.position}>
                <boxBufferGeometry attach='geometry' args={[.01, .99, .99]} />
                <meshLambertMaterial attach='material' color={props.color} />
            </mesh>
            <mesh rotation={props.rotation} position={props.position}>
                <boxBufferGeometry attach='geometry' args={[0, 1, 1]} />
                <meshLambertMaterial attach='material' color={'black'} />
            </mesh>
        </>
    )
}
