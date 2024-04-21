import React from "react";

function mainpage(){
    return(
        <div className="mainpage">
            <div className="main-content">
                <h1 className="main-content-title">
                    void horizons
                </h1>
                <div className="main-content-subtitle">инновационная, образовательная платформа, направленная на изучениие созвездий и космических объектов. Присоединяйся, чтобы получить полный доступ ко всем функциям на сайте, таким как расчет созвездий по координатам, а также полный список созвездий в библиотеке.</div>
                <a href="login_registr.jsx">
                    <button >регистрация</button>
                </a>
            </div>

        </div>
    )
}

export default mainpage;