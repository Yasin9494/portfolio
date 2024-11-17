import style from "./Preloader.module.scss"
import {useEffect, useState} from "react";
import lottieJson from "../../assets/json/preloader.json";
import {useLottie} from "lottie-react";

export const Preloader = () => {
    const [start, setStart] = useState(false);
    const [percent, setPercent] = useState(0);
    const [showPreloader, setShowPreloader] = useState(true);

    const options = {
        animationData: lottieJson,
        loop: true,
        autoplay: true,
    };
    const lottieStyle = {
        width: 378
    }

    const {View, play, stop} = useLottie(options, lottieStyle);

    useEffect(() => {
        setStart(true);
    }, []);

    useEffect(() => {
        const timeId = setTimeout(() => {
            if (start) {
                if (percent === 100) {
                    clearTimeout(timeId);
                    setShowPreloader(false);
                } else {
                    setPercent(percent => percent + 1);
                }
            }
        }, 50);
        return () => {
            clearTimeout(timeId);
        }
    }, [percent, start]);

    if (!showPreloader) {
        return null
    }

    return (
        <div className={style.preloader}>
            {View}
            <p className={style.percent}>{`${percent}%`}</p>
        </div>
    )
}