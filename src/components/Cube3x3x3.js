import React from 'react';
import CenterPiece from './CenterPiece';
import EdgePiece from './EdgePiece';
import CornerPiece from './CornerPiece';

export default function Cube3x3x3() {
    return (
        <>
            <CenterPiece position={[0, 0, 1.5]} rotation={[0, Math.PI / 2, 0]} />
            <CenterPiece position={[0, 0, -1.5]} rotation={[0, Math.PI / 2, 0]} />
            <CenterPiece position={[0, 1.5, 0]} rotation={[0, 0, Math.PI / 2]} />
            <CenterPiece position={[0, -1.5, 0]} rotation={[0, 0, Math.PI / 2]} />
            <CenterPiece position={[1.5, 0, 0]} rotation={[0, 0, 0]} />
            <CenterPiece position={[-1.5, 0, 0]} rotation={[0, 0, 0]} />

            <EdgePiece position1={[1.5, 1, 0]} position2={[1, 1.5, 0]} rotation1={[0, 0, 0]} rotation2={[0, 0, Math.PI / 2]} />
            <EdgePiece position1={[-1.5, 1, 0]} position2={[-1, 1.5, 0]} rotation1={[0, 0, 0]} rotation2={[0, 0, Math.PI / 2]} />
            <EdgePiece position1={[1.5, -1, 0]} position2={[1, -1.5, 0]} rotation1={[0, 0, 0]} rotation2={[0, 0, Math.PI / 2]} />
            <EdgePiece position1={[-1.5, -1, 0]} position2={[-1, -1.5, 0]} rotation1={[0, 0, 0]} rotation2={[0, 0, Math.PI / 2]} />

            <EdgePiece position1={[1.5, 0, 1]} position2={[1, 0, 1.5]} rotation1={[0, 0, 0]} rotation2={[0, Math.PI / 2, 0]} />
            <EdgePiece position1={[-1.5, 0, 1]} position2={[-1, 0, 1.5]} rotation1={[0, 0, 0]} rotation2={[0, Math.PI / 2, 0]} />
            <EdgePiece position1={[1.5, 0, -1]} position2={[1, 0, -1.5]} rotation1={[0, 0, 0]} rotation2={[0, Math.PI / 2, 0]} />
            <EdgePiece position1={[-1.5, 0, -1]} position2={[-1, 0, -1.5]} rotation1={[0, 0, 0]} rotation2={[0, Math.PI / 2, 0]} />

            <EdgePiece position1={[0, 1, 1.5]} position2={[0, 1.5, 1]} rotation1={[0, Math.PI / 2, 0]} rotation2={[0, 0, Math.PI / 2]} />
            <EdgePiece position1={[0, 1, -1.5]} position2={[0, 1.5, -1]} rotation1={[0, Math.PI / 2, 0]} rotation2={[0, 0, Math.PI / 2]} />
            <EdgePiece position1={[0, -1, 1.5]} position2={[0, -1.5, 1]} rotation1={[0, Math.PI / 2, 0]} rotation2={[0, 0, Math.PI / 2]} />
            <EdgePiece position1={[0, -1, -1.5]} position2={[0, -1.5, -1]} rotation1={[0, Math.PI / 2, 0]} rotation2={[0, 0, Math.PI / 2]} />

            <CornerPiece position1={[1.5, 1, 1]} position2={[1, 1, 1.5]} position3={[1, 1.5, 1]} />
            <CornerPiece position1={[-1.5, 1, 1]} position2={[-1, 1, 1.5]} position3={[-1, 1.5, 1]} />
            <CornerPiece position1={[1.5, -1, 1]} position2={[1, -1, 1.5]} position3={[1, -1.5, 1]} />
            <CornerPiece position1={[-1.5, -1, 1]} position2={[-1, -1, 1.5]} position3={[-1, -1.5, 1]} />

            <CornerPiece position1={[1.5, 1, -1]} position2={[1, 1, -1.5]} position3={[1, 1.5, -1]} />
            <CornerPiece position1={[-1.5, 1, -1]} position2={[-1, 1, -1.5]} position3={[-1, 1.5, -1]} />
            <CornerPiece position1={[1.5, -1, -1]} position2={[1, -1, -1.5]} position3={[1, -1.5, -1]} />
            <CornerPiece position1={[-1.5, -1, -1]} position2={[-1, -1, -1.5]} position3={[-1, -1.5, -1]} />
        </>
    )
}
