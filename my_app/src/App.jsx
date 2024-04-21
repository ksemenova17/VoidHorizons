import React from "react"
import library from './page/library'
import personal_account from './page/personal_account'
import sky from './page/sky'
import Navbar from './components/Navbar.jsx'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import mainpage from "./page/mainpage";
import login_registr from "./page/login_registr.jsx";


function App() {
    return (
        <Router>
            <div className="container">
                <Navbar />
                <Routes>
                    <Route path='/' element={ mainpage()}/>
                    <Route path='/library' element={library()}/>
                    <Route path='/personal_account' element={personal_account()}/>
                    <Route path='/sky' element={sky()}/>
                    <Route path='/login_registr' element={login_registr()}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
