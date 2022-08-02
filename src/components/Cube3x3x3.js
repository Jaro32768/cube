import React from 'react'

export default function Cube3x3x3() {
    return (
        <mesh rotation={[0, 0, 0]}>
            <boxBufferGeometry attach="geometry" args={[3, 3, 3]} />
            <meshLambertMaterial attach="material" color="red" />
        </mesh>
    )
}
