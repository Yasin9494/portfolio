import style from "./RunningString.module.scss"
import {useRef} from "react";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {clsx} from "clsx";

const items = [
    "Introducing the ultimate crypto fusion!",
    "🤓",
    "Discover our unified platform today!",
    "😎",
    "Experience the synergy!",
    "💀",
    "Introducing the ultimate crypto fusion!",
    "🚀",
];
const duration = 30;

export const RunningString = () => {

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
        <div className={style.runningString}
             ref={appRef}
        >
            <div className={clsx(style.part, "partLeft")}>
                {
                    items.map((item, key) => (
                        <p key={key}
                           className={style.item}
                        >
                            {item}
                        </p>
                    ))
                }
            </div>

            <div className={clsx(style.part, "partRight")}>
                {
                    items.map((item, key) => (
                        <p key={key}
                           className={style.item}
                        >
                            {item}
                        </p>
                    ))
                }
            </div>


        </div>
    )
}