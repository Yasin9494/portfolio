import style from "./TotalStaked.module.scss"
import {svgIcons} from "../../../../assets/svgIcons";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {Fragment, useRef} from "react";
import {clsx} from "clsx";

const duration = 60;

export const TotalStaked = () => {
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
        <div className={style.totalStaked} ref={appRef}>
            <p className={style.title}>
                Total Staked
            </p>

            <div className={style.graphMobile}>
                <div className={clsx(style.part, "partLeft")}>
                    {
                        [0, 1, 2, 3, 4].map((item, key) => (
                            <Fragment key={key}>
                                {svgIcons.graph}
                            </Fragment>
                        ))
                    }
                </div>
                <div className={clsx(style.part, "partRight")}>
                    {
                        [0, 1, 2, 3, 4].map((item, key) => (
                            <Fragment key={key}>
                                {svgIcons.graph}
                            </Fragment>
                        ))
                    }
                </div>
            </div>

            <div className={style.graphDesktop}>
                {svgIcons.graph}
            </div>
        </div>
    )
}