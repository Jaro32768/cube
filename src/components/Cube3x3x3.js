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
    const [hintText, setHintText] = useState('Press any key to start solving');
    const [isHintTextVisible, setIsHintTextVisible] = useState(false);
    const [progress, setProgress] = useState(0);
    let moveTimeline = '';
    const buttons = [
        { label: 'F', arg: 'f', color: centerPiecesColors[centerPiecesPositions.findIndex((subArr) => subArr.toString() === [0, 0, 1.5].toString())] },
        { label: 'U', arg: 'u', color: centerPiecesColors[centerPiecesPositions.findIndex((subArr) => subArr.toString() === [0, 1.5, 0].toString())] },
        { label: 'B', arg: 'b', color: centerPiecesColors[centerPiecesPositions.findIndex((subArr) => subArr.toString() === [0, 0, -1.5].toString())] },
        { label: 'D', arg: 'd', color: centerPiecesColors[centerPiecesPositions.findIndex((subArr) => subArr.toString() === [0, -1.5, 0].toString())] },
        { label: 'R', arg: 'r', color: centerPiecesColors[centerPiecesPositions.findIndex((subArr) => subArr.toString() === [1.5, 0, 0].toString())] },
        { label: 'L', arg: 'l', color: centerPiecesColors[centerPiecesPositions.findIndex((subArr) => subArr.toString() === [-1.5, 0, 0].toString())] },
        { label: 'M', arg: 'm' },
        { label: 'E', arg: 'e' },
        { label: 'S', arg: 's' },
        { label: 'x', arg: 'rLM' },
        { label: 'y', arg: 'uDE' },
        { label: 'z', arg: 'fBs' },
        { label: "F'", arg: 'F', color: centerPiecesColors[centerPiecesPositions.findIndex((subArr) => subArr.toString() === [0, 0, 1.5].toString())] },
        { label: "U'", arg: 'U', color: centerPiecesColors[centerPiecesPositions.findIndex((subArr) => subArr.toString() === [0, 1.5, 0].toString())] },
        { label: "B'", arg: 'B', color: centerPiecesColors[centerPiecesPositions.findIndex((subArr) => subArr.toString() === [0, 0, -1.5].toString())] },
        { label: "D'", arg: 'D', color: centerPiecesColors[centerPiecesPositions.findIndex((subArr) => subArr.toString() === [0, -1.5, 0].toString())] },
        { label: "R'", arg: 'R', color: centerPiecesColors[centerPiecesPositions.findIndex((subArr) => subArr.toString() === [1.5, 0, 0].toString())] },
        { label: "L'", arg: 'L', color: centerPiecesColors[centerPiecesPositions.findIndex((subArr) => subArr.toString() === [-1.5, 0, 0].toString())] },
        { label: "M'", arg: 'M' },
        { label: "E'", arg: 'E' },
        { label: "S'", arg: 'S' },
        { label: "x'", arg: 'Rlm' },
        { label: "y'", arg: 'Ude' },
        { label: "z'", arg: 'FbS' },
    ];

    useEffect(() => {
        getHintText();
    }, [progress]);
    const getHintText = () => {
        // get white center on the bottom
        if (progress === 0) {
            if (JSON.stringify(centerPiecesPositions[2]) === JSON.stringify([0, 0, -1.5])) {
                setHintText('get white center on the bottom (X)');
                return;
            } else if (JSON.stringify(centerPiecesPositions[2]) === JSON.stringify([0, 0, 1.5])) {
                setHintText("get white center on the bottom (X')");
                return;
            } else if (JSON.stringify(centerPiecesPositions[2]) === JSON.stringify([0, 1.5, 0])) {
                setHintText('get white center on the bottom (X2)');
                return;
            } else if (JSON.stringify(centerPiecesPositions[2]) === JSON.stringify([1.5, 0, 0])) {
                setHintText('get white center on the bottom (Z)');
                return;
            } else if (JSON.stringify(centerPiecesPositions[2]) === JSON.stringify([-1.5, 0, 0])) {
                setHintText("get white center on the bottom (Z')");
                return;
            } else {
                setProgress(1);
                setHintText('-');
            }
        }
        // get blue center on the front causing entire cube being oriented correctly
        if (progress === 1) {
            if (JSON.stringify(centerPiecesPositions[0]) === JSON.stringify([-1.5, 0, 0])) {
                setHintText('get blue center on the front (Y)');
                return;
            } else if (JSON.stringify(centerPiecesPositions[0]) === JSON.stringify([0, 0, 1.5])) {
                setHintText('get blue center on the front (Y2)');
                return;
            } else if (JSON.stringify(centerPiecesPositions[0]) === JSON.stringify([1.5, 0, 0])) {
                setHintText("get blue center on the front (Y')");
                return;
            } else {
                setProgress(2);
                setHintText('-');
            }
        }
        // if all white edges are not on the bottom
        if (progress === 2) {
            if (
                (JSON.stringify(edgePiecesPositions[0][1]) === JSON.stringify([1, -1.5, 0]) &&
                    JSON.stringify(edgePiecesPositions[1][1]) === JSON.stringify([-1, 0, 1.5]) &&
                    JSON.stringify(edgePiecesPositions[8][1]) === JSON.stringify([0, -1.5, -1]) &&
                    JSON.stringify(edgePiecesPositions[9][1]) === JSON.stringify([0, -1.5, 1])) ||
                (JSON.stringify(edgePiecesPositions[0][1]) === JSON.stringify([-1, 0, 1.5]) &&
                    JSON.stringify(edgePiecesPositions[1][1]) === JSON.stringify([1, -1.5, 0]) &&
                    JSON.stringify(edgePiecesPositions[8][1]) === JSON.stringify([0, -1.5, 1]) &&
                    JSON.stringify(edgePiecesPositions[9][1]) === JSON.stringify([0, -1.5, -1]))
            ) {
                setHintText('align white edges on the bottom (L)');
                return;
            } else if (
                (JSON.stringify(edgePiecesPositions[0][1]) === JSON.stringify([1, -1.5, 0]) &&
                    JSON.stringify(edgePiecesPositions[1][1]) === JSON.stringify([-1, 1.5, 0]) &&
                    JSON.stringify(edgePiecesPositions[8][1]) === JSON.stringify([0, -1.5, -1]) &&
                    JSON.stringify(edgePiecesPositions[9][1]) === JSON.stringify([0, -1.5, 1])) ||
                (JSON.stringify(edgePiecesPositions[0][1]) === JSON.stringify([-1, 1.5, 0]) &&
                    JSON.stringify(edgePiecesPositions[1][1]) === JSON.stringify([1, -1.5, 0]) &&
                    JSON.stringify(edgePiecesPositions[8][1]) === JSON.stringify([0, -1.5, 1]) &&
                    JSON.stringify(edgePiecesPositions[9][1]) === JSON.stringify([0, -1.5, -1]))
            ) {
                setHintText('align white edges on the bottom (L2)');
                return;
            } else if (
                (JSON.stringify(edgePiecesPositions[0][1]) === JSON.stringify([1, 0, -1.5]) &&
                    JSON.stringify(edgePiecesPositions[1][1]) === JSON.stringify([-1, 1.5, 0]) &&
                    JSON.stringify(edgePiecesPositions[8][1]) === JSON.stringify([0, -1.5, -1]) &&
                    JSON.stringify(edgePiecesPositions[9][1]) === JSON.stringify([0, -1.5, 1])) ||
                (JSON.stringify(edgePiecesPositions[0][1]) === JSON.stringify([-1, 1.5, 0]) &&
                    JSON.stringify(edgePiecesPositions[1][1]) === JSON.stringify([1, 0, -1.5]) &&
                    JSON.stringify(edgePiecesPositions[8][1]) === JSON.stringify([0, -1.5, 1]) &&
                    JSON.stringify(edgePiecesPositions[9][1]) === JSON.stringify([0, -1.5, -1]))
            ) {
                setHintText('align white edges on the bottom (R L2)');
                return;
            } else if (
                (JSON.stringify(edgePiecesPositions[0][1]) === JSON.stringify([1, 1.5, 0]) &&
                    JSON.stringify(edgePiecesPositions[1][1]) === JSON.stringify([-1, 1.5, 0]) &&
                    JSON.stringify(edgePiecesPositions[8][1]) === JSON.stringify([0, -1.5, -1]) &&
                    JSON.stringify(edgePiecesPositions[9][1]) === JSON.stringify([0, -1.5, 1])) ||
                (JSON.stringify(edgePiecesPositions[0][1]) === JSON.stringify([-1, 1.5, 0]) &&
                    JSON.stringify(edgePiecesPositions[1][1]) === JSON.stringify([1, 1.5, 0]) &&
                    JSON.stringify(edgePiecesPositions[8][1]) === JSON.stringify([0, -1.5, 1]) &&
                    JSON.stringify(edgePiecesPositions[9][1]) === JSON.stringify([0, -1.5, -1]))
            ) {
                setHintText('align white edges on the bottom (R2 L2)');
                return;
            } else if (
                (JSON.stringify(edgePiecesPositions[0][1]) === JSON.stringify([0, 1.5, -1]) &&
                    JSON.stringify(edgePiecesPositions[1][1]) === JSON.stringify([0, 1.5, 1]) &&
                    JSON.stringify(edgePiecesPositions[8][1]) === JSON.stringify([0, -1.5, -1]) &&
                    JSON.stringify(edgePiecesPositions[9][1]) === JSON.stringify([0, -1.5, 1])) ||
                (JSON.stringify(edgePiecesPositions[0][1]) === JSON.stringify([0, 1.5, 1]) &&
                    JSON.stringify(edgePiecesPositions[1][1]) === JSON.stringify([0, 1.5, -1]) &&
                    JSON.stringify(edgePiecesPositions[8][1]) === JSON.stringify([0, -1.5, 1]) &&
                    JSON.stringify(edgePiecesPositions[9][1]) === JSON.stringify([0, -1.5, -1]))
            ) {
                setHintText('align white edges on the bottom (U R2 L2)');
                return;
            } else if (
                (JSON.stringify(edgePiecesPositions[0][1]) === JSON.stringify([-1, 1.5, 0]) &&
                    JSON.stringify(edgePiecesPositions[1][1]) === JSON.stringify([1, 1.5, 0]) &&
                    JSON.stringify(edgePiecesPositions[8][1]) === JSON.stringify([0, -1.5, -1]) &&
                    JSON.stringify(edgePiecesPositions[9][1]) === JSON.stringify([0, -1.5, 1])) ||
                (JSON.stringify(edgePiecesPositions[0][1]) === JSON.stringify([1, 1.5, 0]) &&
                    JSON.stringify(edgePiecesPositions[1][1]) === JSON.stringify([-1, 1.5, 0]) &&
                    JSON.stringify(edgePiecesPositions[8][1]) === JSON.stringify([0, -1.5, 1]) &&
                    JSON.stringify(edgePiecesPositions[9][1]) === JSON.stringify([0, -1.5, -1]))
            ) {
                setHintText('align white edges on the bottom (U2 R2 L2)');
                return;
            } else if (
                (JSON.stringify(edgePiecesPositions[0][1]) === JSON.stringify([-1, 0, -1.5]) &&
                    JSON.stringify(edgePiecesPositions[1][1]) === JSON.stringify([1, 1.5, 0]) &&
                    JSON.stringify(edgePiecesPositions[8][1]) === JSON.stringify([0, -1.5, -1]) &&
                    JSON.stringify(edgePiecesPositions[9][1]) === JSON.stringify([0, -1.5, 1])) ||
                (JSON.stringify(edgePiecesPositions[0][1]) === JSON.stringify([1, 1.5, 0]) &&
                    JSON.stringify(edgePiecesPositions[1][1]) === JSON.stringify([-1, 0, -1.5]) &&
                    JSON.stringify(edgePiecesPositions[8][1]) === JSON.stringify([0, -1.5, 1]) &&
                    JSON.stringify(edgePiecesPositions[9][1]) === JSON.stringify([0, -1.5, -1]))
            ) {
                setHintText('align white edges on the bottom (L U2 R2 L2)');
                return;
            } else if (
                (JSON.stringify(edgePiecesPositions[0][1]) === JSON.stringify([-1, -1.5, 0]) &&
                    JSON.stringify(edgePiecesPositions[1][1]) === JSON.stringify([1, 1.5, 0]) &&
                    JSON.stringify(edgePiecesPositions[8][1]) === JSON.stringify([0, -1.5, -1]) &&
                    JSON.stringify(edgePiecesPositions[9][1]) === JSON.stringify([0, -1.5, 1])) ||
                (JSON.stringify(edgePiecesPositions[0][1]) === JSON.stringify([1, 1.5, 0]) &&
                    JSON.stringify(edgePiecesPositions[1][1]) === JSON.stringify([-1, -1.5, 0]) &&
                    JSON.stringify(edgePiecesPositions[8][1]) === JSON.stringify([0, -1.5, 1]) &&
                    JSON.stringify(edgePiecesPositions[9][1]) === JSON.stringify([0, -1.5, -1]))
            ) {
                setHintText('align white edges on the bottom (L2 U2 R2 L2)');
                return;
            } else if (
                (JSON.stringify(edgePiecesPositions[0][1]) === JSON.stringify([-1, -1.5, 0]) &&
                    JSON.stringify(edgePiecesPositions[1][1]) === JSON.stringify([1, 0, 1.5]) &&
                    JSON.stringify(edgePiecesPositions[8][1]) === JSON.stringify([0, -1.5, -1]) &&
                    JSON.stringify(edgePiecesPositions[9][1]) === JSON.stringify([0, -1.5, 1])) ||
                (JSON.stringify(edgePiecesPositions[0][1]) === JSON.stringify([1, 0, 1.5]) &&
                    JSON.stringify(edgePiecesPositions[1][1]) === JSON.stringify([-1, -1.5, 0]) &&
                    JSON.stringify(edgePiecesPositions[8][1]) === JSON.stringify([0, -1.5, 1]) &&
                    JSON.stringify(edgePiecesPositions[9][1]) === JSON.stringify([0, -1.5, -1]))
            ) {
                setHintText('align white edges on the bottom (R L2 U2 R2 L2)');
                return;
            } else if (
                (JSON.stringify(edgePiecesPositions[0][1]) === JSON.stringify([1, 0, -1.5]) &&
                    JSON.stringify(edgePiecesPositions[1][1]) === JSON.stringify([-1, -1.5, 0]) &&
                    JSON.stringify(edgePiecesPositions[8][1]) === JSON.stringify([0, -1.5, -1]) &&
                    JSON.stringify(edgePiecesPositions[9][1]) === JSON.stringify([0, -1.5, 1])) ||
                (JSON.stringify(edgePiecesPositions[0][1]) === JSON.stringify([0, -1.5, -1]) &&
                    JSON.stringify(edgePiecesPositions[1][1]) === JSON.stringify([0, -1.5, 1]) &&
                    JSON.stringify(edgePiecesPositions[8][1]) === JSON.stringify([-1, -1.5, 0]) &&
                    JSON.stringify(edgePiecesPositions[9][1]) === JSON.stringify([1, 0, -1.5])) ||
                (JSON.stringify(edgePiecesPositions[0][1]) === JSON.stringify([-1, -1.5, 0]) &&
                    JSON.stringify(edgePiecesPositions[1][1]) === JSON.stringify([1, 0, -1.5]) &&
                    JSON.stringify(edgePiecesPositions[8][1]) === JSON.stringify([0, -1.5, 1]) &&
                    JSON.stringify(edgePiecesPositions[9][1]) === JSON.stringify([0, -1.5, -1])) ||
                (JSON.stringify(edgePiecesPositions[0][1]) === JSON.stringify([0, -1.5, 1]) &&
                    JSON.stringify(edgePiecesPositions[1][1]) === JSON.stringify([0, -1.5, -1]) &&
                    JSON.stringify(edgePiecesPositions[8][1]) === JSON.stringify([1, 0, -1.5]) &&
                    JSON.stringify(edgePiecesPositions[9][1]) === JSON.stringify([-1, -1.5, 0]))
            ) {
                setHintText('align white edges on the bottom (R)');
                return;
            } else if (
                (JSON.stringify(edgePiecesPositions[0][1]) === JSON.stringify([1, 1.5, 0]) &&
                    JSON.stringify(edgePiecesPositions[1][1]) === JSON.stringify([-1, -1.5, 0]) &&
                    JSON.stringify(edgePiecesPositions[8][1]) === JSON.stringify([0, -1.5, -1]) &&
                    JSON.stringify(edgePiecesPositions[9][1]) === JSON.stringify([0, -1.5, 1])) ||
                (JSON.stringify(edgePiecesPositions[0][1]) === JSON.stringify([0, -1.5, -1]) &&
                    JSON.stringify(edgePiecesPositions[1][1]) === JSON.stringify([0, -1.5, 1]) &&
                    JSON.stringify(edgePiecesPositions[8][1]) === JSON.stringify([-1, -1.5, 0]) &&
                    JSON.stringify(edgePiecesPositions[9][1]) === JSON.stringify([1, 1.5, 0])) ||
                (JSON.stringify(edgePiecesPositions[0][1]) === JSON.stringify([-1, -1.5, 0]) &&
                    JSON.stringify(edgePiecesPositions[1][1]) === JSON.stringify([1, 1.5, 0]) &&
                    JSON.stringify(edgePiecesPositions[8][1]) === JSON.stringify([0, -1.5, 1]) &&
                    JSON.stringify(edgePiecesPositions[9][1]) === JSON.stringify([0, -1.5, -1])) ||
                (JSON.stringify(edgePiecesPositions[0][1]) === JSON.stringify([0, -1.5, 1]) &&
                    JSON.stringify(edgePiecesPositions[1][1]) === JSON.stringify([0, -1.5, -1]) &&
                    JSON.stringify(edgePiecesPositions[8][1]) === JSON.stringify([1, 1.5, 0]) &&
                    JSON.stringify(edgePiecesPositions[9][1]) === JSON.stringify([-1, -1.5, 0]))
            ) {
                setHintText('align white edges on the bottom (R2)');
                return;
            } else if (
                (JSON.stringify(edgePiecesPositions[0][1]) === JSON.stringify([0, 1.5, 1]) &&
                    JSON.stringify(edgePiecesPositions[1][1]) === JSON.stringify([-1, -1.5, 0]) &&
                    JSON.stringify(edgePiecesPositions[8][1]) === JSON.stringify([0, -1.5, -1]) &&
                    JSON.stringify(edgePiecesPositions[9][1]) === JSON.stringify([0, -1.5, 1])) ||
                (JSON.stringify(edgePiecesPositions[0][1]) === JSON.stringify([0, -1.5, -1]) &&
                    JSON.stringify(edgePiecesPositions[1][1]) === JSON.stringify([0, -1.5, 1]) &&
                    JSON.stringify(edgePiecesPositions[8][1]) === JSON.stringify([-1, -1.5, 0]) &&
                    JSON.stringify(edgePiecesPositions[9][1]) === JSON.stringify([0, 1.5, 1])) ||
                (JSON.stringify(edgePiecesPositions[0][1]) === JSON.stringify([-1, -1.5, 0]) &&
                    JSON.stringify(edgePiecesPositions[1][1]) === JSON.stringify([0, 1.5, 1]) &&
                    JSON.stringify(edgePiecesPositions[8][1]) === JSON.stringify([0, -1.5, 1]) &&
                    JSON.stringify(edgePiecesPositions[9][1]) === JSON.stringify([0, -1.5, -1])) ||
                (JSON.stringify(edgePiecesPositions[0][1]) === JSON.stringify([0, -1.5, 1]) &&
                    JSON.stringify(edgePiecesPositions[1][1]) === JSON.stringify([0, -1.5, -1]) &&
                    JSON.stringify(edgePiecesPositions[8][1]) === JSON.stringify([0, 1.5, 1]) &&
                    JSON.stringify(edgePiecesPositions[9][1]) === JSON.stringify([-1, -1.5, 0]))
            ) {
                setHintText("align white edges on the bottom (U' R2)");
                return;
            } else if (
                (JSON.stringify(edgePiecesPositions[0][1]) === JSON.stringify([-1.5, 0, 1]) &&
                    JSON.stringify(edgePiecesPositions[1][1]) === JSON.stringify([-1, -1.5, 0]) &&
                    JSON.stringify(edgePiecesPositions[8][1]) === JSON.stringify([0, -1.5, -1]) &&
                    JSON.stringify(edgePiecesPositions[9][1]) === JSON.stringify([1.5, 0, 1])) ||
                (JSON.stringify(edgePiecesPositions[0][1]) === JSON.stringify([0, -1.5, -1]) &&
                    JSON.stringify(edgePiecesPositions[1][1]) === JSON.stringify([1.5, 0, 1]) &&
                    JSON.stringify(edgePiecesPositions[8][1]) === JSON.stringify([-1, -1.5, 0]) &&
                    JSON.stringify(edgePiecesPositions[9][1]) === JSON.stringify([-1.5, 0, 1])) ||
                (JSON.stringify(edgePiecesPositions[0][1]) === JSON.stringify([-1, -1.5, 0]) &&
                    JSON.stringify(edgePiecesPositions[1][1]) === JSON.stringify([-1.5, 0, 1]) &&
                    JSON.stringify(edgePiecesPositions[8][1]) === JSON.stringify([1.5, 0, 1]) &&
                    JSON.stringify(edgePiecesPositions[9][1]) === JSON.stringify([0, -1.5, -1])) ||
                (JSON.stringify(edgePiecesPositions[0][1]) === JSON.stringify([1.5, 0, 1]) &&
                    JSON.stringify(edgePiecesPositions[1][1]) === JSON.stringify([0, -1.5, -1]) &&
                    JSON.stringify(edgePiecesPositions[8][1]) === JSON.stringify([-1.5, 0, 1]) &&
                    JSON.stringify(edgePiecesPositions[9][1]) === JSON.stringify([-1, -1.5, 0]))
            ) {
                setHintText("align white edges on the bottom (F U' R2)");
                return;
            } else if (
                (JSON.stringify(edgePiecesPositions[0][1]) === JSON.stringify([0, -1.5, 1]) &&
                    JSON.stringify(edgePiecesPositions[1][1]) === JSON.stringify([-1, -1.5, 0]) &&
                    JSON.stringify(edgePiecesPositions[8][1]) === JSON.stringify([0, -1.5, -1]) &&
                    JSON.stringify(edgePiecesPositions[9][1]) === JSON.stringify([0, 1.5, 1])) ||
                (JSON.stringify(edgePiecesPositions[0][1]) === JSON.stringify([0, -1.5, -1]) &&
                    JSON.stringify(edgePiecesPositions[1][1]) === JSON.stringify([0, 1.5, 1]) &&
                    JSON.stringify(edgePiecesPositions[8][1]) === JSON.stringify([-1, -1.5, 0]) &&
                    JSON.stringify(edgePiecesPositions[9][1]) === JSON.stringify([0, -1.5, 1])) ||
                (JSON.stringify(edgePiecesPositions[0][1]) === JSON.stringify([-1, -1.5, 0]) &&
                    JSON.stringify(edgePiecesPositions[1][1]) === JSON.stringify([0, -1.5, 1]) &&
                    JSON.stringify(edgePiecesPositions[8][1]) === JSON.stringify([0, 1.5, 1]) &&
                    JSON.stringify(edgePiecesPositions[9][1]) === JSON.stringify([0, -1.5, -1])) ||
                (JSON.stringify(edgePiecesPositions[0][1]) === JSON.stringify([0, 1.5, 1]) &&
                    JSON.stringify(edgePiecesPositions[1][1]) === JSON.stringify([0, -1.5, -1]) &&
                    JSON.stringify(edgePiecesPositions[8][1]) === JSON.stringify([0, -1.5, 1]) &&
                    JSON.stringify(edgePiecesPositions[9][1]) === JSON.stringify([-1, -1.5, 0]))
            ) {
                setHintText("align white edges on the bottom (F2 U' R2)");
                return;
            } else if (
                (JSON.stringify(edgePiecesPositions[0][1]) === JSON.stringify([0, -1.5, 1]) &&
                    JSON.stringify(edgePiecesPositions[1][1]) === JSON.stringify([-1, -1.5, 0]) &&
                    JSON.stringify(edgePiecesPositions[8][1]) === JSON.stringify([0, -1.5, -1]) &&
                    JSON.stringify(edgePiecesPositions[9][1]) === JSON.stringify([1, 1.5, 0])) ||
                (JSON.stringify(edgePiecesPositions[0][1]) === JSON.stringify([0, -1.5, -1]) &&
                    JSON.stringify(edgePiecesPositions[1][1]) === JSON.stringify([1, 1.5, 0]) &&
                    JSON.stringify(edgePiecesPositions[8][1]) === JSON.stringify([-1, -1.5, 0]) &&
                    JSON.stringify(edgePiecesPositions[9][1]) === JSON.stringify([0, -1.5, 1])) ||
                (JSON.stringify(edgePiecesPositions[0][1]) === JSON.stringify([-1, -1.5, 0]) &&
                    JSON.stringify(edgePiecesPositions[1][1]) === JSON.stringify([0, -1.5, 1]) &&
                    JSON.stringify(edgePiecesPositions[8][1]) === JSON.stringify([1, 1.5, 0]) &&
                    JSON.stringify(edgePiecesPositions[9][1]) === JSON.stringify([0, -1.5, -1])) ||
                (JSON.stringify(edgePiecesPositions[0][1]) === JSON.stringify([1, 1.5, 0]) &&
                    JSON.stringify(edgePiecesPositions[1][1]) === JSON.stringify([0, -1.5, -1]) &&
                    JSON.stringify(edgePiecesPositions[8][1]) === JSON.stringify([0, -1.5, 1]) &&
                    JSON.stringify(edgePiecesPositions[9][1]) === JSON.stringify([-1, -1.5, 0]))
            ) {
                setHintText("align white edges on the bottom (U F2 U' R2)");
                return;
            } else if (
                (JSON.stringify(edgePiecesPositions[0][1]) === JSON.stringify([0, -1.5, 1]) &&
                    JSON.stringify(edgePiecesPositions[1][1]) === JSON.stringify([-1, -1.5, 0]) &&
                    JSON.stringify(edgePiecesPositions[8][1]) === JSON.stringify([0, -1.5, -1]) &&
                    JSON.stringify(edgePiecesPositions[9][1]) === JSON.stringify([1, 0, 1.5])) ||
                (JSON.stringify(edgePiecesPositions[0][1]) === JSON.stringify([0, -1.5, -1]) &&
                    JSON.stringify(edgePiecesPositions[1][1]) === JSON.stringify([1, 0, 1.5]) &&
                    JSON.stringify(edgePiecesPositions[8][1]) === JSON.stringify([-1, -1.5, 0]) &&
                    JSON.stringify(edgePiecesPositions[9][1]) === JSON.stringify([0, -1.5, 1])) ||
                (JSON.stringify(edgePiecesPositions[0][1]) === JSON.stringify([-1, -1.5, 0]) &&
                    JSON.stringify(edgePiecesPositions[1][1]) === JSON.stringify([0, -1.5, 1]) &&
                    JSON.stringify(edgePiecesPositions[8][1]) === JSON.stringify([1, 0, 1.5]) &&
                    JSON.stringify(edgePiecesPositions[9][1]) === JSON.stringify([0, -1.5, -1])) ||
                (JSON.stringify(edgePiecesPositions[0][1]) === JSON.stringify([1, 0, 1.5]) &&
                    JSON.stringify(edgePiecesPositions[1][1]) === JSON.stringify([0, -1.5, -1]) &&
                    JSON.stringify(edgePiecesPositions[8][1]) === JSON.stringify([0, -1.5, 1]) &&
                    JSON.stringify(edgePiecesPositions[9][1]) === JSON.stringify([-1, -1.5, 0]))
            ) {
                setHintText("align white edges on the bottom (R U F2 U' R2)");
                return;
            } else if (
                !(
                    edgePiecesPositions[0][1][1] === -1.5 &&
                    edgePiecesPositions[1][1][1] === -1.5 &&
                    edgePiecesPositions[8][1][1] === -1.5 &&
                    edgePiecesPositions[9][1][1] === -1.5
                )
            ) {
                setHintText('get white edges on the bottom (use intuition)');
                return;
            }
            if (
                !(
                    JSON.stringify(edgePiecesPositions[0][1]) === JSON.stringify([1, -1.5, 0]) &&
                    JSON.stringify(edgePiecesPositions[1][1]) === JSON.stringify([-1, -1.5, 0]) &&
                    JSON.stringify(edgePiecesPositions[8][1]) === JSON.stringify([0, -1.5, -1]) &&
                    JSON.stringify(edgePiecesPositions[9][1]) === JSON.stringify([0, -1.5, 1])
                )
            ) {
                if (
                    JSON.stringify(edgePiecesPositions[0][1]) === JSON.stringify([0, -1.5, 1]) &&
                    JSON.stringify(edgePiecesPositions[1][1]) === JSON.stringify([0, -1.5, -1]) &&
                    JSON.stringify(edgePiecesPositions[8][1]) === JSON.stringify([1, -1.5, 0]) &&
                    JSON.stringify(edgePiecesPositions[9][1]) === JSON.stringify([-1, -1.5, 0])
                ) {
                    setHintText('align white edges on the bottom (D)');
                    return;
                }
                if (
                    JSON.stringify(edgePiecesPositions[0][1]) === JSON.stringify([-1, -1.5, 0]) &&
                    JSON.stringify(edgePiecesPositions[1][1]) === JSON.stringify([1, -1.5, 0]) &&
                    JSON.stringify(edgePiecesPositions[8][1]) === JSON.stringify([0, -1.5, 1]) &&
                    JSON.stringify(edgePiecesPositions[9][1]) === JSON.stringify([0, -1.5, -1])
                ) {
                    setHintText('align white edges on the bottom (D2)');
                    return;
                }
                if (
                    JSON.stringify(edgePiecesPositions[0][1]) === JSON.stringify([0, -1.5, -1]) &&
                    JSON.stringify(edgePiecesPositions[1][1]) === JSON.stringify([0, -1.5, 1]) &&
                    JSON.stringify(edgePiecesPositions[8][1]) === JSON.stringify([-1, -1.5, 0]) &&
                    JSON.stringify(edgePiecesPositions[9][1]) === JSON.stringify([1, -1.5, 0])
                ) {
                    setHintText("align white edges on the bottom (D')");
                    return;
                }
                if (
                    (JSON.stringify(edgePiecesPositions[0][1]) === JSON.stringify([-1, -1.5, 0]) &&
                        JSON.stringify(edgePiecesPositions[1][1]) === JSON.stringify([1, -1.5, 0]) &&
                        JSON.stringify(edgePiecesPositions[8][1]) === JSON.stringify([0, -1.5, -1]) &&
                        JSON.stringify(edgePiecesPositions[9][1]) === JSON.stringify([0, -1.5, 1])) ||
                    (JSON.stringify(edgePiecesPositions[0][1]) === JSON.stringify([1, -1.5, 0]) &&
                        JSON.stringify(edgePiecesPositions[1][1]) === JSON.stringify([-1, -1.5, 0]) &&
                        JSON.stringify(edgePiecesPositions[8][1]) === JSON.stringify([0, -1.5, 1]) &&
                        JSON.stringify(edgePiecesPositions[9][1]) === JSON.stringify([0, -1.5, -1]))
                ) {
                    setHintText('align white edges on the bottom (R2 L2 U2 R2 L2)');
                    return;
                }
                if (
                    (JSON.stringify(edgePiecesPositions[0][1]) === JSON.stringify([0, -1.5, 1]) &&
                        JSON.stringify(edgePiecesPositions[1][1]) === JSON.stringify([-1, -1.5, 0]) &&
                        JSON.stringify(edgePiecesPositions[8][1]) === JSON.stringify([0, -1.5, -1]) &&
                        JSON.stringify(edgePiecesPositions[9][1]) === JSON.stringify([1, -1.5, 0])) ||
                    (JSON.stringify(edgePiecesPositions[0][1]) === JSON.stringify([0, -1.5, -1]) &&
                        JSON.stringify(edgePiecesPositions[1][1]) === JSON.stringify([1, -1.5, 0]) &&
                        JSON.stringify(edgePiecesPositions[8][1]) === JSON.stringify([-1, -1.5, 0]) &&
                        JSON.stringify(edgePiecesPositions[9][1]) === JSON.stringify([0, -1.5, 1])) ||
                    (JSON.stringify(edgePiecesPositions[0][1]) === JSON.stringify([-1, -1.5, 0]) &&
                        JSON.stringify(edgePiecesPositions[1][1]) === JSON.stringify([0, -1.5, 1]) &&
                        JSON.stringify(edgePiecesPositions[8][1]) === JSON.stringify([1, -1.5, 0]) &&
                        JSON.stringify(edgePiecesPositions[9][1]) === JSON.stringify([0, -1.5, -1])) ||
                    (JSON.stringify(edgePiecesPositions[0][1]) === JSON.stringify([1, -1.5, 0]) &&
                        JSON.stringify(edgePiecesPositions[1][1]) === JSON.stringify([0, -1.5, -1]) &&
                        JSON.stringify(edgePiecesPositions[8][1]) === JSON.stringify([0, -1.5, 1]) &&
                        JSON.stringify(edgePiecesPositions[9][1]) === JSON.stringify([-1, -1.5, 0]))
                ) {
                    setHintText("align white edges on the bottom (R2 U F2 U' R2)");
                    return;
                }
                setHintText('align white edges on the bottom (try to align at least 2 edges using D moves)');
                return;
            } else {
                setProgress(3);
                setHintText('-');
            }
        }
        // first layer
        if (progress === 3) {
            if (
                JSON.stringify(cornerPiecesPositions[4]) ===
                JSON.stringify([
                    [1.5, -1, 1],
                    [1, -1, 1.5],
                    [1, -1.5, 1],
                ])
            ) {
                setHintText('-');
                setProgress(4);
                return;
            } else if (
                JSON.stringify(cornerPiecesPositions[4]).includes(JSON.stringify([1.5, -1, 1])) ||
                JSON.stringify(cornerPiecesPositions[4]).includes(JSON.stringify([1.5, 1, 1])) ||
                JSON.stringify(cornerPiecesPositions[4]).includes(JSON.stringify([-1, 1, 1.5]))
            ) {
                setHintText("insert white-blue-red corner on the bottom (repeat R U R' U')");
                return;
            } else if (
                JSON.stringify(cornerPiecesPositions[4]).includes(JSON.stringify([-1.5, 1, -1])) ||
                JSON.stringify(cornerPiecesPositions[4]).includes(JSON.stringify([1, 1, -1.5]))
            ) {
                setHintText('insert white-blue-red corner on the bottom (rotate top (U))');
                return;
            } else if (JSON.stringify(cornerPiecesPositions[4]).includes(JSON.stringify([-1, -1, 1.5]))) {
                setHintText("get white-blue-red corner out of incorrect slot (rotate top (L' U L))");
                return;
            } else if (JSON.stringify(cornerPiecesPositions[4]).includes(JSON.stringify([1, -1, -1.5]))) {
                setHintText("get white-blue-red corner out of incorrect slot (rotate top (B U B'))");
                return;
            } else if (JSON.stringify(cornerPiecesPositions[4]).includes(JSON.stringify([-1.5, -1, -1]))) {
                setHintText("get white-blue-red corner out of incorrect slot (rotate top (L U L'))");
                return;
            }
        }
        if (progress === 4) {
            setHintText('rotate entire cube (y)');
            if (JSON.stringify(centerPiecesPositions[0]) === JSON.stringify([1.5, 0, 0])) {
                setProgress(5);
                setHintText('-');
            }
        }
        if (progress === 5) {
            if (
                JSON.stringify(cornerPiecesPositions[0]) ===
                JSON.stringify([
                    [1, -1, 1.5],
                    [1.5, -1, 1],
                    [1, -1.5, 1],
                ])
            ) {
                setHintText('-');
                setProgress(6);
                return;
            } else if (
                JSON.stringify(cornerPiecesPositions[0]).includes(JSON.stringify([1.5, -1, 1])) ||
                JSON.stringify(cornerPiecesPositions[0]).includes(JSON.stringify([1.5, 1, 1])) ||
                JSON.stringify(cornerPiecesPositions[0]).includes(JSON.stringify([-1, 1, 1.5]))
            ) {
                setHintText("insert white-red-green corner on the bottom (repeat R U R' U')");
                return;
            } else if (
                JSON.stringify(cornerPiecesPositions[0]).includes(JSON.stringify([-1.5, 1, -1])) ||
                JSON.stringify(cornerPiecesPositions[0]).includes(JSON.stringify([1, 1, -1.5]))
            ) {
                setHintText('insert white-red-green corner on the bottom (rotate top (U))');
                return;
            } else if (JSON.stringify(cornerPiecesPositions[0]).includes(JSON.stringify([-1, -1, 1.5]))) {
                setHintText("get white-red-green corner out of incorrect slot (rotate top (L' U L))");
                return;
            } else if (JSON.stringify(cornerPiecesPositions[0]).includes(JSON.stringify([1, -1, -1.5]))) {
                setHintText("get white-red-green corner out of incorrect slot (rotate top (B U B'))");
                return;
            } else if (JSON.stringify(cornerPiecesPositions[0]).includes(JSON.stringify([-1.5, -1, -1]))) {
                setHintText("get white-red-green corner out of incorrect slot (rotate top (L U L'))");
                return;
            }
        }
        if (progress === 6) {
            setHintText('rotate entire cube (y)');
            if (JSON.stringify(centerPiecesPositions[0]) === JSON.stringify([0, 0, 1.5])) {
                setProgress(7);
                setHintText('-');
            }
        }
        if (progress === 7) {
            if (
                JSON.stringify(cornerPiecesPositions[1]) ===
                JSON.stringify([
                    [1.5, -1, 1],
                    [1, -1, 1.5],
                    [1, -1.5, 1],
                ])
            ) {
                setHintText('-');
                setProgress(8);
                return;
            } else if (
                JSON.stringify(cornerPiecesPositions[1]).includes(JSON.stringify([1.5, -1, 1])) ||
                JSON.stringify(cornerPiecesPositions[1]).includes(JSON.stringify([1.5, 1, 1])) ||
                JSON.stringify(cornerPiecesPositions[1]).includes(JSON.stringify([-1, 1, 1.5]))
            ) {
                setHintText("insert white-green-orange corner on the bottom (repeat R U R' U')");
                return;
            } else if (
                JSON.stringify(cornerPiecesPositions[1]).includes(JSON.stringify([-1.5, 1, -1])) ||
                JSON.stringify(cornerPiecesPositions[1]).includes(JSON.stringify([1, 1, -1.5]))
            ) {
                setHintText('insert white-green-orange corner on the bottom (rotate top (U))');
                return;
            } else if (JSON.stringify(cornerPiecesPositions[1]).includes(JSON.stringify([-1, -1, 1.5]))) {
                setHintText("get white-green-orange corner out of incorrect slot (rotate top (L' U L))");
                return;
            } else if (JSON.stringify(cornerPiecesPositions[1]).includes(JSON.stringify([1, -1, -1.5]))) {
                setHintText("get white-green-orange corner out of incorrect slot (rotate top (B U B'))");
                return;
            } else if (JSON.stringify(cornerPiecesPositions[1]).includes(JSON.stringify([-1.5, -1, -1]))) {
                setHintText("get white-green-orange corner out of incorrect slot (rotate top (L U L'))");
                return;
            }
        }
        if (progress === 8) {
            setHintText('rotate entire cube (y)');
            if (JSON.stringify(centerPiecesPositions[0]) === JSON.stringify([-1.5, 0, 0])) {
                setProgress(9);
                setHintText('-');
            }
        }
        if (progress === 9) {
            if (
                JSON.stringify(cornerPiecesPositions[5]) ===
                JSON.stringify([
                    [1, -1, 1.5],
                    [1.5, -1, 1],
                    [1, -1.5, 1],
                ])
            ) {
                setHintText('-');
                setProgress(10);
                return;
            } else if (
                JSON.stringify(cornerPiecesPositions[5]).includes(JSON.stringify([1.5, -1, 1])) ||
                JSON.stringify(cornerPiecesPositions[5]).includes(JSON.stringify([1.5, 1, 1])) ||
                JSON.stringify(cornerPiecesPositions[5]).includes(JSON.stringify([-1, 1, 1.5]))
            ) {
                setHintText("insert white-orange-blue corner on the bottom (repeat R U R' U')");
                return;
            } else if (
                JSON.stringify(cornerPiecesPositions[5]).includes(JSON.stringify([-1.5, 1, -1])) ||
                JSON.stringify(cornerPiecesPositions[5]).includes(JSON.stringify([1, 1, -1.5]))
            ) {
                setHintText('insert white-orange-blue corner on the bottom (rotate top (U))');
                return;
            } else if (JSON.stringify(cornerPiecesPositions[5]).includes(JSON.stringify([-1, -1, 1.5]))) {
                setHintText("get white-orange-blue corner out of incorrect slot (rotate top (L' U L))");
                return;
            } else if (JSON.stringify(cornerPiecesPositions[5]).includes(JSON.stringify([1, -1, -1.5]))) {
                setHintText("get white-orange-blue corner out of incorrect slot (rotate top (B U B'))");
                return;
            } else if (JSON.stringify(cornerPiecesPositions[5]).includes(JSON.stringify([-1.5, -1, -1]))) {
                setHintText("get white-orange-blue corner out of incorrect slot (rotate top (L U L'))");
                return;
            }
        }
        // second layer
        if (progress === 10) {
            // orange-blue edge
            if (
                JSON.stringify(edgePiecesPositions[7]) ===
                    JSON.stringify([
                        [1, 1.5, 0],
                        [1.5, 1, 0],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[5]) ===
                    JSON.stringify([
                        [1, -1, 1.5],
                        [1.5, -1, 1],
                        [1, -1.5, 1],
                    ])
            ) {
                setHintText("insert orange-blue edge (U' F' U F R' F R F')");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[7]) ===
                JSON.stringify([
                    [1.5, 0, 1],
                    [1, 0, 1.5],
                ])
            ) {
                setHintText("get orange-blue edge out (R U R' U' F' U' F)");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[7]) ===
                    JSON.stringify([
                        [1.5, 1, 0],
                        [1, 1.5, 0],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[5]) ===
                    JSON.stringify([
                        [1, 1.5, 1],
                        [1.5, 1, 1],
                        [1, 1, 1.5],
                    ]) &&
                JSON.stringify(edgePiecesPositions[9]) ===
                    JSON.stringify([
                        [1.5, 0, 1],
                        [1, 0, 1.5],
                    ])
            ) {
                setHintText("get orange-blue edge out (U R' U' F' U' F)");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[7]) ===
                    JSON.stringify([
                        [0, 1, 1.5],
                        [0, 1.5, 1],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[5]) ===
                    JSON.stringify([
                        [-1, 1.5, 1],
                        [-1, 1, 1.5],
                        [-1.5, 1, 1],
                    ]) &&
                JSON.stringify(edgePiecesPositions[9]) ===
                    JSON.stringify([
                        [1.5, 0, 1],
                        [1, 0, 1.5],
                    ])
            ) {
                setHintText("get orange-blue edge out (R' U' F' U' F)");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[7]) ===
                    JSON.stringify([
                        [0, 1, 1.5],
                        [0, 1.5, 1],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[5]) ===
                    JSON.stringify([
                        [-1, 1.5, 1],
                        [-1, 1, 1.5],
                        [-1.5, 1, 1],
                    ]) &&
                JSON.stringify(edgePiecesPositions[9]) ===
                    JSON.stringify([
                        [1.5, -1, 0],
                        [1, -1.5, 0],
                    ])
            ) {
                setHintText("get orange-blue edge out (U' F' U' F)");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[7]) ===
                    JSON.stringify([
                        [1.5, 1, 0],
                        [1, 1.5, 0],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[5]) ===
                    JSON.stringify([
                        [1, 1.5, 1],
                        [1.5, 1, 1],
                        [1, 1, 1.5],
                    ]) &&
                JSON.stringify(edgePiecesPositions[9]) ===
                    JSON.stringify([
                        [1.5, -1, 0],
                        [1, -1.5, 0],
                    ])
            ) {
                setHintText("get orange-blue edge out ( F' U' F)");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[7]) ===
                    JSON.stringify([
                        [1.5, 1, 0],
                        [1, 1.5, 0],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[5]) ===
                    JSON.stringify([
                        [-1.5, 1, 1],
                        [-1, 1.5, 1],
                        [-1, 1, 1.5],
                    ]) &&
                JSON.stringify(edgePiecesPositions[1]) ===
                    JSON.stringify([
                        [1, 0, 1.5],
                        [1.5, 0, 1],
                    ])
            ) {
                setHintText("get orange-blue edge out (U' F)");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[7]) ===
                    JSON.stringify([
                        [0, 1, -1.5],
                        [0, 1.5, -1],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[5]) ===
                    JSON.stringify([
                        [1, 1, 1.5],
                        [1, 1.5, 1],
                        [1.5, 1, 1],
                    ]) &&
                JSON.stringify(edgePiecesPositions[1]) ===
                    JSON.stringify([
                        [1, 0, 1.5],
                        [1.5, 0, 1],
                    ])
            ) {
                setHintText('get orange-blue edge out (F)');
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[7]) ===
                    JSON.stringify([
                        [0, 1.5, -1],
                        [0, 1, -1.5],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[5]) ===
                    JSON.stringify([
                        [1, -1, 1.5],
                        [1.5, -1, 1],
                        [1, -1.5, 1],
                    ])
            ) {
                setHintText("insert orange-blue edge (F' U F R' F R F'))");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[7]) ===
                    JSON.stringify([
                        [0, 1.5, -1],
                        [0, 1, -1.5],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[5]) ===
                    JSON.stringify([
                        [1, 1, 1.5],
                        [1, 1.5, 1],
                        [1.5, 1, 1],
                    ])
            ) {
                setHintText("insert orange-blue edge (U F R' F R F'))");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[7]) ===
                    JSON.stringify([
                        [1, 1.5, 0],
                        [1.5, 1, 0],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[5]) ===
                    JSON.stringify([
                        [-1.5, 1, 1],
                        [-1, 1.5, 1],
                        [-1, 1, 1.5],
                    ])
            ) {
                setHintText("insert orange-blue edge (F R' F R F'))");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[7]) ===
                    JSON.stringify([
                        [1, 1.5, 0],
                        [1.5, 1, 0],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[5]) ===
                    JSON.stringify([
                        [1, 1.5, 1],
                        [1.5, 1, 1],
                        [1, 1, 1.5],
                    ])
            ) {
                setHintText("insert orange-blue edge (R' F R F'))");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[7]) ===
                    JSON.stringify([
                        [1, 0, 1.5],
                        [1.5, 0, 1],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[5]) ===
                    JSON.stringify([
                        [1, -1, 1.5],
                        [1.5, -1, 1],
                        [1, -1.5, 1],
                    ]) &&
                JSON.stringify(edgePiecesPositions[9]) ===
                    JSON.stringify([
                        [1.5, 0, -1],
                        [1, 0, -1.5],
                    ])
            ) {
                setHintText("insert orange-blue edge (F R F'))");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[7]) ===
                    JSON.stringify([
                        [0, -1, 1.5],
                        [0, -1.5, 1],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[5]) ===
                    JSON.stringify([
                        [-1, -1, 1.5],
                        [-1, -1.5, 1],
                        [-1.5, -1, 1],
                    ]) &&
                JSON.stringify(edgePiecesPositions[9]) ===
                    JSON.stringify([
                        [1.5, 0, -1],
                        [1, 0, -1.5],
                    ])
            ) {
                setHintText("insert orange-blue edge (R F'))");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[7]) ===
                    JSON.stringify([
                        [0, -1, 1.5],
                        [0, -1.5, 1],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[5]) ===
                    JSON.stringify([
                        [-1, -1, 1.5],
                        [-1, -1.5, 1],
                        [-1.5, -1, 1],
                    ])
            ) {
                setHintText("insert orange-blue edge (F'))");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[7]) ===
                    JSON.stringify([
                        [0, 1, 1.5],
                        [0, 1.5, 1],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[5]) ===
                    JSON.stringify([
                        [1, -1, 1.5],
                        [1.5, -1, 1],
                        [1, -1.5, 1],
                    ])
            ) {
                setHintText("insert orange-blue edge (U R U' R' F R' F' R))");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[7]) ===
                    JSON.stringify([
                        [-1.5, 1, 0],
                        [-1, 1.5, 0],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[5]) ===
                    JSON.stringify([
                        [1, -1, 1.5],
                        [1.5, -1, 1],
                        [1, -1.5, 1],
                    ])
            ) {
                setHintText("insert orange-blue edge (R U' R' F R' F' R))");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[7]) ===
                    JSON.stringify([
                        [-1.5, 1, 0],
                        [-1, 1.5, 0],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[5]) ===
                    JSON.stringify([
                        [1, 1.5, 1],
                        [1.5, 1, 1],
                        [1, 1, 1.5],
                    ])
            ) {
                setHintText("insert orange-blue edge (U' R' F R' F' R))");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[7]) ===
                    JSON.stringify([
                        [0, 1, 1.5],
                        [0, 1.5, 1],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[5]) ===
                    JSON.stringify([
                        [1, 1.5, -1],
                        [1, 1, -1.5],
                        [1.5, 1, -1],
                    ])
            ) {
                setHintText("insert orange-blue edge (R' F R' F' R))");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[7]) ===
                    JSON.stringify([
                        [0, 1, 1.5],
                        [0, 1.5, 1],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[5]) ===
                    JSON.stringify([
                        [1, 1, 1.5],
                        [1, 1.5, 1],
                        [1.5, 1, 1],
                    ])
            ) {
                setHintText("insert orange-blue edge (F R' F' R))");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[7]) ===
                    JSON.stringify([
                        [1, 0, 1.5],
                        [1.5, 0, 1],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[5]) ===
                    JSON.stringify([
                        [1, -1, 1.5],
                        [1.5, -1, 1],
                        [1, -1.5, 1],
                    ]) &&
                JSON.stringify(edgePiecesPositions[1]) ===
                    JSON.stringify([
                        [-1, 0, 1.5],
                        [-1.5, 0, 1],
                    ])
            ) {
                setHintText("insert orange-blue edge (R' F' R))");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[7]) ===
                    JSON.stringify([
                        [1, -1.5, 0],
                        [1.5, -1, 0],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[5]) ===
                    JSON.stringify([
                        [1, -1.5, -1],
                        [1.5, -1, -1],
                        [1, -1, -1.5],
                    ]) &&
                JSON.stringify(edgePiecesPositions[1]) ===
                    JSON.stringify([
                        [-1, 0, 1.5],
                        [-1.5, 0, 1],
                    ])
            ) {
                setHintText("insert orange-blue edge (F' R))");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[7]) ===
                    JSON.stringify([
                        [1, -1.5, 0],
                        [1.5, -1, 0],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[5]) ===
                    JSON.stringify([
                        [1, -1.5, -1],
                        [1.5, -1, -1],
                        [1, -1, -1.5],
                    ])
            ) {
                setHintText('insert orange-blue edge (R))');
                return;
            } else if (
                (JSON.stringify(edgePiecesPositions[7]) ===
                    JSON.stringify([
                        [0, 1.5, 1],
                        [0, 1, 1.5],
                    ]) ||
                    JSON.stringify(edgePiecesPositions[7]) ===
                        JSON.stringify([
                            [-1, 1.5, 0],
                            [-1.5, 1, 0],
                        ]) ||
                    JSON.stringify(edgePiecesPositions[7]) ===
                        JSON.stringify([
                            [1.5, 1, 0],
                            [1, 1.5, 0],
                        ]) ||
                    JSON.stringify(edgePiecesPositions[7]) ===
                        JSON.stringify([
                            [0, 1, -1.5],
                            [0, 1.5, -1],
                        ])) &&
                JSON.stringify(centerPiecesPositions[0]) === JSON.stringify([-1.5, 0, 0])
            ) {
                setHintText('get orange-blue edge to better spot (U)');
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[7]) ===
                    JSON.stringify([
                        [1, 0, 1.5],
                        [1.5, 0, 1],
                    ]) &&
                JSON.stringify(centerPiecesPositions[0]) === JSON.stringify([-1.5, 0, 0])
            ) {
                setHintText('-');
                setProgress(11);
                return;
            } else if (
                (JSON.stringify(centerPiecesPositions[0]) !== JSON.stringify([-1.5, 0, 0]) &&
                    (JSON.stringify(edgePiecesPositions[7]) ===
                        JSON.stringify([
                            [-1.5, 0, 1],
                            [-1, 0, 1.5],
                        ]) ||
                        JSON.stringify(edgePiecesPositions[7]) ===
                            JSON.stringify([
                                [-1, 0, -1.5],
                                [-1.5, 0, -1],
                            ]) ||
                        JSON.stringify(edgePiecesPositions[7]) ===
                            JSON.stringify([
                                [1.5, 0, -1],
                                [1, 0, -1.5],
                            ]) ||
                        JSON.stringify(edgePiecesPositions[7]) ===
                            JSON.stringify([
                                [-1, 0, 1.5],
                                [-1.5, 0, 1],
                            ]) ||
                        JSON.stringify(edgePiecesPositions[7]) ===
                            JSON.stringify([
                                [-1.5, 0, -1],
                                [-1, 0, -1.5],
                            ]) ||
                        JSON.stringify(edgePiecesPositions[7]) ===
                            JSON.stringify([
                                [1, 0, -1.5],
                                [1.5, 0, -1],
                            ]))) ||
                (JSON.stringify(centerPiecesPositions[0]) === JSON.stringify([-1.5, 0, 0]) &&
                    JSON.stringify(edgePiecesPositions[7]) !==
                        JSON.stringify([
                            [1, 0, 1.5],
                            [1.5, 0, 1],
                        ]))
            ) {
                setHintText('get orange-blue edge out (y)');
                return;
            } else if (JSON.stringify(centerPiecesPositions[0]) !== JSON.stringify([-1.5, 0, 0])) {
                setHintText("get orange-blue edge out (R U R' U' F' U' F ) and repeat (y)");
                return;
            } else {
                setHintText("get orange-blue edge out (R U R' U' F' U' F)");
                return;
            }
        }
        if (progress === 11) {
            setHintText('rotate entire cube (y)');
            if (JSON.stringify(centerPiecesPositions[0]) === JSON.stringify([0, 0, -1.5])) {
                setProgress(12);
                setHintText('-');
            }
        }
        if (progress === 12) {
            // blue-red edge
            if (
                JSON.stringify(edgePiecesPositions[6]) ===
                    JSON.stringify([
                        [1.5, 1, 0],
                        [1, 1.5, 0],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[4]) ===
                    JSON.stringify([
                        [1.5, -1, 1],
                        [1, -1, 1.5],
                        [1, -1.5, 1],
                    ])
            ) {
                setHintText("insert blue-red edge (U' F' U F R' F R F')");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[6]) ===
                JSON.stringify([
                    [1, 0, 1.5],
                    [1.5, 0, 1],
                ])
            ) {
                setHintText("get blue-red edge out (R U R' U' F' U' F)");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[6]) ===
                    JSON.stringify([
                        [1, 1.5, 0],
                        [1.5, 1, 0],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[4]) ===
                    JSON.stringify([
                        [1.5, 1, 1],
                        [1, 1.5, 1],
                        [1, 1, 1.5],
                    ]) &&
                JSON.stringify(edgePiecesPositions[0]) ===
                    JSON.stringify([
                        [1.5, 0, 1],
                        [1, 0, 1.5],
                    ])
            ) {
                setHintText("get blue-red edge out (U R' U' F' U' F)");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[6]) ===
                    JSON.stringify([
                        [0, 1.5, 1],
                        [0, 1, 1.5],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[4]) ===
                    JSON.stringify([
                        [-1, 1, 1.5],
                        [-1, 1.5, 1],
                        [-1.5, 1, 1],
                    ]) &&
                JSON.stringify(edgePiecesPositions[0]) ===
                    JSON.stringify([
                        [1.5, 0, 1],
                        [1, 0, 1.5],
                    ])
            ) {
                setHintText("get blue-red edge out (R' U' F' U' F)");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[6]) ===
                    JSON.stringify([
                        [0, 1.5, 1],
                        [0, 1, 1.5],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[4]) ===
                    JSON.stringify([
                        [-1, 1, 1.5],
                        [-1, 1.5, 1],
                        [-1.5, 1, 1],
                    ]) &&
                JSON.stringify(edgePiecesPositions[0]) ===
                    JSON.stringify([
                        [1.5, -1, 0],
                        [1, -1.5, 0],
                    ])
            ) {
                setHintText("get blue-red edge out (U' F' U' F)");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[6]) ===
                    JSON.stringify([
                        [1, 1.5, 0],
                        [1.5, 1, 0],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[4]) ===
                    JSON.stringify([
                        [1.5, 1, 1],
                        [1, 1.5, 1],
                        [1, 1, 1.5],
                    ]) &&
                JSON.stringify(edgePiecesPositions[0]) ===
                    JSON.stringify([
                        [1.5, -1, 0],
                        [1, -1.5, 0],
                    ])
            ) {
                setHintText("get blue-red edge out ( F' U' F)");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[6]) ===
                    JSON.stringify([
                        [1, 1.5, 0],
                        [1.5, 1, 0],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[4]) ===
                    JSON.stringify([
                        [-1, 1.5, 1],
                        [-1.5, 1, 1],
                        [-1, 1, 1.5],
                    ]) &&
                JSON.stringify(edgePiecesPositions[0]) ===
                    JSON.stringify([
                        [1.5, -1, 0],
                        [1, -1.5, 0],
                    ])
            ) {
                setHintText("get blue-red edge out (U' F)");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[6]) ===
                    JSON.stringify([
                        [0, 1.5, -1],
                        [0, 1, -1.5],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[4]) ===
                    JSON.stringify([
                        [1, 1.5, 1],
                        [1, 1, 1.5],
                        [1.5, 1, 1],
                    ]) &&
                JSON.stringify(edgePiecesPositions[0]) ===
                    JSON.stringify([
                        [1.5, -1, 0],
                        [1, -1.5, 0],
                    ])
            ) {
                setHintText('get blue-red edge out (F)');
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[6]) ===
                    JSON.stringify([
                        [0, 1, -1.5],
                        [0, 1.5, -1],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[4]) ===
                    JSON.stringify([
                        [1.5, -1, 1],
                        [1, -1, 1.5],
                        [1, -1.5, 1],
                    ])
            ) {
                setHintText("insert blue-red edge (F' U F R' F R F'))");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[6]) ===
                    JSON.stringify([
                        [0, 1, -1.5],
                        [0, 1.5, -1],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[4]) ===
                    JSON.stringify([
                        [1, 1.5, 1],
                        [1, 1, 1.5],
                        [1.5, 1, 1],
                    ])
            ) {
                setHintText("insert blue-red edge (U F R' F R F'))");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[6]) ===
                    JSON.stringify([
                        [1.5, 1, 0],
                        [1, 1.5, 0],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[4]) ===
                    JSON.stringify([
                        [-1, 1.5, 1],
                        [-1.5, 1, 1],
                        [-1, 1, 1.5],
                    ])
            ) {
                setHintText("insert blue-red edge (F R' F R F'))");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[6]) ===
                    JSON.stringify([
                        [1.5, 1, 0],
                        [1, 1.5, 0],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[4]) ===
                    JSON.stringify([
                        [1.5, 1, 1],
                        [1, 1.5, 1],
                        [1, 1, 1.5],
                    ])
            ) {
                setHintText("insert blue-red edge (R' F R F'))");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[6]) ===
                    JSON.stringify([
                        [1.5, 0, 1],
                        [1, 0, 1.5],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[4]) ===
                    JSON.stringify([
                        [1.5, -1, 1],
                        [1, -1, 1.5],
                        [1, -1.5, 1],
                    ]) &&
                JSON.stringify(edgePiecesPositions[0]) ===
                    JSON.stringify([
                        [1.5, 0, -1],
                        [1, 0, -1.5],
                    ])
            ) {
                setHintText("insert blue-red edge (F R F'))");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[6]) ===
                    JSON.stringify([
                        [0, -1.5, 1],
                        [0, -1, 1.5],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[4]) ===
                    JSON.stringify([
                        [-1, -1.5, 1],
                        [-1, -1, 1.5],
                        [-1.5, -1, 1],
                    ]) &&
                JSON.stringify(edgePiecesPositions[0]) ===
                    JSON.stringify([
                        [1.5, 0, -1],
                        [1, 0, -1.5],
                    ])
            ) {
                setHintText("insert blue-red edge (R F'))");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[6]) ===
                    JSON.stringify([
                        [0, -1.5, 1],
                        [0, -1, 1.5],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[4]) ===
                    JSON.stringify([
                        [-1, -1.5, 1],
                        [-1, -1, 1.5],
                        [-1.5, -1, 1],
                    ])
            ) {
                setHintText("insert blue-red edge (F'))");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[6]) ===
                    JSON.stringify([
                        [0, 1.5, 1],
                        [0, 1, 1.5],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[4]) ===
                    JSON.stringify([
                        [1.5, -1, 1],
                        [1, -1, 1.5],
                        [1, -1.5, 1],
                    ])
            ) {
                setHintText("insert blue-red edge (U R U' R' F R' F' R))");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[6]) ===
                    JSON.stringify([
                        [-1, 1.5, 0],
                        [-1.5, 1, 0],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[4]) ===
                    JSON.stringify([
                        [1.5, -1, 1],
                        [1, -1, 1.5],
                        [1, -1.5, 1],
                    ])
            ) {
                setHintText("insert blue-red edge (R U' R' F R' F' R))");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[6]) ===
                    JSON.stringify([
                        [-1, 1.5, 0],
                        [-1.5, 1, 0],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[4]) ===
                    JSON.stringify([
                        [1.5, 1, 1],
                        [1, 1.5, 1],
                        [1, 1, 1.5],
                    ])
            ) {
                setHintText("insert blue-red edge (U' R' F R' F' R))");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[6]) ===
                    JSON.stringify([
                        [0, 1.5, 1],
                        [0, 1, 1.5],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[4]) ===
                    JSON.stringify([
                        [1, 1, -1.5],
                        [1, 1.5, -1],
                        [1.5, 1, -1],
                    ])
            ) {
                setHintText("insert blue-red edge (R' F R' F' R))");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[6]) ===
                    JSON.stringify([
                        [0, 1.5, 1],
                        [0, 1, 1.5],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[4]) ===
                    JSON.stringify([
                        [1, 1.5, 1],
                        [1, 1, 1.5],
                        [1.5, 1, 1],
                    ])
            ) {
                setHintText("insert blue-red edge (F R' F' R))");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[6]) ===
                    JSON.stringify([
                        [1.5, 0, 1],
                        [1, 0, 1.5],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[4]) ===
                    JSON.stringify([
                        [1.5, -1, 1],
                        [1, -1, 1.5],
                        [1, -1.5, 1],
                    ]) &&
                JSON.stringify(edgePiecesPositions[9]) ===
                    JSON.stringify([
                        [-1, 0, 1.5],
                        [-1.5, 0, 1],
                    ])
            ) {
                setHintText("insert blue-red edge (R' F' R))");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[6]) ===
                    JSON.stringify([
                        [1.5, -1, 0],
                        [1, -1.5, 0],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[4]) ===
                    JSON.stringify([
                        [1.5, -1, -1],
                        [1, -1.5, -1],
                        [1, -1, -1.5],
                    ]) &&
                JSON.stringify(edgePiecesPositions[9]) ===
                    JSON.stringify([
                        [-1, 0, 1.5],
                        [-1.5, 0, 1],
                    ])
            ) {
                setHintText("insert blue-red edge (F' R))");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[6]) ===
                    JSON.stringify([
                        [1.5, -1, 0],
                        [1, -1.5, 0],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[4]) ===
                    JSON.stringify([
                        [1.5, -1, -1],
                        [1, -1.5, -1],
                        [1, -1, -1.5],
                    ])
            ) {
                setHintText('insert blue-red edge (R))');
                return;
            } else if (
                (JSON.stringify(edgePiecesPositions[6]) ===
                    JSON.stringify([
                        [0, 1, 1.5],
                        [0, 1.5, 1],
                    ]) ||
                    JSON.stringify(edgePiecesPositions[6]) ===
                        JSON.stringify([
                            [-1.5, 1, 0],
                            [-1, 1.5, 0],
                        ])) &&
                JSON.stringify(centerPiecesPositions[0]) === JSON.stringify([0, 0, -1.5])
            ) {
                setHintText('get orange-blue edge to better spot (U)');
                return;
            } else if (
                (JSON.stringify(edgePiecesPositions[7]) ===
                    JSON.stringify([
                        [0, 1.5, 1],
                        [0, 1, 1.5],
                    ]) ||
                    JSON.stringify(edgePiecesPositions[7]) ===
                        JSON.stringify([
                            [-1, 1.5, 0],
                            [-1.5, 1, 0],
                        ]) ||
                    JSON.stringify(edgePiecesPositions[7]) ===
                        JSON.stringify([
                            [1.5, 1, 0],
                            [1, 1.5, 0],
                        ]) ||
                    JSON.stringify(edgePiecesPositions[7]) ===
                        JSON.stringify([
                            [0, 1, -1.5],
                            [0, 1.5, -1],
                        ])) &&
                JSON.stringify(centerPiecesPositions[0]) === JSON.stringify([-1.5, 0, 0])
            ) {
                setHintText('get orange-blue edge to better spot (U)');
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[6]) ===
                    JSON.stringify([
                        [1.5, 0, 1],
                        [1, 0, 1.5],
                    ]) &&
                JSON.stringify(centerPiecesPositions[0]) === JSON.stringify([0, 0, -1.5])
            ) {
                setHintText('-');
                setProgress(13);
                return;
            } else if (
                (JSON.stringify(centerPiecesPositions[0]) !== JSON.stringify([0, 0, -1.5]) &&
                    (JSON.stringify(edgePiecesPositions[6]) ===
                        JSON.stringify([
                            [-1, 0, 1.5],
                            [-1.5, 0, 1],
                        ]) ||
                        JSON.stringify(edgePiecesPositions[6]) ===
                            JSON.stringify([
                                [-1.5, 0, -1],
                                [-1, 0, -1.5],
                            ]) ||
                        JSON.stringify(edgePiecesPositions[6]) ===
                            JSON.stringify([
                                [1, 0, -1.5],
                                [1.5, 0, -1],
                            ]) ||
                        JSON.stringify(edgePiecesPositions[6]) ===
                            JSON.stringify([
                                [-1.5, 0, 1],
                                [-1, 0, 1.5],
                            ]) ||
                        JSON.stringify(edgePiecesPositions[6]) ===
                            JSON.stringify([
                                [-1, 0, -1.5],
                                [-1.5, 0, -1],
                            ]) ||
                        JSON.stringify(edgePiecesPositions[6]) ===
                            JSON.stringify([
                                [1.5, 0, -1],
                                [1, 0, -1.5],
                            ]))) ||
                (JSON.stringify(centerPiecesPositions[0]) === JSON.stringify([0, 0, -1.5]) &&
                    JSON.stringify(edgePiecesPositions[6]) !==
                        JSON.stringify([
                            [1, 0, 1.5],
                            [1.5, 0, 1],
                        ]))
            ) {
                setHintText('get blue-red edge out (y)');
                return;
            } else if (JSON.stringify(centerPiecesPositions[0]) !== JSON.stringify([0, 0, -1.5])) {
                setHintText("get blue-red edge out (R U R' U' F' U' F ) and repeat (y)");
                return;
            } else {
                setHintText("get blue-red edge out (R U R' U' F' U' F)");
                return;
            }
        }
        if (progress === 13) {
            setHintText('rotate entire cube (y)');
            if (JSON.stringify(centerPiecesPositions[0]) === JSON.stringify([1.5, 0, 0])) {
                setProgress(14);
                setHintText('-');
            }
        }
        if (progress === 14) {
            // red-green edge
            if (
                JSON.stringify(edgePiecesPositions[4]) ===
                    JSON.stringify([
                        [1, 1.5, 0],
                        [1.5, 1, 0],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[0]) ===
                    JSON.stringify([
                        [1, -1, 1.5],
                        [1.5, -1, 1],
                        [1, -1.5, 1],
                    ])
            ) {
                setHintText("insert red-green edge (U' F' U F R' F R F')");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[4]) ===
                JSON.stringify([
                    [1.5, 0, 1],
                    [1, 0, 1.5],
                ])
            ) {
                setHintText("get red-green edge out (R U R' U' F' U' F)");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[4]) ===
                    JSON.stringify([
                        [1.5, 1, 0],
                        [1, 1.5, 0],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[0]) ===
                    JSON.stringify([
                        [1, 1.5, 1],
                        [1.5, 1, 1],
                        [1, 1, 1.5],
                    ]) &&
                JSON.stringify(edgePiecesPositions[8]) ===
                    JSON.stringify([
                        [1.5, 0, 1],
                        [1, 0, 1.5],
                    ])
            ) {
                setHintText("get red-green edge out (U R' U' F' U' F)");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[4]) ===
                    JSON.stringify([
                        [0, 1, 1.5],
                        [0, 1.5, 1],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[0]) ===
                    JSON.stringify([
                        [-1, 1.5, 1],
                        [-1, 1, 1.5],
                        [-1.5, 1, 1],
                    ]) &&
                JSON.stringify(edgePiecesPositions[8]) ===
                    JSON.stringify([
                        [1.5, 0, 1],
                        [1, 0, 1.5],
                    ])
            ) {
                setHintText("get red-green edge out (R' U' F' U' F)");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[4]) ===
                    JSON.stringify([
                        [0, 1, 1.5],
                        [0, 1.5, 1],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[0]) ===
                    JSON.stringify([
                        [-1, 1.5, 1],
                        [-1, 1, 1.5],
                        [-1.5, 1, 1],
                    ]) &&
                JSON.stringify(edgePiecesPositions[8]) ===
                    JSON.stringify([
                        [1.5, -1, 0],
                        [1, -1.5, 0],
                    ])
            ) {
                setHintText("get red-green edge out (U' F' U' F)");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[4]) ===
                    JSON.stringify([
                        [1.5, 1, 0],
                        [1, 1.5, 0],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[0]) ===
                    JSON.stringify([
                        [1, 1.5, 1],
                        [1.5, 1, 1],
                        [1, 1, 1.5],
                    ]) &&
                JSON.stringify(edgePiecesPositions[8]) ===
                    JSON.stringify([
                        [1.5, -1, 0],
                        [1, -1.5, 0],
                    ])
            ) {
                setHintText("get red-green edge out ( F' U' F)");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[4]) ===
                    JSON.stringify([
                        [1.5, 1, 0],
                        [1, 1.5, 0],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[0]) ===
                    JSON.stringify([
                        [-1.5, 1, 1],
                        [-1, 1.5, 1],
                        [-1, 1, 1.5],
                    ]) &&
                JSON.stringify(edgePiecesPositions[0]) ===
                    JSON.stringify([
                        [1, 0, 1.5],
                        [1.5, 0, 1],
                    ])
            ) {
                setHintText("get red-green edge out (U' F)");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[4]) ===
                    JSON.stringify([
                        [0, 1, -1.5],
                        [0, 1.5, -1],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[0]) ===
                    JSON.stringify([
                        [1, 1, 1.5],
                        [1, 1.5, 1],
                        [1.5, 1, 1],
                    ]) &&
                JSON.stringify(edgePiecesPositions[0]) ===
                    JSON.stringify([
                        [1, 0, 1.5],
                        [1.5, 0, 1],
                    ])
            ) {
                setHintText('get red-green edge out (F)');
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[4]) ===
                    JSON.stringify([
                        [0, 1.5, -1],
                        [0, 1, -1.5],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[0]) ===
                    JSON.stringify([
                        [1, -1, 1.5],
                        [1.5, -1, 1],
                        [1, -1.5, 1],
                    ])
            ) {
                setHintText("insert red-green edge (F' U F R' F R F'))");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[4]) ===
                    JSON.stringify([
                        [0, 1.5, -1],
                        [0, 1, -1.5],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[0]) ===
                    JSON.stringify([
                        [1, 1, 1.5],
                        [1, 1.5, 1],
                        [1.5, 1, 1],
                    ])
            ) {
                setHintText("insert red-green edge (U F R' F R F'))");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[4]) ===
                    JSON.stringify([
                        [1, 1.5, 0],
                        [1.5, 1, 0],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[0]) ===
                    JSON.stringify([
                        [-1.5, 1, 1],
                        [-1, 1.5, 1],
                        [-1, 1, 1.5],
                    ])
            ) {
                setHintText("insert red-green edge (F R' F R F'))");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[4]) ===
                    JSON.stringify([
                        [1, 1.5, 0],
                        [1.5, 1, 0],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[0]) ===
                    JSON.stringify([
                        [1, 1.5, 1],
                        [1.5, 1, 1],
                        [1, 1, 1.5],
                    ])
            ) {
                setHintText("insert red-green edge (R' F R F'))");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[4]) ===
                    JSON.stringify([
                        [1, 0, 1.5],
                        [1.5, 0, 1],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[0]) ===
                    JSON.stringify([
                        [1, -1, 1.5],
                        [1.5, -1, 1],
                        [1, -1.5, 1],
                    ]) &&
                JSON.stringify(edgePiecesPositions[8]) ===
                    JSON.stringify([
                        [1.5, 0, -1],
                        [1, 0, -1.5],
                    ])
            ) {
                setHintText("insert red-green edge (F R F'))");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[4]) ===
                    JSON.stringify([
                        [0, -1, 1.5],
                        [0, -1.5, 1],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[0]) ===
                    JSON.stringify([
                        [-1, -1, 1.5],
                        [-1, -1.5, 1],
                        [-1.5, -1, 1],
                    ]) &&
                JSON.stringify(edgePiecesPositions[8]) ===
                    JSON.stringify([
                        [1.5, 0, -1],
                        [1, 0, -1.5],
                    ])
            ) {
                setHintText("insert red-green edge (R F'))");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[4]) ===
                    JSON.stringify([
                        [0, -1, 1.5],
                        [0, -1.5, 1],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[0]) ===
                    JSON.stringify([
                        [-1, -1, 1.5],
                        [-1, -1.5, 1],
                        [-1.5, -1, 1],
                    ])
            ) {
                setHintText("insert red-green edge (F'))");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[4]) ===
                    JSON.stringify([
                        [0, 1, 1.5],
                        [0, 1.5, 1],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[0]) ===
                    JSON.stringify([
                        [1, -1, 1.5],
                        [1.5, -1, 1],
                        [1, -1.5, 1],
                    ])
            ) {
                setHintText("insert red-green edge (U R U' R' F R' F' R))");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[4]) ===
                    JSON.stringify([
                        [-1.5, 1, 0],
                        [-1, 1.5, 0],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[0]) ===
                    JSON.stringify([
                        [1, -1, 1.5],
                        [1.5, -1, 1],
                        [1, -1.5, 1],
                    ])
            ) {
                setHintText("insert red-green edge (R U' R' F R' F' R))");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[4]) ===
                    JSON.stringify([
                        [-1.5, 1, 0],
                        [-1, 1.5, 0],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[0]) ===
                    JSON.stringify([
                        [1, 1.5, 1],
                        [1.5, 1, 1],
                        [1, 1, 1.5],
                    ])
            ) {
                setHintText("insert red-green edge (U' R' F R' F' R))");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[4]) ===
                    JSON.stringify([
                        [0, 1, 1.5],
                        [0, 1.5, 1],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[0]) ===
                    JSON.stringify([
                        [1, 1.5, -1],
                        [1, 1, -1.5],
                        [1.5, 1, -1],
                    ])
            ) {
                setHintText("insert red-green edge (R' F R' F' R))");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[4]) ===
                    JSON.stringify([
                        [0, 1, 1.5],
                        [0, 1.5, 1],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[0]) ===
                    JSON.stringify([
                        [1, 1, 1.5],
                        [1, 1.5, 1],
                        [1.5, 1, 1],
                    ])
            ) {
                setHintText("insert red-green edge (F R' F' R))");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[4]) ===
                    JSON.stringify([
                        [1, 0, 1.5],
                        [1.5, 0, 1],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[0]) ===
                    JSON.stringify([
                        [1, -1, 1.5],
                        [1.5, -1, 1],
                        [1, -1.5, 1],
                    ]) &&
                JSON.stringify(edgePiecesPositions[0]) ===
                    JSON.stringify([
                        [-1, 0, 1.5],
                        [-1.5, 0, 1],
                    ])
            ) {
                setHintText("insert red-green edge (R' F' R))");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[4]) ===
                    JSON.stringify([
                        [1, -1.5, 0],
                        [1.5, -1, 0],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[0]) ===
                    JSON.stringify([
                        [1, -1.5, -1],
                        [1.5, -1, -1],
                        [1, -1, -1.5],
                    ]) &&
                JSON.stringify(edgePiecesPositions[0]) ===
                    JSON.stringify([
                        [-1, 0, 1.5],
                        [-1.5, 0, 1],
                    ])
            ) {
                setHintText("insert red-green edge (F' R))");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[4]) ===
                    JSON.stringify([
                        [1, -1.5, 0],
                        [1.5, -1, 0],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[0]) ===
                    JSON.stringify([
                        [1, -1.5, -1],
                        [1.5, -1, -1],
                        [1, -1, -1.5],
                    ])
            ) {
                setHintText('insert red-green edge (R))');
                return;
            } else if (
                (JSON.stringify(edgePiecesPositions[4]) ===
                    JSON.stringify([
                        [0, 1.5, 1],
                        [0, 1, 1.5],
                    ]) ||
                    JSON.stringify(edgePiecesPositions[4]) ===
                        JSON.stringify([
                            [-1, 1.5, 0],
                            [-1.5, 1, 0],
                        ])) &&
                JSON.stringify(centerPiecesPositions[0]) === JSON.stringify([1.5, 0, 0])
            ) {
                setHintText('get red-green edge to better spot (U)');
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[4]) ===
                    JSON.stringify([
                        [1, 0, 1.5],
                        [1.5, 0, 1],
                    ]) &&
                JSON.stringify(centerPiecesPositions[0]) === JSON.stringify([1.5, 0, 0])
            ) {
                setHintText('-');
                setProgress(15);
                return;
            } else if (
                (JSON.stringify(centerPiecesPositions[0]) !== JSON.stringify([1.5, 0, 0]) &&
                    (JSON.stringify(edgePiecesPositions[4]) ===
                        JSON.stringify([
                            [-1.5, 0, 1],
                            [-1, 0, 1.5],
                        ]) ||
                        JSON.stringify(edgePiecesPositions[4]) ===
                            JSON.stringify([
                                [-1, 0, -1.5],
                                [-1.5, 0, -1],
                            ]) ||
                        JSON.stringify(edgePiecesPositions[4]) ===
                            JSON.stringify([
                                [1.5, 0, -1],
                                [1, 0, -1.5],
                            ]) ||
                        JSON.stringify(edgePiecesPositions[4]) ===
                            JSON.stringify([
                                [-1, 0, 1.5],
                                [-1.5, 0, 1],
                            ]) ||
                        JSON.stringify(edgePiecesPositions[4]) ===
                            JSON.stringify([
                                [-1.5, 0, -1],
                                [-1, 0, -1.5],
                            ]) ||
                        JSON.stringify(edgePiecesPositions[4]) ===
                            JSON.stringify([
                                [1, 0, -1.5],
                                [1.5, 0, -1],
                            ]))) ||
                (JSON.stringify(centerPiecesPositions[0]) === JSON.stringify([1.5, 0, 0]) &&
                    JSON.stringify(edgePiecesPositions[7]) !==
                        JSON.stringify([
                            [1, 0, 1.5],
                            [1.5, 0, 1],
                        ]))
            ) {
                setHintText('get red-green edge out (y)');
                return;
            } else if (JSON.stringify(centerPiecesPositions[0]) !== JSON.stringify([1.5, 0, 0])) {
                setHintText("get red-green edge out (R U R' U' F' U' F ) and repeat (y)");
                return;
            } else {
                setHintText("get red-green edge out (R U R' U' F' U' F)");
                return;
            }
        }
        if (progress === 15) {
            setHintText('rotate entire cube (y)');
            if (JSON.stringify(centerPiecesPositions[0]) === JSON.stringify([0, 0, 1.5])) {
                setProgress(16);
                setHintText('-');
            }
        }
        if (progress === 16) {
            // green-orange edge
            if (
                JSON.stringify(edgePiecesPositions[5]) ===
                    JSON.stringify([
                        [1.5, 1, 0],
                        [1, 1.5, 0],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[1]) ===
                    JSON.stringify([
                        [1.5, -1, 1],
                        [1, -1, 1.5],
                        [1, -1.5, 1],
                    ])
            ) {
                setHintText("insert green-orange edge (U' F' U F R' F R F')");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[5]) ===
                JSON.stringify([
                    [1, 0, 1.5],
                    [1.5, 0, 1],
                ])
            ) {
                setHintText("get green-orange edge out (R U R' U' F' U' F)");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[5]) ===
                    JSON.stringify([
                        [1, 1.5, 0],
                        [1.5, 1, 0],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[1]) ===
                    JSON.stringify([
                        [1.5, 1, 1],
                        [1, 1.5, 1],
                        [1, 1, 1.5],
                    ]) &&
                JSON.stringify(edgePiecesPositions[1]) ===
                    JSON.stringify([
                        [1.5, 0, 1],
                        [1, 0, 1.5],
                    ])
            ) {
                setHintText("get green-orange edge out (U R' U' F' U' F)");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[5]) ===
                    JSON.stringify([
                        [0, 1.5, 1],
                        [0, 1, 1.5],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[1]) ===
                    JSON.stringify([
                        [-1, 1, 1.5],
                        [-1, 1.5, 1],
                        [-1.5, 1, 1],
                    ]) &&
                JSON.stringify(edgePiecesPositions[1]) ===
                    JSON.stringify([
                        [1.5, 0, 1],
                        [1, 0, 1.5],
                    ])
            ) {
                setHintText("get green-orange edge out (R' U' F' U' F)");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[5]) ===
                    JSON.stringify([
                        [0, 1.5, 1],
                        [0, 1, 1.5],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[1]) ===
                    JSON.stringify([
                        [-1, 1, 1.5],
                        [-1, 1.5, 1],
                        [-1.5, 1, 1],
                    ]) &&
                JSON.stringify(edgePiecesPositions[1]) ===
                    JSON.stringify([
                        [1.5, -1, 0],
                        [1, -1.5, 0],
                    ])
            ) {
                setHintText("get green-orange edge out (U' F' U' F)");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[5]) ===
                    JSON.stringify([
                        [1, 1.5, 0],
                        [1.5, 1, 0],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[1]) ===
                    JSON.stringify([
                        [1.5, 1, 1],
                        [1, 1.5, 1],
                        [1, 1, 1.5],
                    ]) &&
                JSON.stringify(edgePiecesPositions[1]) ===
                    JSON.stringify([
                        [1.5, -1, 0],
                        [1, -1.5, 0],
                    ])
            ) {
                setHintText("get green-orange edge out ( F' U' F)");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[5]) ===
                    JSON.stringify([
                        [1, 1.5, 0],
                        [1.5, 1, 0],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[1]) ===
                    JSON.stringify([
                        [-1, 1.5, 1],
                        [-1.5, 1, 1],
                        [-1, 1, 1.5],
                    ]) &&
                JSON.stringify(edgePiecesPositions[8]) ===
                    JSON.stringify([
                        [1, 0, 1.5],
                        [1.5, 0, 1],
                    ])
            ) {
                setHintText("get green-orange edge out (U' F)");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[5]) ===
                    JSON.stringify([
                        [0, 1.5, -1],
                        [0, 1, -1.5],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[1]) ===
                    JSON.stringify([
                        [1, 1.5, 1],
                        [1, 1, 1.5],
                        [1.5, 1, 1],
                    ]) &&
                JSON.stringify(edgePiecesPositions[8]) ===
                    JSON.stringify([
                        [1, 0, 1.5],
                        [1.5, 0, 1],
                    ])
            ) {
                setHintText('get green-orange edge out (F)');
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[5]) ===
                    JSON.stringify([
                        [0, 1, -1.5],
                        [0, 1.5, -1],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[1]) ===
                    JSON.stringify([
                        [1.5, -1, 1],
                        [1, -1, 1.5],
                        [1, -1.5, 1],
                    ])
            ) {
                setHintText("insert green-orange edge (F' U F R' F R F'))");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[5]) ===
                    JSON.stringify([
                        [0, 1, -1.5],
                        [0, 1.5, -1],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[1]) ===
                    JSON.stringify([
                        [1, 1.5, 1],
                        [1, 1, 1.5],
                        [1.5, 1, 1],
                    ])
            ) {
                setHintText("insert green-orange edge (U F R' F R F'))");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[5]) ===
                    JSON.stringify([
                        [1.5, 1, 0],
                        [1, 1.5, 0],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[1]) ===
                    JSON.stringify([
                        [-1, 1.5, 1],
                        [-1.5, 1, 1],
                        [-1, 1, 1.5],
                    ])
            ) {
                setHintText("insert green-orange edge (F R' F R F'))");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[5]) ===
                    JSON.stringify([
                        [1.5, 1, 0],
                        [1, 1.5, 0],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[1]) ===
                    JSON.stringify([
                        [1.5, 1, 1],
                        [1, 1.5, 1],
                        [1, 1, 1.5],
                    ])
            ) {
                setHintText("insert green-orange edge (R' F R F'))");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[5]) ===
                    JSON.stringify([
                        [1.5, 0, 1],
                        [1, 0, 1.5],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[1]) ===
                    JSON.stringify([
                        [1.5, -1, 1],
                        [1, -1, 1.5],
                        [1, -1.5, 1],
                    ]) &&
                JSON.stringify(edgePiecesPositions[1]) ===
                    JSON.stringify([
                        [1.5, 0, -1],
                        [1, 0, -1.5],
                    ])
            ) {
                setHintText("insert green-orange edge (F R F'))");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[5]) ===
                    JSON.stringify([
                        [0, -1.5, 1],
                        [0, -1, 1.5],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[1]) ===
                    JSON.stringify([
                        [-1, -1.5, 1],
                        [-1, -1, 1.5],
                        [-1.5, -1, 1],
                    ]) &&
                JSON.stringify(edgePiecesPositions[1]) ===
                    JSON.stringify([
                        [1.5, 0, -1],
                        [1, 0, -1.5],
                    ])
            ) {
                setHintText("insert green-orange edge (R F'))");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[5]) ===
                    JSON.stringify([
                        [0, -1.5, 1],
                        [0, -1, 1.5],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[1]) ===
                    JSON.stringify([
                        [-1, -1.5, 1],
                        [-1, -1, 1.5],
                        [-1.5, -1, 1],
                    ])
            ) {
                setHintText("insert green-orange edge (F'))");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[5]) ===
                    JSON.stringify([
                        [0, 1.5, 1],
                        [0, 1, 1.5],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[1]) ===
                    JSON.stringify([
                        [1.5, -1, 1],
                        [1, -1, 1.5],
                        [1, -1.5, 1],
                    ])
            ) {
                setHintText("insert green-orange edge (U R U' R' F R' F' R))");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[5]) ===
                    JSON.stringify([
                        [-1, 1.5, 0],
                        [-1.5, 1, 0],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[1]) ===
                    JSON.stringify([
                        [1.5, -1, 1],
                        [1, -1, 1.5],
                        [1, -1.5, 1],
                    ])
            ) {
                setHintText("insert green-orange edge (R U' R' F R' F' R))");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[5]) ===
                    JSON.stringify([
                        [-1, 1.5, 0],
                        [-1.5, 1, 0],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[1]) ===
                    JSON.stringify([
                        [1.5, 1, 1],
                        [1, 1.5, 1],
                        [1, 1, 1.5],
                    ])
            ) {
                setHintText("insert green-orange edge (U' R' F R' F' R))");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[5]) ===
                    JSON.stringify([
                        [0, 1.5, 1],
                        [0, 1, 1.5],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[1]) ===
                    JSON.stringify([
                        [1, 1, -1.5],
                        [1, 1.5, -1],
                        [1.5, 1, -1],
                    ])
            ) {
                setHintText("insert green-orange edge (R' F R' F' R))");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[5]) ===
                    JSON.stringify([
                        [0, 1.5, 1],
                        [0, 1, 1.5],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[1]) ===
                    JSON.stringify([
                        [1, 1.5, 1],
                        [1, 1, 1.5],
                        [1.5, 1, 1],
                    ])
            ) {
                setHintText("insert green-orange edge (F R' F' R))");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[5]) ===
                    JSON.stringify([
                        [1.5, 0, 1],
                        [1, 0, 1.5],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[1]) ===
                    JSON.stringify([
                        [1.5, -1, 1],
                        [1, -1, 1.5],
                        [1, -1.5, 1],
                    ]) &&
                JSON.stringify(edgePiecesPositions[8]) ===
                    JSON.stringify([
                        [-1, 0, 1.5],
                        [-1.5, 0, 1],
                    ])
            ) {
                setHintText("insert green-orange edge (R' F' R))");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[5]) ===
                    JSON.stringify([
                        [1.5, -1, 0],
                        [1, -1.5, 0],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[1]) ===
                    JSON.stringify([
                        [1.5, -1, -1],
                        [1, -1.5, -1],
                        [1, -1, -1.5],
                    ]) &&
                JSON.stringify(edgePiecesPositions[8]) ===
                    JSON.stringify([
                        [-1, 0, 1.5],
                        [-1.5, 0, 1],
                    ])
            ) {
                setHintText("insert green-orange edge (F' R))");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[5]) ===
                    JSON.stringify([
                        [1.5, -1, 0],
                        [1, -1.5, 0],
                    ]) &&
                JSON.stringify(cornerPiecesPositions[1]) ===
                    JSON.stringify([
                        [1.5, -1, -1],
                        [1, -1.5, -1],
                        [1, -1, -1.5],
                    ])
            ) {
                setHintText('insert green-orange edge (R))');
                return;
            } else if (
                (JSON.stringify(edgePiecesPositions[5]) ===
                    JSON.stringify([
                        [0, 1, 1.5],
                        [0, 1.5, 1],
                    ]) ||
                    JSON.stringify(edgePiecesPositions[5]) ===
                        JSON.stringify([
                            [-1.5, 1, 0],
                            [-1, 1.5, 0],
                        ])) &&
                JSON.stringify(centerPiecesPositions[0]) === JSON.stringify([0, 0, 1.5])
            ) {
                setHintText('get green-orange edge to better spot (U)');
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[5]) ===
                    JSON.stringify([
                        [1.5, 0, 1],
                        [1, 0, 1.5],
                    ]) &&
                JSON.stringify(centerPiecesPositions[0]) === JSON.stringify([0, 0, 1.5])
            ) {
                setHintText('-');
                setProgress(17);
                return;
            } else if (
                (JSON.stringify(centerPiecesPositions[0]) !== JSON.stringify([0, 0, 1.5]) &&
                    (JSON.stringify(edgePiecesPositions[5]) ===
                        JSON.stringify([
                            [-1, 0, 1.5],
                            [-1.5, 0, 1],
                        ]) ||
                        JSON.stringify(edgePiecesPositions[5]) ===
                            JSON.stringify([
                                [-1.5, 0, -1],
                                [-1, 0, -1.5],
                            ]) ||
                        JSON.stringify(edgePiecesPositions[5]) ===
                            JSON.stringify([
                                [1, 0, -1.5],
                                [1.5, 0, -1],
                            ]) ||
                        JSON.stringify(edgePiecesPositions[5]) ===
                            JSON.stringify([
                                [-1.5, 0, 1],
                                [-1, 0, 1.5],
                            ]) ||
                        JSON.stringify(edgePiecesPositions[5]) ===
                            JSON.stringify([
                                [-1, 0, -1.5],
                                [-1.5, 0, -1],
                            ]) ||
                        JSON.stringify(edgePiecesPositions[5]) ===
                            JSON.stringify([
                                [1.5, 0, -1],
                                [1, 0, -1.5],
                            ]))) ||
                (JSON.stringify(centerPiecesPositions[0]) === JSON.stringify([0, 0, 1.5]) &&
                    JSON.stringify(edgePiecesPositions[5]) !==
                        JSON.stringify([
                            [1.5, 0, 1],
                            [1, 0, 1.5],
                        ]))
            ) {
                setHintText('get orange-blue edge out (y)');
                return;
            } else if (JSON.stringify(centerPiecesPositions[0]) !== JSON.stringify([0, 0, 1.5])) {
                setHintText("get orange-blue edge out (R U R' U' F' U' F ) and repeat (y)");
                return;
            } else {
                setHintText("get orange-blue edge out (R U R' U' F' U' F)");
                return;
            }
        }
        if (progress === 17) {
            if (
                (!JSON.stringify(edgePiecesPositions[2][1]).includes(',1.5,') &&
                    !JSON.stringify(edgePiecesPositions[3][1]).includes(',1.5,') &&
                    !JSON.stringify(edgePiecesPositions[10][1]).includes(',1.5,') &&
                    !JSON.stringify(edgePiecesPositions[11][1]).includes(',1.5,') &&
                    JSON.stringify(edgePiecesPositions[2][0]).includes(',1.5,') &&
                    JSON.stringify(edgePiecesPositions[3][0]).includes(',1.5,') &&
                    JSON.stringify(edgePiecesPositions[10][0]).includes(',1.5,') &&
                    JSON.stringify(edgePiecesPositions[11][0]).includes(',1.5,')) ||
                ((JSON.stringify(edgePiecesPositions[2][1]) === JSON.stringify([0, 1.5, -1]) ||
                    JSON.stringify(edgePiecesPositions[3][1]) === JSON.stringify([0, 1.5, -1]) ||
                    JSON.stringify(edgePiecesPositions[10][1]) === JSON.stringify([0, 1.5, -1]) ||
                    JSON.stringify(edgePiecesPositions[11][1]) === JSON.stringify([0, 1.5, -1])) &&
                    (JSON.stringify(edgePiecesPositions[2][1]) === JSON.stringify([-1, 1.5, 0]) ||
                        JSON.stringify(edgePiecesPositions[3][1]) === JSON.stringify([-1, 1.5, 0]) ||
                        JSON.stringify(edgePiecesPositions[10][1]) === JSON.stringify([-1, 1.5, 0]) ||
                        JSON.stringify(edgePiecesPositions[11][1]) === JSON.stringify([-1, 1.5, 0])) &&
                    (JSON.stringify(edgePiecesPositions[2][0]) === JSON.stringify([0, 1.5, 1]) ||
                        JSON.stringify(edgePiecesPositions[3][0]) === JSON.stringify([0, 1.5, 1]) ||
                        JSON.stringify(edgePiecesPositions[10][0]) === JSON.stringify([0, 1.5, 1]) ||
                        JSON.stringify(edgePiecesPositions[11][0]) === JSON.stringify([0, 1.5, 1])) &&
                    (JSON.stringify(edgePiecesPositions[2][0]) === JSON.stringify([1, 1.5, 0]) ||
                        JSON.stringify(edgePiecesPositions[3][0]) === JSON.stringify([1, 1.5, 0]) ||
                        JSON.stringify(edgePiecesPositions[10][0]) === JSON.stringify([1, 1.5, 0]) ||
                        JSON.stringify(edgePiecesPositions[11][0]) === JSON.stringify([1, 1.5, 0]))) ||
                ((JSON.stringify(edgePiecesPositions[2][1]) === JSON.stringify([0, 1.5, 1]) ||
                    JSON.stringify(edgePiecesPositions[3][1]) === JSON.stringify([0, 1.5, 1]) ||
                    JSON.stringify(edgePiecesPositions[10][1]) === JSON.stringify([0, 1.5, 1]) ||
                    JSON.stringify(edgePiecesPositions[11][1]) === JSON.stringify([0, 1.5, 1])) &&
                    (JSON.stringify(edgePiecesPositions[2][1]) === JSON.stringify([1, 1.5, 0]) ||
                        JSON.stringify(edgePiecesPositions[3][1]) === JSON.stringify([1, 1.5, 0]) ||
                        JSON.stringify(edgePiecesPositions[10][1]) === JSON.stringify([1, 1.5, 0]) ||
                        JSON.stringify(edgePiecesPositions[11][1]) === JSON.stringify([1, 1.5, 0])) &&
                    (JSON.stringify(edgePiecesPositions[2][0]) === JSON.stringify([0, 1.5, -1]) ||
                        JSON.stringify(edgePiecesPositions[3][0]) === JSON.stringify([0, 1.5, -1]) ||
                        JSON.stringify(edgePiecesPositions[10][0]) === JSON.stringify([0, 1.5, -1]) ||
                        JSON.stringify(edgePiecesPositions[11][0]) === JSON.stringify([0, 1.5, -1])) &&
                    (JSON.stringify(edgePiecesPositions[2][0]) === JSON.stringify([-1, 1.5, 0]) ||
                        JSON.stringify(edgePiecesPositions[3][0]) === JSON.stringify([-1, 1.5, 0]) ||
                        JSON.stringify(edgePiecesPositions[10][0]) === JSON.stringify([-1, 1.5, 0]) ||
                        JSON.stringify(edgePiecesPositions[11][0]) === JSON.stringify([-1, 1.5, 0]))) ||
                ((JSON.stringify(edgePiecesPositions[2][1]) === JSON.stringify([1, 1.5, 0]) ||
                    JSON.stringify(edgePiecesPositions[3][1]) === JSON.stringify([1, 1.5, 0]) ||
                    JSON.stringify(edgePiecesPositions[10][1]) === JSON.stringify([1, 1.5, 0]) ||
                    JSON.stringify(edgePiecesPositions[11][1]) === JSON.stringify([1, 1.5, 0])) &&
                    (JSON.stringify(edgePiecesPositions[2][1]) === JSON.stringify([-1, 1.5, 0]) ||
                        JSON.stringify(edgePiecesPositions[3][1]) === JSON.stringify([-1, 1.5, 0]) ||
                        JSON.stringify(edgePiecesPositions[10][1]) === JSON.stringify([-1, 1.5, 0]) ||
                        JSON.stringify(edgePiecesPositions[11][1]) === JSON.stringify([-1, 1.5, 0])) &&
                    (JSON.stringify(edgePiecesPositions[2][0]) === JSON.stringify([0, 1.5, -1]) ||
                        JSON.stringify(edgePiecesPositions[3][0]) === JSON.stringify([0, 1.5, -1]) ||
                        JSON.stringify(edgePiecesPositions[10][0]) === JSON.stringify([0, 1.5, -1]) ||
                        JSON.stringify(edgePiecesPositions[11][0]) === JSON.stringify([0, 1.5, -1])) &&
                    (JSON.stringify(edgePiecesPositions[2][0]) === JSON.stringify([0, 1.5, 1]) ||
                        JSON.stringify(edgePiecesPositions[3][0]) === JSON.stringify([0, 1.5, 1]) ||
                        JSON.stringify(edgePiecesPositions[10][0]) === JSON.stringify([0, 1.5, 1]) ||
                        JSON.stringify(edgePiecesPositions[11][0]) === JSON.stringify([0, 1.5, 1])))
            ) {
                setHintText("make cross on the top (F R U R' U' F')");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[2][1]).includes(',1.5,') &&
                JSON.stringify(edgePiecesPositions[3][1]).includes(',1.5,') &&
                JSON.stringify(edgePiecesPositions[10][1]).includes(',1.5,') &&
                JSON.stringify(edgePiecesPositions[11][1]).includes(',1.5,')
            ) {
                setHintText('-');
                setProgress(18);
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[2]).includes(',1.5,') &&
                JSON.stringify(edgePiecesPositions[3]).includes(',1.5,') &&
                JSON.stringify(edgePiecesPositions[10]).includes(',1.5,') &&
                JSON.stringify(edgePiecesPositions[11]).includes(',1.5,')
            ) {
                setHintText('make cross on the top (U)');
                return;
            } else {
                setHintText("make cross on the top (F R U R' U' F')");
                return;
            }
        }
        if (progress === 18) {
            console.log(JSON.stringify(edgePiecesPositions[2]));
            console.log(JSON.stringify(edgePiecesPositions[3]));
            console.log(JSON.stringify(edgePiecesPositions[10]));
            console.log(JSON.stringify(edgePiecesPositions[11]));
            console.log('------------------------------------');

            if (
                JSON.stringify(edgePiecesPositions[2]) ===
                    JSON.stringify([
                        [-1.5, 1, 0],
                        [-1, 1.5, 0],
                    ]) &&
                JSON.stringify(edgePiecesPositions[3]) ===
                    JSON.stringify([
                        [1.5, 1, 0],
                        [1, 1.5, 0],
                    ]) &&
                JSON.stringify(edgePiecesPositions[10]) ===
                    JSON.stringify([
                        [0, 1, 1.5],
                        [0, 1.5, 1],
                    ]) &&
                JSON.stringify(edgePiecesPositions[11]) ===
                    JSON.stringify([
                        [0, 1, -1.5],
                        [0, 1.5, -1],
                    ])
            ) {
                setHintText('-');
                setProgress(19);
                return;
            } else if (
                (JSON.stringify(edgePiecesPositions[2]) ===
                    JSON.stringify([
                        [0, 1, 1.5],
                        [0, 1.5, 1],
                    ]) &&
                    JSON.stringify(edgePiecesPositions[3]) ===
                        JSON.stringify([
                            [1.5, 1, 0],
                            [1, 1.5, 0],
                        ]) &&
                    JSON.stringify(edgePiecesPositions[10]) ===
                        JSON.stringify([
                            [-1.5, 1, 0],
                            [-1, 1.5, 0],
                        ]) &&
                    JSON.stringify(edgePiecesPositions[11]) ===
                        JSON.stringify([
                            [0, 1, -1.5],
                            [0, 1.5, -1],
                        ])) ||
                (JSON.stringify(edgePiecesPositions[2]) ===
                    JSON.stringify([
                        [1.5, 1, 0],
                        [1, 1.5, 0],
                    ]) &&
                    JSON.stringify(edgePiecesPositions[3]) ===
                        JSON.stringify([
                            [0, 1, -1.5],
                            [0, 1.5, -1],
                        ]) &&
                    JSON.stringify(edgePiecesPositions[10]) ===
                        JSON.stringify([
                            [-1.5, 1, 0],
                            [-1, 1.5, 0],
                        ]) &&
                    JSON.stringify(edgePiecesPositions[11]) ===
                        JSON.stringify([
                            [0, 1, 1.5],
                            [0, 1.5, 1],
                        ])) ||
                (JSON.stringify(edgePiecesPositions[2]) ===
                    JSON.stringify([
                        [0, 1, -1.5],
                        [0, 1.5, -1],
                    ]) &&
                    JSON.stringify(edgePiecesPositions[3]) ===
                        JSON.stringify([
                            [0, 1, 1.5],
                            [0, 1.5, 1],
                        ]) &&
                    JSON.stringify(edgePiecesPositions[10]) ===
                        JSON.stringify([
                            [1.5, 1, 0],
                            [1, 1.5, 0],
                        ]) &&
                    JSON.stringify(edgePiecesPositions[11]) ===
                        JSON.stringify([
                            [-1.5, 1, 0],
                            [-1, 1.5, 0],
                        ])) ||
                (JSON.stringify(edgePiecesPositions[2]) ===
                    JSON.stringify([
                        [0, 1, 1.5],
                        [0, 1.5, 1],
                    ]) &&
                    JSON.stringify(edgePiecesPositions[3]) ===
                        JSON.stringify([
                            [-1.5, 1, 0],
                            [-1, 1.5, 0],
                        ]) &&
                    JSON.stringify(edgePiecesPositions[10]) ===
                        JSON.stringify([
                            [0, 1, -1.5],
                            [0, 1.5, -1],
                        ]) &&
                    JSON.stringify(edgePiecesPositions[11]) ===
                        JSON.stringify([
                            [1.5, 1, 0],
                            [1, 1.5, 0],
                        ])) ||
                (JSON.stringify(edgePiecesPositions[2]) ===
                    JSON.stringify([
                        [-1.5, 1, 0],
                        [-1, 1.5, 0],
                    ]) &&
                    JSON.stringify(edgePiecesPositions[3]) ===
                        JSON.stringify([
                            [0, 1, -1.5],
                            [0, 1.5, -1],
                        ]) &&
                    JSON.stringify(edgePiecesPositions[10]) ===
                        JSON.stringify([
                            [0, 1, 1.5],
                            [0, 1.5, 1],
                        ]) &&
                    JSON.stringify(edgePiecesPositions[11]) ===
                        JSON.stringify([
                            [1.5, 1, 0],
                            [1, 1.5, 0],
                        ]))
            ) {
                setHintText("align yellow edges on the top (R U R' U R U2 R')");
                return;
            } else if (
                JSON.stringify(edgePiecesPositions[2]).includes(',1.5,') &&
                JSON.stringify(edgePiecesPositions[3]).includes(',1.5,') &&
                JSON.stringify(edgePiecesPositions[10]).includes(',1.5,') &&
                JSON.stringify(edgePiecesPositions[11]).includes(',1.5,')
            ) {
                setHintText('align yellow edges on the top (U)');
                return;
            } else {
                setHintText("align yellow edges on the top (R U R' U R U2 R')");
                return;
            }
        }
        return;
    };

    useEffect(() => {
        getHintText();
        if (!wasChangedAtlestOnce);
        return;
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
        setProgress(0);
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
            <button className='settings-btn' onClick={props.showSettings}>
                Settings
            </button>
            <button className='toggle-hint-btn' onClick={() => setIsHintTextVisible(!isHintTextVisible)}>
                {isHintTextVisible ? 'Hide Hint' : 'Show Hint'}
            </button>
            <div className='toolbar'>
                {buttons.map(({ label, arg, color }) => (
                    <button
                        key={arg}
                        className='toolbar-btn'
                        style={{ backgroundColor: color }}
                        onClick={() => {
                            arg.split('').forEach((char) => handleToolbarClick(char));
                        }}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {isHintTextVisible ? (
                <div
                    className='hint-box'
                    onClick={() => {
                        setProgress(0);
                    }}
                >
                    <p className='hint-text'>{hintText}</p>
                </div>
            ) : null}
        </>
    );
}
