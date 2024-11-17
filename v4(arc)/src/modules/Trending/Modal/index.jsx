import { useEffect, useRef, useState } from 'react';
import style from './Modal.module.scss';
import icon from './assets/icon.png';
import tgIcon from '../assets/tg.jsx';
import xIcon from '../assets/x.jsx';
import ytIcon from '../assets/yt.jsx';
import CopyToClipboard from 'react-copy-to-clipboard';
import logo from './assets/logo.png';
import { useTimer } from 'react-timer-hook';
import { useWallet } from '@solana/wallet-adapter-react';

const Modal = (props) => {
  const { isOpen, close, content, setModalConnectOpen, setModalConnectedOpen } =
    props;
  const wallet = useWallet(); // Использование хука useWallet
  const [expiryTimestamp, setExpiryTimestamp] = useState(
    new Date(content.unixDate * 1000)
  );
  // const expiryTimestamp = new Date(content.unixDate * 1000);

  const { seconds, minutes, hours, days } = useTimer({ expiryTimestamp });

  useEffect(() => {
    setExpiryTimestamp(new Date(content.unixDate * 1000));
  }, [content]);

  const modalRef = useRef(null);

  const [copied, setCopied] = useState(false);

  const toggleCopied = () => {
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  const tagsList = (
    <ul className={style.modal__tags}>
      {content.tags.map((item, index) => {
        let classType = '';

        switch (item) {
          case 'SAFU':
            classType = style._pink;
            break;

          case 'AUDIT':
            classType = style._blue;
            break;

          case 'KYC':
            classType = style._green;
            break;

          case 'DOXX':
            classType = style._yellow;
            break;

          default:
            break;
        }

        return (
          <li key={index} className={classType}>
            {item}
          </li>
        );
      })}
    </ul>
  );

  useEffect(() => {
    const bg = modalRef.current.querySelector(`.${style.modal__bg}`);
    bg.style.height = `${modalRef.current.scrollHeight}px`;
  }, [isOpen]);

  return (
    <div ref={modalRef} className={`${style.modal} ${isOpen && style.open}`}>
      <div onClick={close} className={style.modal__bg}></div>

      <div className={style.modalContent}>
        <div className={style.modalTop}>
          <div className={style.modalTop__img}>
            <img src={content.icon} alt='' />
          </div>
          <div className={style.modalTop__title}>{content.title}</div>
          <div className={style.modalTop__label}>{content.label}</div>
        </div>

        <div className={style.modalInfo}>
          <ul className={style.modalInfo__social}>
            {content.social.map((item, index) => (
              <li key={index}>
                <a href={item.href} target='_blank' rel='noreferrer'>
                  {item.icon}
                </a>
              </li>
            ))}
          </ul>

          {tagsList}
        </div>

        <div className={style.modal__text}>{content.text}</div>

        <div className={style.modalBody}>
          <div className={style.modalCol}>
            <h4>
              {content.presale.ended ? 'Presale Ended' : 'Presale Starts In'}{' '}
            </h4>
            <div className={style.modalTimer}>
              <span>{days.toString().padStart(2, '0')}</span>
              <span>{hours.toString().padStart(2, '0')}</span>
              <span>{minutes.toString().padStart(2, '0')}</span>
              <span>{seconds.toString().padStart(2, '0')}</span>
            </div>
            <div className={style.modalInput}>
              <label>
                <span>{content.inputLabel}</span>
                <input type='number' placeholder='0.0' />
              </label>
              <button
                onClick={() => {
                  if (wallet.connected) {
                    setModalConnectedOpen(true); // Эта строка должна открывать попап "Connected"
                  } else {
                    setModalConnectOpen(true); // Эта строка открывает попап "Connect"
                  }
                }}
              >
                {wallet.connected ? 'Wallet Connected' : 'Connect Wallet'}
              </button>
            </div>
            <div className={style.modal__video}>
              {isOpen && (
                <iframe
                  src={`https://www.youtube.com/embed/${content.videoId}`}
                  title='YouTube video player'
                  frameborder='0'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                  allowfullscreen
                ></iframe>
              )}
            </div>
            <div className={style.modalWatermark}>
              <img src={logo} alt='' />
              Bonko PAD
            </div>
            <div className={style.modalWarn}>
              Make sure the website is bonkopad.io !
            </div>
          </div>
          <div className={style.modalCol}>
            <div className={style.modalWarn}>
              Make sure the website is bonkopad.io !
            </div>
            <div className={style.modalTable}>
              {content.presale.ended && <h3>Presale Ended</h3>}
              <div className={`${style.modalTable__line} ${style.ended}`}></div>
              {!content.presale.ended && (
                <div className={style.modalTable__line}>
                  <span></span>
                </div>
              )}
              <div className={style.modalTable__row}>
                <div className={style.modalTable__col}>
                  <span>{content.presale.values[0]}</span>
                </div>
                <div className={style.modalTable__col}>
                  <span>{content.presale.values[1]}</span>
                </div>
              </div>
              <div className={style.modalTable__row}>
                <div className={style.modalTable__col}>Status</div>
                <div className={style.modalTable__col}>
                  <span>{content.presale.status}</span>
                </div>
              </div>
              <div className={style.modalTable__row}>
                <div className={style.modalTable__col}>Sale Type</div>
                <div className={style.modalTable__col}>
                  <span>{content.presale.type}</span>
                </div>
              </div>
              <div className={style.modalTable__row}>
                <div className={style.modalTable__col}>Current Rate</div>
                <div className={style.modalTable__col}>
                  {content.presale.price}
                  <br /> {content.presale.name}
                </div>
              </div>
              <div className={style.modalTable__row}>
                <div className={style.modalTable__col}>
                  Max <br />
                  Contribution
                </div>
                <div className={style.modalTable__col}>
                  {content.presale.maxContribution}
                </div>
              </div>
              <div className={style.modalTable__row}>
                <div className={style.modalTable__col}>
                  Total <br />
                  Contributors
                </div>
                <div className={style.modalTable__col}>
                  {content.presale.totalContribution}
                </div>
              </div>
            </div>
            <h3>{content.tokenomicsTitle}</h3>
            <div className={style.modalTokenomics}>
              {content.tokenomics.map((item, index) => (
                <div key={index} className={style.modalTokenomics__row}>
                  {item.map((item, index) => (
                    <div key={index} className={style.modalTokenomics__item}>
                      <div className={style.modalTokenomics__itemTitle}>
                        {item.name}
                      </div>
                      <div className={style.modalTokenomics__itemValue}>
                        {item.percent}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={style.modalStats}>
          <div className={style.modalRow}>
            <div className={style.modalRow__name}>Presale Address</div>
            <div className={`${style.modalRow__value} ${style.copy}`}>
              <CopyToClipboard
                onCopy={toggleCopied}
                text={content.stats.presaleAddress}
              >
                <div className={style.copy_content}>
                  {content.stats.presaleAddress}
                  <svg
                    width='15'
                    height='15'
                    viewBox='0 0 15 15'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <g clip-path='url(#clip0_1888_931)'>
                      <path
                        d='M12.6699 0.75H4.29492C4.22617 0.75 4.16992 0.80625 4.16992 0.875V1.75C4.16992 1.81875 4.22617 1.875 4.29492 1.875H12.0449V12.625C12.0449 12.6938 12.1012 12.75 12.1699 12.75H13.0449C13.1137 12.75 13.1699 12.6938 13.1699 12.625V1.25C13.1699 0.973437 12.9465 0.75 12.6699 0.75ZM10.6699 2.75H2.66992C2.39336 2.75 2.16992 2.97344 2.16992 3.25V11.5422C2.16992 11.675 2.22305 11.8016 2.3168 11.8953L5.02461 14.6031C5.05898 14.6375 5.09805 14.6656 5.14023 14.6891V14.7188H5.20586C5.26055 14.7391 5.31836 14.75 5.37773 14.75H10.6699C10.9465 14.75 11.1699 14.5266 11.1699 14.25V3.25C11.1699 2.97344 10.9465 2.75 10.6699 2.75ZM5.13867 13.1281L3.79336 11.7812H5.13867V13.1281ZM10.0449 13.625H6.13867V11.4062C6.13867 11.0609 5.85898 10.7812 5.51367 10.7812H3.29492V3.875H10.0449V13.625Z'
                        fill='#76C0C3'
                      />
                    </g>
                    <defs>
                      <clipPath id='clip0_1888_931'>
                        <rect
                          width='14'
                          height='14'
                          fill='white'
                          transform='translate(0.669922 0.75)'
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </CopyToClipboard>
            </div>
          </div>
          <div className={style.modalRow}>
            <div className={style.modalRow__name}>Token Name</div>
            <div className={style.modalRow__value}>
              {content.stats.tokenName}
            </div>
          </div>
          <div className={style.modalRow}>
            <div className={style.modalRow__name}>Token Symbol</div>
            <div className={style.modalRow__value}>
              {content.stats.tokenSymbol}
            </div>
          </div>
          <div className={style.modalRow}>
            <div className={style.modalRow__name}>Token Address</div>
            <div className={`${style.modalRow__value} ${style.copy}`}>
              <CopyToClipboard
                onCopy={toggleCopied}
                text={content.stats.tokenAddress}
              >
                <div className={style.copy_content}>
                  {/* <span className={copied && style.active}>Copied</span> */}
                  {content.stats.tokenAddress}
                  <svg
                    width='15'
                    height='15'
                    viewBox='0 0 15 15'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <g clip-path='url(#clip0_1888_931)'>
                      <path
                        d='M12.6699 0.75H4.29492C4.22617 0.75 4.16992 0.80625 4.16992 0.875V1.75C4.16992 1.81875 4.22617 1.875 4.29492 1.875H12.0449V12.625C12.0449 12.6938 12.1012 12.75 12.1699 12.75H13.0449C13.1137 12.75 13.1699 12.6938 13.1699 12.625V1.25C13.1699 0.973437 12.9465 0.75 12.6699 0.75ZM10.6699 2.75H2.66992C2.39336 2.75 2.16992 2.97344 2.16992 3.25V11.5422C2.16992 11.675 2.22305 11.8016 2.3168 11.8953L5.02461 14.6031C5.05898 14.6375 5.09805 14.6656 5.14023 14.6891V14.7188H5.20586C5.26055 14.7391 5.31836 14.75 5.37773 14.75H10.6699C10.9465 14.75 11.1699 14.5266 11.1699 14.25V3.25C11.1699 2.97344 10.9465 2.75 10.6699 2.75ZM5.13867 13.1281L3.79336 11.7812H5.13867V13.1281ZM10.0449 13.625H6.13867V11.4062C6.13867 11.0609 5.85898 10.7812 5.51367 10.7812H3.29492V3.875H10.0449V13.625Z'
                        fill='#76C0C3'
                      />
                    </g>
                    <defs>
                      <clipPath id='clip0_1888_931'>
                        <rect
                          width='14'
                          height='14'
                          fill='white'
                          transform='translate(0.669922 0.75)'
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </CopyToClipboard>

              <span>(Do not send SOL to the token address!)</span>
            </div>
          </div>
          <div className={style.modalRow}>
            <div className={style.modalRow__name}>Total Supply</div>
            <div className={style.modalRow__value}>{content.stats.supply}</div>
          </div>
          <div className={style.modalRow}>
            <div className={style.modalRow__name}>Presale Start Time</div>
            <div className={style.modalRow__value}>
              {content.stats.presaleTime[0]}
            </div>
          </div>
          <div className={style.modalRow}>
            <div className={style.modalRow__name}>Presale End Time</div>
            <div className={style.modalRow__value}>
              {content.stats.presaleTime[1]}
            </div>
          </div>
          <div className={style.modalRow}>
            <div className={style.modalRow__name}>Listing On</div>
            <div className={style.modalRow__value}>
              <strong>{content.stats.listingOn}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
