import style from "./Roadmap.module.scss"
import {Background} from "./Background/Background";
import {Card} from "./Card/Card";
import {colors} from "../../../constants/colors";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useRef} from "react";
import {clsx} from "clsx";

gsap.registerPlugin(ScrollTrigger);

const CARD_HEIGHT = 250;

export const Roadmap = () => {

    const appRef = useRef<HTMLDivElement>(null!);

    useGSAP(() => {

        // 0
        gsap.to(".card0", {
                scrollTrigger: {
                    trigger: ".card0",
                    //markers: true,
                    start: "top bottom",
                    end: `top top`,
                    pin: ".back",
                    pinSpacing: false,
                }
            }
        )

        // 1
        gsap.to(".card1", {
                scrollTrigger: {
                    trigger: ".card1",
                    //markers: true,
                    start: "top bottom",
                    end: `top top`,
                    pin: ".back",
                    pinSpacing: false,
                }
            }
        )

        gsap.to(".card1", {
                scrollTrigger: {
                    trigger: ".card1",
                    //markers: true,
                    start: "top bottom",
                    end: `top top`,
                    pin: ".card0",
                    pinSpacing: false,
                }
            }
        )

        // 2
        gsap.to(".card2", {
                scrollTrigger: {
                    trigger: ".card2",
                    //markers: true,
                    start: "top bottom",
                    end: `top top`,
                    pin: ".back",
                    pinSpacing: false,
                }
            }
        )

        gsap.to(".card2", {
                scrollTrigger: {
                    trigger: ".card2",
                    //markers: true,
                    start: "top bottom",
                    end: `top top`,
                    pin: ".card1",
                    pinSpacing: false,
                }
            }
        )

        gsap.to(".card2", {
                scrollTrigger: {
                    trigger: ".card2",
                    //markers: true,
                    start: "top bottom",
                    end: `top top`,
                    pin: ".card0",
                    pinSpacing: false,
                }
            }
        )

    }, {scope: appRef})


    return (
        <div className={clsx(style.roadmap, "roadmap")}
             ref={appRef}
        >
            <div className={style.backMobile}>
                <Background/>
            </div>

            <div className={clsx(style.backDesktop, "back")}>
                <Background/>
            </div>

            <div className={style.cardsMobile}
                 style={{background: colors.green}}
            >
                {
                    [0, 1, 2].map(key => (
                            <div key={key} className={style.cardWrapper}>
                                <Card key={key} index={key}/>
                            </div>
                        )
                    )
                }
            </div>

            <div className={style.cardsDesktop}>
                {
                    [0, 1, 2].map(key => (
                        <div key={key}
                             className={clsx(style.cardWrapper, `card${key}`)}
                             style={{
                                 //marginTop: `calc(${(key + 1) * (100vh - 3 * CARD_HEIGHT) / 4)})`
                                 paddingTop: `calc((${key} + 1) * (100vh - 3 * ${CARD_HEIGHT}px) / 4 + ${key} * ${CARD_HEIGHT}px)`
                             }}
                        >
                            <Card key={key} index={key}/>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}