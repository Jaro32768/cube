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

    const initValues = {
        // f b u d l r
        centerPiecesColors: ['#0f0', '#00f', '#fff', '#ff0', '#f00', '#f90'],
        centerPiecesPositions: [
            [0, 0, 1.5],
            [0, 0, -1.5],
            [0, 1.5, 0],
            [0, -1.5, 0],
            [1.5, 0, 0],
            [-1.5, 0, 0],
        ],
        centerPiecesRotations: [
            [0, Math.PI / 2, 0],
            [0, Math.PI / 2, 0],
            [0, 0, Math.PI / 2],
            [0, 0, Math.PI / 2],
            [0, 0, 0],
            [0, 0, 0],
        ],

        // ru lu rd ld
        // rf lf rb lb
        // fu bu fd bd
        edgePiecesColors: [
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
        ],
        edgePiecesPositions: [
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
        ],
        edgePiecesRotations: [
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
        ],

        // rfu lfu rfd lfd
        // rbu lbu rbd lbd
        cornerPiecesColors: [
            ['#f00', '#0f0', '#fff'],
            ['#f90', '#0f0', '#fff'],
            ['#f00', '#0f0', '#ff0'],
            ['#f90', '#0f0', '#ff0'],
            ['#f00', '#00f', '#fff'],
            ['#f90', '#00f', '#fff'],
            ['#f00', '#00f', '#ff0'],
            ['#f90', '#00f', '#ff0'],
        ],
        cornerPiecesPositions: [
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
        ],
        cornerPiecesRotations: [
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
        ],
    };

    const [centerPiecesColors, setCenterPiecesColors] = useState(initValues.centerPiecesColors);
    const [centerPiecesPositions, setCenterPiecesPositions] = useState(initValues.centerPiecesPositions);
    const [centerPiecesRotations, setCenterPiecesRotations] = useState(initValues.centerPiecesRotations);
    const [edgePiecesColors, setEdgePiecesColors] = useState(initValues.edgePiecesColors);
    const [edgePiecesPositions, setEdgePiecesPositions] = useState(initValues.edgePiecesPositions);
    const [edgePiecesRotations, setEdgePiecesRotations] = useState(initValues.edgePiecesRotations);
    const [cornerPiecesColors, setCornerPiecesColors] = useState(initValues.cornerPiecesColors);
    const [cornerPiecesPositions, setCornerPiecesPositions] = useState(initValues.cornerPiecesPositions);
    const [cornerPiecesRotations, setCornerPiecesRotations] = useState(initValues.cornerPiecesRotations);

    useEffect(() => {
        let moveTimeline = '';

        document.addEventListener('keyup', (event) => {
            var key = event.key;
            // f = front, b = back, u = up, d = down, l = left, r = right, m = middle, e = equator , s = standing, uppercase = counter-clockwise, lowercase = clockwise
            if (key === 'f') rotateSideNew('f');
            if (key === 'F') rotateSideNew('F');
            if (key === 'b') rotateSideNew('b');
            if (key === 'B') rotateSideNew('B');
            if (key === 'u') rotateSideNew('u');
            if (key === 'U') rotateSideNew('U');
            if (key === 'd') rotateSideNew('d');
            if (key === 'D') rotateSideNew('D');
            if (key === 'l') rotateSideNew('l');
            if (key === 'L') rotateSideNew('L');
            if (key === 'r') rotateSideNew('r');
            if (key === 'R') rotateSideNew('R');
            if (key === 'm') rotateSideNew('m');
            if (key === 'M') rotateSideNew('M');
            if (key === 'e') rotateSideNew('e');
            if (key === 'E') rotateSideNew('E');
            if (key === 's') rotateSideNew('s');
            if (key === 'S') rotateSideNew('S');
            if (key === 'x') {
                rotateSideNew('r');
                rotateSideNew('L');
                rotateSideNew('M');
            }
            if (key === 'X') {
                rotateSideNew('R');
                rotateSideNew('l');
                rotateSideNew('m');
            }
            if (key === 'y') {
                rotateSideNew('U');
                rotateSideNew('d');
                rotateSideNew('e');
            }
            if (key === 'Y') {
                rotateSideNew('u');
                rotateSideNew('D');
                rotateSideNew('E');
            }
            if (key === 'z') {
                rotateSideNew('f');
                rotateSideNew('B');
                rotateSideNew('s');
            }
            if (key === 'Z') {
                rotateSideNew('F');
                rotateSideNew('b');
                rotateSideNew('S');
            }
        });

        // threejs and react don't like each other and that causes moves to run in reverse, this function reverses them back
        const rotateSideNew = (side) => {
            moveTimeline += side;
            let newMoveTimeline = moveTimeline.split('').reverse().join('');

            setCenterPiecesColors(initValues.centerPiecesColors);
            setCenterPiecesPositions(initValues.centerPiecesPositions);
            setCenterPiecesRotations(initValues.centerPiecesRotations);
            setEdgePiecesColors(initValues.edgePiecesColors);
            setEdgePiecesPositions(initValues.edgePiecesPositions);
            setEdgePiecesRotations(initValues.edgePiecesRotations);
            setCornerPiecesColors(initValues.cornerPiecesColors);
            setCornerPiecesPositions(initValues.cornerPiecesPositions);
            setCornerPiecesRotations(initValues.cornerPiecesRotations);

            for (let i = 0; i < newMoveTimeline.length; i++) {
                rotateSide(newMoveTimeline[i]);
            }
        };

        const getCornerPiecesIndexes = (sharedIndex, values) => {
            let indexes = [-1, -1, -1, -1];

            cornerPiecesPositions.forEach((position, index) => {
                if (
                    Number(JSON.stringify(position[0][sharedIndex])) === values[0] &&
                    Number(JSON.stringify(position[1][sharedIndex])) === values[1] &&
                    Number(JSON.stringify(position[2][sharedIndex])) === values[2]
                )
                    for (let i = 0; i < 4; i++)
                        if (indexes[i] === -1) {
                            indexes[i] = index;
                            break;
                        }
            });
            return indexes;
        };

        const getEdgePiecesIndexes = (sharedIndex, values) => {
            let indexes = [-1, -1, -1, -1];

            edgePiecesPositions.forEach((position, index) => {
                if (
                    (Number(JSON.stringify(position[0][sharedIndex])) === values[0] && Number(JSON.stringify(position[1][sharedIndex])) === values[1]) ||
                    (Number(JSON.stringify(position[0][sharedIndex])) === values[1] && Number(JSON.stringify(position[1][sharedIndex])) === values[0])
                )
                    for (let i = 0; i < 4; i++)
                        if (indexes[i] === -1) {
                            indexes[i] = index;
                            break;
                        }
            });
            return indexes;
        };

        const getCenterPiecesIndexes = (sharedIndex, values) => {
            let indexes = [-1, -1, -1, -1];

            centerPiecesPositions.forEach((position, index) => {
                if (Number(JSON.stringify(position[sharedIndex])) === values)
                    for (let i = 0; i < 4; i++)
                        if (indexes[i] === -1) {
                            indexes[i] = index;
                            break;
                        }
            });
            return indexes;
        };

        const updateCornerPieces = (indexes, sharedIndex, oldPositionIndexes, lastIndexes) => {
            setCornerPiecesPositions((prevArr) => {
                let arr = [...prevArr];
                arr[indexes[sharedIndex][0]] = [
                    prevArr[indexes[sharedIndex][oldPositionIndexes[0]]][lastIndexes[0]],
                    prevArr[indexes[sharedIndex][oldPositionIndexes[0]]][lastIndexes[1]],
                    prevArr[indexes[sharedIndex][oldPositionIndexes[0]]][lastIndexes[2]],
                ];
                arr[indexes[sharedIndex][1]] = [
                    prevArr[indexes[sharedIndex][oldPositionIndexes[1]]][lastIndexes[0]],
                    prevArr[indexes[sharedIndex][oldPositionIndexes[1]]][lastIndexes[1]],
                    prevArr[indexes[sharedIndex][oldPositionIndexes[1]]][lastIndexes[2]],
                ];
                arr[indexes[sharedIndex][2]] = [
                    prevArr[indexes[sharedIndex][oldPositionIndexes[2]]][lastIndexes[0]],
                    prevArr[indexes[sharedIndex][oldPositionIndexes[2]]][lastIndexes[1]],
                    prevArr[indexes[sharedIndex][oldPositionIndexes[2]]][lastIndexes[2]],
                ];
                arr[indexes[sharedIndex][3]] = [
                    prevArr[indexes[sharedIndex][oldPositionIndexes[3]]][lastIndexes[0]],
                    prevArr[indexes[sharedIndex][oldPositionIndexes[3]]][lastIndexes[1]],
                    prevArr[indexes[sharedIndex][oldPositionIndexes[3]]][lastIndexes[2]],
                ];
                return arr;
            });
            setCornerPiecesRotations((prevArr) => {
                let arr = [...prevArr];
                arr[indexes[sharedIndex][0]] = [
                    prevArr[indexes[sharedIndex][oldPositionIndexes[0]]][lastIndexes[0]],
                    prevArr[indexes[sharedIndex][oldPositionIndexes[0]]][lastIndexes[1]],
                    prevArr[indexes[sharedIndex][oldPositionIndexes[0]]][lastIndexes[2]],
                ];
                arr[indexes[sharedIndex][1]] = [
                    prevArr[indexes[sharedIndex][oldPositionIndexes[1]]][lastIndexes[0]],
                    prevArr[indexes[sharedIndex][oldPositionIndexes[1]]][lastIndexes[1]],
                    prevArr[indexes[sharedIndex][oldPositionIndexes[1]]][lastIndexes[2]],
                ];
                arr[indexes[sharedIndex][2]] = [
                    prevArr[indexes[sharedIndex][oldPositionIndexes[2]]][lastIndexes[0]],
                    prevArr[indexes[sharedIndex][oldPositionIndexes[2]]][lastIndexes[1]],
                    prevArr[indexes[sharedIndex][oldPositionIndexes[2]]][lastIndexes[2]],
                ];
                arr[indexes[sharedIndex][3]] = [
                    prevArr[indexes[sharedIndex][oldPositionIndexes[3]]][lastIndexes[0]],
                    prevArr[indexes[sharedIndex][oldPositionIndexes[3]]][lastIndexes[1]],
                    prevArr[indexes[sharedIndex][oldPositionIndexes[3]]][lastIndexes[2]],
                ];
                return arr;
            });
        };

        const updateEdgePieces = (indexes, sharedIndex, oldPositionIndexes, lastIndexes) => {
            setEdgePiecesPositions((prevArr) => {
                let arr = [...prevArr];
                arr[indexes[sharedIndex][0]] = [
                    prevArr[indexes[sharedIndex][oldPositionIndexes[0]]][lastIndexes[0]],
                    prevArr[indexes[sharedIndex][oldPositionIndexes[0]]][lastIndexes[1]],
                ];
                arr[indexes[sharedIndex][1]] = [
                    prevArr[indexes[sharedIndex][oldPositionIndexes[1]]][lastIndexes[0]],
                    prevArr[indexes[sharedIndex][oldPositionIndexes[1]]][lastIndexes[1]],
                ];
                arr[indexes[sharedIndex][2]] = [
                    prevArr[indexes[sharedIndex][oldPositionIndexes[2]]][lastIndexes[0]],
                    prevArr[indexes[sharedIndex][oldPositionIndexes[2]]][lastIndexes[1]],
                ];
                arr[indexes[sharedIndex][3]] = [
                    prevArr[indexes[sharedIndex][oldPositionIndexes[3]]][lastIndexes[0]],
                    prevArr[indexes[sharedIndex][oldPositionIndexes[3]]][lastIndexes[1]],
                ];
                return arr;
            });
            setEdgePiecesRotations((prevArr) => {
                let arr = [...prevArr];
                arr[indexes[sharedIndex][0]] = [
                    prevArr[indexes[sharedIndex][oldPositionIndexes[0]]][lastIndexes[0]],
                    prevArr[indexes[sharedIndex][oldPositionIndexes[0]]][lastIndexes[1]],
                ];
                arr[indexes[sharedIndex][1]] = [
                    prevArr[indexes[sharedIndex][oldPositionIndexes[1]]][lastIndexes[0]],
                    prevArr[indexes[sharedIndex][oldPositionIndexes[1]]][lastIndexes[1]],
                ];
                arr[indexes[sharedIndex][2]] = [
                    prevArr[indexes[sharedIndex][oldPositionIndexes[2]]][lastIndexes[0]],
                    prevArr[indexes[sharedIndex][oldPositionIndexes[2]]][lastIndexes[1]],
                ];
                arr[indexes[sharedIndex][3]] = [
                    prevArr[indexes[sharedIndex][oldPositionIndexes[3]]][lastIndexes[0]],
                    prevArr[indexes[sharedIndex][oldPositionIndexes[3]]][lastIndexes[1]],
                ];
                return arr;
            });
        };

        const updateCenterPieces = (indexes, sharedIndex, oldPositionIndexes) => {
            setCenterPiecesPositions((prevArr) => {
                let arr = [...prevArr];
                arr[indexes[sharedIndex][0]] = prevArr[indexes[sharedIndex][oldPositionIndexes[0]]];
                arr[indexes[sharedIndex][1]] = prevArr[indexes[sharedIndex][oldPositionIndexes[1]]];
                arr[indexes[sharedIndex][2]] = prevArr[indexes[sharedIndex][oldPositionIndexes[2]]];
                arr[indexes[sharedIndex][3]] = prevArr[indexes[sharedIndex][oldPositionIndexes[3]]];
                return arr;
            });
            setCenterPiecesRotations((prevArr) => {
                let arr = [...prevArr];
                arr[indexes[sharedIndex][0]] = prevArr[indexes[sharedIndex][oldPositionIndexes[0]]];
                arr[indexes[sharedIndex][1]] = prevArr[indexes[sharedIndex][oldPositionIndexes[1]]];
                arr[indexes[sharedIndex][2]] = prevArr[indexes[sharedIndex][oldPositionIndexes[2]]];
                arr[indexes[sharedIndex][3]] = prevArr[indexes[sharedIndex][oldPositionIndexes[3]]];
                return arr;
            });
        };

        const rotateSide = (side) => {
            let indexes = [
                [-1, -1, -1, -1],
                [-1, -1, -1, -1],
            ];

            switch (String(side).toLowerCase()) {
                case 'f': {
                    indexes = [getCornerPiecesIndexes(2, [1, 1.5, 1]), getEdgePiecesIndexes(2, [1, 1.5])];
                    break;
                }
                case 'b': {
                    indexes = [getCornerPiecesIndexes(2, [-1, -1.5, -1]), getEdgePiecesIndexes(2, [-1, -1.5])];
                    break;
                }
                case 'u': {
                    indexes = [getCornerPiecesIndexes(1, [1, 1, 1.5]), getEdgePiecesIndexes(1, [1, 1.5])];
                    break;
                }
                case 'd': {
                    indexes = [getCornerPiecesIndexes(1, [-1, -1, -1.5]), getEdgePiecesIndexes(1, [-1, -1.5])];
                    break;
                }
                case 'l': {
                    indexes = [getCornerPiecesIndexes(0, [-1.5, -1, -1]), getEdgePiecesIndexes(0, [-1, -1.5])];
                    break;
                }
                case 'r': {
                    indexes = [getCornerPiecesIndexes(0, [1.5, 1, 1]), getEdgePiecesIndexes(0, [1, 1.5])];
                    break;
                }
                case 'm': {
                    indexes = [getCenterPiecesIndexes(0, 0), getEdgePiecesIndexes(0, [0, 0])];
                    break;
                }
                case 'e': {
                    indexes = [getCenterPiecesIndexes(1, 0), getEdgePiecesIndexes(1, [0, 0])];
                    break;
                }
                case 's': {
                    indexes = [getCenterPiecesIndexes(2, 0), getEdgePiecesIndexes(2, [0, 0])];
                    break;
                }
                default:
                    console.error('Invalid side');
            }

            switch (side) {
                case 'f':
                case 'B': {
                    updateCornerPieces(indexes, 0, [2, 0, 3, 1], [2, 1, 0]);
                    updateEdgePieces(indexes, 1, [3, 2, 0, 1], [1, 0]);
                    break;
                }
                case 'b':
                case 'F': {
                    updateCornerPieces(indexes, 0, [1, 3, 0, 2], [2, 1, 0]);
                    updateEdgePieces(indexes, 1, [2, 3, 1, 0], [1, 0]);
                    break;
                }
                case 'u':
                case 'D': {
                    updateCornerPieces(indexes, 0, [1, 3, 0, 2], [1, 0, 2]);
                    updateEdgePieces(indexes, 1, [2, 3, 1, 0], [0, 1]);
                    break;
                }
                case 'U':
                case 'd': {
                    updateCornerPieces(indexes, 0, [2, 0, 3, 1], [1, 0, 2]);
                    updateEdgePieces(indexes, 1, [3, 2, 0, 1], [0, 1]);
                    break;
                }
                case 'l':
                case 'R': {
                    updateCornerPieces(indexes, 0, [1, 3, 0, 2], [0, 2, 1]);
                    updateEdgePieces(indexes, 1, [2, 3, 1, 0], [0, 1]);
                    break;
                }
                case 'L':
                case 'r': {
                    updateCornerPieces(indexes, 0, [2, 0, 3, 1], [0, 2, 1]);
                    updateEdgePieces(indexes, 1, [3, 2, 0, 1], [0, 1]);
                    break;
                }
                case 'm': {
                    updateCenterPieces(indexes, 0, [3, 2, 0, 1]);
                    updateEdgePieces(indexes, 1, [2, 0, 3, 1], [1, 0]);
                    break;
                }
                case 'M': {
                    updateCenterPieces(indexes, 0, [2, 3, 1, 0]);
                    updateEdgePieces(indexes, 1, [1, 3, 0, 2], [1, 0]);
                    break;
                }
                case 'e': {
                    updateCenterPieces(indexes, 0, [2, 3, 1, 0]);
                    updateEdgePieces(indexes, 1, [2, 0, 3, 1], [1, 0]);
                    break;
                }
                case 'E': {
                    updateCenterPieces(indexes, 0, [3, 2, 0, 1]);
                    updateEdgePieces(indexes, 1, [1, 3, 0, 2], [1, 0]);
                    break;
                }
                case 's': {
                    updateCenterPieces(indexes, 0, [2, 3, 1, 0]);
                    updateEdgePieces(indexes, 1, [2, 0, 3, 1], [1, 0]);
                    break;
                }
                case 'S': {
                    updateCenterPieces(indexes, 0, [3, 2, 0, 1]);
                    updateEdgePieces(indexes, 1, [1, 3, 0, 2], [1, 0]);
                    break;
                }
                default:
                    console.error('Invalid side');
            }
        };
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
