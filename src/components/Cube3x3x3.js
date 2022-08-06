import React, { useState } from 'react';
import CenterPiece from './CenterPiece';
import EdgePiece from './EdgePiece';
import CornerPiece from './CornerPiece';

export default function Cube3x3x3() {
    ////////////////////////////////////////////////////////////////
    //                                                            //
    // f = front, b = back, u = up, d = down, l = left, r = right //
    //                                                            //
    ////////////////////////////////////////////////////////////////

    // f b u d l r
    const [centerPiecesColors, setCenterPiecesColors] = useState(['#0f0', '#00f', '#fff', '#ff0', '#f90', '#f00']);
    const [centerPiecesPositions, setCenterPiecesPositions] = useState([[0, 0, 1.5], [0, 0, -1.5], [0, 1.5, 0], [0, -1.5, 0], [1.5, 0, 0], [-1.5, 0, 0]]);
    const [centerPiecesRotations, setCenterPiecesRotations] = useState([[0, Math.PI / 2, 0], [0, Math.PI / 2, 0], [0, 0, Math.PI / 2], [0, 0, Math.PI / 2], [0, 0, 0], [0, 0, 0]]);

    // ru lu rd ld
    // rf lf rb lb
    // fu bu fd bd
    const [edgePiecesColors, setEdgePiecesColors] = useState([
        ['#f90', '#fff'], ['#f00', '#fff'], ['#f90', '#ff0'], ['#f00', '#ff0'],
        ['#f90', '#0f0'], ['#f00', '#0f0'], ['#f90', '#00f'], ['#f00', '#00f'],
        ['#0f0', '#fff'], ['#00f', '#fff'], ['#0f0', '#ff0'], ['#00f', '#ff0']]);
    const [edgePiecesPositions, setEdgePiecesPositions] = useState([
        [[1.5, 1, 0], [1, 1.5, 0]], [[-1.5, 1, 0], [-1, 1.5, 0]], [[1.5, -1, 0], [1, -1.5, 0]], [[-1.5, -1, 0], [-1, -1.5, 0]],
        [[1.5, 0, 1], [1, 0, 1.5]], [[-1.5, 0, 1], [-1, 0, 1.5]], [[1.5, 0, -1], [1, 0, -1.5]], [[-1.5, 0, -1], [-1, 0, -1.5]],
        [[0, 1, 1.5], [0, 1.5, 1]], [[0, 1, -1.5], [0, 1.5, -1]], [[0, -1, 1.5], [0, -1.5, 1]], [[0, -1, -1.5], [0, -1.5, -1]]]);
    const [edgePiecesRotations, setEdgePiecesRotations] = useState([
        [[0, 0, 0], [0, 0, Math.PI / 2]], [[0, 0, 0], [0, 0, Math.PI / 2]], [[0, 0, 0], [0, 0, Math.PI / 2]], [[0, 0, 0], [0, 0, Math.PI / 2]],
        [[0, 0, 0], [0, Math.PI / 2, 0]], [[0, 0, 0], [0, Math.PI / 2, 0]], [[0, 0, 0], [0, Math.PI / 2, 0]], [[0, 0, 0], [0, Math.PI / 2, 0]],
        [[0, Math.PI / 2, 0], [0, 0, Math.PI / 2]], [[0, Math.PI / 2, 0], [0, 0, Math.PI / 2]], [[0, Math.PI / 2, 0], [0, 0, Math.PI / 2]], [[0, Math.PI / 2, 0], [0, 0, Math.PI / 2]]]);


    // rfu lfu rfd lfd
    // rbu lbu rbd lbd
    const [cornerPiecesColors, setCornerPiecesColors] = useState([
        ['#f90', '#0f0', '#fff'], ['#f00', '#0f0', '#fff'], ['#f90', '#0f0', '#ff0'], ['#f00', '#0f0', '#ff0'],
        ['#f90', '#00f', '#fff'], ['#f00', '#00f', '#fff'], ['#f90', '#00f', '#ff0'], ['#f00', '#00f', '#ff0']]);
    const [cornerPiecesPositions, setCornerPiecesPositions] = useState([
        [[1.5, 1, 1], [1, 1, 1.5], [1, 1.5, 1]], [[-1.5, 1, 1], [-1, 1, 1.5], [-1, 1.5, 1]], [[1.5, -1, 1], [1, -1, 1.5], [1, -1.5, 1]], [[-1.5, -1, 1], [-1, -1, 1.5], [-1, -1.5, 1]],
        [[1.5, 1, -1], [1, 1, -1.5], [1, 1.5, -1]], [[-1.5, 1, -1], [-1, 1, -1.5], [-1, 1.5, -1]], [[1.5, -1, -1], [1, -1, -1.5], [1, -1.5, -1]], [[-1.5, -1, -1], [-1, -1, -1.5], [-1, -1.5, -1]]]);
    const [cornerPiecesRotations, setCornerPiecesRotations] = useState([
        [[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
        [[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]]]);


    const renderCenterPieces = () => {
        return centerPiecesColors.map((color, index) => {
            return <CenterPiece
                key={index}
                color={color}
                position={centerPiecesPositions[index]}
                rotation={centerPiecesRotations[index]} />
        });
    }

    const renderEdgePieces = () => {
        return edgePiecesColors.map((color, index) => {
            return <EdgePiece
                key={index}
                color1={color[0]}
                color2={color[1]}
                position1={edgePiecesPositions[index][0]}
                position2={edgePiecesPositions[index][1]}
                rotation1={edgePiecesRotations[index][0]}
                rotation2={edgePiecesRotations[index][1]} />
        });
    }

    const renderCornerPieces = () => {
        return cornerPiecesColors.map((color, index) => {
            console.log(cornerPiecesRotations[index]);
            return <CornerPiece
                key={index}
                color1={color[0]}
                color2={color[1]}
                color3={color[2]}
                position1={cornerPiecesPositions[index][0]}
                position2={cornerPiecesPositions[index][1]}
                position3={cornerPiecesPositions[index][2]}
                rotation1={cornerPiecesRotations[index][0]}
                rotation2={cornerPiecesRotations[index][1]}
                rotation3={cornerPiecesRotations[index][2]} />
        });
    }
    return (
        <>
            {renderCenterPieces()}
            {renderEdgePieces()}
            {renderCornerPieces()}
        </>
    )
}
