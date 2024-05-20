import React from "react";
import {Link} from "react-router-dom";
import burger from "../images/icon-hamburger.svg"
import burgerClose from "../images/icon-close.svg"

function Navbar(){
    const [open,setOpen] = React.useState(false)

    return(
        <header>
            <nav className={`nav ${open?'show':""}`}>
                <ul>
                    <li className="active"><Link to='/'>Главная страница</Link></li>
                    <li><Link to='/library'>Библиотека</Link></li>
                    <li><Link to='/sky'>Ваше небо</Link></li>
                    <li><Link to='/profile'>Личный кабинет</Link></li>
                </ul>
                <div onClick={() => setOpen(!open)} className="menu">
                    {
                        open === false ?
                            <img src={burger} alt = "" /> :
                            <img src={burgerClose} alt = "" />
                    }
                </div>
            </nav>
        </header>
    )
}

export default Navbar;