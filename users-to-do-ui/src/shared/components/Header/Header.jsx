import React from 'react';
import bsBrandLogo from '../../assets/images/bs-brand-logo.png';
import './Header.scss';

const Header = () => {
  return (
    <div className="header-container">
      <a href="/" className="header-brand">
        <img src={bsBrandLogo} alt="bs-to-do-app-header-logo" />
      </a>
    </div>
  );
};

export default Header;
