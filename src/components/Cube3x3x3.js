import React from 'react';
import CenterPiece from './CenterPiece';
import EdgePiece from './EdgePiece';
import CornerPiece from './CornerPiece';

export default function Cube3x3x3() {
    return (
        <>

            {/* green center */}
            <CenterPiece color={'#0f0'} position={[0, 0, 1.5]} rotation={[0, Math.PI / 2, 0]} />
            {/* blue center */}
            <CenterPiece color={'#00f'} position={[0, 0, -1.5]} rotation={[0, Math.PI / 2, 0]} />
            {/* white center */}
            <CenterPiece color={'#fff'} position={[0, 1.5, 0]} rotation={[0, 0, Math.PI / 2]} />
            {/* yellow center */}
            <CenterPiece color={'#ff0'} position={[0, -1.5, 0]} rotation={[0, 0, Math.PI / 2]} />
            {/* orange center */}
            <CenterPiece color={'#f90'} position={[1.5, 0, 0]} rotation={[0, 0, 0]} />
            {/* red center */}
            <CenterPiece color={'#f00'} position={[-1.5, 0, 0]} rotation={[0, 0, 0]} />

            {/* orange - white edge */}
            <EdgePiece color1={'#f90'} color2={'#fff'} position1={[1.5, 1, 0]} position2={[1, 1.5, 0]} rotation1={[0, 0, 0]} rotation2={[0, 0, Math.PI / 2]} />
            {/* red - white edge */}
            <EdgePiece color1={'#f00'} color2={'#fff'} position1={[-1.5, 1, 0]} position2={[-1, 1.5, 0]} rotation1={[0, 0, 0]} rotation2={[0, 0, Math.PI / 2]} />
            {/* orange - yellow edge */}
            <EdgePiece color1={'#f90'} color2={'#ff0'} position1={[1.5, -1, 0]} position2={[1, -1.5, 0]} rotation1={[0, 0, 0]} rotation2={[0, 0, Math.PI / 2]} />
            {/* red - yellow edge */}
            <EdgePiece color1={'#f00'} color2={'#ff0'} position1={[-1.5, -1, 0]} position2={[-1, -1.5, 0]} rotation1={[0, 0, 0]} rotation2={[0, 0, Math.PI / 2]} />

            {/* orange - green edge */}
            <EdgePiece color1={'#f90'} color2={'#0f0'} position1={[1.5, 0, 1]} position2={[1, 0, 1.5]} rotation1={[0, 0, 0]} rotation2={[0, Math.PI / 2, 0]} />
            {/* red - green edge */}
            <EdgePiece color1={'#f00'} color2={'#0f0'} position1={[-1.5, 0, 1]} position2={[-1, 0, 1.5]} rotation1={[0, 0, 0]} rotation2={[0, Math.PI / 2, 0]} />
            {/* orange - blue edge */}
            <EdgePiece color1={'#f90'} color2={'#00f'} position1={[1.5, 0, -1]} position2={[1, 0, -1.5]} rotation1={[0, 0, 0]} rotation2={[0, Math.PI / 2, 0]} />
            {/* red - blue edge */}
            <EdgePiece color1={'#f00'} color2={'#00f'} position1={[-1.5, 0, -1]} position2={[-1, 0, -1.5]} rotation1={[0, 0, 0]} rotation2={[0, Math.PI / 2, 0]} />

            {/* green - white edge */}
            <EdgePiece color1={'#0f0'} color2={'#fff'} position1={[0, 1, 1.5]} position2={[0, 1.5, 1]} rotation1={[0, Math.PI / 2, 0]} rotation2={[0, 0, Math.PI / 2]} />
            {/* blue - white edge */}
            <EdgePiece color1={'#00f'} color2={'#fff'} position1={[0, 1, -1.5]} position2={[0, 1.5, -1]} rotation1={[0, Math.PI / 2, 0]} rotation2={[0, 0, Math.PI / 2]} />
            {/* green - yellow edge */}
            <EdgePiece color1={'#0f0'} color2={'#ff0'} position1={[0, -1, 1.5]} position2={[0, -1.5, 1]} rotation1={[0, Math.PI / 2, 0]} rotation2={[0, 0, Math.PI / 2]} />
            {/* blue - yellow edge */}
            <EdgePiece color1={'#00f'} color2={'#ff0'} position1={[0, -1, -1.5]} position2={[0, -1.5, -1]} rotation1={[0, Math.PI / 2, 0]} rotation2={[0, 0, Math.PI / 2]} />

            {/* orange - green - white corner */}
            <CornerPiece color1={'#f90'} color2={'#0f0'} color3={'#fff'} position1={[1.5, 1, 1]} position2={[1, 1, 1.5]} position3={[1, 1.5, 1]} />
            {/* red - green - white corner */}
            <CornerPiece color1={'#f00'} color2={'#0f0'} color3={'#fff'} position1={[-1.5, 1, 1]} position2={[-1, 1, 1.5]} position3={[-1, 1.5, 1]} />
            {/* orange - green - yellow corner */}
            <CornerPiece color1={'#f90'} color2={'#0f0'} color3={'#ff0'} position1={[1.5, -1, 1]} position2={[1, -1, 1.5]} position3={[1, -1.5, 1]} />
            {/* red - green - yellow corner */}
            <CornerPiece color1={'#f00'} color2={'#0f0'} color3={'#ff0'} position1={[-1.5, -1, 1]} position2={[-1, -1, 1.5]} position3={[-1, -1.5, 1]} />

            {/* orange - blue - white corner */}
            <CornerPiece color1={'#f90'} color2={'#00f'} color3={'#fff'} position1={[1.5, 1, -1]} position2={[1, 1, -1.5]} position3={[1, 1.5, -1]} />
            {/* red - blue - white corner */}
            <CornerPiece color1={'#f00'} color2={'#00f'} color3={'#fff'} position1={[-1.5, 1, -1]} position2={[-1, 1, -1.5]} position3={[-1, 1.5, -1]} />
            {/* orange - blue - yellow corner */}
            <CornerPiece color1={'#f90'} color2={'#00f'} color3={'#ff0'} position1={[1.5, -1, -1]} position2={[1, -1, -1.5]} position3={[1, -1.5, -1]} />
            {/* red - blue - yellow corner */}
            <CornerPiece color1={'#f00'} color2={'#00f'} color3={'#ff0'} position1={[-1.5, -1, -1]} position2={[-1, -1, -1.5]} position3={[-1, -1.5, -1]} />
        </>
    )
}
