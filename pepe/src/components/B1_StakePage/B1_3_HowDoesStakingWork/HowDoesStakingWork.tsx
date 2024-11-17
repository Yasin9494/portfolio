import style from "./HowDoesStakingWork.module.scss";
import icon0 from "../../../assets/png/HowDoesStakingWork/icon0.png";
import icon1 from "../../../assets/png/HowDoesStakingWork/icon1.png";
import icon2 from "../../../assets/png/HowDoesStakingWork/icon2.png";
import {colors} from "../../../constants/colors";
import {clsx} from "clsx";
import {useRef} from "react";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";

const items = [
    {
        icon: icon0,
        background: colors.purple,
        title: "Make a deposit",
        description: "You ensure participation in the network and receive remuneration for maintaining and supporting",
    },
    {
        icon: icon1,
        background: colors.yellow2,
        title: "Wait for interest",
        description: "You ensure participation in the network and receive remuneration for maintaining and supporting",
    },
    {
        icon: icon2,
        background: colors.mint,
        title: "Withdraw interest ",
        description: "You ensure participation in the network and receive remuneration for maintaining and supporting",
    },
]

const duration = 30;

export const HowDoesStakingWork = () => {
    const appRef = useRef<HTMLDivElement>(null!);

    useGSAP(() => {

        gsap.timeline({repeat: -1})
            .to(".partLeft", {xPercent: -100, duration, ease: "none"})
            .set(".partLeft", {xPercent: 100})
            .to(".partLeft", {xPercent: 0, duration, ease: "none"});


        gsap.timeline({repeat: -1})
            .set(".partRight", {xPercent: 100})
            .to(".partRight", {xPercent: -100, duration: 2 * duration, ease: "none"})
            .set(".partRight", {xPercent: 100});

    }, {scope: appRef})

    return (
        <div className={style.howDoesStakingWork}
             ref={appRef}
        >

            <div className={style.titleWrapper}>
                <div className={style.inner}>
                    <h2 className={style.title}>
                        How does staking work?
                    </h2>
                </div>
            </div>

            <div className={style.itemsMobile}>
                <div className={clsx(style.part, "partLeft")}>
                    {
                        [...items, ...items].map(({icon, background, title, description}, key) => (
                            <div key={key}
                                 className={style.item}
                            >
                                <div className={style.icon}
                                     style={{background}}
                                >
                                    <img src={icon} alt=""/>
                                </div>

                                <div className={style.texts}>
                                    <p className={style.itemTitle}>{title}</p>
                                    <p className={style.description}>{description}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>

                <div className={clsx(style.part, "partRight")}>
                    {
                        [...items, ...items].map(({icon, background, title, description}, key) => (
                            <div key={key}
                                 className={style.item}
                            >
                                <div className={style.icon}
                                     style={{background}}
                                >
                                    <img src={icon} alt=""/>
                                </div>

                                <div className={style.texts}>
                                    <p className={style.itemTitle}>{title}</p>
                                    <p className={style.description}>{description}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>


            <div className={style.itemsDesktop}>
                <div className={style.inner}>
                    {
                        items.map(({icon, background, title, description}, key) => (
                            <div key={key}
                                 className={style.item}
                            >
                                <div className={style.icon}
                                     style={{background}}
                                >
                                    <img src={icon} alt=""/>
                                </div>

                                <div className={style.texts}>
                                    <p className={style.itemTitle}>{title}</p>
                                    <p className={style.description}>{description}</p>
                                </div>


                            </div>
                        ))
                    }
                </div>

            </div>


        </div>
    )
}