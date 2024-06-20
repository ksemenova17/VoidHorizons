import Library from './page/library/Library.jsx'
import Profile from './page/profile/Profile.jsx'
import Sky from './page/sky/Sky.jsx'
import Navbar from './components/Navbar.jsx'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Mainpage from "./page/Mainpage.jsx";
import Login from "./page/auth/login/Login.jsx";
//import { UserProvider } from './api/UserContext.jsx';
import PrivateRoute from './api/PrivateRoute.jsx';





function App() {
    return (
        //<UserProvider>
        <Router>
                <div className="container">
                    <Navbar/>
                    <Routes>
                        <Route path='/' element={<Mainpage />} />
                        <Route path="/library/:id" element={<Library />} />
                        <Route path='/library' element={<Library />} />
                        <Route path='/profile' element={
                            <PrivateRoute>
                                <Profile />
                            </PrivateRoute>
                        }/>
                        <Route path='/sky' element={
                            <PrivateRoute>
                                <Sky />
                            </PrivateRoute>
                        }/>
                        <Route path='/login' element={<Login />} />
                    </Routes>
                </div>
        </Router>
        //</UserProvider>
    );
}

export default App;
