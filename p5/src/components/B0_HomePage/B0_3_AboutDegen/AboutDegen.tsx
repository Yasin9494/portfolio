import style from "./AboutDegen.module.scss";
import coin from "../../../assets/png/about degen/coin.png";
import picture from "../../../assets/png/about degen/picture.png";
import {clsx} from "clsx";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import {useRef} from "react";
import {colors} from "../../../constants/colors";

const texts = [
    "Welcome to the DegenPepeInu Token Presale, where we unite crypto degens, ",
    ", and ",
    "  in a community-driven meme coin project. Embrace the meme magic and be a part of the DegenPepeInu movement. We are crypto degens proud and strong!",
    "Join us in this exciting journey of creating a meme coin that celebrates the unique culture of crypto enthusiasts. Let's build a vibrant and engaged community around ",
    ". Together, we can revolutionize the world of memes and crypto!",
]

const duration = 1.5;
const angle = 2;

const items = [
    {
       label: "Network",
       value: "Ethereum ERC20",
       background: colors.pink2,
    },
    {
        label: "Total Supply",
        value: "200,000,000",
        background: colors.yellow2,
    },
    {
        label: "Sold in Presale",
        value: "80%",
        background: colors.mint,
    },
    {
        label: "Marketing",
        value: "10%",
        background: colors.blue,
    },
    {
        label: "Liquidity for CEX ",
        value: "10%",
        background: colors.coral,
    },
    {
        label: "Initial token price",
        value: "$0.002",
        background: colors.purple,
    },
    {
        label: "Marketcap",
        value: "3,000,000",
        background: colors.yellow,
    },
    {
        label: "Buy / Selling Fees ",
        value: "NONE",
        background: colors.pink1,
    },
    {
        label: "Minimum or Max",
        value: "NONE",
        background: colors.peach,
    },
]

export const AboutDegen = () => {
    const appRef = useRef<HTMLDivElement>(null!);

    useGSAP(() => {

        gsap.fromTo(".apy0", {
            rotation: `-${angle}deg`
        }, {
            rotation: `${angle}deg`,
            duration,
            repeat: -1,
            yoyo: true,
        })

        gsap.fromTo(".apy1", {
            rotation: `${angle}deg`
        }, {
            rotation: `-${angle}deg`,
            duration,
            repeat: -1,
            yoyo: true,
        })

    }, {scope: appRef})


    return (
        <div className={style.aboutDegen}
             ref={appRef}
        >
            <div className={style.inner}>

                <div className={style.titleWrapper}>
                    <div className={style.part}>
                        <p>About</p>
                        <p>Pepe</p>
                    </div>
                    <div className={style.part}>
                        <p>Degen</p>
                        <p>Inu</p>
                    </div>
                    <img src={coin} alt="" className={style.coin}/>
                </div>

                <div className={style.parts}>

                    <div className={style.leftPart}>

                        <div className={style.texts}>
                            <p>
                                <span>{texts[0]}</span>
                                <span className={clsx(style.ticket, style.ticket_0, "apy0")}>Pepe Enthusiasts</span>
                                <span>{texts[1]}</span>
                                <span className={clsx(style.ticket, style.ticket_1, "apy1")}>Shiba Inu Lovers</span>
                                <span>{texts[2]}</span>
                            </p>
                            <p>
                                <span>{texts[3]}</span>
                                <span className={clsx(style.ticket, style.ticket_2, "apy0")}>DegenPepeInu</span>
                                <span>{texts[4]}</span>
                            </p>
                        </div>

                        <p className={style.leftPartTitle}>
                            TOKENOMICS
                        </p>

                        <div className={style.items}>
                            {
                                items.map(({label, value, background}, key) => (
                                    <div key={key}
                                         className={style.item}
                                         style={{background}}
                                    >
                                        <p>{label}</p>
                                        <p>{value}</p>
                                    </div>
                                ))
                            }
                        </div>


                    </div>

                    <img src={picture} alt="" className={style.rightPart}/>

                </div>

            </div>
        </div>
    )
}