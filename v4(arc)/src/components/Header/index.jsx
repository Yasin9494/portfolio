import React, { useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { useWallet } from '@solana/wallet-adapter-react'; // Импорт useWallet
import Socials from '../Socials';
import { navItems } from './navItems';
import style from './Header.module.scss';
import logo from './assets/logo.svg';

const Header = ({ setModalConnectOpen, setModalConnectedOpen }) => {
  const wallet = useWallet(); // Использование хука useWallet
  const isMobile = useMediaQuery('(max-width:767px)');
  const [burgerOpen, setBurgerOpen] = useState(false);

  const toNav = (val) => {
    const section = document.querySelector(`${val}`);
    setBurgerOpen(false);
    section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={style.header}>
      <div className='container'>
        <div className={style.headerBody}>
          <div className={style.headerBody__logo}>
            <img src={logo} alt='logo' />
          </div>
          <nav className={`${style.headerNav} ${burgerOpen && style.open}`}>
            <ul>
              {navItems.map((item, index) => (
                <li onClick={() => toNav(item.to)} key={index}>
                  {item.name}
                </li>
              ))}
              <li
                onClick={() => {
                  if (wallet.connected) {
                    setModalConnectedOpen(true); // Эта строка должна открывать попап "Connected"
                  } else {
                    setModalConnectOpen(true); // Эта строка открывает попап "Connect"
                  }
                }}
                className={style.wallet}
              >
                {wallet.connected ? 'Wallet Connected' : 'Connect Wallet'}
              </li>
            </ul>
            {isMobile && <Socials className={style.headerNav__social} />}
          </nav>

          {!isMobile && <Socials />}
          {isMobile && (
            <div
              onClick={() => setBurgerOpen(!burgerOpen)}
              className={`${style.headerBody__burger} ${
                burgerOpen && style.active
              }`}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
