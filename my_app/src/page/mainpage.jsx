import React from "react";
import { Link } from "react-router-dom";
import fact from "../images/home/fact.svg"
import Facts from "../components/Facts/Facts.jsx";

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
                <Facts/>
                <Link to="/login">
                    <button>регистрация</button>
                </Link>
            </div>
        </div>
    )
}

export default mainpage;