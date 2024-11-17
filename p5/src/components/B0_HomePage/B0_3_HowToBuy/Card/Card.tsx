import {FC} from "react";
import style from "./Card.module.scss";
import tv0 from "../../../../assets/png/how to buy/tv0.png";
import tv1 from "../../../../assets/png/how to buy/tv1.png";
import tv2 from "../../../../assets/png/how to buy/tv2.png";
import {colors} from "../../../../constants/colors";
import {clsx} from "clsx";

const cards = [
    {
        label: "Buy with ETH",
        src: tv0,
        description: "Connect your wallet to the website and make sure you have at least $25 worth of ETH to buy your DGNPI tokens.",
        background: colors.mint,
    },
    {
        label: "Buy with USDT",
        src: tv1,
        description: "Connect your wallet to the website and make sure you have at least $25 worth of USDT ERC20 to buy your DGNPI tokens after two approvals.",
        background: colors.coral,
    },
    {
        label: "Buy with Card",
        src: tv2,
        description: "Use a site like bitpay to buy ETH or USDT ERC-20 and send to your wallet. Then connect to the website to buy the DGNPI tokens with ETH or USDT.",
        background: colors.peach,
    },
]

interface ICard {
    index: number
    className?: string
}

export const Card: FC<ICard> = ({index, className}) => {
    return (
        <div className={clsx(style.card, Boolean(className) && className)}
             style={{background: cards[index].background}}
        >
            <img src={cards[index].src} alt=""/>
            <p className={style.label}>{cards[index].label}</p>
            <p className={style.description}>{cards[index].description}</p>
        </div>
    )
}