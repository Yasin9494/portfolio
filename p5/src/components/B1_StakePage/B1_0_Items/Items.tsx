import style from "./Items.module.scss"
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {clsx} from "clsx";
import {useRef} from "react";

const items = [
    {
        label: "Staked amount:",
        value: "208,541,908",
    },
    {
        label: "Available to stake:",
        value: "1,987,002",
    },
    {
        label: "APY",
        value: "22%",
    },
    {
        label: "APR",
        value: "22%",
    },
]

const duration = 45;

export const Items = () => {
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
        <div className={style.items}
             ref={appRef}
        >

            <div className={style.itemsMobile}>

                <div className={clsx(style.part, "partLeft")}>
                    {
                        Array
                            .from({length: 6}, (v, k) => k)
                            .map(k => (
                                <div key={k}
                                     className={style.section}>
                                    {
                                        items.map(({label, value}, key) => (
                                            <div key={key}
                                                 className={style.sectionItem}
                                            >
                                                <p className={style.label}>{label}</p>
                                                <p className={style.value}>{value}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                            ))
                    }
                </div>

                <div className={clsx(style.part, "partRight")}>
                    {
                        Array
                            .from({length: 6}, (v, k) => k)
                            .map(k => (
                                <div key={k}
                                     className={style.section}
                                >
                                    {
                                        items.map(({label, value}, key) => (
                                            <div key={key}
                                                 className={style.sectionItem}
                                            >
                                                <p className={style.label}>{label}</p>
                                                <p className={style.value}>{value}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                            ))
                    }
                </div>
            </div>

            <div className={style.itemsDesktop}>
                <div className={style.inner}>
                    {
                        items.map(({label, value}, key) => (
                            <div key={key}
                                 className={style.sectionItem}
                            >
                                <p className={style.label}>{label}</p>
                                <p className={style.value}>{value}</p>
                            </div>
                        ))
                    }
                </div>

            </div>

        </div>
    )
}