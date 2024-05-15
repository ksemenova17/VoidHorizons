import React, {useState} from "react";
import { CiUser, CiLock, CiMail} from "react-icons/ci";
import './login.scss'

function login(){

    const [action, setAction] = useState('')

    const registerLink = () => {
        setAction(' active')
    };
    const loginLink = () => {
        setAction(' ')
    };

    return(
        <div className={`wrapper${action}`}>
            <div className="form-box login">
                <form action="">
                    <h1>Вход</h1>
                    <div className="input-box">
                        <input type="text" placeholder='Username' required/>
                        <CiUser className="icon"/>
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder='Password' required/>
                        <CiLock className="icon"/>
                    </div>
                    <button type="submit">Войти</button>
                    <div className="register-link">
                        <p>Ещё нет аккаунта? <a href="#" onClick={registerLink}>Регистрация</a></p>
                    </div>
                </form>
            </div>
            <div className="form-box register">
                <form action="">
                    <h1>Регистрация</h1>
                    <div className="input-box">
                        <input type="text" placeholder='Username' required/>
                        <CiUser className="icon"/>
                    </div>
                    <div className="input-box">
                        <input type="email" placeholder='Email' required/>
                        <CiMail className="icon"/>
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder='Password' required/>
                        <CiLock className="icon"/>
                    </div>
                    <div className="agree">
                        <label><input type="checkbox"/>Я даю согласие на  <a
                            href="#">обработку персональных данных</a></label>
                    </div>
                    <button type="submit">Регистрация</button>
                    <div className="register-link">
                        <p>Уже есть аккаунт? <a href="#" onClick={loginLink}>Войти</a></p>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default login;