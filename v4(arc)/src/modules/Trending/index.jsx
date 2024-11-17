import style from './Trending.module.scss';
import anita from './assets/anita.png';
import anitaRed from './assets/anita-red.png';
import wrekt from './assets/wrekt.png';
import bonko from './assets/bonko.png';
import babyx from './assets/babyx.png';
import unknown from './assets/unknown.png';
import Card from './components/Card';
import Modal from './Modal';
import { useState } from 'react';

import tgIcon from './assets/tg.jsx';
import xIcon from './assets/x.jsx';
import ytIcon from './assets/yt.jsx';
import browserIcon from './assets/browser.jsx';

const anitaCardProps = {
  icon: anita,
  name: 'Anita Max PAYN FORK',
  label: 'PRESALE SOLD OUT', //Live
  text: "I'm Anita Max Payn FORK by night and drake by day, Picture steamy nights by the pool, my fiery passion with his irresistible charm.",
  tags: ['SAFU', 'AUDIT', 'KYC'],
};
const wrektCardProps = {
  icon: wrekt,
  name: 'Wrekt',
  label: 'Starting soon',
  text: 'Wrekt Coin: Dive into the world of high-octane racing and gritty, no-holds-barred action, the most hardcore racing games on the blockchain!',
  tags: ['SAFU', 'KYC', 'DOXX', 'AUDIT'],
};
const bonkoCardProps = {
  icon: bonko,
  name: 'BONKOPAD',
  label: 'Starts on',
  startDate: '2024.02.07 21:00 (utc)',
  text: "Bonkopad: The biggest Solana launchpad, where high-octane crypto adventures meet top-tier investing – it's the premier playground for blockchain thrill-seekers!",
  tags: ['SAFU', 'AUDIT', 'KYC', 'DOXX'],
};
const babyCardProps = {
  icon: babyx,
  name: 'BABY X',
  label: 'Presale Compelted',
  text: "Baby X: The Solana meme coin that's like Elon's tweets after midnight unpredictable, wildly fun, and always a step ahead ",
  tags: ['SAFU', 'AUDIT', 'DOXX', 'KYC'],
};

