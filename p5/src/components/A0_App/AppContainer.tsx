import React, { createContext, useContext, useEffect, useState } from 'react';
import Web3 from 'web3';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { RootStore, store } from '../../store/RootStore';

export const StoreContext = createContext<RootStore>({} as RootStore);

// Обновление контекста WalletContext для включения setWalletAddress
export const WalletContext = createContext<{
  walletAddress: string | null;
  setWalletAddress: React.Dispatch<React.SetStateAction<string | null>>;
}>({
  walletAddress: null,
  setWalletAddress: () => {},
});

const Web3Context = createContext<Web3 | null>(null);

const Web3Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [web3, setWeb3] = useState<Web3 | null>(null);

  useEffect(() => {
    // Измените эту часть, чтобы использовать провайдер MetaMask при его наличии
    if (window.ethereum) {
      setWeb3(new Web3(window.ethereum));
    } else {
      console.log("Please install MetaMask");
    }
  }, []);

  return <Web3Context.Provider value={web3}>{children}</Web3Context.Provider>;
};


export const AppContainer = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    const checkIfWalletIsConnected = async () => {
      const isWalletConnected = localStorage.getItem('walletConnected');
      if (window.ethereum && isWalletConnected) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
          } else {
            localStorage.removeItem('walletConnected');
          }
        } catch (error) {
          console.error("Error checking for MetaMask", error);
        }
      }
    };

    checkIfWalletIsConnected();
  }, []);

  return (
    <BrowserRouter>
      <StoreContext.Provider value={store}>
        <Web3Provider>
          <WalletContext.Provider value={{ walletAddress, setWalletAddress }}>
            <App />
          </WalletContext.Provider>
        </Web3Provider>
      </StoreContext.Provider>
    </BrowserRouter>
  );
};

export const useWeb3 = () => useContext(Web3Context);
export const useWallet = () => useContext(WalletContext);
