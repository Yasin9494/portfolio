import { Fade, Zoom } from 'react-reveal';
import Presale from '../../components/Presale';
import style from './Main.module.scss';
import city from './assets/city.png';
import planet_small from './assets/planet_small.png';
import planet from './assets/planet.png';
import spaceship from './assets/spaceship.png';
import stars from './assets/stars.png';
import {
  MouseParallaxChild,
  MouseParallaxContainer,
} from 'react-parallax-mouse';
import dino from './assets/dino.mp4';
import dinoWebm from './assets/dino.webm';
import {
  MoonPayBuyWidget,
  MoonPaySellWidget,
  MoonPaySwapsCustomerSetupWidget,
} from '@moonpay/moonpay-react';
import { useState } from 'react';

const MainSection = ({
  setModalReceivedOpen,
  setModalConnectOpen,
  walletConnected,
  setModalConnectedOpen,
  setWalletConnected,
}) => {
  return (
    <main className={style.main}>
      {/* <MoonPaySwapsCustomerSetupWidget
        variant='overlay'
        baseCurrencyCode='usdt'
        baseCurrencyAmount='100'
        defaultCurrencyCode='eth'
        visible
      /> */}
      {/* <MoonPaySwapsCustomerSetupWidget
        variant='overlay'
        baseCurrencyCode='usdt'
        baseCurrencyAmount='100'
        visible
      /> */}
      {/* <MoonPaySellWidget
        variant='overlay'
        baseCurrencyCode='eth'
        baseCurrencyAmount='0.1'
        quoteCurrencyCode='usd'
        visible
      /> */}
      <MouseParallaxContainer
        resetOnLeave
        useWindowMouseEvents
        globalFactorX={0.1}
        globalFactorY={0.1}
        className={style.mainParallax}
      >
        <MouseParallaxChild
          className={style.mainParallax__item}
          factorX={0.2}
          factorY={0.2}
        >
          <img src={stars} alt='' />
        </MouseParallaxChild>
        <MouseParallaxChild
          className={style.mainParallax__item}
          factorX={0.3}
          factorY={0.2}
        >
          <img src={planet} alt='' />
        </MouseParallaxChild>
        <MouseParallaxChild
          className={style.mainParallax__item}
          factorX={0.2}
          factorY={0.1}
        >
          <img src={city} alt='' />
        </MouseParallaxChild>
        <MouseParallaxChild
          className={style.mainParallax__item}
          factorX={0.1}
          factorY={0.2}
        >
          <img src={planet_small} alt='' />
        </MouseParallaxChild>
        <MouseParallaxChild
          className={style.mainParallax__item}
          factorX={0}
          factorY={0}
        >
          <img src={spaceship} alt='' />
        </MouseParallaxChild>
      </MouseParallaxContainer>

      <div className='container'>
        <Fade bottom>
          <h1 className={style.main__title}>
            <span>Bonko PAD</span> Solana’s Number 1 Launchpad
          </h1>
        </Fade>
        <div className={style.mainBody}>
          <MouseParallaxContainer
            inverted
            className={style.mainBody__parallax}
            useWindowMouseEvents
          >
            <MouseParallaxChild factorX={0.015} factorY={0.025}>
              <Zoom left>
                <div className={style.mainBody__img}>
                  <video
                    id='dinoVideo'
                    preload='auto'
                    playsInline
                    webkit-playsInline
                    loop
                    autoPlay
                    muted
                  >
                    <source src={dinoWebm} type='video/webm' />
                    <source src={dino} type='video/mp4' />
                  </video>
                  {/* <img src={img} alt='' /> */}
                </div>
              </Zoom>
            </MouseParallaxChild>
          </MouseParallaxContainer>
          <Presale
            setModalReceivedOpen={setModalReceivedOpen}
            className={style.mainBody__presale}
            setModalConnectOpen={setModalConnectOpen}
            setModalConnectedOpen={setModalConnectedOpen}
            walletConnected={walletConnected}
            setWalletConnected={setWalletConnected}
          />
        </div>
      </div>
    </main>
  );
};

export default MainSection;