const modalContent = {
  wrekt: {
    icon: wrekt,
    title: 'Wrekt',
    label: 'Starting soon',
    unixDate: 1707512400,
    social: [
      {
        icon: tgIcon,
        href: '',
      },
      {
        icon: xIcon,
        href: '',
      },
      {
        icon: ytIcon,
        href: '',
      },
    ],
    tags: ['SAFU', 'AUDIT', 'DOXX', 'KYC'],
    text: 'Wrekt Coin: Dive into the world of high-octane racing and gritty, no-holds-barred action, the most hardcore racing games on the blockchain!',
    inputLabel: 'Amount (max: 5 SOL)',
    videoId: 'xw38ChU9utI?si=cE75hR6ikN37plWK',
    presale: {
      ended: false,
      values: ['0 SOL', '2,000 SOL'],
      status: 'starting soon',
      type: 'Public',
      price: '1 SOL = 1,962,072,446,245.75',
      name: 'WREKT',
      maxContribution: '5 SOL',
      totalContribution: '0',
    },
    tokenomicsTitle: '$WREKT Tokenomics ',
    tokenomics: [
      [
        {
          name: 'Liquidity',
          percent: '40%',
        },
        {
          name: 'Presale',
          percent: '35%',
        },
        {
          name: 'Team',
          percent: '5%',
        },
        {
          name: 'R&D',
          percent: '5%',
        },
      ],
      [
        {
          name: 'CEX',
          percent: '5%',
        },
        {
          name: 'Marketing',
          percent: '5%',
        },
        {
          name: 'Staking',
          percent: '5%',
        },
      ],
    ],
    stats: {
      presaleAddress: 'BONKO.SOL',
      tokenAddress: '0x3b73e1AE7028627eff071971Ed54d789b8F0f3F1',
      tokenName: 'WREKT',
      tokenSymbol: 'WREKT',
      supply: '100,000,000,000 WREKT',
      presaleTime: ['2024.02.08 21:00 UTC', '2024.02.09 21:00 UTC'],
      listingOn: 'RAYDIUM',
    },
  },
  anita: {
    icon: anitaRed,
    title: 'Anita Max PAYN FORK',
    label: 'PRESALE SOLD OUT',
    unixDate: 1707253200,
    social: [
      {
        icon: tgIcon,
        href: 'https://t.me/maxpaynportal',
      },
      {
        icon: xIcon,
        href: 'https://twitter.com/AnitaMaxPayn',
      },
      {
        icon: ytIcon,
        href: 'https://youtu.be/MwNgEuHgVQM',
      },
      {
        icon: browserIcon,
        href: 'https://anitamaxpayn.io/',
      },
    ],
    tags: ['SAFU', 'AUDIT', 'DOXX', 'KYC'],
    text: "I'm Anita Max Payn by night and drake by day, Picture steamy nights by the pool, my fiery passion with his irresistible charm.",
    inputLabel: 'CLAIM',
    videoId: 'MwNgEuHgVQM?si=WBOdWVnaUYiD3UnZ',
    presale: {
      ended: true,
      values: ['50 SOL', '50 SOL'],
      status: 'Presale Ended',
      type: 'Public',
      price: '1 SOL = 50,000,000',
      name: 'PAYN',
      maxContribution: '5 SOL',
      totalContribution: '123',
    },
    tokenomicsTitle: '$PAYN Tokenomics ',
    tokenomics: [
      [
        {
          name: 'Liquidity ',
          percent: '50%',
        },
        {
          name: 'Presale',
          percent: '50%',
        },
      ],
    ],
    stats: {
      presaleAddress: 'BONKO.SOL',
      tokenAddress: '7PmAAeAjUjwZywspJh2QUQgB1CGHRPJnSHNbudDQbA6o',
      tokenName: 'PAYN',
      tokenSymbol: 'PAYN',
      supply: '1,000,000,000,000 PAYN',
      presaleTime: ['2024.02.05 21:00 UTC', '2024.02.06 21:00 UTC'],
      listingOn: 'RAYDIUM',
    },
  },
  bonko: {
    icon: bonko,
    title: 'BONKOPAD',
    label: 'Starting soon',
    unixDate: 1707512400,
    social: [
      {
        icon: tgIcon,
        href: 'https://t.me/bonkopadportal',
      },
      {
        icon: xIcon,
        href: 'https://twitter.com/BONKOPAD',
      },
      {
        icon: ytIcon,
        href: 'https://www.youtube.com/@BONKOPAD',
      },
      {
        icon: browserIcon,
        href: 'https://bonko.io/',
      },
    ],
    tags: ['SAFU', 'AUDIT', 'DOXX', 'KYC'],
    text: "Bonkopad: The biggest Solana launchpad, where high-octane crypto adventures meet top-tier investing – it's the premier playground for blockchain thrill-seekers!",
    inputLabel: 'Amount (max: 5 SOL)',
    videoId: 'xw38ChU9utI?si=cE75hR6ikN37plWK',
    presale: {
      ended: false,
      values: ['0 SOL', '1,000 SOL'],
      status: 'starting soon',
      type: 'Public',
      price: '1 SOL = 1,962,072,446,245.75',
      name: 'WREKT',
      maxContribution: '10 SOL',
      totalContribution: '0',
    },
    tokenomicsTitle: '$BONKO Tokenomics  ',
    tokenomics: [
      [
        {
          name: 'Liquidity',
          percent: '35%',
        },
        {
          name: 'Presale',
          percent: '40%',
        },
        {
          name: 'Team',
          percent: '5%',
        },
        {
          name: 'R&D',
          percent: '10%',
        },
      ],
      [
        {
          name: 'CEX',
          percent: '5%',
        },
        {
          name: 'Marketing',
          percent: '5%',
        },
      ],
    ],
    stats: {
      presaleAddress: 'BONKO.SOL',
      tokenAddress: 'TBC',
      tokenName: 'BONKO',
      tokenSymbol: 'BONKO',
      supply: '100,000,000 BONKO',
      presaleTime: ['2024.02.07 21:00 (UTC)', '2024.02.09 21:00 (UTC)'],
      listingOn: 'RAYDIUM',
    },
  },
  babyx: {
    icon: babyx,
    title: 'BABY X',
    label: 'Presale Compelted',
    social: [
      {
        icon: tgIcon,
        href: 'https://t.me/thebabyxportal',
      },
      {
        icon: xIcon,
        href: 'https://twitter.com/Babyxelon',
      },
      // {
      //   icon: ytIcon,
      //   href: '',
      // },
      {
        icon: browserIcon,
        href: 'https://xbaby.io/',
      },
    ],
    tags: ['SAFU', 'AUDIT', 'DOXX', 'KYC'],
    text: "Baby X: The Solana meme coin that's like Elon's tweets after midnight unpredictable, wildly fun, and always a step ahead ",
    inputLabel: 'Amount (max: 50 SOL)',
    videoId: 'xw38ChU9utI?si=cE75hR6ikN37plWK',
    presale: {
      ended: true,
      values: ['50 SOL', '500 SOL'],
      status: 'Presale Ended',
      type: 'Public',
      price: '1 SOL = 1,000,000',
      name: 'BABYX',
      maxContribution: '1 SOL',
      totalContribution: '88',
    },
    tokenomicsTitle: '$BABYX Tokenomics  ',
    tokenomics: [
      [
        {
          name: 'Liquidity',
          percent: '50%',
        },
        {
          name: 'Presale',
          percent: '50%',
        },
      ],
    ],
    stats: {
      presaleAddress: 'BONKO.SOL',
      tokenAddress: '2TS3TUymKeMqpXgTcSjSj8hGgyPrfq8QmL7jkuZWVFsy',
      tokenName: 'BABYX',
      tokenSymbol: 'BABYX',
      supply: '100,000,000 BABYX',
      presaleTime: ['2024.02.05 20:00 (UTC)', '2024.02.06 20:00 (UTC)'],
      listingOn: 'RAYDIUM',
    },
  },
};

