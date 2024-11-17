import {clsx} from "clsx";
import {useGSAP} from "@gsap/react";
import {FC, useRef} from "react";
import style from "./Line.module.scss"
import gsap from "gsap";
import src0 from "../../../../../assets/png/roadmap/src0.png";
import src1 from "../../../../../assets/png/roadmap/src1.png";
import src2 from "../../../../../assets/png/roadmap/src2.png";
import src3 from "../../../../../assets/png/roadmap/src3.png";

const srcs = [src0, src1, src2, src3]

const duration = 60;

export const Line: FC<{index: number}> = ({index}) => {

    const appRef = useRef<HTMLDivElement>(null!);

    useGSAP(() => {

        if (index % 2 === 1) {
            gsap.timeline({repeat: -1})
                .to(".first-part", {xPercent: -100, duration, ease: "none"})
                .set(".first-part", {xPercent: 100})
                .to(".first-part", {xPercent: 0, duration, ease: "none"});

            gsap.timeline({repeat: -1})
                .set(".second-part", {xPercent: 100})
                .to(".second-part", {xPercent: -100, duration: 2 * duration, ease: "none"})
                .set(".second-part", {xPercent: 100});
        } else {
            gsap.timeline({repeat: -1})
                .to(".first-part", {xPercent: 100, duration, ease: "none"})
                .set(".first-part", {xPercent: -100})
                .to(".first-part", {xPercent: 0, duration, ease: "none"});

            gsap.timeline({repeat: -1})
                .set(".second-part", {xPercent: -100})
                .to(".second-part", {xPercent: 100, duration: 2 * duration, ease: "none"})
                .set(".second-part", {xPercent: -100})
        }

    }, {scope: appRef})

    return (
        <div className={clsx(style.line)} ref={appRef}>
            <div className={clsx(style.part, "first-part")}>
                {
                    Array
                        .from({length: 4}, (key) => key)
                        .map((item, key) => (
                            <div key={key}
                                 className={style.item}
                            >
                                <p>Roadmap</p>
                                <img src={srcs[index]}
                                     alt=""
                                     className={clsx(style.img, style[`img_${index}`])}
                                />
                            </div>
                        ))
                }
            </div>
            <div className={clsx(style.part, "second-part")}>
                {
                    Array
                        .from({length: 4}, (key) => key)
                        .map((item, key) => (
                            <div key={key}
                                 className={style.item}
                            >
                                <p>Roadmap</p>
                                <img src={srcs[index]}
                                     alt=""
                                     className={clsx(style.img, style[`img_${index}`])}
                                />
                            </div>
                        ))
                }
            </div>
        </div>
    )
}