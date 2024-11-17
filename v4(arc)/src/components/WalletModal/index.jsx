import React, { useEffect } from 'react';
import style from './WalletModal.module.scss';
import phantom from './assets/phantom.png';
import solflare from './assets/solflare.png';
import { useWallet } from '@solana/wallet-adapter-react';
import { linksContent } from '../../links';

const WalletModal = {
  Connect: ({ isModalOpen, setModalOpen, onConnect }) => {
    const wallet = useWallet();

    const connectWallet = async (walletName) => {
      try {
        await wallet.select(walletName);
        await wallet.connect();
      } catch (error) {
        console.error('Ошибка при подключении кошелька:', error);
        onConnect(false);
      }
    };

    useEffect(() => {
      if (wallet.connected) {
        onConnect(true); // Правильно вызываем onConnect после подключения
      }
    }, [wallet.connected]);

    return (
      <div className={`${style.modal} ${isModalOpen && style.open}`}>
        <div
          onClick={() => {
            setModalOpen(false);
          }}
          className={style.modal__bg}
        ></div>

        <div className={style.modalBody}>
          <div
            onClick={() => {
              setModalOpen(false);
            }}
            className={style.modalBody__close}
          >
            <svg
              width='20'
              height='21'
              viewBox='0 0 20 21'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M0.909317 0.777282C0.714055 0.58202 0.397472 0.58202 0.20221 0.777282C0.0069483 0.972544 0.00694811 1.28913 0.20221 1.48439L9.21782 10.5L0.20221 19.5156C0.00694811 19.7109 0.0069483 20.0275 0.20221 20.2227C0.397472 20.418 0.714055 20.418 0.909317 20.2227L9.92493 11.2071L18.9405 20.2227C19.1358 20.418 19.4524 20.418 19.6476 20.2227C19.8429 20.0275 19.8429 19.7109 19.6476 19.5156L10.632 10.5L19.6476 1.48439C19.8429 1.28913 19.8429 0.972544 19.6476 0.777282C19.4524 0.58202 19.1358 0.582019 18.9405 0.777282L9.92493 9.79289L0.909317 0.777282Z'
                fill='#FFAA00'
              />
            </svg>
          </div>
          <div className={style.modalBody__logo}>
            <svg
              width='67'
              height='53'
              viewBox='0 0 67 53'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <g clip-path='url(#clip0_1916_166)'>
                <path
                  d='M10.8826 40.4514C11.2869 40.0433 11.8428 39.8053 12.4325 39.8053H65.9044C66.8816 39.8053 67.3701 40.9955 66.6794 41.6927L56.1164 52.3539C55.7121 52.762 55.1561 53 54.5665 53H1.09454C0.117418 53 -0.371141 51.8098 0.31958 51.1126L10.8826 40.4514Z'
                  fill='url(#paint0_linear_1916_166)'
                />
                <path
                  d='M10.8826 0.646134C11.3037 0.238049 11.8597 0 12.4325 0H65.9044C66.8816 0 67.3701 1.19025 66.6794 1.88739L56.1164 12.5486C55.7121 12.9567 55.1561 13.1947 54.5665 13.1947H1.09454C0.117418 13.1947 -0.371141 12.0045 0.31958 11.3073L10.8826 0.646134Z'
                  fill='url(#paint1_linear_1916_166)'
                />
                <path
                  d='M56.1164 20.4212C55.7121 20.0132 55.1561 19.7751 54.5665 19.7751H1.09454C0.117418 19.7751 -0.371141 20.9654 0.31958 21.6625L10.8826 32.3237C11.2869 32.7318 11.8428 32.9699 12.4325 32.9699H65.9044C66.8816 32.9699 67.3701 31.7796 66.6794 31.0825L56.1164 20.4212Z'
                  fill='url(#paint2_linear_1916_166)'
                />
              </g>
              <defs>
                <linearGradient
                  id='paint0_linear_1916_166'
                  x1='60.7963'
                  y1='-6.36872'
                  x2='23.2483'
                  y2='64.8883'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stop-color='#00FFA3' />
                  <stop offset='1' stop-color='#DC1FFF' />
                </linearGradient>
                <linearGradient
                  id='paint1_linear_1916_166'
                  x1='44.6149'
                  y1='-14.8953'
                  x2='7.06686'
                  y2='56.3617'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stop-color='#00FFA3' />
                  <stop offset='1' stop-color='#DC1FFF' />
                </linearGradient>
                <linearGradient
                  id='paint2_linear_1916_166'
                  x1='52.6541'
                  y1='-10.6592'
                  x2='15.1061'
                  y2='60.5978'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stop-color='#00FFA3' />
                  <stop offset='1' stop-color='#DC1FFF' />
                </linearGradient>
                <clipPath id='clip0_1916_166'>
                  <rect width='67' height='53' fill='white' />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className={style.modalBody__title}>
            connect a wallet on solana to continue
          </div>
          <div className={style.modalBody__text}>
            once connected you can BUY IN ACTIVE bonkopad presales.
          </div>
          <div className={style.modalBody__button}>
            <button onClick={() => connectWallet('Phantom')}>
              <img src={phantom} alt='Phantom' />
            </button>
            <button onClick={() => connectWallet('Solflare')}>
              <img src={solflare} alt='Solflare' />
            </button>
          </div>
        </div>
      </div>
    );
  },

  Connected: ({ isModalOpen, setModalOpen }) => {
    const handleModal = () => {
      setModalOpen(false);
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };

    return (
      <div className={`${style.modal} ${isModalOpen && style.open}`}>
        <div
          onClick={() => {
            setModalOpen(false);
          }}
          className={style.modal__bg}
        ></div>

        <div className={style.modalBody}>
          <div
            onClick={() => {
              setModalOpen(false);
            }}
            className={style.modalBody__close}
          >
            <svg
              width='20'
              height='21'
              viewBox='0 0 20 21'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M0.909317 0.777282C0.714055 0.58202 0.397472 0.58202 0.20221 0.777282C0.0069483 0.972544 0.00694811 1.28913 0.20221 1.48439L9.21782 10.5L0.20221 19.5156C0.00694811 19.7109 0.0069483 20.0275 0.20221 20.2227C0.397472 20.418 0.714055 20.418 0.909317 20.2227L9.92493 11.2071L18.9405 20.2227C19.1358 20.418 19.4524 20.418 19.6476 20.2227C19.8429 20.0275 19.8429 19.7109 19.6476 19.5156L10.632 10.5L19.6476 1.48439C19.8429 1.28913 19.8429 0.972544 19.6476 0.777282C19.4524 0.58202 19.1358 0.582019 18.9405 0.777282L9.92493 9.79289L0.909317 0.777282Z'
                fill='#FFAA00'
              />
            </svg>
          </div>
          <div className={style.modalBody__logo}>
            <svg
              width='67'
              height='53'
              viewBox='0 0 67 53'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <g clipPath='url(#clip0_1916_166)'>
                <path
                  d='M10.8826 40.4514C11.2869 40.0433 11.8428 39.8053 12.4325 39.8053H65.9044C66.8816 39.8053 67.3701 40.9955 66.6794 41.6927L56.1164 52.3539C55.7121 52.762 55.1561 53 54.5665 53H1.09454C0.117418 53 -0.371141 51.8098 0.31958 51.1126L10.8826 40.4514Z'
                  fill='url(#paint0_linear_1916_166)'
                />
                <path
                  d='M10.8826 0.646134C11.3037 0.238049 11.8597 0 12.4325 0H65.9044C66.8816 0 67.3701 1.19025 66.6794 1.88739L56.1164 12.5486C55.7121 12.9567 55.1561 13.1947 54.5665 13.1947H1.09454C0.117418 13.1947 -0.371141 12.0045 0.31958 11.3073L10.8826 0.646134Z'
                  fill='url(#paint1_linear_1916_166)'
                />
                <path
                  d='M56.1164 20.4212C55.7121 20.0132 55.1561 19.7751 54.5665 19.7751H1.09454C0.117418 19.7751 -0.371141 20.9654 0.31958 21.6625L10.8826 32.3237C11.2869 32.7318 11.8428 32.9699 12.4325 32.9699H65.9044C66.8816 32.9699 67.3701 31.7796 66.6794 31.0825L56.1164 20.4212Z'
                  fill='url(#paint2_linear_1916_166)'
                />
              </g>
              <defs>
                <linearGradient
                  id='paint0_linear_1916_166'
                  x1='60.7963'
                  y1='-6.36872'
                  x2='23.2483'
                  y2='64.8883'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stopColor='#00FFA3' />
                  <stop offset='1' stopColor='#DC1FFF' />
                </linearGradient>
                <linearGradient
                  id='paint1_linear_1916_166'
                  x1='44.6149'
                  y1='-14.8953'
                  x2='7.06686'
                  y2='56.3617'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stopColor='#00FFA3' />
                  <stop offset='1' stopColor='#DC1FFF' />
                </linearGradient>
                <linearGradient
                  id='paint2_linear_1916_166'
                  x1='52.6541'
                  y1='-10.6592'
                  x2='15.1061'
                  y2='60.5978'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stopColor='#00FFA3' />
                  <stop offset='1' stopColor='#DC1FFF' />
                </linearGradient>
                <clipPath id='clip0_1916_166'>
                  <rect width='67' height='53' fill='white' />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className={style.modalBody__title}>WALLET CONNECTED</div>
          <div className={style.modalBody__text}>
            YOU CAN NOW BUY ACTIVE BONKOPAD PRESALES.
          </div>
          <div className={style.modalBody__button}>
            <button onClick={handleModal}>ACTIVE presales</button>
          </div>
        </div>
      </div>
    );
  },

  Received: ({ isModalOpen, setModalOpen }) => {
    return (
      <div className={`${style.modal} ${isModalOpen && style.open}`}>
        <div
          onClick={() => {
            setModalOpen(false);
          }}
          className={style.modal__bg}
        ></div>

        <div className={style.modalBody}>
          <div
            onClick={() => {
              setModalOpen(false);
            }}
            className={style.modalBody__close}
          >
            <svg
              width='20'
              height='21'
              viewBox='0 0 20 21'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M0.909317 0.777282C0.714055 0.58202 0.397472 0.58202 0.20221 0.777282C0.0069483 0.972544 0.00694811 1.28913 0.20221 1.48439L9.21782 10.5L0.20221 19.5156C0.00694811 19.7109 0.0069483 20.0275 0.20221 20.2227C0.397472 20.418 0.714055 20.418 0.909317 20.2227L9.92493 11.2071L18.9405 20.2227C19.1358 20.418 19.4524 20.418 19.6476 20.2227C19.8429 20.0275 19.8429 19.7109 19.6476 19.5156L10.632 10.5L19.6476 1.48439C19.8429 1.28913 19.8429 0.972544 19.6476 0.777282C19.4524 0.58202 19.1358 0.582019 18.9405 0.777282L9.92493 9.79289L0.909317 0.777282Z'
                fill='#FFAA00'
              />
            </svg>
          </div>
          <div className={style.modalBody__logo}>
            <svg
              width='67'
              height='53'
              viewBox='0 0 67 53'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <g clip-path='url(#clip0_1916_166)'>
                <path
                  d='M10.8826 40.4514C11.2869 40.0433 11.8428 39.8053 12.4325 39.8053H65.9044C66.8816 39.8053 67.3701 40.9955 66.6794 41.6927L56.1164 52.3539C55.7121 52.762 55.1561 53 54.5665 53H1.09454C0.117418 53 -0.371141 51.8098 0.31958 51.1126L10.8826 40.4514Z'
                  fill='url(#paint0_linear_1916_166)'
                />
                <path
                  d='M10.8826 0.646134C11.3037 0.238049 11.8597 0 12.4325 0H65.9044C66.8816 0 67.3701 1.19025 66.6794 1.88739L56.1164 12.5486C55.7121 12.9567 55.1561 13.1947 54.5665 13.1947H1.09454C0.117418 13.1947 -0.371141 12.0045 0.31958 11.3073L10.8826 0.646134Z'
                  fill='url(#paint1_linear_1916_166)'
                />
                <path
                  d='M56.1164 20.4212C55.7121 20.0132 55.1561 19.7751 54.5665 19.7751H1.09454C0.117418 19.7751 -0.371141 20.9654 0.31958 21.6625L10.8826 32.3237C11.2869 32.7318 11.8428 32.9699 12.4325 32.9699H65.9044C66.8816 32.9699 67.3701 31.7796 66.6794 31.0825L56.1164 20.4212Z'
                  fill='url(#paint2_linear_1916_166)'
                />
              </g>
              <defs>
                <linearGradient
                  id='paint0_linear_1916_166'
                  x1='60.7963'
                  y1='-6.36872'
                  x2='23.2483'
                  y2='64.8883'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stop-color='#00FFA3' />
                  <stop offset='1' stop-color='#DC1FFF' />
                </linearGradient>
                <linearGradient
                  id='paint1_linear_1916_166'
                  x1='44.6149'
                  y1='-14.8953'
                  x2='7.06686'
                  y2='56.3617'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stop-color='#00FFA3' />
                  <stop offset='1' stop-color='#DC1FFF' />
                </linearGradient>
                <linearGradient
                  id='paint2_linear_1916_166'
                  x1='52.6541'
                  y1='-10.6592'
                  x2='15.1061'
                  y2='60.5978'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stop-color='#00FFA3' />
                  <stop offset='1' stop-color='#DC1FFF' />
                </linearGradient>
                <clipPath id='clip0_1916_166'>
                  <rect width='67' height='53' fill='white' />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className={style.modalBody__title}>PAYMENT RECEIVED </div>
          <div className={style.modalBody__text}>
            JOIN THE BONKOPAD TELEGRAM FOR PRESALE UPDATES.
          </div>
          <a
            href={linksContent.telegram}
            target='_blank'
            rel='noreferrer'
            className={style.modalBody__button}
          >
            <button>
              <svg
                width='24'
                height='20'
                viewBox='0 0 24 20'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fill-rule='evenodd'
                  clip-rule='evenodd'
                  d='M1.58817 8.24203C7.78965 5.54017 11.925 3.75892 13.9941 2.89831C19.9018 0.44109 21.1294 0.0142403 21.9295 0.000150291C22.1055 -0.00294971 22.4989 0.0406602 22.7538 0.24748C22.969 0.4221 23.0282 0.658 23.0566 0.82357C23.0849 0.98914 23.1202 1.36631 23.0921 1.66101C22.772 5.02476 21.3867 13.1876 20.682 16.9551C20.3838 18.5492 19.7966 19.0838 19.2282 19.1361C17.9928 19.2497 17.0548 18.3197 15.8583 17.5353C13.986 16.308 12.9282 15.544 11.1109 14.3464C9.01054 12.9623 10.3721 12.2016 11.5691 10.9584C11.8823 10.6331 17.3253 5.68226 17.4307 5.23314C17.4438 5.17697 17.4561 4.9676 17.3317 4.85704C17.2073 4.74648 17.0237 4.78429 16.8912 4.81436C16.7035 4.85698 13.7124 6.83392 7.91818 10.7452C7.06919 11.3281 6.30021 11.6122 5.61122 11.5973C4.85167 11.5809 3.39059 11.1678 2.30443 10.8148C0.972221 10.3817 -0.0866032 10.1528 0.00559681 9.41733C0.0536198 9.03423 0.581141 8.64253 1.58817 8.24203Z'
                  fill='#182733'
                />
              </svg>
              TELEGRAM
            </button>
          </a>
        </div>
      </div>
    );
  },
};

export default WalletModal;
