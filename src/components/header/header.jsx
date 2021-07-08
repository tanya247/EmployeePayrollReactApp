import React from 'react';
import './header.scss';
import logo from '../../assets/logo.png';

const Header = () => {
    return (

        <header className="headerContainer header">
            <div className="logoContainer">
                <img src={logo} alt="" />
                <div className="text">
                    <span className="emp-text">EMPLOYEE</span><br />
                    <span className="emp-text emp-payroll">PAYROLL</span>
                </div>
            </div>
        </header>
    )
}
export default Header;