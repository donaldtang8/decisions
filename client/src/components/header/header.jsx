import React from 'react';

import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="header__container">
      <div className="header__logo">Logo</div>
      <nav className="header__nav">
          <Link className="header__nav--item" to="/">Home</Link>
          <Link className="header__nav--item" to="/about">About</Link>
      </nav>
    </div>
  );
};

export default Header;
