import React from "react";
import { Link } from "react-router-dom";

function mainpage(){
    return(
        <div className="mainpage">
            <div className="main-content">
                <h1 className="main-content-title">
                    void horizons
                </h1>
                {/*<div className="main-content-subtitle">инновационная, образовательная платформа, направленная на изучениие созвездий и космических объектов. Присоединяйся, чтобы получить полный доступ ко всем функциям на сайте, таким как расчет созвездий по координатам, а также полный список созвездий в библиотеке.</div>*/}
                <p className="main-content-subtitle-line1">вселенная - это книга, </p>
                <p className="main-content-subtitle-line2">наполненная неизведанными </p>
                <p className="main-content-subtitle-line3">страницами. </p>
                <Link to="/login">
                    <button>регистрация</button>
                </Link>
            </div>

        </div>
    )
}

export default mainpage;