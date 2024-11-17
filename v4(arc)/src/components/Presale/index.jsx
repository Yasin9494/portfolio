import React, { useState, useRef, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import {
  LAMPORTS_PER_SOL,
  Transaction,
  SystemProgram,
  Connection
} from '@solana/web3.js';

import style from './Presale.module.scss';
import ethIcon from './assets/sol.svg';
import usdtIcon from './assets/usdt.svg';
import mcIcon from './assets/mc.svg';
import anita from './assets/anita.png';
import bonkoIcon from './assets/bonko.svg';
import { useTimer } from 'react-timer-hook';
import { Fade, Zoom } from 'react-reveal';

import {
  MoonPaySellWidget,
  MoonPaySwapsCustomerSetupWidget,
} from '@moonpay/moonpay-react';
import './widget.scss';
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
const Presale = ({
  setModalReceivedOpen,
  setModalConnectOpen,
  setModalConnectedOpen,
  walletConnected,
  className,
}) => {
  const wallet = useWallet();
  const expiryTimestamp = new Date(1707253200 * 1000);
  const { seconds, minutes, hours, days } = useTimer({ expiryTimestamp });

  const [visible, setVisible] = useState(false);
  const [visibleSwap, setVisibleSwap] = useState(false);
  const solInputRef = useRef(null);
  const bonkoInputRef = useRef(null);
  const [walletAddress, setWalletAddress] = useState('');
  const [isWalletConnected, setWalletConnected] = useState(wallet.connected);

  useEffect(() => {
    setWalletConnected(wallet.connected);
    if (wallet.connected && wallet.publicKey) {
      setWalletAddress(wallet.publicKey.toString());
    } else {
      setWalletAddress('');
    }
  }, [wallet.connected, wallet.publicKey]);

  const calculator = (event) => {
    const { target } = event;
    const id = target.id;
    if (id === 'sol-input') {
      bonkoInputRef.current.value = target.value * 50000000;
    } else if (id === 'bonko-input') {
      solInputRef.current.value = target.value / 50000000;
    }
  };

const handleBuy = async () => {
  if (!wallet.connected || !wallet.publicKey) {
    console.log('Кошелек не подключен');
    setModalConnectOpen(true);
    return;
  }

  try {
    const solAmount = parseFloat(solInputRef.current.value);
    if (isNaN(solAmount) || solAmount <= 0) {
      console.log('Некорректная сумма');
      return;
    }

    const destinationAddress = '6iEy4nvGk8fEkAtno8mZHPU8o4HvitmdR44x86o4byr8';
    const lamports = solAmount * LAMPORTS_PER_SOL;

    
    const endpoint = 'https://solana-mainnet.g.alchemy.com/v2/MwMe7KNgufezlUYKNPoX1dHBZ5D9rrDg';
    const connection = new Connection(endpoint, 'confirmed');

    const { blockhash } = await connection.getRecentBlockhash();
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: destinationAddress,
        lamports,
      })
    );

    transaction.recentBlockhash = blockhash;
    transaction.feePayer = wallet.publicKey;

    // Подписание транзакции с использованием кошелька пользователя
    const signedTransaction = await wallet.signTransaction(transaction);

    // Отправка подписанной транзакции в сеть Solana
    const signature = await connection.sendRawTransaction(signedTransaction.serialize());
    
    // Ожидание подтверждения транзакции
    await connection.confirmTransaction(signature, 'confirmed');

    console.log('Транзакция отправлена:', signature);
  } catch (error) {
    console.error('Ошибка при отправке транзакции:', error);
  }
};


  return (
    <>
      {visibleSwap && (
        <MoonPaySwapsCustomerSetupWidget
          variant='overlay'
          baseCurrencyCode='eth'
          baseCurrencyAmount='0.1'
          visible={visibleSwap}
        />
      )}
      {visible && (
        <MoonPaySellWidget
          variant='overlay'
          baseCurrencyCode='eth'
          baseCurrencyAmount='0.1'
          quoteCurrencyCode='usd'
          visible={visible}
        />
      )}
      <Fade>
        <div className={`${style.presale} ${className}`}>
          <div className={style.presale__title}>
            <Zoom cascade>
              {/*presale Live*/}
              presale sold out
            </Zoom>
          </div>
          <div className={style.presale__subtitle}>
            <Zoom cascade>ANITA MAX PAYN FORK</Zoom>
          </div>
          <Zoom>
            <div className={style.presaleTimer}>
              <div className={style.presaleTimer__col}>
                <div className={style.presaleTimer__colValue}>{days}</div>
                <div className={style.presaleTimer__colLabel}>days</div>
              </div>
              <div className={style.presaleTimer__col}>
                <div className={style.presaleTimer__colValue}>:</div>
                <div className={style.presaleTimer__colLabel}></div>
              </div>
              <div className={style.presaleTimer__col}>
                <div className={style.presaleTimer__colValue}>{hours}</div>
                <div className={style.presaleTimer__colLabel}>hours</div>
              </div>
              <div className={style.presaleTimer__col}>
                <div className={style.presaleTimer__colValue}>:</div>
                <div className={style.presaleTimer__colLabel}></div>
              </div>
              <div className={style.presaleTimer__col}>
                <div className={style.presaleTimer__colValue}>{minutes}</div>
                <div className={style.presaleTimer__colLabel}>minutes</div>
              </div>
              <div className={style.presaleTimer__col}>
                <div className={style.presaleTimer__colValue}>:</div>
                <div className={style.presaleTimer__colLabel}></div>
              </div>
              <div className={style.presaleTimer__col}>
                <div className={style.presaleTimer__colValue}>{seconds}</div>
                <div className={style.presaleTimer__colLabel}>seconds</div>
              </div>
            </div>
          </Zoom>
          <div className={style.presalePrice}>
            <div className={style.presalePrice__title}>
              <span>
                <Zoom cascade></Zoom>
              </span>
              <span>
                <Zoom cascade>1 Sol=50,000,000 PAYN</Zoom>
              </span>
            </div>
            <Zoom>
              <div className={style.presalePrice__line}>
                <span></span>
              </div>
            </Zoom>
          </div>
          <div className={style.presaleRaised}>
            <Zoom>SOL Raised:</Zoom>

            <span>
              <Zoom>50 SOL</Zoom>
            </span>
          </div>
          <form className={style.presaleBuy}>
            <div className={style.presaleBuy__title}>
              <Zoom cascade></Zoom>
            </div>
            <div className={style.presaleBuy__text}>
              Buy SOL with Fiat, with our partners MoonPay!
            </div>
            <div className={style.presaleBuy__type}>
              {/* <Zoom>
                <label>
                  <input type='radio' defaultChecked name='payment-select' />
                  <span onClick={() => setVisibleSwap(!visibleSwap)}>
                    <img src={ethIcon} alt='' />
                  </span>
                </label>
              </Zoom> */}
              {/* <Zoom>
                <label>
                  <input type='radio' name='payment-select' />
                  <span onClick={() => setVisibleSwap(!visibleSwap)}>
                    <img src={usdtIcon} alt='' />
                  </span>
                </label>
              </Zoom> */}
              <Zoom>
                <label>
                  <input type='radio' name='payment-select' />
                  <span onClick={() => setVisible(!visible)}>
                    <img src={mcIcon} alt='' />
                  </span>
                </label>
              </Zoom>
            </div>
            <div className={style.presaleBuy__text}>
              Enter SOL amount for presale, connect wallet, click buy.
            </div>
            <div className={style.presaleBuy__calc}>
              <div className={style.presaleBuy__calcItem}>
                {/* <span>
                  <Zoom cascade>Pay with SOL</Zoom>
                </span> */}
                <Zoom>
                  <label className={style.input}>
                    <div className={style.input__icon}>
                      <img src={ethIcon} alt='' />
                    </div>
                    <input
                      id='sol-input'
                      ref={solInputRef}
                      onChange={calculator}
                      defaultValue={0}
                      type='number'
                      min={0}
                    />
                  </label>
                </Zoom>
              </div>
              <div className={style.presaleBuy__calcItem}>
                {/* <span>
                  <Zoom cascade>Recevi Bonkosaurus</Zoom>{' '}
                </span> */}
                <Zoom>
                  <label className={style.input}>
                    <div className={style.input__icon}>
                      <img src={anita} alt='' />
                    </div>
                    <input
                      id='bonko-input'
                      ref={bonkoInputRef}
                      onChange={calculator}
                      defaultValue={0}
                      type='number'
                      min={0}
                    />
                  </label>
                </Zoom>
              </div>
            </div>
            <Zoom>
              <div className={style.presaleBuy__btn}
                   onClick={handleBuy}
              >
                {wallet.connected ? `BUY PRESALE NOW` : 'Connect Wallet'}

              </div>
            </Zoom>
          </form>
        </div>
      </Fade>
    </>
  );
};

export default Presale;
