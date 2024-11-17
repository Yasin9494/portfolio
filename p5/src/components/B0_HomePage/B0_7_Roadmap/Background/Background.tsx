import style from "./Background.module.scss";
import {Line} from "./Line/Line";

export const Background = () => {

    return (
        <div className={style.background}>
            {
                [0, 1, 2, 3].map(key => <Line key={key} index={key}/>)
            }
        </div>
    )
}