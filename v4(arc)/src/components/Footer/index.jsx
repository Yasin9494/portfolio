import Socials from '../Socials';
import style from './Footer.module.scss';
import logo from '../Header/assets/logo.svg';
import bgMobile from './assets/bg-mobile.jpg';
import bg from './assets/bg.jpg';
import { useMediaQuery } from 'usehooks-ts';

const Footer = () => {
  const isMobile = useMediaQuery('(max-width:767px)');

  return (
    <footer className={style.footer}>
      <div className={style.footer__bg}>
        <img src={isMobile ? bgMobile : bg} alt='' />
      </div>
      <div className='container'>
        <div className={style.footerBody}>
          <div className={style.footerCol}>
            <div className={style.footerBody__logo}>
              <img src={logo} alt='' />
            </div>

            <Socials className={style.footerBody__social} />
          </div>
          <div className={style.footerCol}>
            <div className={style.footerCol__title}>About</div>
            <ul className={style.footerCol__list}>
              <li>
                <a href='./whitepaper.pdf' target='_blank'>
                  Whitepaper
                </a>
              </li>
              <li>
                <a href=''>Partners</a>
              </li>
            </ul>
          </div>
          <div className={style.footerCol}>
            <div className={style.footerCol__title}>Product</div>
            <ul className={style.footerCol__list}>
              <li>
                <a href=''>Launchpad</a>
              </li>
              <li>
                <a href=''>Token</a>
              </li>
              <li>
                <a href=''>cEX LISTING</a>
              </li>
            </ul>
          </div>
          <div className={style.footerCol}>
            <div className={style.footerCol__title}>Others</div>
            <ul className={style.footerCol__list}>
              <li>
                <a href=''>Roadmap</a>
              </li>
              <li>
                <a href=''>FAQ</a>
              </li>
              <li>
                <a href=''>Press</a>
              </li>
            </ul>
          </div>
          <div className={style.footerCol}>
            <div className={style.footerCol__title}>Contact</div>
            <ul className={style.footerCol__list}>
              <li>
                <a href='mailto:Team@Bonko.io'>Team@Bonko.io</a>
              </li>
              {/* <li>
                CA:552ybqsfngh7JfGzLUmwEtn
                <br />
                PgP6Nvv49WXnfnfiRQY2D
              </li> */}
            </ul>
            <div className={style.footerCol__btn}>BUY NOW</div>
          </div>
        </div>
        <div className={style.footerBottom}>
          <div className={style.footerBottom__cr}>
            Copyright © <span>2024</span>
          </div>
          <div className={style.footerBottom__rights}>
            All rights reserved by Bonko
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