const TrendingSection = ({ setModalConnectOpen, setModalConnectedOpen }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(modalContent.wrekt);

  return (
    <section className={style.trending}>
      {isModalOpen && (
        <Modal
          setModalConnectOpen={setModalConnectOpen}
          setModalConnectedOpen={setModalConnectedOpen}
          content={modalData}
          close={() => setModalOpen(false)}
          isOpen={isModalOpen}
        />
      )}

      <div className='container'>
        <div className={style.trendingTop}>
          <div className={style.trendingTop__title}>Trending prESALES</div>
          <ul className={style.trendingTop__tags}>
            <li className={style._pink}>SAFU</li>
            <li className={style._blue}>AUDIT</li>
            <li className={style._green}>KYC</li>
            <li className={style._yellow}>DOXX</li>
          </ul>
        </div>
        <ul className={style.trendingLine}>
          <li>
            <img src={anita} alt='' />
          </li>
          <li>
            <img src={wrekt} alt='' />
          </li>
          <li>
            <img src={bonko} alt='' />
          </li>
          <li>
            <img src={unknown} alt='' />
          </li>
          <li>
            <img src={unknown} alt='' />
          </li>
          <li>
            <img src={unknown} alt='' />
          </li>
        </ul>
        <div className={style.trendingCards}>
          <Card
            onClick={() => {
              setModalOpen(true);
              setModalData(modalContent.anita);
            }}
            {...anitaCardProps}
            className={style.trendingCards__item}
          />
          <Card
            onClick={() => {
              setModalOpen(true);
              setModalData(modalContent.wrekt);
            }}
            {...wrektCardProps}
            className={style.trendingCards__item}
          />
          <Card
            onClick={() => {
              setModalOpen(true);
              setModalData(modalContent.bonko);
            }}
            {...bonkoCardProps}
            className={style.trendingCards__item}
          />
          <Card
            onClick={() => {
              setModalData(modalContent.babyx);
              setModalOpen(true);
            }}
            {...babyCardProps}
            className={style.trendingCards__item}
          />
        </div>
        <a
          href='https://t.me/bonkopadportal'
          target='_blank'
          rel='noreferrer'
          className={style.trending__button}
        >
          List your project
        </a>
      </div>
    </section>
  );
};

export default TrendingSection;
