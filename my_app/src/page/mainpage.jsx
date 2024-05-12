import React from "react";
import { Link } from "react-router-dom";
import fact from "../images/home/fact.svg"

function mainpage(){
    return(
        <div className="mainpage">
            <div className="main-content">
                <h1 className="main-content-title">
                    void horizons
                </h1>
                <p className="main-content-subtitle-line1">вселенная - это книга, </p>
                <p className="main-content-subtitle-line2">наполненная неизведанными </p>
                <p className="main-content-subtitle-line3">страницами. </p>
                <img className="fact" src= {fact}/>
                <Link to="/login">
                    <button>регистрация</button>
                </Link>
            </div>
        </div>
    )
}

export default mainpage;