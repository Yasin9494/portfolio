import style from "./MissedOut.module.scss"
import {useRef} from "react";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import {clsx} from "clsx";
import starMobile from "../../../assets/png/missed out/starMobile.png";
import starDesktop from "../../../assets/png/missed out/starDesktop.png";
import starLeft from "../../../assets/png/missed out/starLeft.png";

const items = [
    {
        amount: "0-$500",
        apy: "10 %",
        background: "#f4eb83",
        backgroundApy: "#ef87cc",
    },
    {
        amount: "$501 - 1000",
        apy: "25 %",
        background: "#c599e0",
        backgroundApy: "#f2c53b",
    },
    {
        amount: "$1001 - $5000",
        apy: "50 %",
        background: "#a6cdf4",
        backgroundApy: "#e5b8b8",
    },
    {
        amount: "$5001 - $10000",
        apy: "75 %",
        background: "#f59e96",
        backgroundApy: "#c599e0",
    },
    {
        amount: "$10,000+",
        apy: "100 %",
        background: "#aae7c0",
        backgroundApy: "#f77113",
    },
]

const duration = 1.5;
const angle = 10;

export const MissedOut = () => {
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
        <div className={style.missedOut}
             ref={appRef}
        >
            <div className={style.inner}>

                <div className={style.topPart}>

                    <h2 className={style.title}>
                        Missed out on Shiba Inu and Pepe? Stake the new degenpepeinu and earn up to 100% APY!
                    </h2>
                    <p className={style.description}>
                        What better way to celebrate these two great meme tokens then to bring them together and stake a
                        token the honors the true crypto degens holding these popular meme coins!
                    </p>

                    <div className={style.btnDesktop}>
                        <button className={style.stakeBtn}>
                            <span>Stake now</span>
                        </button>
                    </div>

                    <img src={starLeft} alt="" className={style.starLeftDesktop}/>

                </div>

                <div className={style.bottomPart}>

                <div className={style.card}>

                        <img src={starMobile} alt="" className={style.starMobile}/>
                        <img src={starDesktop} alt="" className={style.starDesktop}/>

                        <p className={style.cardTitle}>
                            Earning Potential
                        </p>
                        <div className={style.labels}>
                            <p>Amount</p>
                            <p>APY</p>
                        </div>

                        <div className={style.items}>
                            {
                                items.map(({amount, apy, background, backgroundApy}, key) => (
                                    <div key={key}
                                         className={style.item}
                                         style={{background}}
                                    >
                                        <p className={style.amount}>
                                            {amount}
                                        </p>

                                        <p className={clsx(style.apy, `apy${key % 2}`)}
                                           style={{
                                               background: backgroundApy
                                           }}
                                        >
                                            {apy}
                                        </p>
                                    </div>
                                ))
                            }
                        </div>


                    </div>

                    <div className={style.btnMobile}>
                    <button className={style.stakeBtn}>
                            <span>Stake now</span>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}