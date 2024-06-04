import React from "react"
import Library from './page/library/Library.jsx'
import Profile from './page/profile/Profile.jsx'
import sky from './page/sky/sky.jsx'
import Navbar from './components/Navbar.jsx'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Mainpage from "./page/Mainpage.jsx";
import Login from "./page/auth/login/Login.jsx";





function App() {
    return (
        <Router>
                <div className="container">
                    <Navbar/>
                    <Routes>
                        <Route path='/' element={Mainpage()}/>
                        <Route path='/library' element={Library()}/>
                        <Route path='/profile' element={<Profile />}/>
                        <Route path='/sky' element={sky()}/>
                        <Route path='/login' element={<Login />}/>
                    </Routes>
                </div>
        </Router>
    );
}

export default App;
