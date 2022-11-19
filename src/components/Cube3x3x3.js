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
    const [centerPiecesPositions, setCenterPiecesPositions] = useState([
        [0, 0, 1.5],
        [0, 0, -1.5],
        [0, 1.5, 0],
        [0, -1.5, 0],
        [1.5, 0, 0],
        [-1.5, 0, 0],
    ]);
    const [centerPiecesRotations, setCenterPiecesRotations] = useState([
        [0, Math.PI / 2, 0],
        [0, Math.PI / 2, 0],
        [0, 0, Math.PI / 2],
        [0, 0, Math.PI / 2],
        [0, 0, 0],
        [0, 0, 0],
    ]);

    // ru lu rd ld
    // rf lf rb lb
    // fu bu fd bd
    const [edgePiecesColors, setEdgePiecesColors] = useState([
        ['#f00', '#fff'],
        ['#f90', '#fff'],
        ['#f00', '#ff0'],
        ['#f90', '#ff0'],
        ['#f00', '#0f0'],
        ['#f90', '#0f0'],
        ['#f00', '#00f'],
        ['#f90', '#00f'],
        ['#0f0', '#fff'],
        ['#00f', '#fff'],
        ['#0f0', '#ff0'],
        ['#00f', '#ff0'],
    ]);
    const [edgePiecesPositions, setEdgePiecesPositions] = useState([
        [
            [1.5, 1, 0],
            [1, 1.5, 0],
        ],
        [
            [-1.5, 1, 0],
            [-1, 1.5, 0],
        ],
        [
            [1.5, -1, 0],
            [1, -1.5, 0],
        ],
        [
            [-1.5, -1, 0],
            [-1, -1.5, 0],
        ],
        [
            [1.5, 0, 1],
            [1, 0, 1.5],
        ],
        [
            [-1.5, 0, 1],
            [-1, 0, 1.5],
        ],
        [
            [1.5, 0, -1],
            [1, 0, -1.5],
        ],
        [
            [-1.5, 0, -1],
            [-1, 0, -1.5],
        ],
        [
            [0, 1, 1.5],
            [0, 1.5, 1],
        ],
        [
            [0, 1, -1.5],
            [0, 1.5, -1],
        ],
        [
            [0, -1, 1.5],
            [0, -1.5, 1],
        ],
        [
            [0, -1, -1.5],
            [0, -1.5, -1],
        ],
    ]);
    const [edgePiecesRotations, setEdgePiecesRotations] = useState([
        [
            [0, 0, 0],
            [0, 0, Math.PI / 2],
        ],
        [
            [0, 0, 0],
            [0, 0, Math.PI / 2],
        ],
        [
            [0, 0, 0],
            [0, 0, Math.PI / 2],
        ],
        [
            [0, 0, 0],
            [0, 0, Math.PI / 2],
        ],
        [
            [0, 0, 0],
            [0, Math.PI / 2, 0],
        ],
        [
            [0, 0, 0],
            [0, Math.PI / 2, 0],
        ],
        [
            [0, 0, 0],
            [0, Math.PI / 2, 0],
        ],
        [
            [0, 0, 0],
            [0, Math.PI / 2, 0],
        ],
        [
            [0, Math.PI / 2, 0],
            [0, 0, Math.PI / 2],
        ],
        [
            [0, Math.PI / 2, 0],
            [0, 0, Math.PI / 2],
        ],
        [
            [0, Math.PI / 2, 0],
            [0, 0, Math.PI / 2],
        ],
        [
            [0, Math.PI / 2, 0],
            [0, 0, Math.PI / 2],
        ],
    ]);

    // rfu lfu rfd lfd
    // rbu lbu rbd lbd
    const [cornerPiecesColors, setCornerPiecesColors] = useState([
        ['#f00', '#0f0', '#fff'],
        ['#f90', '#0f0', '#fff'],
        ['#f00', '#0f0', '#ff0'],
        ['#f90', '#0f0', '#ff0'],
        ['#f00', '#00f', '#fff'],
        ['#f90', '#00f', '#fff'],
        ['#f00', '#00f', '#ff0'],
        ['#f90', '#00f', '#ff0'],
    ]);
    const [cornerPiecesPositions, setCornerPiecesPositions] = useState([
        [
            [1.5, 1, 1],
            [1, 1, 1.5],
            [1, 1.5, 1],
        ],
        [
            [-1.5, 1, 1],
            [-1, 1, 1.5],
            [-1, 1.5, 1],
        ],
        [
            [1.5, -1, 1],
            [1, -1, 1.5],
            [1, -1.5, 1],
        ],
        [
            [-1.5, -1, 1],
            [-1, -1, 1.5],
            [-1, -1.5, 1],
        ],
        [
            [1.5, 1, -1],
            [1, 1, -1.5],
            [1, 1.5, -1],
        ],
        [
            [-1.5, 1, -1],
            [-1, 1, -1.5],
            [-1, 1.5, -1],
        ],
        [
            [1.5, -1, -1],
            [1, -1, -1.5],
            [1, -1.5, -1],
        ],
        [
            [-1.5, -1, -1],
            [-1, -1, -1.5],
            [-1, -1.5, -1],
        ],
    ]);
    const [cornerPiecesRotations, setCornerPiecesRotations] = useState([
        [
            [Math.PI / 2, 0, 0],
            [0, Math.PI / 2, 0],
            [0, 0, Math.PI / 2],
        ],
        [
            [Math.PI / 2, 0, 0],
            [0, Math.PI / 2, 0],
            [0, 0, Math.PI / 2],
        ],
        [
            [Math.PI / 2, 0, 0],
            [0, Math.PI / 2, 0],
            [0, 0, Math.PI / 2],
        ],
        [
            [Math.PI / 2, 0, 0],
            [0, Math.PI / 2, 0],
            [0, 0, Math.PI / 2],
        ],
        [
            [Math.PI / 2, 0, 0],
            [0, Math.PI / 2, 0],
            [0, 0, Math.PI / 2],
        ],
        [
            [Math.PI / 2, 0, 0],
            [0, Math.PI / 2, 0],
            [0, 0, Math.PI / 2],
        ],
        [
            [Math.PI / 2, 0, 0],
            [0, Math.PI / 2, 0],
            [0, 0, Math.PI / 2],
        ],
        [
            [Math.PI / 2, 0, 0],
            [0, Math.PI / 2, 0],
            [0, 0, Math.PI / 2],
        ],
    ]);

    // f b u d l r

    const SIDES = {
        F: {
            CENTERS: {
                // [0],
                POSITIONS: [0, 0, 1.5],
                ROTATIONS: [0, Math.PI / 2, 0],
            },
            EDGES: {
                // [4, 5, 8, 10],
                POSITIONS: [
                    [
                        [1.5, 0, 1],
                        [1, 0, 1.5],
                    ],
                    [
                        [-1.5, 0, 1],
                        [-1, 0, 1.5],
                    ],
                    [
                        [0, 1, 1.5],
                        [0, 1.5, 1],
                    ],
                    [
                        [0, -1, 1.5],
                        [0, -1.5, 1],
                    ],
                ],
                ROTATIONS: [
                    [
                        [0, 0, 0],
                        [0, Math.PI / 2, 0],
                    ],
                    [
                        [0, 0, 0],
                        [0, Math.PI / 2, 0],
                    ],
                    [
                        [0, Math.PI / 2, 0],
                        [0, 0, Math.PI / 2],
                    ],
                    [
                        [0, Math.PI / 2, 0],
                        [0, 0, Math.PI / 2],
                    ],
                ],
            },
            CORNERS: {
                // [0, 1, 2, 3]
                POSITIONS: [
                    [
                        [1.5, 1, 1],
                        [1, 1, 1.5],
                        [1, 1.5, 1],
                    ],
                    [
                        [-1.5, 1, 1],
                        [-1, 1, 1.5],
                        [-1, 1.5, 1],
                    ],
                    [
                        [1.5, -1, 1],
                        [1, -1, 1.5],
                        [1, -1.5, 1],
                    ],
                    [
                        [-1.5, -1, 1],
                        [-1, -1, 1.5],
                        [-1, -1.5, 1],
                    ],
                ],
                ROTATIONS: [
                    [
                        [Math.PI / 2, 0, 0],
                        [0, Math.PI / 2, 0],
                        [0, 0, Math.PI / 2],
                    ],
                    [
                        [Math.PI / 2, 0, 0],
                        [0, Math.PI / 2, 0],
                        [0, 0, Math.PI / 2],
                    ],
                    [
                        [Math.PI / 2, 0, 0],
                        [0, Math.PI / 2, 0],
                        [0, 0, Math.PI / 2],
                    ],
                    [
                        [Math.PI / 2, 0, 0],
                        [0, Math.PI / 2, 0],
                        [0, 0, Math.PI / 2],
                    ],
                ],
            },
        },
        B: {
            CENTERS: {
                // [1],
                POSITIONS: [0, 0, -1.5],
                ROTATIONS: [0, Math.PI / 2, 0],
            },
            EDGES: {
                // [6, 7, 9, 11],
                POSITIONS: [
                    [
                        [1.5, 0, -1],
                        [1, 0, -1.5],
                    ],
                    [
                        [-1.5, 0, -1],
                        [-1, 0, -1.5],
                    ],
                    [
                        [0, 1, -1.5],
                        [0, 1.5, -1],
                    ],
                    [
                        [0, -1, -1.5],
                        [0, -1.5, -1],
                    ],
                ],
                ROTATIONS: [
                    [
                        [0, 0, 0],
                        [0, Math.PI / 2, 0],
                    ],
                    [
                        [0, 0, 0],
                        [0, Math.PI / 2, 0],
                    ],
                    [
                        [0, Math.PI / 2, 0],
                        [0, 0, Math.PI / 2],
                    ],
                    [
                        [0, Math.PI / 2, 0],
                        [0, 0, Math.PI / 2],
                    ],
                ],
            },
            CORNERS: {
                // [4, 5, 6, 7]
                POSITIONS: [
                    [
                        [1.5, 1, -1],
                        [1, 1, -1.5],
                        [1, 1.5, -1],
                    ],
                    [
                        [-1.5, 1, -1],
                        [-1, 1, -1.5],
                        [-1, 1.5, -1],
                    ],
                    [
                        [1.5, -1, -1],
                        [1, -1, -1.5],
                        [1, -1.5, -1],
                    ],
                    [
                        [-1.5, -1, -1],
                        [-1, -1, -1.5],
                        [-1, -1.5, -1],
                    ],
                ],
                ROTATIONS: [
                    [
                        [Math.PI / 2, 0, 0],
                        [0, Math.PI / 2, 0],
                        [0, 0, Math.PI / 2],
                    ],
                    [
                        [Math.PI / 2, 0, 0],
                        [0, Math.PI / 2, 0],
                        [0, 0, Math.PI / 2],
                    ],
                    [
                        [Math.PI / 2, 0, 0],
                        [0, Math.PI / 2, 0],
                        [0, 0, Math.PI / 2],
                    ],
                    [
                        [Math.PI / 2, 0, 0],
                        [0, Math.PI / 2, 0],
                        [0, 0, Math.PI / 2],
                    ],
                ],
            },
        },
        U: {
            CENTERS: {
                // [2],
                POSITIONS: [0, 1.5, 0],
                ROTATIONS: [0, 0, Math.PI / 2],
            },
            EDGES: {
                // [0, 1, 8, 9],
                POSITIONS: [
                    [
                        [1.5, 1, 0],
                        [1, 1.5, 0],
                    ],
                    [
                        [-1.5, 1, 0],
                        [-1, 1.5, 0],
                    ],
                    [
                        [0, 1, 1.5],
                        [0, 1.5, 1],
                    ],
                    [
                        [0, 1, -1.5],
                        [0, 1.5, -1],
                    ],
                ],
                ROTATIONS: [
                    [
                        [0, 0, 0],
                        [0, 0, Math.PI / 2],
                    ],
                    [
                        [0, 0, 0],
                        [0, 0, Math.PI / 2],
                    ],
                    [
                        [0, 0, Math.PI / 2],
                        [0, 0, 0],
                    ],
                    [
                        [0, 0, Math.PI / 2],
                        [0, 0, 0],
                    ],
                ],
            },
            CORNERS: {
                // [0, 1, 4, 5]
                POSITIONS: [
                    [
                        [1.5, 1, 1],
                        [1, 1, 1.5],
                        [1, 1.5, 1],
                    ],
                    [
                        [-1.5, 1, 1],
                        [-1, 1, 1.5],
                        [-1, 1.5, 1],
                    ],
                    [
                        [1.5, 1, -1],
                        [1, 1, -1.5],
                        [1, 1.5, -1],
                    ],
                    [
                        [-1.5, 1, -1],
                        [-1, 1, -1.5],
                        [-1, 1.5, -1],
                    ],
                ],
                ROTATIONS: [
                    [
                        [Math.PI / 2, 0, 0],
                        [0, Math.PI / 2, 0],
                        [0, 0, Math.PI / 2],
                    ],
                    [(8)[(Math.PI / 2, 0, 0)], [0, Math.PI / 2, 0], [0, 0, Math.PI / 2]],
                    [
                        [Math.PI / 2, 0, 0],
                        [0, Math.PI / 2, 0],
                        [0, 0, Math.PI / 2],
                    ],
                    [
                        [Math.PI / 2, 0, 0],
                        [0, Math.PI / 2, 0],
                        [0, 0, Math.PI / 2],
                    ],
                ],
            },
        },
        D: {
            CENTERS: {
                // [3],
                POSITIONS: [0, -1.5, 0],
                ROTATIONS: [0, 0, Math.PI / 2],
            },
            EDGES: {
                // [2, 3, 10, 11],
                POSITIONS: [
                    [
                        [1.5, -1, 0],
                        [1, -1.5, 0],
                    ],
                    [
                        [-1.5, -1, 0],
                        [-1, -1.5, 0],
                    ],
                    [
                        [0, -1, 1.5],
                        [0, -1.5, 1],
                    ],
                    [
                        [0, -1, -1.5],
                        [0, -1.5, -1],
                    ],
                ],
                ROTATIONS: [
                    [
                        [0, 0, 0],
                        [0, 0, Math.PI / 2],
                    ],
                    [
                        [0, 0, 0],
                        [0, 0, Math.PI / 2],
                    ],
                    [
                        [0, 0, Math.PI / 2],
                        [0, 0, 0],
                    ],
                    [
                        [0, 0, Math.PI / 2],
                        [0, 0, 0],
                    ],
                ],
            },
            CORNERS: {
                // [2, 3, 6, 7]
                POSITIONS: [
                    [
                        [1.5, -1, 1],
                        [1, -1, 1.5],
                        [1, -1.5, 1],
                    ],
                    [
                        [-1.5, -1, 1],
                        [-1, -1, 1.5],
                        [-1, -1.5, 1],
                    ],
                    [
                        [1.5, -1, -1],
                        [1, -1, -1.5],
                        [1, -1.5, -1],
                    ],
                    [
                        [-1.5, -1, -1],
                        [-1, -1, -1.5],
                        [-1, -1.5, -1],
                    ],
                ],
                ROTATIONS: [
                    [
                        [Math.PI / 2, 0, 0],
                        [0, Math.PI / 2, 0],
                        [0, 0, Math.PI / 2],
                    ],
                    [
                        [Math.PI / 2, 0, 0],
                        [0, Math.PI / 2, 0],
                        [0, 0, Math.PI / 2],
                    ],
                    [
                        [Math.PI / 2, 0, 0],
                        [0, Math.PI / 2, 0],
                        [0, 0, Math.PI / 2],
                    ],
                    [
                        [Math.PI / 2, 0, 0],
                        [0, Math.PI / 2, 0],
                        [0, 0, Math.PI / 2],
                    ],
                ],
            },
        },
        L: {
            CENTERS: {
                // [4],
                POSITIONS: [1.5, 0, 0],
                ROTATIONS: [0, 0, 0],
            },
            EDGES: {
                // [1, 3, 5, 7],
                POSITIONS: [
                    [
                        [-1.5, 1, 0],
                        [-1, 1.5, 0],
                    ],
                    [
                        [-1.5, -1, 0],
                        [-1, -1.5, 0],
                    ],
                    [
                        [-1.5, 0, 1],
                        [-1, 0, 1.5],
                    ],
                    [
                        [-1.5, 0, -1],
                        [-1, 0, -1.5],
                    ],
                ],
                ROTATIONS: [
                    [
                        [0, 0, 0],
                        [0, 0, Math.PI / 2],
                    ],
                    [
                        [0, 0, 0],
                        [0, 0, Math.PI / 2],
                    ],
                    [
                        [0, 0, 0],
                        [0, Math.PI / 2, 0],
                    ],
                    [
                        [0, 0, 0],
                        [0, Math.PI / 2, 0],
                    ],
                ],
            },
            CORNERS: {
                // [1, 3, 5, 7]
                POSITIONS: [
                    [
                        [-1.5, 1, 1],
                        [-1, 1, 1.5],
                        [-1, 1.5, 1],
                    ],
                    [
                        [-1.5, -1, 1],
                        [-1, -1, 1.5],
                        [-1, -1.5, 1],
                    ],
                    [
                        [-1.5, 1, -1],
                        [-1, 1, -1.5],
                        [-1, 1.5, -1],
                    ],
                    [
                        [-1.5, -1, -1],
                        [-1, -1, -1.5],
                        [-1, -1.5, -1],
                    ],
                ],
                ROTATIONS: [
                    [
                        [Math.PI / 2, 0, 0],
                        [0, Math.PI / 2, 0],
                        [0, 0, Math.PI / 2],
                    ],
                    [
                        [Math.PI / 2, 0, 0],
                        [0, Math.PI / 2, 0],
                        [0, 0, Math.PI / 2],
                    ],
                    [
                        [Math.PI / 2, 0, 0],
                        [0, Math.PI / 2, 0],
                        [0, 0, Math.PI / 2],
                    ],
                    [
                        [Math.PI / 2, 0, 0],
                        [0, Math.PI / 2, 0],
                        [0, 0, Math.PI / 2],
                    ],
                ],
            },
        },
        R: {
            CENTERS: {
                // [5],
                POSITIONS: [-1.5, 0, 0],
                ROTATIONS: [0, 0, 0],
            },
            EDGES: {
                // [0, 2, 4, 6],
                POSITIONS: [
                    [
                        [1.5, 1, 0],
                        [1, 1.5, 0],
                    ],
                    [
                        [1.5, -1, 0],
                        [1, -1.5, 0],
                    ],
                    [
                        [1.5, 0, 1],
                        [1, 0, 1.5],
                    ],
                    [
                        [1.5, 0, -1],
                        [1, 0, -1.5],
                    ],
                ],
                ROTATIONS: [
                    [
                        [0, 0, 0],
                        [0, 0, Math.PI / 2],
                    ],
                    [
                        [0, 0, 0],
                        [0, 0, Math.PI / 2],
                    ],
                    [
                        [0, 0, 0],
                        [0, Math.PI / 2, 0],
                    ],
                    [
                        [0, 0, 0],
                        [0, Math.PI / 2, 0],
                    ],
                ],
            },
            CORNERS: {
                // [0, 2, 4, 6]
                POSITIONS: [
                    [
                        [1.5, 1, 1],
                        [1, 1, 1.5],
                        [1, 1.5, 1],
                    ],
                    [
                        [1.5, -1, 1],
                        [1, -1, 1.5],
                        [1, -1.5, 1],
                    ],
                    [
                        [1.5, 1, -1],
                        [1, 1, -1.5],
                        [1, 1.5, -1],
                    ],
                    [
                        [1.5, -1, -1],
                        [1, -1, -1.5],
                        [1, -1.5, -1],
                    ],
                ],
                ROTATIONS: [
                    [
                        [Math.PI / 2, 0, 0],
                        [0, Math.PI / 2, 0],
                        [0, 0, Math.PI / 2],
                    ],
                    [
                        [Math.PI / 2, 0, 0],
                        [0, Math.PI / 2, 0],
                        [0, 0, Math.PI / 2],
                    ],
                    [
                        [Math.PI / 2, 0, 0],
                        [0, Math.PI / 2, 0],
                        [0, 0, Math.PI / 2],
                    ],
                    [
                        [Math.PI / 2, 0, 0],
                        [0, Math.PI / 2, 0],
                        [0, 0, Math.PI / 2],
                    ],
                ],
            },
        },
        M: {
            CENTERS: {
                // [0, 1, 2, 3],
                POSITIONS: [
                    [0, 0, 1.5],
                    [0, 0, -1.5],
                    [0, 1.5, 0],
                    [0, -1.5, 0],
                ],
                ROTATIONS: [
                    [0, Math.PI / 2, 0],
                    [0, Math.PI / 2, 0],
                    [0, 0, Math.PI / 2],
                    [0, 0, Math.PI / 2],
                ],
            },
            EDGES: {
                // [8, 9, 10, 11],
                POSITIONS: [
                    [
                        [0, 1, 1.5],
                        [0, 1.5, 1],
                    ],
                    [
                        [0, 1, -1.5],
                        [0, 1.5, -1],
                    ],
                    [
                        [0, -1, 1.5],
                        [0, -1.5, 1],
                    ],
                    [
                        [0, -1, -1.5],
                        [0, -1.5, -1],
                    ],
                ],
                ROTATIONS: [
                    [
                        [0, Math.PI / 2, 0],
                        [0, 0, Math.PI / 2],
                    ],
                    [
                        [0, Math.PI / 2, 0],
                        [0, 0, Math.PI / 2],
                    ],
                    [
                        [0, Math.PI / 2, 0],
                        [0, 0, Math.PI / 2],
                    ],
                    [
                        [0, Math.PI / 2, 0],
                        [0, 0, Math.PI / 2],
                    ],
                ],
            },
            CORNERS: {
                // []
                POSITIONS: [],
                ROTATIONS: [],
            },
        },
        E: {
            CENTERS: {
                // [0, 1, 4, 5],
                POSITIONS: [
                    [0, 0, 1.5],
                    [0, 0, -1.5],
                    [1.5, 0, 0],
                    [-1.5, 0, 0],
                ],
                ROTATIONS: [
                    [0, Math.PI / 2, 0],
                    [0, Math.PI / 2, 0],
                    [0, 0, 0],
                    [0, 0, 0],
                ],
            },
            EDGES: {
                // [4, 5, 6, 7],
                POSITIONS: [
                    [
                        [1.5, 0, 1],
                        [1, 0, 1.5],
                    ],
                    [
                        [-1.5, 0, 1],
                        [-1, 0, 1.5],
                    ],
                    [
                        [1.5, 0, -1],
                        [1, 0, -1.5],
                    ],
                    [
                        [-1.5, 0, -1],
                        [-1, 0, -1.5],
                    ],
                ],
                ROTATIONS: [
                    [
                        [0, 0, 0],
                        [0, Math.PI / 2, 0],
                    ],
                    [
                        [0, 0, 0],
                        [0, Math.PI / 2, 0],
                    ],
                    [
                        [0, 0, 0],
                        [0, Math.PI / 2, 0],
                    ],
                    [
                        [0, 0, 0],
                        [0, Math.PI / 2, 0],
                    ],
                ],
            },
            CORNERS: {
                // []
                POSITIONS: [],
                ROTATIONS: [],
            },
        },
        S: {
            CENTERS: {
                // [2, 3, 4, 5],
                POSITIONS: [
                    [0, 1.5, 0],
                    [0, -1.5, 0],
                    [1.5, 0, 0],
                    [-1.5, 0, 0],
                ],
                ROTATIONS: [
                    [0, 1.5, 0],
                    [0, -1.5, 0],
                    [0, 0, 0],
                    [0, 0, 0],
                ],
            },
            EDGES: {
                // [0, 1, 2, 3],
                POSITIONS: [
                    [
                        [1.5, 1, 0],
                        [1, 1.5, 0],
                    ],
                    [
                        [-1.5, 1, 0],
                        [-1, 1.5, 0],
                    ],
                    [
                        [1.5, -1, 0],
                        [1, -1.5, 0],
                    ],
                    [
                        [-1.5, -1, 0],
                        [-1, -1.5, 0],
                    ],
                ],
                ROTATIONS: [
                    [
                        [0, 0, 0],
                        [0, 0, Math.PI / 2],
                    ],
                    [
                        [0, 0, 0],
                        [0, 0, Math.PI / 2],
                    ],
                    [
                        [0, 0, 0],
                        [0, 0, Math.PI / 2],
                    ],
                    [
                        [0, 0, 0],
                        [0, 0, Math.PI / 2],
                    ],
                ],
            },
            CORNERS: {
                // []
                POSITIONS: [],
                ROTATIONS: [],
            },
        },
    };

    /* setArr((prevArr) => {
        let arr = [...prevArr];
        arr[0] = prevArr[1];
        arr[1] = prevArr[0];
        return arr;
    }); */

    const rotateSide = (side) => {
        let indexes = [
            [-1, -1, -1, -1],
            [-1, -1, -1, -1],
        ];

        // f b u d l r
        switch (side) {
            case 'f': {
                for (let i = 0; i < 4; i++) {
                    cornerPiecesPositions.forEach((position, index) => {
                        if (JSON.stringify(position) === JSON.stringify(SIDES.F.CORNERS.POSITIONS[i])) indexes[0][i] = index;
                    });
                    edgePiecesPositions.forEach((position, index) => {
                        if (JSON.stringify(position) === JSON.stringify(SIDES.F.EDGES.POSITIONS[i])) indexes[1][i] = index;
                    });
                }

                setCornerPiecesPositions((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[0][0]] = [prevArr[indexes[0][2]][2], prevArr[indexes[0][2]][1], prevArr[indexes[0][2]][0]];
                    arr[indexes[0][1]] = [prevArr[indexes[0][0]][2], prevArr[indexes[0][0]][1], prevArr[indexes[0][0]][0]];
                    arr[indexes[0][2]] = [prevArr[indexes[0][3]][2], prevArr[indexes[0][3]][1], prevArr[indexes[0][3]][0]];
                    arr[indexes[0][3]] = [prevArr[indexes[0][1]][2], prevArr[indexes[0][1]][1], prevArr[indexes[0][1]][0]];
                    return arr;
                });

                setCornerPiecesRotations((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[0][0]] = [prevArr[indexes[0][2]][2], prevArr[indexes[0][2]][1], prevArr[indexes[0][2]][0]];
                    arr[indexes[0][1]] = [prevArr[indexes[0][0]][2], prevArr[indexes[0][0]][1], prevArr[indexes[0][0]][0]];
                    arr[indexes[0][2]] = [prevArr[indexes[0][3]][2], prevArr[indexes[0][3]][1], prevArr[indexes[0][3]][0]];
                    arr[indexes[0][3]] = [prevArr[indexes[0][1]][2], prevArr[indexes[0][1]][1], prevArr[indexes[0][1]][0]];
                    return arr;
                });

                setEdgePiecesPositions((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[1][0]] = [prevArr[indexes[1][3]][1], prevArr[indexes[1][3]][0]];
                    arr[indexes[1][1]] = [prevArr[indexes[1][2]][1], prevArr[indexes[1][2]][0]];
                    arr[indexes[1][2]] = [prevArr[indexes[1][0]][1], prevArr[indexes[1][0]][0]];
                    arr[indexes[1][3]] = [prevArr[indexes[1][1]][1], prevArr[indexes[1][1]][0]];
                    return arr;
                });

                setEdgePiecesRotations((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[1][0]] = [prevArr[indexes[1][3]][1], prevArr[indexes[1][3]][0]];
                    arr[indexes[1][1]] = [prevArr[indexes[1][2]][1], prevArr[indexes[1][2]][0]];
                    arr[indexes[1][2]] = [prevArr[indexes[1][0]][1], prevArr[indexes[1][0]][0]];
                    arr[indexes[1][3]] = [prevArr[indexes[1][1]][1], prevArr[indexes[1][1]][0]];
                    return arr;
                });

                break;
            }
            case 'F': {
                for (let i = 0; i < 4; i++) {
                    cornerPiecesPositions.forEach((position, index) => {
                        if (JSON.stringify(position) === JSON.stringify(SIDES.F.CORNERS.POSITIONS[i])) indexes[0][i] = index;
                    });
                    edgePiecesPositions.forEach((position, index) => {
                        if (JSON.stringify(position) === JSON.stringify(SIDES.F.EDGES.POSITIONS[i])) indexes[1][i] = index;
                    });
                }

                setCornerPiecesPositions((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[0][0]] = [prevArr[indexes[0][1]][2], prevArr[indexes[0][1]][1], prevArr[indexes[0][1]][0]];
                    arr[indexes[0][1]] = [prevArr[indexes[0][3]][2], prevArr[indexes[0][3]][1], prevArr[indexes[0][3]][0]];
                    arr[indexes[0][2]] = [prevArr[indexes[0][0]][2], prevArr[indexes[0][0]][1], prevArr[indexes[0][0]][0]];
                    arr[indexes[0][3]] = [prevArr[indexes[0][2]][2], prevArr[indexes[0][2]][1], prevArr[indexes[0][2]][0]];
                    return arr;
                });

                setCornerPiecesRotations((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[0][0]] = [prevArr[indexes[0][1]][2], prevArr[indexes[0][1]][1], prevArr[indexes[0][1]][0]];
                    arr[indexes[0][1]] = [prevArr[indexes[0][3]][2], prevArr[indexes[0][3]][1], prevArr[indexes[0][3]][0]];
                    arr[indexes[0][2]] = [prevArr[indexes[0][0]][2], prevArr[indexes[0][0]][1], prevArr[indexes[0][0]][0]];
                    arr[indexes[0][3]] = [prevArr[indexes[0][2]][2], prevArr[indexes[0][2]][1], prevArr[indexes[0][2]][0]];
                    return arr;
                });

                setEdgePiecesPositions((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[1][0]] = [prevArr[indexes[1][2]][1], prevArr[indexes[1][2]][0]];
                    arr[indexes[1][1]] = [prevArr[indexes[1][3]][1], prevArr[indexes[1][3]][0]];
                    arr[indexes[1][2]] = [prevArr[indexes[1][1]][1], prevArr[indexes[1][1]][0]];
                    arr[indexes[1][3]] = [prevArr[indexes[1][0]][1], prevArr[indexes[1][0]][0]];
                    return arr;
                });

                setEdgePiecesRotations((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[1][0]] = [prevArr[indexes[1][2]][1], prevArr[indexes[1][2]][0]];
                    arr[indexes[1][1]] = [prevArr[indexes[1][3]][1], prevArr[indexes[1][3]][0]];
                    arr[indexes[1][2]] = [prevArr[indexes[1][1]][1], prevArr[indexes[1][1]][0]];
                    arr[indexes[1][3]] = [prevArr[indexes[1][0]][1], prevArr[indexes[1][0]][0]];
                    return arr;
                });

                break;
            }
            case 'b': {
                for (let i = 0; i < 4; i++) {
                    cornerPiecesPositions.forEach((position, index) => {
                        if (JSON.stringify(position) === JSON.stringify(SIDES.B.CORNERS.POSITIONS[i])) indexes[0][i] = index;
                    });
                    edgePiecesPositions.forEach((position, index) => {
                        if (JSON.stringify(position) === JSON.stringify(SIDES.B.EDGES.POSITIONS[i])) indexes[1][i] = index;
                    });
                }

                setCornerPiecesPositions((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[0][0]] = [prevArr[indexes[0][1]][2], prevArr[indexes[0][1]][1], prevArr[indexes[0][1]][0]];
                    arr[indexes[0][1]] = [prevArr[indexes[0][3]][2], prevArr[indexes[0][3]][1], prevArr[indexes[0][3]][0]];
                    arr[indexes[0][2]] = [prevArr[indexes[0][0]][2], prevArr[indexes[0][0]][1], prevArr[indexes[0][0]][0]];
                    arr[indexes[0][3]] = [prevArr[indexes[0][2]][2], prevArr[indexes[0][2]][1], prevArr[indexes[0][2]][0]];
                    return arr;
                });

                setCornerPiecesRotations((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[0][0]] = [prevArr[indexes[0][1]][2], prevArr[indexes[0][1]][1], prevArr[indexes[0][1]][0]];
                    arr[indexes[0][1]] = [prevArr[indexes[0][3]][2], prevArr[indexes[0][3]][1], prevArr[indexes[0][3]][0]];
                    arr[indexes[0][2]] = [prevArr[indexes[0][0]][2], prevArr[indexes[0][0]][1], prevArr[indexes[0][0]][0]];
                    arr[indexes[0][3]] = [prevArr[indexes[0][2]][2], prevArr[indexes[0][2]][1], prevArr[indexes[0][2]][0]];
                    return arr;
                });

                setEdgePiecesPositions((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[1][0]] = [prevArr[indexes[1][2]][1], prevArr[indexes[1][2]][0]];
                    arr[indexes[1][1]] = [prevArr[indexes[1][3]][1], prevArr[indexes[1][3]][0]];
                    arr[indexes[1][2]] = [prevArr[indexes[1][1]][1], prevArr[indexes[1][1]][0]];
                    arr[indexes[1][3]] = [prevArr[indexes[1][0]][1], prevArr[indexes[1][0]][0]];
                    return arr;
                });

                setEdgePiecesRotations((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[1][0]] = [prevArr[indexes[1][2]][1], prevArr[indexes[1][2]][0]];
                    arr[indexes[1][1]] = [prevArr[indexes[1][3]][1], prevArr[indexes[1][3]][0]];
                    arr[indexes[1][2]] = [prevArr[indexes[1][1]][1], prevArr[indexes[1][1]][0]];
                    arr[indexes[1][3]] = [prevArr[indexes[1][0]][1], prevArr[indexes[1][0]][0]];
                    return arr;
                });

                break;
            }
            case 'B': {
                for (let i = 0; i < 4; i++) {
                    cornerPiecesPositions.forEach((position, index) => {
                        if (JSON.stringify(position) === JSON.stringify(SIDES.B.CORNERS.POSITIONS[i])) indexes[0][i] = index;
                    });
                    edgePiecesPositions.forEach((position, index) => {
                        if (JSON.stringify(position) === JSON.stringify(SIDES.B.EDGES.POSITIONS[i])) indexes[1][i] = index;
                    });
                }

                setCornerPiecesPositions((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[0][0]] = [prevArr[indexes[0][2]][2], prevArr[indexes[0][2]][1], prevArr[indexes[0][2]][0]];
                    arr[indexes[0][1]] = [prevArr[indexes[0][0]][2], prevArr[indexes[0][0]][1], prevArr[indexes[0][0]][0]];
                    arr[indexes[0][2]] = [prevArr[indexes[0][3]][2], prevArr[indexes[0][3]][1], prevArr[indexes[0][3]][0]];
                    arr[indexes[0][3]] = [prevArr[indexes[0][1]][2], prevArr[indexes[0][1]][1], prevArr[indexes[0][1]][0]];
                    return arr;
                });

                setCornerPiecesRotations((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[0][0]] = [prevArr[indexes[0][2]][2], prevArr[indexes[0][2]][1], prevArr[indexes[0][2]][0]];
                    arr[indexes[0][1]] = [prevArr[indexes[0][0]][2], prevArr[indexes[0][0]][1], prevArr[indexes[0][0]][0]];
                    arr[indexes[0][2]] = [prevArr[indexes[0][3]][2], prevArr[indexes[0][3]][1], prevArr[indexes[0][3]][0]];
                    arr[indexes[0][3]] = [prevArr[indexes[0][1]][2], prevArr[indexes[0][1]][1], prevArr[indexes[0][1]][0]];
                    return arr;
                });

                setEdgePiecesPositions((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[1][0]] = [prevArr[indexes[1][3]][1], prevArr[indexes[1][3]][0]];
                    arr[indexes[1][1]] = [prevArr[indexes[1][2]][1], prevArr[indexes[1][2]][0]];
                    arr[indexes[1][2]] = [prevArr[indexes[1][0]][1], prevArr[indexes[1][0]][0]];
                    arr[indexes[1][3]] = [prevArr[indexes[1][1]][1], prevArr[indexes[1][1]][0]];
                    return arr;
                });

                setEdgePiecesRotations((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[1][0]] = [prevArr[indexes[1][3]][1], prevArr[indexes[1][3]][0]];
                    arr[indexes[1][1]] = [prevArr[indexes[1][2]][1], prevArr[indexes[1][2]][0]];
                    arr[indexes[1][2]] = [prevArr[indexes[1][0]][1], prevArr[indexes[1][0]][0]];
                    arr[indexes[1][3]] = [prevArr[indexes[1][1]][1], prevArr[indexes[1][1]][0]];
                    return arr;
                });

                break;
            }
            case 'u': {
                for (let i = 0; i < 4; i++) {
                    cornerPiecesPositions.forEach((position, index) => {
                        if (JSON.stringify(position) === JSON.stringify(SIDES.U.CORNERS.POSITIONS[i])) indexes[0][i] = index;
                    });
                    edgePiecesPositions.forEach((position, index) => {
                        if (JSON.stringify(position) === JSON.stringify(SIDES.U.EDGES.POSITIONS[i])) indexes[1][i] = index;
                    });
                }
                setCornerPiecesPositions((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[0][0]] = [prevArr[indexes[0][2]][1], prevArr[indexes[0][2]][0], prevArr[indexes[0][2]][2]];
                    arr[indexes[0][1]] = [prevArr[indexes[0][0]][1], prevArr[indexes[0][0]][0], prevArr[indexes[0][0]][2]];
                    arr[indexes[0][2]] = [prevArr[indexes[0][3]][1], prevArr[indexes[0][3]][0], prevArr[indexes[0][3]][2]];
                    arr[indexes[0][3]] = [prevArr[indexes[0][1]][1], prevArr[indexes[0][1]][0], prevArr[indexes[0][1]][2]];
                    return arr;
                });

                setCornerPiecesRotations((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[0][0]] = [prevArr[indexes[0][2]][1], prevArr[indexes[0][2]][0], prevArr[indexes[0][2]][2]];
                    arr[indexes[0][1]] = [prevArr[indexes[0][0]][1], prevArr[indexes[0][0]][0], prevArr[indexes[0][0]][2]];
                    arr[indexes[0][2]] = [prevArr[indexes[0][3]][1], prevArr[indexes[0][3]][0], prevArr[indexes[0][3]][2]];
                    arr[indexes[0][3]] = [prevArr[indexes[0][1]][1], prevArr[indexes[0][1]][0], prevArr[indexes[0][1]][2]];
                    return arr;
                });

                setEdgePiecesPositions((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[1][0]] = [prevArr[indexes[1][3]][0], prevArr[indexes[1][3]][1]];
                    arr[indexes[1][1]] = [prevArr[indexes[1][2]][0], prevArr[indexes[1][2]][1]];
                    arr[indexes[1][2]] = [prevArr[indexes[1][0]][0], prevArr[indexes[1][0]][1]];
                    arr[indexes[1][3]] = [prevArr[indexes[1][1]][0], prevArr[indexes[1][1]][1]];
                    return arr;
                });

                setEdgePiecesRotations((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[1][0]] = [prevArr[indexes[1][3]][0], prevArr[indexes[1][3]][1]];
                    arr[indexes[1][1]] = [prevArr[indexes[1][2]][0], prevArr[indexes[1][2]][1]];
                    arr[indexes[1][2]] = [prevArr[indexes[1][0]][0], prevArr[indexes[1][0]][1]];
                    arr[indexes[1][3]] = [prevArr[indexes[1][1]][0], prevArr[indexes[1][1]][1]];
                    return arr;
                });

                break;
            }
            case 'U': {
                for (let i = 0; i < 4; i++) {
                    cornerPiecesPositions.forEach((position, index) => {
                        if (JSON.stringify(position) === JSON.stringify(SIDES.U.CORNERS.POSITIONS[i])) indexes[0][i] = index;
                    });
                    edgePiecesPositions.forEach((position, index) => {
                        if (JSON.stringify(position) === JSON.stringify(SIDES.U.EDGES.POSITIONS[i])) indexes[1][i] = index;
                    });
                }
                setCornerPiecesPositions((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[0][0]] = [prevArr[indexes[0][1]][1], prevArr[indexes[0][1]][0], prevArr[indexes[0][1]][2]];
                    arr[indexes[0][1]] = [prevArr[indexes[0][3]][1], prevArr[indexes[0][3]][0], prevArr[indexes[0][3]][2]];
                    arr[indexes[0][2]] = [prevArr[indexes[0][0]][1], prevArr[indexes[0][0]][0], prevArr[indexes[0][0]][2]];
                    arr[indexes[0][3]] = [prevArr[indexes[0][2]][1], prevArr[indexes[0][2]][0], prevArr[indexes[0][2]][2]];
                    return arr;
                });

                setCornerPiecesRotations((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[0][0]] = [prevArr[indexes[0][1]][1], prevArr[indexes[0][1]][0], prevArr[indexes[0][1]][2]];
                    arr[indexes[0][1]] = [prevArr[indexes[0][3]][1], prevArr[indexes[0][3]][0], prevArr[indexes[0][3]][2]];
                    arr[indexes[0][2]] = [prevArr[indexes[0][0]][1], prevArr[indexes[0][0]][0], prevArr[indexes[0][0]][2]];
                    arr[indexes[0][3]] = [prevArr[indexes[0][2]][1], prevArr[indexes[0][2]][0], prevArr[indexes[0][2]][2]];
                    return arr;
                });

                setEdgePiecesPositions((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[1][0]] = [prevArr[indexes[1][2]][0], prevArr[indexes[1][2]][1]];
                    arr[indexes[1][1]] = [prevArr[indexes[1][3]][0], prevArr[indexes[1][3]][1]];
                    arr[indexes[1][2]] = [prevArr[indexes[1][1]][0], prevArr[indexes[1][1]][1]];
                    arr[indexes[1][3]] = [prevArr[indexes[1][0]][0], prevArr[indexes[1][0]][1]];
                    return arr;
                });

                setEdgePiecesRotations((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[1][0]] = [prevArr[indexes[1][2]][0], prevArr[indexes[1][2]][1]];
                    arr[indexes[1][1]] = [prevArr[indexes[1][3]][0], prevArr[indexes[1][3]][1]];
                    arr[indexes[1][2]] = [prevArr[indexes[1][1]][0], prevArr[indexes[1][1]][1]];
                    arr[indexes[1][3]] = [prevArr[indexes[1][0]][0], prevArr[indexes[1][0]][1]];
                    return arr;
                });

                break;
            }
            case 'd': {
                for (let i = 0; i < 4; i++) {
                    cornerPiecesPositions.forEach((position, index) => {
                        if (JSON.stringify(position) === JSON.stringify(SIDES.D.CORNERS.POSITIONS[i])) indexes[0][i] = index;
                    });
                    edgePiecesPositions.forEach((position, index) => {
                        if (JSON.stringify(position) === JSON.stringify(SIDES.D.EDGES.POSITIONS[i])) indexes[1][i] = index;
                    });
                }
                setCornerPiecesPositions((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[0][0]] = [prevArr[indexes[0][1]][1], prevArr[indexes[0][1]][0], prevArr[indexes[0][1]][2]];
                    arr[indexes[0][1]] = [prevArr[indexes[0][3]][1], prevArr[indexes[0][3]][0], prevArr[indexes[0][3]][2]];
                    arr[indexes[0][2]] = [prevArr[indexes[0][0]][1], prevArr[indexes[0][0]][0], prevArr[indexes[0][0]][2]];
                    arr[indexes[0][3]] = [prevArr[indexes[0][2]][1], prevArr[indexes[0][2]][0], prevArr[indexes[0][2]][2]];
                    return arr;
                });

                setCornerPiecesRotations((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[0][0]] = [prevArr[indexes[0][1]][1], prevArr[indexes[0][1]][0], prevArr[indexes[0][1]][2]];
                    arr[indexes[0][1]] = [prevArr[indexes[0][3]][1], prevArr[indexes[0][3]][0], prevArr[indexes[0][3]][2]];
                    arr[indexes[0][2]] = [prevArr[indexes[0][0]][1], prevArr[indexes[0][0]][0], prevArr[indexes[0][0]][2]];
                    arr[indexes[0][3]] = [prevArr[indexes[0][2]][1], prevArr[indexes[0][2]][0], prevArr[indexes[0][2]][2]];
                    return arr;
                });

                setEdgePiecesPositions((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[1][0]] = [prevArr[indexes[1][2]][0], prevArr[indexes[1][2]][1]];
                    arr[indexes[1][1]] = [prevArr[indexes[1][3]][0], prevArr[indexes[1][3]][1]];
                    arr[indexes[1][2]] = [prevArr[indexes[1][1]][0], prevArr[indexes[1][1]][1]];
                    arr[indexes[1][3]] = [prevArr[indexes[1][0]][0], prevArr[indexes[1][0]][1]];
                    return arr;
                });

                setEdgePiecesRotations((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[1][0]] = [prevArr[indexes[1][2]][0], prevArr[indexes[1][2]][1]];
                    arr[indexes[1][1]] = [prevArr[indexes[1][3]][0], prevArr[indexes[1][3]][1]];
                    arr[indexes[1][2]] = [prevArr[indexes[1][1]][0], prevArr[indexes[1][1]][1]];
                    arr[indexes[1][3]] = [prevArr[indexes[1][0]][0], prevArr[indexes[1][0]][1]];
                    return arr;
                });

                break;
            }
            case 'D': {
                for (let i = 0; i < 4; i++) {
                    cornerPiecesPositions.forEach((position, index) => {
                        if (JSON.stringify(position) === JSON.stringify(SIDES.D.CORNERS.POSITIONS[i])) indexes[0][i] = index;
                    });
                    edgePiecesPositions.forEach((position, index) => {
                        if (JSON.stringify(position) === JSON.stringify(SIDES.D.EDGES.POSITIONS[i])) indexes[1][i] = index;
                    });
                }
                setCornerPiecesPositions((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[0][0]] = [prevArr[indexes[0][2]][1], prevArr[indexes[0][2]][0], prevArr[indexes[0][2]][2]];
                    arr[indexes[0][1]] = [prevArr[indexes[0][0]][1], prevArr[indexes[0][0]][0], prevArr[indexes[0][0]][2]];
                    arr[indexes[0][2]] = [prevArr[indexes[0][3]][1], prevArr[indexes[0][3]][0], prevArr[indexes[0][3]][2]];
                    arr[indexes[0][3]] = [prevArr[indexes[0][1]][1], prevArr[indexes[0][1]][0], prevArr[indexes[0][1]][2]];
                    return arr;
                });

                setCornerPiecesRotations((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[0][0]] = [prevArr[indexes[0][2]][1], prevArr[indexes[0][2]][0], prevArr[indexes[0][2]][2]];
                    arr[indexes[0][1]] = [prevArr[indexes[0][0]][1], prevArr[indexes[0][0]][0], prevArr[indexes[0][0]][2]];
                    arr[indexes[0][2]] = [prevArr[indexes[0][3]][1], prevArr[indexes[0][3]][0], prevArr[indexes[0][3]][2]];
                    arr[indexes[0][3]] = [prevArr[indexes[0][1]][1], prevArr[indexes[0][1]][0], prevArr[indexes[0][1]][2]];
                    return arr;
                });

                setEdgePiecesPositions((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[1][0]] = [prevArr[indexes[1][3]][0], prevArr[indexes[1][3]][1]];
                    arr[indexes[1][1]] = [prevArr[indexes[1][2]][0], prevArr[indexes[1][2]][1]];
                    arr[indexes[1][2]] = [prevArr[indexes[1][0]][0], prevArr[indexes[1][0]][1]];
                    arr[indexes[1][3]] = [prevArr[indexes[1][1]][0], prevArr[indexes[1][1]][1]];
                    return arr;
                });

                setEdgePiecesRotations((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[1][0]] = [prevArr[indexes[1][3]][0], prevArr[indexes[1][3]][1]];
                    arr[indexes[1][1]] = [prevArr[indexes[1][2]][0], prevArr[indexes[1][2]][1]];
                    arr[indexes[1][2]] = [prevArr[indexes[1][0]][0], prevArr[indexes[1][0]][1]];
                    arr[indexes[1][3]] = [prevArr[indexes[1][1]][0], prevArr[indexes[1][1]][1]];
                    return arr;
                });

                break;
            }
            case 'l': {
                for (let i = 0; i < 4; i++) {
                    cornerPiecesPositions.forEach((position, index) => {
                        if (JSON.stringify(position) === JSON.stringify(SIDES.L.CORNERS.POSITIONS[i])) indexes[0][i] = index;
                    });
                    edgePiecesPositions.forEach((position, index) => {
                        if (JSON.stringify(position) === JSON.stringify(SIDES.L.EDGES.POSITIONS[i])) indexes[1][i] = index;
                    });
                }
                setCornerPiecesPositions((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[0][0]] = [prevArr[indexes[0][1]][0], prevArr[indexes[0][1]][2], prevArr[indexes[0][1]][1]];
                    arr[indexes[0][1]] = [prevArr[indexes[0][3]][0], prevArr[indexes[0][3]][2], prevArr[indexes[0][3]][1]];
                    arr[indexes[0][2]] = [prevArr[indexes[0][0]][0], prevArr[indexes[0][0]][2], prevArr[indexes[0][0]][1]];
                    arr[indexes[0][3]] = [prevArr[indexes[0][2]][0], prevArr[indexes[0][2]][2], prevArr[indexes[0][2]][1]];
                    return arr;
                });

                setCornerPiecesRotations((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[0][0]] = [prevArr[indexes[0][1]][0], prevArr[indexes[0][1]][2], prevArr[indexes[0][1]][1]];
                    arr[indexes[0][1]] = [prevArr[indexes[0][3]][0], prevArr[indexes[0][3]][2], prevArr[indexes[0][3]][1]];
                    arr[indexes[0][2]] = [prevArr[indexes[0][0]][0], prevArr[indexes[0][0]][2], prevArr[indexes[0][0]][1]];
                    arr[indexes[0][3]] = [prevArr[indexes[0][2]][0], prevArr[indexes[0][2]][2], prevArr[indexes[0][2]][1]];
                    return arr;
                });

                setEdgePiecesPositions((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[1][0]] = [prevArr[indexes[1][2]][0], prevArr[indexes[1][2]][1]];
                    arr[indexes[1][1]] = [prevArr[indexes[1][3]][0], prevArr[indexes[1][3]][1]];
                    arr[indexes[1][2]] = [prevArr[indexes[1][1]][0], prevArr[indexes[1][1]][1]];
                    arr[indexes[1][3]] = [prevArr[indexes[1][0]][0], prevArr[indexes[1][0]][1]];
                    return arr;
                });

                setEdgePiecesRotations((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[1][0]] = [prevArr[indexes[1][2]][0], prevArr[indexes[1][2]][1]];
                    arr[indexes[1][1]] = [prevArr[indexes[1][3]][0], prevArr[indexes[1][3]][1]];
                    arr[indexes[1][2]] = [prevArr[indexes[1][1]][0], prevArr[indexes[1][1]][1]];
                    arr[indexes[1][3]] = [prevArr[indexes[1][0]][0], prevArr[indexes[1][0]][1]];
                    return arr;
                });

                break;
            }
            case 'L': {
                for (let i = 0; i < 4; i++) {
                    cornerPiecesPositions.forEach((position, index) => {
                        if (JSON.stringify(position) === JSON.stringify(SIDES.L.CORNERS.POSITIONS[i])) indexes[0][i] = index;
                    });
                    edgePiecesPositions.forEach((position, index) => {
                        if (JSON.stringify(position) === JSON.stringify(SIDES.L.EDGES.POSITIONS[i])) indexes[1][i] = index;
                    });
                }
                setCornerPiecesPositions((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[0][0]] = [prevArr[indexes[0][2]][0], prevArr[indexes[0][2]][2], prevArr[indexes[0][2]][1]];
                    arr[indexes[0][1]] = [prevArr[indexes[0][0]][0], prevArr[indexes[0][0]][2], prevArr[indexes[0][0]][1]];
                    arr[indexes[0][2]] = [prevArr[indexes[0][3]][0], prevArr[indexes[0][3]][2], prevArr[indexes[0][3]][1]];
                    arr[indexes[0][3]] = [prevArr[indexes[0][1]][0], prevArr[indexes[0][1]][2], prevArr[indexes[0][1]][1]];
                    return arr;
                });

                setCornerPiecesRotations((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[0][0]] = [prevArr[indexes[0][2]][0], prevArr[indexes[0][2]][2], prevArr[indexes[0][2]][1]];
                    arr[indexes[0][1]] = [prevArr[indexes[0][0]][0], prevArr[indexes[0][0]][2], prevArr[indexes[0][0]][1]];
                    arr[indexes[0][2]] = [prevArr[indexes[0][3]][0], prevArr[indexes[0][3]][2], prevArr[indexes[0][3]][1]];
                    arr[indexes[0][3]] = [prevArr[indexes[0][1]][0], prevArr[indexes[0][1]][2], prevArr[indexes[0][1]][1]];
                    return arr;
                });

                setEdgePiecesPositions((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[1][0]] = [prevArr[indexes[1][3]][0], prevArr[indexes[1][3]][1]];
                    arr[indexes[1][1]] = [prevArr[indexes[1][2]][0], prevArr[indexes[1][2]][1]];
                    arr[indexes[1][2]] = [prevArr[indexes[1][0]][0], prevArr[indexes[1][0]][1]];
                    arr[indexes[1][3]] = [prevArr[indexes[1][1]][0], prevArr[indexes[1][1]][1]];
                    return arr;
                });

                setEdgePiecesRotations((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[1][0]] = [prevArr[indexes[1][3]][0], prevArr[indexes[1][3]][1]];
                    arr[indexes[1][1]] = [prevArr[indexes[1][2]][0], prevArr[indexes[1][2]][1]];
                    arr[indexes[1][2]] = [prevArr[indexes[1][0]][0], prevArr[indexes[1][0]][1]];
                    arr[indexes[1][3]] = [prevArr[indexes[1][1]][0], prevArr[indexes[1][1]][1]];
                    return arr;
                });

                break;
            }
            case 'r': {
                for (let i = 0; i < 4; i++) {
                    cornerPiecesPositions.forEach((position, index) => {
                        if (JSON.stringify(position) === JSON.stringify(SIDES.R.CORNERS.POSITIONS[i])) indexes[0][i] = index;
                    });
                    edgePiecesPositions.forEach((position, index) => {
                        if (JSON.stringify(position) === JSON.stringify(SIDES.R.EDGES.POSITIONS[i])) indexes[1][i] = index;
                    });
                }
                setCornerPiecesPositions((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[0][0]] = [prevArr[indexes[0][2]][0], prevArr[indexes[0][2]][2], prevArr[indexes[0][2]][1]];
                    arr[indexes[0][1]] = [prevArr[indexes[0][0]][0], prevArr[indexes[0][0]][2], prevArr[indexes[0][0]][1]];
                    arr[indexes[0][2]] = [prevArr[indexes[0][3]][0], prevArr[indexes[0][3]][2], prevArr[indexes[0][3]][1]];
                    arr[indexes[0][3]] = [prevArr[indexes[0][1]][0], prevArr[indexes[0][1]][2], prevArr[indexes[0][1]][1]];
                    return arr;
                });

                setCornerPiecesRotations((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[0][0]] = [prevArr[indexes[0][2]][0], prevArr[indexes[0][2]][2], prevArr[indexes[0][2]][1]];
                    arr[indexes[0][1]] = [prevArr[indexes[0][0]][0], prevArr[indexes[0][0]][2], prevArr[indexes[0][0]][1]];
                    arr[indexes[0][2]] = [prevArr[indexes[0][3]][0], prevArr[indexes[0][3]][2], prevArr[indexes[0][3]][1]];
                    arr[indexes[0][3]] = [prevArr[indexes[0][1]][0], prevArr[indexes[0][1]][2], prevArr[indexes[0][1]][1]];
                    return arr;
                });

                setEdgePiecesPositions((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[1][0]] = [prevArr[indexes[1][3]][0], prevArr[indexes[1][3]][1]];
                    arr[indexes[1][1]] = [prevArr[indexes[1][2]][0], prevArr[indexes[1][2]][1]];
                    arr[indexes[1][2]] = [prevArr[indexes[1][0]][0], prevArr[indexes[1][0]][1]];
                    arr[indexes[1][3]] = [prevArr[indexes[1][1]][0], prevArr[indexes[1][1]][1]];
                    return arr;
                });

                setEdgePiecesRotations((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[1][0]] = [prevArr[indexes[1][3]][0], prevArr[indexes[1][3]][1]];
                    arr[indexes[1][1]] = [prevArr[indexes[1][2]][0], prevArr[indexes[1][2]][1]];
                    arr[indexes[1][2]] = [prevArr[indexes[1][0]][0], prevArr[indexes[1][0]][1]];
                    arr[indexes[1][3]] = [prevArr[indexes[1][1]][0], prevArr[indexes[1][1]][1]];
                    return arr;
                });

                break;
            }
            case 'R': {
                for (let i = 0; i < 4; i++) {
                    cornerPiecesPositions.forEach((position, index) => {
                        if (JSON.stringify(position) === JSON.stringify(SIDES.R.CORNERS.POSITIONS[i])) indexes[0][i] = index;
                    });
                    edgePiecesPositions.forEach((position, index) => {
                        if (JSON.stringify(position) === JSON.stringify(SIDES.R.EDGES.POSITIONS[i])) indexes[1][i] = index;
                    });
                }
                setCornerPiecesPositions((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[0][0]] = [prevArr[indexes[0][1]][0], prevArr[indexes[0][1]][2], prevArr[indexes[0][1]][1]];
                    arr[indexes[0][1]] = [prevArr[indexes[0][3]][0], prevArr[indexes[0][3]][2], prevArr[indexes[0][3]][1]];
                    arr[indexes[0][2]] = [prevArr[indexes[0][0]][0], prevArr[indexes[0][0]][2], prevArr[indexes[0][0]][1]];
                    arr[indexes[0][3]] = [prevArr[indexes[0][2]][0], prevArr[indexes[0][2]][2], prevArr[indexes[0][2]][1]];
                    return arr;
                });

                setCornerPiecesRotations((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[0][0]] = [prevArr[indexes[0][1]][0], prevArr[indexes[0][1]][2], prevArr[indexes[0][1]][1]];
                    arr[indexes[0][1]] = [prevArr[indexes[0][3]][0], prevArr[indexes[0][3]][2], prevArr[indexes[0][3]][1]];
                    arr[indexes[0][2]] = [prevArr[indexes[0][0]][0], prevArr[indexes[0][0]][2], prevArr[indexes[0][0]][1]];
                    arr[indexes[0][3]] = [prevArr[indexes[0][2]][0], prevArr[indexes[0][2]][2], prevArr[indexes[0][2]][1]];
                    return arr;
                });

                setEdgePiecesPositions((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[1][0]] = [prevArr[indexes[1][2]][0], prevArr[indexes[1][2]][1]];
                    arr[indexes[1][1]] = [prevArr[indexes[1][3]][0], prevArr[indexes[1][3]][1]];
                    arr[indexes[1][2]] = [prevArr[indexes[1][1]][0], prevArr[indexes[1][1]][1]];
                    arr[indexes[1][3]] = [prevArr[indexes[1][0]][0], prevArr[indexes[1][0]][1]];
                    return arr;
                });

                setEdgePiecesRotations((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[1][0]] = [prevArr[indexes[1][2]][0], prevArr[indexes[1][2]][1]];
                    arr[indexes[1][1]] = [prevArr[indexes[1][3]][0], prevArr[indexes[1][3]][1]];
                    arr[indexes[1][2]] = [prevArr[indexes[1][1]][0], prevArr[indexes[1][1]][1]];
                    arr[indexes[1][3]] = [prevArr[indexes[1][0]][0], prevArr[indexes[1][0]][1]];
                    return arr;
                });

                break;
            }
            case 'm': {
                for (let i = 0; i < 4; i++) {
                    centerPiecesPositions.forEach((position, index) => {
                        if (JSON.stringify(position) === JSON.stringify(SIDES.M.CENTERS.POSITIONS[i])) indexes[0][i] = index;
                    });
                    edgePiecesPositions.forEach((position, index) => {
                        if (JSON.stringify(position) === JSON.stringify(SIDES.M.EDGES.POSITIONS[i])) indexes[1][i] = index;
                    });
                }
                setCenterPiecesPositions((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[0][0]] = prevArr[indexes[0][3]];
                    arr[indexes[0][1]] = prevArr[indexes[0][2]];
                    arr[indexes[0][2]] = prevArr[indexes[0][0]];
                    arr[indexes[0][3]] = prevArr[indexes[0][1]];
                    return arr;
                });

                setCenterPiecesRotations((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[0][0]] = prevArr[indexes[0][3]];
                    arr[indexes[0][1]] = prevArr[indexes[0][2]];
                    arr[indexes[0][2]] = prevArr[indexes[0][0]];
                    arr[indexes[0][3]] = prevArr[indexes[0][1]];
                    return arr;
                });

                setEdgePiecesPositions((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[1][0]] = [prevArr[indexes[1][2]][1], prevArr[indexes[1][2]][0]];
                    arr[indexes[1][1]] = [prevArr[indexes[1][0]][1], prevArr[indexes[1][0]][0]];
                    arr[indexes[1][2]] = [prevArr[indexes[1][3]][1], prevArr[indexes[1][3]][0]];
                    arr[indexes[1][3]] = [prevArr[indexes[1][1]][1], prevArr[indexes[1][1]][0]];
                    return arr;
                });

                setEdgePiecesRotations((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[1][0]] = [prevArr[indexes[1][2]][1], prevArr[indexes[1][2]][0]];
                    arr[indexes[1][1]] = [prevArr[indexes[1][0]][1], prevArr[indexes[1][0]][0]];
                    arr[indexes[1][2]] = [prevArr[indexes[1][3]][1], prevArr[indexes[1][3]][0]];
                    arr[indexes[1][3]] = [prevArr[indexes[1][1]][1], prevArr[indexes[1][1]][0]];
                    return arr;
                });

                break;
            }
            case 'M': {
                for (let i = 0; i < 4; i++) {
                    centerPiecesPositions.forEach((position, index) => {
                        if (JSON.stringify(position) === JSON.stringify(SIDES.M.CENTERS.POSITIONS[i])) indexes[0][i] = index;
                    });
                    edgePiecesPositions.forEach((position, index) => {
                        if (JSON.stringify(position) === JSON.stringify(SIDES.M.EDGES.POSITIONS[i])) indexes[1][i] = index;
                    });
                }
                setCenterPiecesPositions((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[0][0]] = prevArr[indexes[0][2]];
                    arr[indexes[0][1]] = prevArr[indexes[0][3]];
                    arr[indexes[0][2]] = prevArr[indexes[0][1]];
                    arr[indexes[0][3]] = prevArr[indexes[0][0]];
                    return arr;
                });

                setCenterPiecesRotations((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[0][0]] = prevArr[indexes[0][2]];
                    arr[indexes[0][1]] = prevArr[indexes[0][3]];
                    arr[indexes[0][2]] = prevArr[indexes[0][1]];
                    arr[indexes[0][3]] = prevArr[indexes[0][0]];
                    return arr;
                });

                setEdgePiecesPositions((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[1][0]] = [prevArr[indexes[1][1]][1], prevArr[indexes[1][1]][0]];
                    arr[indexes[1][1]] = [prevArr[indexes[1][3]][1], prevArr[indexes[1][3]][0]];
                    arr[indexes[1][2]] = [prevArr[indexes[1][0]][1], prevArr[indexes[1][0]][0]];
                    arr[indexes[1][3]] = [prevArr[indexes[1][2]][1], prevArr[indexes[1][2]][0]];
                    return arr;
                });

                setEdgePiecesRotations((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[1][0]] = [prevArr[indexes[1][1]][1], prevArr[indexes[1][1]][0]];
                    arr[indexes[1][1]] = [prevArr[indexes[1][3]][1], prevArr[indexes[1][3]][0]];
                    arr[indexes[1][2]] = [prevArr[indexes[1][0]][1], prevArr[indexes[1][0]][0]];
                    arr[indexes[1][3]] = [prevArr[indexes[1][2]][1], prevArr[indexes[1][2]][0]];
                    return arr;
                });

                break;
            }
            case 'e': {
                for (let i = 0; i < 4; i++) {
                    centerPiecesPositions.forEach((position, index) => {
                        if (JSON.stringify(position) === JSON.stringify(SIDES.E.CENTERS.POSITIONS[i])) indexes[0][i] = index;
                    });
                    edgePiecesPositions.forEach((position, index) => {
                        if (JSON.stringify(position) === JSON.stringify(SIDES.E.EDGES.POSITIONS[i])) indexes[1][i] = index;
                    });
                }
                setCenterPiecesPositions((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[0][0]] = prevArr[indexes[0][2]];
                    arr[indexes[0][1]] = prevArr[indexes[0][3]];
                    arr[indexes[0][2]] = prevArr[indexes[0][1]];
                    arr[indexes[0][3]] = prevArr[indexes[0][0]];
                    return arr;
                });

                setCenterPiecesRotations((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[0][0]] = prevArr[indexes[0][2]];
                    arr[indexes[0][1]] = prevArr[indexes[0][3]];
                    arr[indexes[0][2]] = prevArr[indexes[0][1]];
                    arr[indexes[0][3]] = prevArr[indexes[0][0]];
                    return arr;
                });

                setEdgePiecesPositions((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[1][0]] = [prevArr[indexes[1][2]][1], prevArr[indexes[1][2]][0]];
                    arr[indexes[1][1]] = [prevArr[indexes[1][0]][1], prevArr[indexes[1][0]][0]];
                    arr[indexes[1][2]] = [prevArr[indexes[1][3]][1], prevArr[indexes[1][3]][0]];
                    arr[indexes[1][3]] = [prevArr[indexes[1][1]][1], prevArr[indexes[1][1]][0]];
                    return arr;
                });

                setEdgePiecesRotations((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[1][0]] = [prevArr[indexes[1][2]][1], prevArr[indexes[1][2]][0]];
                    arr[indexes[1][1]] = [prevArr[indexes[1][0]][1], prevArr[indexes[1][0]][0]];
                    arr[indexes[1][2]] = [prevArr[indexes[1][3]][1], prevArr[indexes[1][3]][0]];
                    arr[indexes[1][3]] = [prevArr[indexes[1][1]][1], prevArr[indexes[1][1]][0]];
                    return arr;
                });

                break;
            }
            case 'E': {
                for (let i = 0; i < 4; i++) {
                    centerPiecesPositions.forEach((position, index) => {
                        if (JSON.stringify(position) === JSON.stringify(SIDES.E.CENTERS.POSITIONS[i])) indexes[0][i] = index;
                    });
                    edgePiecesPositions.forEach((position, index) => {
                        if (JSON.stringify(position) === JSON.stringify(SIDES.E.EDGES.POSITIONS[i])) indexes[1][i] = index;
                    });
                }
                setCenterPiecesPositions((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[0][0]] = prevArr[indexes[0][3]];
                    arr[indexes[0][1]] = prevArr[indexes[0][2]];
                    arr[indexes[0][2]] = prevArr[indexes[0][0]];
                    arr[indexes[0][3]] = prevArr[indexes[0][1]];
                    return arr;
                });

                setCenterPiecesRotations((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[0][0]] = prevArr[indexes[0][3]];
                    arr[indexes[0][1]] = prevArr[indexes[0][2]];
                    arr[indexes[0][2]] = prevArr[indexes[0][0]];
                    arr[indexes[0][3]] = prevArr[indexes[0][1]];
                    return arr;
                });

                setEdgePiecesPositions((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[1][0]] = [prevArr[indexes[1][1]][1], prevArr[indexes[1][1]][0]];
                    arr[indexes[1][1]] = [prevArr[indexes[1][3]][1], prevArr[indexes[1][3]][0]];
                    arr[indexes[1][2]] = [prevArr[indexes[1][0]][1], prevArr[indexes[1][0]][0]];
                    arr[indexes[1][3]] = [prevArr[indexes[1][2]][1], prevArr[indexes[1][2]][0]];
                    return arr;
                });

                setEdgePiecesRotations((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[1][0]] = [prevArr[indexes[1][1]][1], prevArr[indexes[1][1]][0]];
                    arr[indexes[1][1]] = [prevArr[indexes[1][3]][1], prevArr[indexes[1][3]][0]];
                    arr[indexes[1][2]] = [prevArr[indexes[1][0]][1], prevArr[indexes[1][0]][0]];
                    arr[indexes[1][3]] = [prevArr[indexes[1][2]][1], prevArr[indexes[1][2]][0]];
                    return arr;
                });

                break;
            }
            case 's': {
                for (let i = 0; i < 4; i++) {
                    centerPiecesPositions.forEach((position, index) => {
                        if (JSON.stringify(position) === JSON.stringify(SIDES.S.CENTERS.POSITIONS[i])) indexes[0][i] = index;
                    });
                    edgePiecesPositions.forEach((position, index) => {
                        if (JSON.stringify(position) === JSON.stringify(SIDES.S.EDGES.POSITIONS[i])) indexes[1][i] = index;
                    });
                }
                setCenterPiecesPositions((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[0][0]] = prevArr[indexes[0][2]];
                    arr[indexes[0][1]] = prevArr[indexes[0][3]];
                    arr[indexes[0][2]] = prevArr[indexes[0][1]];
                    arr[indexes[0][3]] = prevArr[indexes[0][0]];
                    return arr;
                });

                setCenterPiecesRotations((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[0][0]] = prevArr[indexes[0][2]];
                    arr[indexes[0][1]] = prevArr[indexes[0][3]];
                    arr[indexes[0][2]] = prevArr[indexes[0][1]];
                    arr[indexes[0][3]] = prevArr[indexes[0][0]];
                    return arr;
                });

                setEdgePiecesPositions((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[1][0]] = [prevArr[indexes[1][2]][1], prevArr[indexes[1][2]][0]];
                    arr[indexes[1][1]] = [prevArr[indexes[1][0]][1], prevArr[indexes[1][0]][0]];
                    arr[indexes[1][2]] = [prevArr[indexes[1][3]][1], prevArr[indexes[1][3]][0]];
                    arr[indexes[1][3]] = [prevArr[indexes[1][1]][1], prevArr[indexes[1][1]][0]];
                    return arr;
                });

                setEdgePiecesRotations((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[1][0]] = [prevArr[indexes[1][2]][1], prevArr[indexes[1][2]][0]];
                    arr[indexes[1][1]] = [prevArr[indexes[1][0]][1], prevArr[indexes[1][0]][0]];
                    arr[indexes[1][2]] = [prevArr[indexes[1][3]][1], prevArr[indexes[1][3]][0]];
                    arr[indexes[1][3]] = [prevArr[indexes[1][1]][1], prevArr[indexes[1][1]][0]];
                    return arr;
                });

                break;
            }
            case 'S': {
                for (let i = 0; i < 4; i++) {
                    centerPiecesPositions.forEach((position, index) => {
                        if (JSON.stringify(position) === JSON.stringify(SIDES.S.CENTERS.POSITIONS[i])) indexes[0][i] = index;
                    });
                    edgePiecesPositions.forEach((position, index) => {
                        if (JSON.stringify(position) === JSON.stringify(SIDES.S.EDGES.POSITIONS[i])) indexes[1][i] = index;
                    });
                }
                setCenterPiecesPositions((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[0][0]] = prevArr[indexes[0][3]];
                    arr[indexes[0][1]] = prevArr[indexes[0][2]];
                    arr[indexes[0][2]] = prevArr[indexes[0][0]];
                    arr[indexes[0][3]] = prevArr[indexes[0][1]];
                    return arr;
                });

                setCenterPiecesRotations((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[0][0]] = prevArr[indexes[0][3]];
                    arr[indexes[0][1]] = prevArr[indexes[0][2]];
                    arr[indexes[0][2]] = prevArr[indexes[0][0]];
                    arr[indexes[0][3]] = prevArr[indexes[0][1]];
                    return arr;
                });

                setEdgePiecesPositions((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[1][0]] = [prevArr[indexes[1][1]][1], prevArr[indexes[1][1]][0]];
                    arr[indexes[1][1]] = [prevArr[indexes[1][3]][1], prevArr[indexes[1][3]][0]];
                    arr[indexes[1][2]] = [prevArr[indexes[1][0]][1], prevArr[indexes[1][0]][0]];
                    arr[indexes[1][3]] = [prevArr[indexes[1][2]][1], prevArr[indexes[1][2]][0]];
                    return arr;
                });

                setEdgePiecesRotations((prevArr) => {
                    let arr = [...prevArr];
                    arr[indexes[1][0]] = [prevArr[indexes[1][1]][1], prevArr[indexes[1][1]][0]];
                    arr[indexes[1][1]] = [prevArr[indexes[1][3]][1], prevArr[indexes[1][3]][0]];
                    arr[indexes[1][2]] = [prevArr[indexes[1][0]][1], prevArr[indexes[1][0]][0]];
                    arr[indexes[1][3]] = [prevArr[indexes[1][2]][1], prevArr[indexes[1][2]][0]];
                    return arr;
                });

                break;
            }
            default:
                console.error('Invalid side');
        }
    };

    // INDEXES FINDER CODE
    //
    //
    //
    //    for (let i = 0; i < 4; i++) {
    //        cornerPiecesPositions.forEach((position, index) => {
    //            if (JSON.stringify(position) === JSON.stringify(SIDES.F.CORNERS.POSITIONS[i])) indexes[0][i] = index;
    //        });
    //        edgePiecesPositions.forEach((position, index) => {
    //            if (JSON.stringify(position) === JSON.stringify(SIDES.F.EDGES.POSITIONS[i])) indexes[1][i] = index;
    //        });
    //    }

    useEffect(() => {
        document.addEventListener('keyup', (event) => {
            var key = event.key;
            // f = front, b = back, u = up, d = down, l = left, r = right, m = middle, e = equator , s = standing, uppercase = counter-clockwise, lowercase = clockwise
            if (key === 'f') rotateSide('f');
            if (key === 'F') rotateSide('F');
            if (key === 'b') rotateSide('b');
            if (key === 'B') rotateSide('B');
            if (key === 'u') rotateSide('u');
            if (key === 'U') rotateSide('U');
            if (key === 'd') rotateSide('d');
            if (key === 'D') rotateSide('D');
            if (key === 'l') rotateSide('l');
            if (key === 'L') rotateSide('L');
            if (key === 'r') rotateSide('r');
            if (key === 'R') rotateSide('R');
            if (key === 'm') rotateSide('m');
            if (key === 'M') rotateSide('M');
            if (key === 'e') rotateSide('e');
            if (key === 'E') rotateSide('E');
            if (key === 's') rotateSide('s');
            if (key === 'S') rotateSide('S');
            if (key === 'x') {
                rotateSide('r');
                rotateSide('L');
                rotateSide('M');
            }
            if (key === 'X') {
                rotateSide('R');
                rotateSide('l');
                rotateSide('m');
            }
            if (key === 'y') {
                rotateSide('U');
                rotateSide('d');
                rotateSide('E');
            }
            if (key === 'Y') {
                rotateSide('u');
                rotateSide('D');
                rotateSide('e');
            }
            if (key === 'z') {
                rotateSide('f');
                rotateSide('B');
                rotateSide('s');
            }
            if (key === 'Z') {
                rotateSide('F');
                rotateSide('b');
                rotateSide('S');
            }
        });
    }, []);

    const renderCenterPieces = () => {
        return centerPiecesColors.map((color, index) => {
            return <CenterPiece key={index} color={color} position={centerPiecesPositions[index]} rotation={centerPiecesRotations[index]} />;
        });
    };

    const renderEdgePieces = () => {
        return edgePiecesColors.map((color, index) => {
            return (
                <EdgePiece
                    key={index}
                    color1={color[0]}
                    color2={color[1]}
                    position1={edgePiecesPositions[index][0]}
                    position2={edgePiecesPositions[index][1]}
                    rotation1={edgePiecesRotations[index][0]}
                    rotation2={edgePiecesRotations[index][1]}
                />
            );
        });
    };

    const renderCornerPieces = () => {
        return cornerPiecesColors.map((color, index) => {
            return (
                <CornerPiece
                    key={index}
                    color1={color[0]}
                    color2={color[1]}
                    color3={color[2]}
                    position1={cornerPiecesPositions[index][0]}
                    position2={cornerPiecesPositions[index][1]}
                    position3={cornerPiecesPositions[index][2]}
                    rotation1={cornerPiecesRotations[index][0]}
                    rotation2={cornerPiecesRotations[index][1]}
                    rotation3={cornerPiecesRotations[index][2]}
                />
            );
        });
    };
    return (
        <>
            {renderCenterPieces()}
            {renderEdgePieces()}
            {renderCornerPieces()}
        </>
    );
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
