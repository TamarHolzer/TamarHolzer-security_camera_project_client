import React from 'react';
import '../css/Header.css';
import logo from '../pics/logo.png'
import { Link } from 'react-router-dom';

const Header = () => {
  return (

    <header className="header">
      <Link to="/">
        <img src={logo} alt="My Website Logo" className="logo" />
      </Link>
      <nav className="header-buttons">
        {!sessionStorage.getItem('user') && <>
          <Link className='linkHeader' to="/login">התחבר</Link>
          <Link className='linkHeader' to="/sign-up">הרשם</Link></>}
        {sessionStorage.getItem('user')&&<>
        <Link className='linkHeader' to="/optimal-coordinates">תכנון מצלמות</Link>
        <Link className='linkHeader' to="/history-planning">הסטוריית תכנונים</Link>
        </>}
      </nav>
    </header>
  );
};

export default Header;
