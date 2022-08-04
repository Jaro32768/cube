import React from 'react';
import CubePiece from './CubePiece';

export default function Cube3x3x3() {
    return (<>
        <CubePiece color={'#' + Math.floor(Math.random() * 16777215).toString(16)} position={[-1, -1, -1]} />
        <CubePiece color={'#' + Math.floor(Math.random() * 16777215).toString(16)} position={[-1, 0, -1]} />
        <CubePiece color={'#' + Math.floor(Math.random() * 16777215).toString(16)} position={[-1, 1, -1]} />
        <CubePiece color={'#' + Math.floor(Math.random() * 16777215).toString(16)} position={[-1, -1, 0]} />
        <CubePiece color={'#' + Math.floor(Math.random() * 16777215).toString(16)} position={[-1, 0, 0]} />
        <CubePiece color={'#' + Math.floor(Math.random() * 16777215).toString(16)} position={[-1, 1, 0]} />
        <CubePiece color={'#' + Math.floor(Math.random() * 16777215).toString(16)} position={[-1, -1, 1]} />
        <CubePiece color={'#' + Math.floor(Math.random() * 16777215).toString(16)} position={[-1, 0, 1]} />
        <CubePiece color={'#' + Math.floor(Math.random() * 16777215).toString(16)} position={[-1, 1, 1]} />

        <CubePiece color={'#' + Math.floor(Math.random() * 16777215).toString(16)} position={[0, -1, -1]} />
        <CubePiece color={'#' + Math.floor(Math.random() * 16777215).toString(16)} position={[0, 0, -1]} />
        <CubePiece color={'#' + Math.floor(Math.random() * 16777215).toString(16)} position={[0, 1, -1]} />
        <CubePiece color={'#' + Math.floor(Math.random() * 16777215).toString(16)} position={[0, -1, 0]} />
        // no middle piece, because it is not seen anyways
        <CubePiece color={'#' + Math.floor(Math.random() * 16777215).toString(16)} position={[0, 1, 0]} />
        <CubePiece color={'#' + Math.floor(Math.random() * 16777215).toString(16)} position={[0, -1, 1]} />
        <CubePiece color={'#' + Math.floor(Math.random() * 16777215).toString(16)} position={[0, 0, 1]} />
        <CubePiece color={'#' + Math.floor(Math.random() * 16777215).toString(16)} position={[0, 1, 1]} />

        <CubePiece color={'#' + Math.floor(Math.random() * 16777215).toString(16)} position={[1, -1, -1]} />
        <CubePiece color={'#' + Math.floor(Math.random() * 16777215).toString(16)} position={[1, 0, -1]} />
        <CubePiece color={'#' + Math.floor(Math.random() * 16777215).toString(16)} position={[1, 1, -1]} />
        <CubePiece color={'#' + Math.floor(Math.random() * 16777215).toString(16)} position={[1, -1, 0]} />
        <CubePiece color={'#' + Math.floor(Math.random() * 16777215).toString(16)} position={[1, 0, 0]} />
        <CubePiece color={'#' + Math.floor(Math.random() * 16777215).toString(16)} position={[1, 1, 0]} />
        <CubePiece color={'#' + Math.floor(Math.random() * 16777215).toString(16)} position={[1, -1, 1]} />
        <CubePiece color={'#' + Math.floor(Math.random() * 16777215).toString(16)} position={[1, 0, 1]} />
        <CubePiece color={'#' + Math.floor(Math.random() * 16777215).toString(16)} position={[1, 1, 1]} />
    </>
    )
}
