import React, { useRef, forwardRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const Earth = forwardRef((props, ref) => {
    const { nodes, materials } = useGLTF('/3d-model/Earth.glb');
    const internalRef = useRef();

    useFrame(() => {
        const currentRef = ref || internalRef;
        if (currentRef.current) {
            currentRef.current.rotation.y += 0.001; // Вращение модели вокруг оси Y
        }
    });

    return (
        <group ref={ref || internalRef} {...props} dispose={null}>
            <group rotation={[-Math.PI / 2, 0, 0]} scale={0.1}>
                <points geometry={nodes.Object_2.geometry} material={materials['Scene_-_Root']} />
                <points geometry={nodes.Object_3.geometry} material={materials['Scene_-_Root']} />
                <points geometry={nodes.Object_4.geometry} material={materials['Scene_-_Root']} />
                <points geometry={nodes.Object_5.geometry} material={materials['Scene_-_Root']} />
            </group>
        </group>
    );
});

export default Earth;
