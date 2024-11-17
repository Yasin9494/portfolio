import React, { useState, useEffect } from 'react';
import style from './Forms.module.scss';
import icon0 from '../../../assets/png/forms/icon0.png';
import icon1 from '../../../assets/png/forms/icon1.png';
import icon2 from '../../../assets/png/forms/icon2.png';
import { colors } from '../../../constants/colors';
import { svgIcons } from '../../../assets/svgIcons';
import { useFormik } from 'formik'; // Если используете только useFormik
import { useWeb3, useWallet } from '../../A0_App/AppContainer';
import BN from 'bn.js';


const initialValues: IValues = { value: 0 };

const stakingContractABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_stakingToken",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_owner",
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
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "reward",
				"type": "uint256"
			}
		],
		"name": "RewardClaimed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Staked",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Unstaked",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "claimRewards",
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
		"name": "rewardRatePerHour",
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
				"internalType": "uint256",
				"name": "_newRate",
				"type": "uint256"
			}
		],
		"name": "setRewardRate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "stake",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "stakes",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "rewardDebt",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "lastStakedTime",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "stakingToken",
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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "unstake",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_staker",
				"type": "address"
			}
		],
		"name": "viewUnclaimedRewards",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
const erc20ABI = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "type": "function"
    }
];

const stakingContractAddress = '0x3e2bd0105690151106a24e089d0f4904d670b2f4';
const stakingTokenAddress = '0x6e2a110981357873935f72edf3f12432646e2e57';

interface IValues {
    value: number;
}

interface IErrors {
    value?: string;
}

const validate = (values: IValues): IErrors => {
    const errors: IErrors = {};
    if (!values.value) errors.value = 'Value required';
    if (values.value <= 0) errors.value = 'Value must be greater than zero';
    return errors;
};






//========= FORM STAKE =========//
const FormStake = () => {
    const web3 = useWeb3();
    const { walletAddress } = useWallet();

    const formik = useFormik({
        initialValues: { value: 0 },
        validate,
		onSubmit: async values => {
			if (!web3 || !walletAddress) {
				console.log('Web3 or wallet address not found');
				return;
			}

			const stakeAmount = web3.utils.toWei(values.value.toString(), 'ether');
			const stakingTokenContract = new web3.eth.Contract(erc20ABI, stakingTokenAddress);

			try {
				// Approve the staking contract to spend the tokens
				await stakingTokenContract.methods.approve(stakingContractAddress, stakeAmount)
					.send({ from: walletAddress })
					.on('receipt', async () => {
						// Once the approval is successful, proceed with staking
						const stakingContract = new web3.eth.Contract(stakingContractABI, stakingContractAddress);
						const estimatedGas = await stakingContract.methods.stake(stakeAmount).estimateGas({ from: walletAddress });
						const gasWithBuffer = Math.floor(Number(estimatedGas) * 1.2);
						await stakingContract.methods.stake(stakeAmount)
							.send({ from: walletAddress, gas: gasWithBuffer.toString() });
					});

				// Handle any additional UI updates or notifications here
			} catch (error) {
				console.error('Error during the staking process', error);
			} finally {
				formik.setSubmitting(false);
			}
		},
    });

  return (
    <form onSubmit={formik.handleSubmit} className={style.form}>
      <div>
        <div className={style.infoField}>
          <p className={style.label}>Current staked:</p>
          <p className={style.value}>0,00</p>
        </div>
        <div className={style.inputField}>
          <div className={style.coin}>
            {svgIcons.coin}
          </div>
          <input 
            type="number"
            placeholder="Enter amount to stake"
            {...formik.getFieldProps('value')}
          />
          <button 
            className={style.max} 
            type="button" 
            onClick={() => formik.setFieldValue('value', 5000)}
          >
            <span>Max</span>
          </button>
        </div>
      </div>
      <button type="submit" className={style.submitBtn} disabled={formik.isSubmitting}>
        <span>Stake</span>
      </button>
    </form>
  );
};

//========= FORM CLAIM =========//
// Импорты и другие необходимые определения

