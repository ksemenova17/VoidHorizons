// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import './style.scss'
// import './Font/Serpent/serpent.ttf'
//
//
// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )


import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { UserProvider } from './api/UserContext.jsx' // Импортируем UserProvider
import './style.scss'
import './Font/Serpent/serpent.ttf'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <UserProvider>
            <App />
        </UserProvider>
    </React.StrictMode>,
)
