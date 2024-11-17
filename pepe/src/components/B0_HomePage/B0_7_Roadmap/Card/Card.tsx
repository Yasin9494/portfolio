import style from "./Card.module.scss"
import {colors} from "../../../../constants/colors";
import img_0_m from "../../../../assets/png/roadmap/img_0_m.png";
import img_0_d from "../../../../assets/png/roadmap/img_0_d.png";
import img_1_m from "../../../../assets/png/roadmap/img_1_m.png";
import img_1_d from "../../../../assets/png/roadmap/img_1_d.png";
import img_2_m from "../../../../assets/png/roadmap/img_2_m.png";
import img_2_d from "../../../../assets/png/roadmap/img_2_d.png";
import {FC} from "react";

const cards = [
    {
        background: colors.yellow2,
        texts: [
            {
                text: "Launch Presale Website ",
                background: null
            },
            {
                text: "Marketing Campaign",
                background: colors.blue
            },
        ],
        image: {
            mobile: img_0_m,
            desktop: img_0_d,
            background: colors.pink2
        }
    },
    {
        background: colors.coral,
        texts: [
            {
                text: "Launch on Exchanges Launch on DEX Airdrop before bullrun Giveaways ",
                background: null
            },
            {
                text: "Giveaways",
                background: colors.yellow2
            },
        ],
        image: {
            mobile: img_1_m,
            desktop: img_1_d,
            background: colors.mint
        }
    },
    {
        background: colors.purple,
        texts: [
            {
                text: "Intl Media Campaign Partnerships ",
                background: null
            },
            {
                text: "Degen PePe Inu Merch",
                background: colors.mint
            },
            {
                text: "Loyalty program",
                background: colors.peach
            },
            {
                text: " program Work towards 100 million MC",
                background: null
            },
        ],
        image: {
            mobile: img_2_m,
            desktop: img_2_d,
            background: colors.yellow2
        }
    },
]

export const Card: FC<{index: number}> = ({index}) => {


    return (
        <div className={style.card}>
            <div className={style.inner}
                 style={{background: cards[index].background}}
            >

                <div className={style.top}>
                    <p className={style.step}>
                        Step {index + 1}
                    </p>
                    <p className={style.texts}>
                        {
                            cards[index].texts.map(({text, background}, key) => (
                                <span key={key}
                                      className={background ? style.ticket : style.span}
                                      style={{background: background ? background : "none"}}
                                >
                                    {text}
                                </span>
                            ))
                        }
                    </p>
                </div>

                <div className={style.imageWrapper}
                     style={{background: cards[index].image.background}}
                >
                    <img src={cards[index].image.mobile} alt="" className={style.imgMobile}/>
                    <img src={cards[index].image.desktop} alt="" className={style.imgDesktop}/>
                </div>

            </div>

        </div>
    )
}