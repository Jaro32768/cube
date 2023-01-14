import React, { useState, useEffect } from 'react';
import CenterPiece from './CenterPiece';
import EdgePiece from './EdgePiece';
import initValues from '../data/initValues.json';
import indexes from '../data/indexes.json';
import CornerPiece from './CornerPiece';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

export default function Cube3x3x3(props) {
    ////////////////////////////////////////////////////////////////
    //                                                            //
    // f = front, b = back, u = up, d = down, l = left, r = right //
    //                                                            //
    ////////////////////////////////////////////////////////////////

    const [centerPiecesColors, setCenterPiecesColors] = useState(initValues.centerPiecesColors);
    const [centerPiecesPositions, setCenterPiecesPositions] = useState(initValues.centerPiecesPositions);
    const [centerPiecesRotations, setCenterPiecesRotations] = useState(initValues.centerPiecesRotations);
    const [edgePiecesColors, setEdgePiecesColors] = useState(initValues.edgePiecesColors);
    const [edgePiecesPositions, setEdgePiecesPositions] = useState(initValues.edgePiecesPositions);
    const [edgePiecesRotations, setEdgePiecesRotations] = useState(initValues.edgePiecesRotations);
    const [cornerPiecesColors, setCornerPiecesColors] = useState(initValues.cornerPiecesColors);
    const [cornerPiecesPositions, setCornerPiecesPositions] = useState(initValues.cornerPiecesPositions);
    const [cornerPiecesRotations, setCornerPiecesRotations] = useState(initValues.cornerPiecesRotations);
    const [wasChangedAtlestOnce, setWasChangedAtlestOnce] = useState(false);
    let moveTimeline = '';
    const buttons = [
        { label: 'F', arg: 'f' },
        { label: 'U', arg: 'u' },
        { label: 'B', arg: 'b' },
        { label: 'D', arg: 'd' },
        { label: 'R', arg: 'r' },
        { label: 'L', arg: 'l' },
        { label: 'M', arg: 'm' },
        { label: 'E', arg: 'e' },
        { label: 'S', arg: 's' },
        { label: 'x', arg: 'rLM' },
        { label: 'y', arg: 'uDE' },
        { label: 'z', arg: 'fBs' },
        { label: "F'", arg: 'F' },
        { label: "U'", arg: 'U' },
        { label: "B'", arg: 'B' },
        { label: "D'", arg: 'D' },
        { label: "R'", arg: 'R' },
        { label: "L'", arg: 'L' },
        { label: "M'", arg: 'M' },
        { label: "E'", arg: 'E' },
        { label: "S'", arg: 'S' },
        { label: "x'", arg: 'Rlm' },
        { label: "y'", arg: 'Ude' },
        { label: "z'", arg: 'FbS' },
    ];

    useEffect(() => {
        if (!wasChangedAtlestOnce) return;
        for (const [, SIDE] of Object.entries(indexes)) {
            let index, value;
            for (let i = 0; i < 3; i++) {
                if (centerPiecesPositions[SIDE.CENTER[0]][i] === 1.5 || centerPiecesPositions[SIDE.CENTER[0]][i] === -1.5) {
                    index = i;
                    value = centerPiecesPositions[SIDE.CENTER[0]][i];
                }
            }
            for (let i = 0; i < 4; i++) {
                if (edgePiecesPositions[SIDE.EDGE[i][0]][SIDE.EDGE[i][1]][index] !== value) return;
                if (cornerPiecesPositions[SIDE.CORNER[i][0]][SIDE.CORNER[i][1]][index] !== value) return;
            }
        }

        props.showSolved();
    }, [centerPiecesPositions, centerPiecesRotations, edgePiecesPositions, edgePiecesRotations, cornerPiecesPositions, cornerPiecesRotations]);

    useEffect(() => {
        let timeout = null;

        const keyMap = {
            f: 'f',
            F: 'F',
            b: 'b',
            B: 'B',
            u: 'u',
            U: 'U',
            d: 'd',
            D: 'D',
            l: 'l',
            L: 'L',
            r: 'r',
            R: 'R',
            m: 'm',
            M: 'M',
            e: 'e',
            E: 'E',
            s: 's',
            S: 'S',
            x: 'rLM',
            X: 'Rlm',
            y: 'uDE',
            Y: 'Ude',
            z: 'fBs',
            Z: 'FbS',
        };

        const handleKeyUp = (event) => {
            var key = event.key;
            if (keyMap[key]) {
                keyMap[key].split('').forEach((char) => rotateSideNew(char));
            }
            if (timeout) return;
            timeout = setTimeout(() => {
                timeout = null;
            }, 1);
            setWasChangedAtlestOnce(true);
        };

        document.addEventListener('keyup', handleKeyUp, []);
        return () => document.removeEventListener('keyup', handleKeyUp);
    }, []);

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

    const shuffleCube = () => {
        const moves = ['f', 'b', 'u', 'd', 'l', 'r', 'm', 'e', 's', 'F', 'B', 'U', 'D', 'L', 'R', 'M', 'E', 'S'];
        for (let i = 0; i < 100; i++) handleToolbarClick(moves[Math.floor(Math.random() * moves.length)]);
    };

    const handleToolbarClick = (side) => {
        document.dispatchEvent(new KeyboardEvent('keyup', { key: side }));
    };

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
            <Canvas className='canvas'>
                <OrbitControls enableZoom={false} enableDamping={false} enablePan={false} />
                <ambientLight intensity={0.5} />
                {renderCenterPieces()}
                {renderEdgePieces()}
                {renderCornerPieces()}
            </Canvas>
            <button className='reset-btn' onClick={props.resetCube}>
                Reset
            </button>
            <button className='shuffle-btn' onClick={shuffleCube}>
                Shuffle
            </button>

            <div className='toolbar'>
                {buttons.map(({ label, arg }) => (
                    <button
                        key={arg}
                        className='toolbar-btn'
                        onClick={() => {
                            arg.split('').forEach((char) => handleToolbarClick(char));
                        }}
                    >
                        {label}
                    </button>
                ))}
            </div>
        </>
    );
}
