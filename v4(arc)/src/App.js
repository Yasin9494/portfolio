import React, { useState, useMemo } from 'react';
import {
  ConnectionProvider,
  WalletProvider,
  useWallet,
} from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets';

import Footer from './components/Footer';
import Header from './components/Header';
import MainSection from './modules/Main';
import TrendingSection from './modules/Trending';
import AboutSection from './modules/About';
import PartnersSection from './modules/Partners';
import StakingSection from './modules/Staking';
import RoadmapSection from './modules/Roadmap';
import TokenomiksSection from './modules/Tokenomiks';
import WhySection from './modules/Why';
import { StarsScroll } from './components/Stars/StarsScroll';
import WalletModal from './components/WalletModal';

function App() {
  const [isModalConnectOpen, setModalConnectOpen] = useState(false);
  const [isModalConnectedOpen, setModalConnectedOpen] = useState(false);
  const [isModalReceivedOpen, setModalReceivedOpen] = useState(false);
  const wallet = useWallet();
  const [walletConnected, setWalletConnected] = useState(false);

  const network = 'mainnet-beta';
  const endpoint = useMemo(() => 'https://solana-mainnet.g.alchemy.com/v2/MwMe7KNgufezlUYKNPoX1dHBZ5D9rrDg', []);

  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter({ network })],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <div className="wrapper">
            {/* Wallet Modals */}
            <WalletModal.Connect
              isModalOpen={isModalConnectOpen}
              setModalOpen={setModalConnectOpen}
              onConnect={() => setModalConnectedOpen(true)}
            />
            <WalletModal.Connected
              isModalOpen={isModalConnectedOpen}
              setModalOpen={setModalConnectedOpen}
            />
            <WalletModal.Received
              isModalOpen={isModalReceivedOpen}
              setModalOpen={setModalReceivedOpen}
            />
            <div className='start__wrapper'>
              <StarsScroll />
            </div>
            <div className="content">
              {/* Your components */}
              <Header
                setModalConnectOpen={setModalConnectOpen}
                setModalConnectedOpen={setModalConnectedOpen}
                walletConnected={walletConnected}
                setWalletConnected={setWalletConnected}
              />
              <MainSection
                setModalConnectOpen={setModalConnectOpen}
                setModalConnectedOpen={setModalConnectedOpen}
                walletConnected={walletConnected}
                setWalletConnected={setWalletConnected}
                setModalReceivedOpen={setModalReceivedOpen}
              />
              <TrendingSection />
              <AboutSection />
              <PartnersSection />
              <StakingSection />
              <RoadmapSection />
              <TokenomiksSection />
              <WhySection />
              <Footer />
            </div>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
