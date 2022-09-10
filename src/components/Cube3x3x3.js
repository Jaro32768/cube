import React, { useState, useEffect } from 'react';
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
    const [centerPiecesColors, setCenterPiecesColors] = useState(['#0f0', '#00f', '#fff', '#ff0', '#f00', '#f90']);
    const [centerPiecesPositions, setCenterPiecesPositions] = useState([[0, 0, 1.5], [0, 0, -1.5], [0, 1.5, 0], [0, -1.5, 0], [1.5, 0, 0], [-1.5, 0, 0]]);
    const [centerPiecesRotations, setCenterPiecesRotations] = useState([[0, Math.PI / 2, 0], [0, Math.PI / 2, 0], [0, 0, Math.PI / 2], [0, 0, Math.PI / 2], [0, 0, 0], [0, 0, 0]]);

    // ru lu rd ld
    // rf lf rb lb
    // fu bu fd bd
    const [edgePiecesColors, setEdgePiecesColors] = useState([
        ['#f00', '#fff'], ['#f90', '#fff'], ['#f00', '#ff0'], ['#f90', '#ff0'],
        ['#f00', '#0f0'], ['#f90', '#0f0'], ['#f00', '#00f'], ['#f90', '#00f'],
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
        ['#f00', '#0f0', '#fff'], ['#f90', '#0f0', '#fff'], ['#f00', '#0f0', '#ff0'], ['#f90', '#0f0', '#ff0'],
        ['#f00', '#00f', '#fff'], ['#f90', '#00f', '#fff'], ['#f00', '#00f', '#ff0'], ['#f90', '#00f', '#ff0']]);
    const [cornerPiecesPositions, setCornerPiecesPositions] = useState([
        [[1.5, 1, 1], [1, 1, 1.5], [1, 1.5, 1]], [[-1.5, 1, 1], [-1, 1, 1.5], [-1, 1.5, 1]], [[1.5, -1, 1], [1, -1, 1.5], [1, -1.5, 1]], [[-1.5, -1, 1], [-1, -1, 1.5], [-1, -1.5, 1]],
        [[1.5, 1, -1], [1, 1, -1.5], [1, 1.5, -1]], [[-1.5, 1, -1], [-1, 1, -1.5], [-1, 1.5, -1]], [[1.5, -1, -1], [1, -1, -1.5], [1, -1.5, -1]], [[-1.5, -1, -1], [-1, -1, -1.5], [-1, -1.5, -1]]]);
    const [cornerPiecesRotations, setCornerPiecesRotations] = useState([
        [[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
        [[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]]]);

    // f b u d l r

    const sides = {
        'f': {
            centers: {          // [0],
                positions: [0, 0, 1.5],
                rotations: [0, Math.PI / 2, 0]
            },
            edges: {            // [4, 5, 8, 10],
                positions: [[[1.5, 0, 1], [1, 0, 1.5]], [[-1.5, 0, 1], [-1, 0, 1.5]], [[0, 1, 1.5], [0, 1.5, 1]], [[0, -1, 1.5], [0, -1.5, 1]]],
                rotations: [[[0, 0, 0], [0, Math.PI / 2, 0]], [[0, 0, 0], [0, Math.PI / 2, 0]], [[0, Math.PI / 2, 0], [0, 0, Math.PI / 2]], [[0, Math.PI / 2, 0], [0, 0, Math.PI / 2]]]
            },
            corners: {          // [0, 1, 2, 3]
                positions: [[[1.5, 1, 1], [1, 1, 1.5], [1, 1.5, 1]], [[-1.5, 1, 1], [-1, 1, 1.5], [-1, 1.5, 1]], [[1.5, -1, 1], [1, -1, 1.5], [1, -1.5, 1]], [[-1.5, -1, 1], [-1, -1, 1.5], [-1, -1.5, 1]]],
                rotations: [[[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]]]
            }
        },
        'b': {
            centers: {          // [1],
                positions: [0, 0, -1.5],
                rotations: [0, Math.PI / 2, 0]
            },
            edges: {            // [6, 7, 9, 11],
                positions: [[[1.5, 0, -1], [1, 0, -1.5]], [[-1.5, 0, -1], [-1, 0, -1.5]], [[0, 1, -1.5], [0, 1.5, -1]], [[0, -1, -1.5], [0, -1.5, -1]]],
                rotations: [[[0, 0, 0], [0, Math.PI / 2, 0]], [[0, 0, 0], [0, Math.PI / 2, 0]], [[0, Math.PI / 2, 0], [0, 0, Math.PI / 2]], [[0, Math.PI / 2, 0], [0, 0, Math.PI / 2]]]
            },
            corners: {          // [4, 5, 6, 7]
                positions: [[[1.5, 1, -1], [1, 1, -1.5], [1, 1.5, -1]], [[-1.5, 1, -1], [-1, 1, -1.5], [-1, 1.5, -1]], [[1.5, -1, -1], [1, -1, -1.5], [1, -1.5, -1]], [[-1.5, -1, -1], [-1, -1, -1.5], [-1, -1.5, -1]]],
                rotations: [[[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]]]
            }
        },
        'u': {
            centers: {          // [2],
                positions: [0, 1.5, 0],
                rotations: [0, 0, Math.PI / 2]
            },
            edges: {            // [0, 1, 8, 9],
                positions: [[[1.5, 1, 0], [1, 1.5, 0]], [[-1.5, 1, 0], [-1, 1.5, 0]], [[0, 1, 1.5], [0, 1.5, 1]], [[0, 1, -1.5], [0, 1.5, -1]]],
                rotations: [[[0, 0, 0], [0, 0, Math.PI / 2]], [[0, 0, 0], [0, 0, Math.PI / 2]], [[0, 0, Math.PI / 2], [0, 0, 0]], [[0, 0, Math.PI / 2], [0, 0, 0]]]
            },
            corners: {          // [0, 1, 4, 5]
                positions: [[[1.5, 1, 1], [1.5, 1, -1], [1, 1.5, 1]], [[-1.5, 1, 1], [-1.5, 1, -1], [-1, 1.5, 1]], [[1.5, 1, 1], [1.5, 1, -1], [1, 1.5, -1]], [[-1.5, 1, 1], [-1.5, 1, -1], [-1, 1.5, -1]]],
                rotations: [[[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]]]
            }
        },
        'd': {
            centers: {          // [3],
                positions: [0, -1.5, 0],
                rotations: [0, 0, Math.PI / 2]
            },
            edges: {            // [2, 3, 10, 11],
                positions: [[[1.5, -1, 0], [1, -1.5, 0]], [[-1.5, -1, 0], [-1, -1.5, 0]], [[0, -1, 1.5], [0, -1.5, 1]], [[0, -1, -1.5], [0, -1.5, -1]]],
                rotations: [[[0, 0, 0], [0, 0, Math.PI / 2]], [[0, 0, 0], [0, 0, Math.PI / 2]], [[0, 0, Math.PI / 2], [0, 0, 0]], [[0, 0, Math.PI / 2], [0, 0, 0]]]
            },
            corners: {          // [2, 3, 6, 7]
                positions: [[[1.5, -1, 1], [1.5, -1, -1], [1, -1.5, 1]], [[-1.5, -1, 1], [-1.5, -1, -1], [-1, -1.5, 1]], [[1.5, -1, 1], [1.5, -1, -1], [1, -1.5, -1]], [[-1.5, -1, 1], [-1.5, -1, -1], [-1, -1.5, -1]]],
                rotations: [[[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]]]
            }
        },
        'l': {
            centers: {          // [4],
                positions: [1.5, 0, 0],
                rotations: [0, 0, 0]
            },
            edges: {            // [1, 3, 5, 7],
                positions: [[[1, 1.5, 0], [1.5, 1, 0]], [[1, -1.5, 0], [1.5, -1, 0]], [[-1.5, 0, 1], [-1, 0, 1.5]], [[-1.5, 0, -1], [-1, 0, -1.5]]],
                rotations: [[[0, 0, 0], [0, 0, Math.PI / 2]], [[0, 0, 0], [0, 0, Math.PI / 2]], [[0, 0, 0], [0, Math.PI / 2, 0]], [[0, 0, 0], [0, Math.PI / 2, 0]]]
            },
            corners: {          // [1, 3, 5, 7]
                positions: [[[-1.5, 1, 0], [-1, 1.5, 0]], [[-1.5, -1, 0], [-1, -1.5, 0]], [[-1.5, 0, 1], [-1, 0, 1.5]], [[-1.5, 0, -1], [-1, 0, -1.5]]],
                rotations: [[[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]]]
            }
        },
        'r': {
            centers: {          // [5],
                positions: [-1.5, 0, 0],
                rotations: [0, 0, 0]
            },
            edges: {            // [0, 2, 4, 6],
                positions: [[[1.5, 1, 0], [1, 1.5, 0]], [[1.5, -1, 0], [1, -1.5, 0]], [[1.5, 0, 1], [1, 0, 1.5]], [[1.5, 0, -1], [1, 0, -1.5]]],
                rotations: [[[0, 0, 0], [0, 0, Math.PI / 2]], [[0, 0, 0], [0, 0, Math.PI / 2]], [[0, 0, 0], [0, Math.PI / 2, 0]], [[0, 0, 0], [0, Math.PI / 2, 0]]]
            },
            corners: {          // [0, 2, 4, 6]
                positions: [[[1.5, 1, 1], [1, 1, 1.5], [1, 1.5, 1]], [[1.5, -1, 1], [1, -1, 1.5], [1, -1.5, 1]], [[1.5, 1, -1], [1, 1, -1.5], [1, 1.5, -1]], [[1.5, -1, -1], [1, -1, -1.5], [1, -1.5, -1]]],
                rotations: [[[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]]]
            }
        },
        'm': {
            centers: {          // [0, 1, 2, 3],
                positions: [[0, 0, 1.5], [0, 0, -1.5], [0, 1.5, 0], [0, -1.5, 0]],
                rotations: [[0, Math.PI / 2, 0], [0, Math.PI / 2, 0], [0, 0, Math.PI / 2], [0, 0, Math.PI / 2]]
            },
            edges: {            // [8, 9, 10, 11],
                positions: [[[0, 1, 1.5], [0, 1.5, 1]], [[0, 1, -1.5], [0, 1.5, -1]], [[0, -1, 1.5], [0, -1.5, 1]], [[0, -1, -1.5], [0, -1.5, -1]]],
                rotations: [[[0, Math.PI / 2, 0], [0, 0, Math.PI / 2]], [[0, Math.PI / 2, 0], [0, 0, Math.PI / 2]], [[0, Math.PI / 2, 0], [0, 0, Math.PI / 2]], [[0, Math.PI / 2, 0], [0, 0, Math.PI / 2]]]
            },
            corners: {          // []
                positions: [],
                rotations: []
            }
        },
        'e': {
            centers: {          // [0, 1, 4, 5],
                positions: [[0, 0, 1.5], [0, 0, -1.5], [1.5, 0, 0], [-1.5, 0, 0]],
                rotations: [[0, Math.PI / 2, 0], [0, Math.PI / 2, 0], [0, 0, 0], [0, 0, 0]]
            },
            edges: {            // [4, 5, 6, 7],
                positions: [[[1.5, 0, 1], [1, 0, 1.5]], [[-1.5, 0, 1], [-1, 0, 1.5]], [[1.5, 0, -1], [1, 0, -1.5]], [[-1.5, 0, -1], [-1, 0, -1.5]]],
                rotations: [[[0, 0, 0], [0, Math.PI / 2, 0]], [[0, 0, 0], [0, Math.PI / 2, 0]], [[0, 0, 0], [0, Math.PI / 2, 0]], [[0, 0, 0], [0, Math.PI / 2, 0]],]
            },
            corners: {          // []
                positions: [],
                rotations: []
            }
        },
        's': {
            centers: {          // [2, 3, 4, 5],
                positions: [[0, 1.5, 0], [0, -1.5, 0], [1.5, 0, 0], [-1.5, 0, 0]],
                rotations: [[0, 1.5, 0], [0, -1.5, 0], [0, 0, 0], [0, 0, 0]]
            },
            edges: {            // [0, 1, 2, 3],
                positions: [[[1.5, 1, 0], [1, 1.5, 0]], [[-1.5, 1, 0], [-1, 1.5, 0]], [[1.5, -1, 0], [1, -1.5, 0]], [[-1.5, -1, 0], [-1, -1.5, 0]]],
                rotations: [[[0, 0, 0], [0, 0, Math.PI / 2]], [[0, 0, 0], [0, 0, Math.PI / 2]], [[0, 0, 0], [0, 0, Math.PI / 2]], [[0, 0, 0], [0, 0, Math.PI / 2]]]
            },
            corners: {          // []
                positions: [],
                rotations: []
            }
        }
    }

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
    const rotateSide = (side) => {
        let newCenterPiecesPositions = [...centerPiecesPositions];
        let newEdgePiecesPositions = [...edgePiecesPositions];
        let newCornerPiecesPositions = [...cornerPiecesPositions];
        let newCenterPiecesRotations = [...centerPiecesRotations];
        let newEdgePiecesRotations = [...edgePiecesRotations];
        let newCornerPiecesRotations = [...cornerPiecesRotations];

        // f b u d l r
        switch (side) {
            case 'f':
                {
                    break;
                }
            case 'b':
                {
                    break;
                }
            case 'u':
                {
                    break;
                }
            case 'd':
                {
                    break;
                }
            case 'l':
                {
                    break;
                }
            case 'r':
                {
                    break;
                }
        }
    }

    useEffect(() => {
        rotateSide('f'); // f = front, b = back, u = up, d = down, l = left, r = right, m = middle, e = equator , s = standing
    }, []);

    return (
        <>
            {renderCenterPieces()}
            {renderEdgePieces()}
            {renderCornerPieces()}
        </>
    )
}




/*
---- u ----
centerPiecesPositions[2][1]
edgePiecesPositions[0][0][1]
edgePiecesPositions[0][1][1]
edgePiecesPositions[1][0][1]
edgePiecesPositions[1][1][1]
edgePiecesPositions[8][0][1]
edgePiecesPositions[8][1][1]
edgePiecesPositions[9][0][1]
edgePiecesPositions[9][1][1]

*/