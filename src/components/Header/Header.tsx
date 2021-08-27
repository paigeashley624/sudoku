import React from 'react';
import './Header.scss';

interface HeaderProps {
  text?: string;
  subText?: string;
}

const Header = ({ text = 'Mintbean Game Catalog', subText = 'Welcome to the amazing world of Mintbean Hackathon Gaming!' }: HeaderProps) => {
  return (
    <header className="landing-page-banner">
      <h1 className="landing-page-banner-title">{text}</h1>

      <h3 className="landing-page-banner-intro">{subText}</h3>
    </header>
  );
};

export default Header;
