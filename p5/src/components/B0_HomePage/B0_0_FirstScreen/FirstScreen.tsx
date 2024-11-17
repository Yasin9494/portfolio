import React, { useState, useContext } from 'react';
import clsx from 'clsx';
import { useFormik } from 'formik';
import Web3 from 'web3';

import style from "./FirstScreen.module.scss";
import src0 from "../../../assets/png/first screen/icon0.png";
import src1 from "../../../assets/png/first screen/icon1.png";
import src2 from "../../../assets/png/first screen/icon2.png";
import { svgIcons } from "../../../assets/svgIcons";
import lottieJson from "../../../assets/json/car.json";
import { useLottie } from "lottie-react";
import { useWeb3, useWallet } from '../../A0_App/AppContainer'; 

const contractABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_tokenAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_usdtAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "OwnableInvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "OwnableUnauthorizedAccount",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "ethAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenAmount",
				"type": "uint256"
			}
		],
		"name": "TokensPurchasedWithETH",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "usdtAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenAmount",
				"type": "uint256"
			}
		],
		"name": "TokensPurchasedWithUSDT",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "buyTokensWithETH",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "usdtAmount",
				"type": "uint256"
			}
		],
		"name": "buyTokensWithUSDT",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "token",
		"outputs": [
			{
				"internalType": "contract IERC20",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tokensPerEth",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tokensPerUsdt",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "usdt",
		"outputs": [
			{
				"internalType": "contract IERC20",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
const presaleContractAddress = '0x360d22a1A56A28350A0871A64d859F30E1E65094';
interface FormValues {
    value: number;
}

const items = [
    { src: src0, svg: svgIcons.titleIcon0 },
    { src: src1, svg: svgIcons.titleIcon1 },
    { src: src2, svg: svgIcons.titleIcon2 },
];

const tabs = [
    { icon: svgIcons.eth, label: "eth" },
    { icon: svgIcons.usdt, label: "usdt" },
    { icon: svgIcons.card, label: "card" },
];

export const FirstScreen = () => {
    const web3 = useWeb3();
    const { walletAddress, setWalletAddress } = useWallet();
    const [tab, setTab] = useState('eth');
    const [current, setCurrent] = useState(6345114.12); 
    const [total, setTotal] = useState(10000000.00);
    const [price, setPrice] = useState(0.002); 

    const currentString = new Intl.NumberFormat("en", { minimumFractionDigits: 2, maximumSignificantDigits: 2 }).format(current);
    const totalString = new Intl.NumberFormat("en", { minimumFractionDigits: 2, maximumSignificantDigits: 2 }).format(total);

	interface FormErrors {
		value?: string;
	}

	const initialValues: FormValues = { value: 1 };

	const formik = useFormik<FormValues>({
		initialValues,
		validate: (values) => {
			const errors: FormErrors = {};
			if (!values.value) {
				errors.value = "Value required";
			} else if (values.value <= 0) {
				errors.value = "Value must be greater than zero";
			}
			return errors;
		},
		onSubmit: (values) => {
			buyTokens(values.value);
		},
	});

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setWalletAddress(accounts[0]);
            } catch (error) {
                console.error("Error connecting to MetaMask", error);
            }
        } else {
            console.log("Please install MetaMask");
        }
    };
const usdtContractAddress = "0x419fe9f14ff3aa22e46ff1d03a73edf3b70a62ed"; // Реальный адрес контракта USDT
const usdtABI = [

  {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [{"name": "", "type": "string"}],
    "type": "function"
  },

];

    const buyTokens = async (amount: number) => {
        if (!web3 || !walletAddress) {
            console.log('Web3 or wallet address not found');
            return;
        }
		const approveUSDT = async (usdtContractAddress: string, amount: number) => {
			const usdtContract = new web3.eth.Contract(usdtABI, usdtContractAddress);
			const amountInDecimal = amount * Math.pow(10, 6); // Для USDT с 6 десятичными знаками
			await usdtContract.methods.approve(presaleContractAddress, amountInDecimal.toString()).send({ from: walletAddress });
		};	
        try {
            const contract = new web3.eth.Contract(contractABI, presaleContractAddress);
            if (tab === 'eth') {
                await contract.methods.buyTokensWithETH().send({ from: walletAddress, value: web3.utils.toWei(amount.toString(), 'ether'), });
            } else if (tab === 'usdt') {
                await approveUSDT(usdtContractAddress, amount);
                await contract.methods.buyTokensWithUSDT(web3.utils.toWei(amount.toString(), 'ether')).send({ from: walletAddress });
            }
        } catch (error) {
            console.error("Error during token purchase", error);
        }
    };

    const initiatePurchase = async () => {
        const amount = formik.values.value;
        await buyTokens(amount);
    };

    const options = { animationData: lottieJson, loop: true, autoplay: true, };
    const lottieStyle = { width: "100%" };
    const { View } = useLottie(options, lottieStyle);



    return (
        <div className={style.firstScreen}>

            <div className={style.background}>
                {View}
            </div>

            <h1 className={style.title}>
                <div className={style.itemsWrapper}>
                    <div className={style.items}>
                        {
                            items.map(({src, svg}, key) => (
                                <div key={key}
                                     className={style.item}
                                >
                                    {svg}
                                    <img src={src} alt=""/>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <span>
                   Welcome to Degen Pepe Inu token presale
                </span>
            </h1>

            <div className={style.card}>
                <div className={style.timerWrapper}>
                    {svgIcons.timer}
                    <p className={style.time}>
                        08d : 23h : 41m
                    </p>
                </div>

                <p className={style.cardTitle}>
                    Buy now Next price - ${price}
                </p>

                <p className={style.values}>
                    {`USDT ${currentString} / ${totalString}  involved`}
                </p>

                <div className={style.indicator}>
                    <div className={style.inner}
                         style={{
                             width: `${100 * current / total}%`
                         }}
                    >
                        {svgIcons.indicator}
                    </div>
                </div>

                <div className={style.tip}>
                    <span>1 DGPI = $0.002</span>
                </div>

                <div className={style.tabs}>
                    {
                        tabs.map(({icon, label}, key) => (
                            <button key={key}
                                    className={clsx({
                                        [style.tab]: true,
                                        [style.tab_selected]: label === tab,
                                    })}
                                    onClick={() => setTab(label)}
                            >
                                {icon}
                                <span>{label}</span>
                            </button>
                        ))
                    }
                </div>

        <form onSubmit={formik.handleSubmit} className={style.form}>
                    <div className={style.fields}>
                        <div className={style.field}>
                            <input type="number"
                                //min={0}
                                   {...formik.getFieldProps('value')}

                            />
                            {svgIcons.inputEth}
                            {
                                formik.touched.value && formik.errors.value && (
                                    <p className={style.error}>{formik.errors.value}</p>
                                )
                            }
                        </div>

                        <div className={style.field}>
                            <p>2000000</p>
                        </div>
                    </div>

<button
                type="button"
                className={style.submitBtn}
                onClick={walletAddress ? initiatePurchase : connectWallet}
            >
                {walletAddress 
                    ? `Buy with ${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`
                    : "Connect Wallet"
                }
            </button>



                    <div className={style.links}>
                        <p>Buy with ETH</p>
                        <p>How To buy</p>
                    </div>


                </form>

            </div>
        </div>
    )
}