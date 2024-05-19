import React from 'react';
import './layout.scss';

const Layout = ({ children }) => {
    return (
        <div className="gradient-background">
            {children}
        </div>
    );
};

export default Layout;