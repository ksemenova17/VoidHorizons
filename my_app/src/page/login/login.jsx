import React from "react";
import { CiUser, CiLock } from "react-icons/ci";

function login(){
    return(
        <div className="wrapper">
            <div className="form-box login">
                <form action="">
                    <h1>Login</h1>
                    <div className = "input-box">
                        <input type="text" placeholder='Username' required />
                        <CiUser className="icon"/>
                    </div>
                    <div className = "input-box">
                        <input type="password" placeholder='Password' required />
                        <CiLock className="icon"/>
                    </div>
                    <div className="remember-forgot">
                        <label><input type="checkbox"/>Запомнить меня</label>
                        <a href="#">Забыли пароль?</a>
                    </div>
                    <button type="submit">Войти</button>
                    <div className="register-link">
                        <p>Ещё нет аккаунта? <a href="#">Регистрация</a></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default login;