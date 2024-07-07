// import React from 'react';
import React, { useState, useEffect } from 'react';
import '../css/Header.css';
import logo from '../pics/logo2.png'
import { Link } from 'react-router-dom';

const Header = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loading) {
      window.location.reload();
    } else {
      console.log('page already loaded');
    }
  }, [loading]);

  return (

    <header className="header">
      <div className="logo-wrapper">
        <Link to="/">
          <img src={logo} alt="My Website Logo" className="logo" />
        </Link>
      </div>
      <nav className="header-buttons">
        {!sessionStorage.getItem('user') && <>
          <Link className='linkHeader' onClick={() => setLoading(true)} to="/login">התחבר</Link>
          <Link className='linkHeader' onClick={() => setLoading(true)} to="/sign-up">הרשם</Link></>}
        {sessionStorage.getItem('user')&&<>
        <Link className='linkHeader' to="/optimal-coordinates">תכנון מצלמות</Link>
        <Link className='linkHeader' to="/history-planning">הסטוריית תכנונים</Link>
        </>}
      </nav>
    </header>
  );
};

export default Header;
