// import React from 'react';
// import { useGLTF } from '@react-three/drei';
//
// const Earth = (props) => {
//     const { nodes, materials } = useGLTF('/3d-model/Earth.glb');
//
//     return (
//         <group {...props} dispose={null}>
//             <group rotation={[-Math.PI / 2, 0, 0]} scale={0.1}>
//                 <points geometry={nodes.Object_2.geometry} material={materials['Scene_-_Root']} />
//                 <points geometry={nodes.Object_3.geometry} material={materials['Scene_-_Root']} />
//                 <points geometry={nodes.Object_4.geometry} material={materials['Scene_-_Root']} />
//                 <points geometry={nodes.Object_5.geometry} material={materials['Scene_-_Root']} />
//             </group>
//         </group>
//     );
// };
//
// export default Earth;
//

import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const Earth = (props) => {
    const { nodes, materials } = useGLTF('/3d-model/Earth.glb');
    const ref = useRef();

    useFrame(() => {
        if (ref.current) {
            ref.current.rotation.y += 0.001; // Вращение модели вокруг оси Y
        }
    });

    return (
        <group ref={ref} {...props} dispose={null}>
            <group rotation={[-Math.PI / 2, 0, 0]} scale={0.1}>
                <points geometry={nodes.Object_2.geometry} material={materials['Scene_-_Root']} />
                <points geometry={nodes.Object_3.geometry} material={materials['Scene_-_Root']} />
                <points geometry={nodes.Object_4.geometry} material={materials['Scene_-_Root']} />
                <points geometry={nodes.Object_5.geometry} material={materials['Scene_-_Root']} />
            </group>
        </group>
    );
};

export default Earth;

