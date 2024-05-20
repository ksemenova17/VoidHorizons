import React from "react"
import library from './page/library'
import profile from './page/profile/profile.jsx'
import sky from './page/sky'
import Navbar from './components/Navbar.jsx'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import mainpage from "./page/mainpage";
import login from "./page/auth/login/login.jsx";




function App() {
    return (
        <Router>
                <div className="container">
                    <Navbar/>
                    <Routes>
                        <Route path='/' element={mainpage()}/>
                        <Route path='/library' element={library()}/>
                        <Route path='/profile' element={profile()}/>
                        <Route path='/sky' element={sky()}/>
                        <Route path='/login' element={login()}/>
                    </Routes>
                </div>
        </Router>
    );
}

export default App;