const FormClaim = () => {
    const web3 = useWeb3();
    const { walletAddress } = useWallet();
    const [unclaimedRewards, setUnclaimedRewards] = useState<string>("0");

    const loadUnclaimedRewards = async () => {
        if (web3 && walletAddress) {
            const contract = new web3.eth.Contract(stakingContractABI, stakingContractAddress);
            try {
                const rewardsWei = await contract.methods.viewUnclaimedRewards(walletAddress).call();
                const rewardsEther = Number(web3.utils.fromWei(rewardsWei, 'ether')).toFixed(2);
                setUnclaimedRewards(rewardsEther);
            } catch (error) {
                console.error("Error loading unclaimed rewards:", error);
            }
        }
    };

    useEffect(() => {
        loadUnclaimedRewards();
        const interval = setInterval(loadUnclaimedRewards, 30000);
        return () => clearInterval(interval);
    }, [web3, walletAddress]);

    const onSubmit = async (values) => {
        if (web3 && walletAddress) {
            const contract = new web3.eth.Contract(stakingContractABI, stakingContractAddress);
            try {
                // Вызов функции контракта для получения наград
                await contract.methods.claimRewards()
                    .send({ from: walletAddress });
                loadUnclaimedRewards(); // Обновить награды после получения
            } catch (error) {
                console.error("Error during claiming rewards:", error);
            }
        }
    };

    const formik = useFormik({
        initialValues: { value: '' }, // Инициализация значений
        onSubmit,
    });

    return (
        <form onSubmit={formik.handleSubmit} className={style.form}>
            <div>
                <div className={style.infoField}>
                    <p className={style.label}>Unclaimed rewards:</p>
                    <p className={style.value}>{unclaimedRewards}</p>
                </div>
            </div>
            <button type="submit" className={style.submitBtn}>
                <span>CLAIM</span>
            </button>
        </form>
    );
};




//========= FORM UNSTAKE =========//
const FormUnstake = () => {
    const web3 = useWeb3();
    const { walletAddress } = useWallet();

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.currentTarget;
		const inputValue = (form.elements.namedItem('value') as HTMLInputElement).value;
		const value = Number(inputValue); // Преобразование строки в число, если необходимо

		if (value <= 0) {
			console.log('Value must be greater than zero');
			return;
		}

        if (!web3 || !walletAddress) {
            console.log('Web3 or wallet address not found');
            return;
        }

        if (value <= 0) {
            console.log('Value must be greater than zero');
            return;
        }

        try {
            const contract = new web3.eth.Contract(stakingContractABI, stakingContractAddress);
            await contract.methods.unstake(web3.utils.toWei(value, 'ether')).send({ from: walletAddress });
        } catch (error) {
            console.error("Error during unstaking", error);
        }
    };

    return (
        <form onSubmit={onSubmit} className={style.form}>
            <div>
                <div className={style.infoField}>
                    <p className={style.label}>Unlocks</p>
                    <p className={style.value}>After token launch</p>
                </div>
                <div className={style.inputField}>
                    <div className={style.coin}>
                        {svgIcons.coin}
                    </div>
                    <input 
                        type="number"
                        name="value"
                        placeholder="Enter amount to unstake"
                    />
                    <button className={style.max} type="button">
                        <span>Max</span>
                    </button>
                </div>
            </div>
            <button type="submit" className={style.submitBtn}>
                <span>UNSTAKE</span>
            </button>
        </form>
    );
};


const forms = [
    {
        title: "Stake",
        description: "",
        icon: icon0,
        background: colors.mint,
        form: <FormStake/>
    },
    {
        title: "Claim",
        description: "Claim your staking rewards",
        icon: icon1,
        background: colors.pink1,
        form: <FormClaim/>
    },
    {
        title: "UnStake",
        description: "Unstake your tokens and send to your wallet",
        icon: icon2,
        background: colors.yellow2,
        form: <FormUnstake/>
    },
]

//========= FORMS =========//
export const Forms = () => {
    return (
        <div className={style.forms}>
            <div className={style.inner}>
                {forms.map(({ title, icon, description, background, form }, key) => (
                    <div key={key} className={style.card}>
                        <div className={style.icon} style={{ background }}>
                            <img src={icon} alt="" />
                        </div>

                        <p className={style.title}>{title}</p>

                        {description && (
                            <p className={style.description}>
                                {description}
                            </p>
                        )}

                        {form}
                    </div>
                ))}
            </div>
        </div>
    );
};

