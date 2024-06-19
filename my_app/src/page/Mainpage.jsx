import React, { useRef, Suspense} from "react";
import Facts from "../components/Facts/Facts.jsx";
import { Canvas, useFrame } from '@react-three/fiber';
import Earth from '../models/Earth'
import CookieConsent from '../components/Cookie/CookieConsent.jsx';
import "../style.scss"

function RotatingEarth(props) {
    const ref = useRef();
    useFrame(() => {
        if (ref.current) {
            ref.current.rotation.y += 0.001; // Вращение модели вокруг оси Y
        }
    });
    return <Earth ref={ref} {...props} />;
}

const Mainpage = () =>{
    return (
        <div className="mainpage">
            <div className="canvas-container">
                <Canvas camera={{position: [2, 2, 5], fov: 75, near: 0.5, far: 2000}}>
                    <Suspense fallback={null}>
                        <ambientLight intensity={0}/>
                        <directionalLight intensity={3} position={[1, 0, 1]}/>
                        <RotatingEarth position={[0.5, 0.35, 0]} rotation={[12.65, -0.6, 0]} scale={[0.5, 0.5, 0.5]} />
                    </Suspense>
                </Canvas>
            </div>
            <div className="main-content">
                <h1 className="main-content-title">void horizons</h1>
                <p className="main-content-subtitle-line1">
                    <span className="space">вселенная</span>
                    - это книга, </p>
                <p className="main-content-subtitle-line2">наполненная неизведанными </p>
                <p className="main-content-subtitle-line3">страницами. </p>
                <Facts/>
                <CookieConsent/>
            </div>
        </div>
    )
}

export default Mainpage;