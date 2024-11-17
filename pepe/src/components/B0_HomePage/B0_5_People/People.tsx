import style from "./People.module.scss";
import {useRef} from "react";
import {clsx} from "clsx";
import lottieJson from "../../../assets/json/roadmapCharacters.json";
import {useLottie} from "lottie-react";

export const People = () => {
    const appRef = useRef<HTMLDivElement>(null!);

    const options = {
        animationData: lottieJson,
        loop: true,
        autoplay: true,
    };
    const lottieStyle = {
        width: "100%"
    }

    const {View, play, stop} = useLottie(options, lottieStyle);

    return (
        <div className={clsx(style.people)} ref={appRef}
        >
            {View}

        </div>
    )
}