import style from "./HowToBuy.module.scss"
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useRef} from "react";
import {clsx} from "clsx";
import coinRight from "../../../assets/png/how to buy/coin right.png";
import coinLeft from "../../../assets/png/how to buy/coin left.png";
import starLeft from "../../../assets/png/how to buy/starLeft.png";
import starRight from "../../../assets/png/how to buy/starRight.png";
import {Card} from "./Card/Card";

gsap.registerPlugin(ScrollTrigger);

const durationCoin = 1;
const durationStar = 2;

export const HowToBuy = () => {
    const appRef = useRef<HTMLDivElement>(null!);

    useGSAP(() => {

        gsap.to(".screens", {
                scrollTrigger: {
                    trigger: ".screens",
                    end: "bottom bottom",
                    pin: ".back",
                    pinSpacing: true,
                }
            }
        )

        gsap.timeline({repeat: -1})
            .to(".coinLeft", {
                y: "-10px",
                ease: "power1.out",
                duration: durationCoin,
            })
            .to(".coinLeft", {
                y: "0",
                ease: "power1.in",
                duration: durationCoin,
            })
            .to(".coinLeft", {
                y: "10px",
                ease: "power1.out",
                duration: durationCoin,
            })
            .to(".coinLeft", {
                y: "0",
                ease: "power1.in",
                duration: durationCoin,
            })

        gsap.timeline({repeat: -1})
            .to(".coinRight", {
                y: "10px",
                ease: "power1.out",
                duration: durationCoin,
            })
            .to(".coinRight", {
                y: "0",
                ease: "power1.in",
                duration: durationCoin,
            })
            .to(".coinRight", {
                y: "-10px",
                ease: "power1.out",
                duration: durationCoin,
            })
            .to(".coinRight", {
                y: "0",
                ease: "power1.in",
                duration: durationCoin,
            })

        gsap.timeline({repeat: -1})
            .to(".starLeft", {
                scale: 1.5,
                ease: "power1.out",
                duration: durationStar,
            })
            .to(".starLeft", {
                scale: 1.0,
                ease: "power1.in",
                duration: durationStar,
            })

        gsap.timeline({repeat: -1, delay: durationStar})
            .to(".starRight", {
                scale: 1.2,
                ease: "power1.out",
                duration: durationStar,
            })
            .to(".starRight", {
                scale: 1.0,
                ease: "power1.in",
                duration: durationStar,
            })

    }, {scope: appRef})

    return (
        <>

            <div className={style.howToBuyMobile}>

                <div className={style.titleWrapper}>
                    <p className={style.title}>
                        <img src={coinLeft} alt="" className={style.coinLeft}/>
                        <img src={coinRight} alt="" className={style.coinRight}/>
                        <span>
                            How to buy
                        </span>
                    </p>
                </div>

                <div className={style.cards}>
                    {
                        [0,1,2].map(key => (
                            <Card key={key}
                                  index={key}
                                  className={style.card}
                            />
                        ))
                    }
                </div>
            </div>


            <div className={clsx(style.howToBuyDesktop, "howToBuy")}
                 ref={appRef}>
                <div className={clsx(style.back, "back")}>
                    <div className={style.titleWrapper}>
                        <p className={style.title}>
                            How to Buy
                        </p>
                        <img src={coinLeft}
                             alt=""
                             className={clsx(style.coinLeft, "coinLeft")}
                        />
                        <img src={coinRight}
                             alt=""
                             className={clsx(style.coinRight, "coinRight")}
                        />
                        <img src={starLeft}
                             alt=""
                             className={clsx(style.starLeft, "starLeft")}
                        />
                        <img src={starRight}
                             alt=""
                             className={clsx(style.starRight, "starRight")}
                        />
                    </div>
                </div>

                <div className="screens">
                    {
                        [0, 1, 2].map(key => (
                            <div className={style.screen} key={key}>
                                <Card index={key}
                                      className={key % 2 === 0 ? style.rotateRight : style.rotateLeft}
                                />
                            </div>
                        ))
                    }

                </div>
            </div>

        </>

    )
}