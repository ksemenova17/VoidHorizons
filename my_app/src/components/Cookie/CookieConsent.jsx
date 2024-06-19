import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import './CookieConsent.scss';

const CookieConsent = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const consent = Cookies.get('cookieConsent');
        if (!consent) {
            setVisible(true);
        }
    }, []);

    const handleAccept = () => {
        Cookies.set('cookieConsent', 'true', { expires: 365 });
        setVisible(false);
    };

    const handleDecline = () => {
        Cookies.set('cookieConsent', 'false', { expires: 365 });
        setVisible(false);
    };

    if (!visible) {
        return null;
    }

    return (
        <div className="cookie-consent">
            <div className="cookie-content">
                <p>Мы используем файлы cookie для улучшения работы сайта. Продолжая использовать сайт, вы соглашаетесь с
                    нашей <a href="/cookie.pdf">политикой использования файлов cookie.</a></p>
                <div className="cookie-actions">
                    <button onClick={handleAccept}>Принять</button>
                </div>
            </div>
        </div>
    );
};

export default CookieConsent;
