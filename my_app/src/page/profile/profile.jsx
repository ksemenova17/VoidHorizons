// import React from "react";
// import { CiTrash, CiHeart } from "react-icons/ci";
// import './profile.scss'
//
// function profile() {
//     return (
//         <div className="profile">
//             <div className="container">
//                 <div className="user-info">
//                     <h1>Добро пожаловать!</h1>
//                 </div>
//                 <h3><span><CiHeart /></span>Избранные статьи</h3>
//                 <h3>Изменение пароля</h3>
//                 <p>Текущий пароль</p>
//                 <input placeholder="Текущий пароль" type="password"/>
//                 <p>Новый пароль</p>
//                 <input placeholder="Новый пароль" type="password"/>
//                 <p>Подтвердите пароль</p>
//                 <input placeholder="Подтвердите пароль" type="password"/>
//                 <button>Сохранить изменения</button>
//                 <h3>Удалить профиль</h3>
//                 <p><span><CiTrash/></span>Удалить профиль!</p>
//             </div>
//         </div>
//     )
// }
//
// export default profile;

import React from 'react';
import { CiTrash, CiCamera, CiHeart } from 'react-icons/ci';
import './profile.scss';

const ProfilePage = () => {
    const user = {
        NickName: 'lala',
    };

    return (
        <div className="profile-page">
            <div className="profile-container">
                <div className="profile-picture">
                    <img src="https://via.placeholder.com/150" alt="User"/>
                    <p>NickName</p>
                    <button className="upload-button">
                        <CiCamera/> Загрузить фото
                    </button>
                    <h3><span><CiHeart/></span>Избранные статьи</h3>
                    <p>Текущий пароль</p>
                    <input placeholder="Текущий пароль" type="password"/>
                    <p>Новый пароль</p>
                    <input placeholder="Новый пароль" type="password"/>
                    <p>Подтвердите пароль</p>
                    <input placeholder="Подтвердите пароль" type="password"/>
                    {/*<button className="delete-button">*/}
                    {/*    <CiTrash /> Удалить*/}
                    {/*</button>*/}
                </div>
                {/*<div className="profile-form">*/}
                {/*    <button type="submit" className="save-button">*/}
                {/*        Сохранить изменения*/}
                {/*    </button>*/}
                {/*</div>*/}
            </div>
        </div>
    );
};

export default ProfilePage;
