import style from "./ButtonRunning.module.scss"
import {FC, JSX, useRef} from "react";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {clsx} from "clsx";

const factor = 0.25;

interface IButtonRunning {
    backgroundColor: string
    label: string
    icon?: JSX.Element
    dot?: boolean
}

export const ButtonRunning: FC<IButtonRunning> = ({
                                                      backgroundColor,
                                                      label,
                                                      icon,
                                                      dot = false
                                                  }) => {

    const duration = factor * (label.length * 11 + 16);

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
        <div className={style.buttonRunning}
             style={{backgroundColor}}
             ref={appRef}
        >

            {Boolean(icon) && icon}
            <span className={style.label}>{label}</span>

            <div className={style.partsWrapper}>
                <div className={clsx(style.part, "partLeft")}>
                    {
                        Array
                            .from({length: 10}, () => label)
                            .map((label, key) => (
                                    <div className={style.item}
                                         key={key}
                                    >
                                        {Boolean(icon) && icon}
                                        <p className={style.text}>
                                            {label}
                                        </p>
                                    </div>
                                )
                            )
                    }
                </div>

                <div className={clsx(style.part, "partRight")}>
                    {
                        Array
                            .from({length: 10}, () => label)
                            .map((label, key) => (
                                    <div className={style.item}
                                         key={key}
                                    >
                                        {Boolean(icon) && icon}
                                        <p className={style.text}>
                                            {label}
                                        </p>
                                    </div>
                                )
                            )
                    }
                </div>
            </div>


            {dot && <div className={style.dot}/>}
        </div>
    )
}