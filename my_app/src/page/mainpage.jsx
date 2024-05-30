import React, {useState, useEffect, useRef, useFrame, Suspense} from "react";
import Facts from "../components/Facts/Facts.jsx";
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Earth from '../models/Earth'
import CookieConsent from '../components/Cookie/CookieConsent.jsx';

function RotatingEarth(props) {
    const ref = useRef();
    useFrame(() => {
        if (ref.current) {
            ref.current.rotation.y += 0.01; // Вращение модели вокруг оси Y
        }
    });
    return <Earth ref={ref} {...props} />;
}

function mainpage(){
    return (
        <div className="mainpage">
            <div className="canvas-container">
                <Canvas camera={{position: [2, 2, 5], fov: 75, near: 0.5, far: 2000}}>
                    <Suspense fallback={null}>
                        <OrbitControls/>
                        <ambientLight intensity={0}/>
                        <directionalLight intensity={3} position={[1, 0, 1]}/>
                        <Earth position={[0.5, 0.35, 0]} rotation={[12.65, -0.6, 0]} scale={[0.5, 0.5, 0.5]}/>
                        RotatingEarth position={[0.5, 0.35, 0]} rotation={[12.65, -0.6, 0]} scale={[0.5, 0.5, 0.5]} />
                    </Suspense>
                </Canvas>
            </div>
            <div className="main-content">
                <h1 className="main-content-title">void horizons</h1>
                <p className="main-content-subtitle-line1">вселенная - это книга, </p>
                <p className="main-content-subtitle-line2">наполненная неизведанными </p>
                <p className="main-content-subtitle-line3">страницами. </p>
                <Facts/>
                <CookieConsent />
            </div>
        </div>
    )
}

export default mainpage;