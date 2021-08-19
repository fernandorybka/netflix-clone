import React from 'react';
import './Header.css';


export default ({blackHeader}) => {
    return (
        <header className={blackHeader ? 'header--black' : ''}>
            <div className="header--logo">
                <a href="">
                    <img src='https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' />
                </a>
            </div>
            <div className="header--user">
                <a href="">
                    <img src='https://i2.wp.com/www.cssscript.com/wp-content/uploads/2020/12/Customizable-SVG-Avatar-Generator-In-JavaScript-Avataaars.js.png?fit=438%2C408&ssl=1' />
                </a>
            </div>
        </header>
    );
}