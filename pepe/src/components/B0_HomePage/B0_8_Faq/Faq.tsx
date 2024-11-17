import style from "./Faq.module.scss"
import {FC, useState} from "react";
import {IItem, items} from "./items";
import {svgIcons} from "../../../assets/svgIcons";
import {clsx} from "clsx";
import {Collapse} from "@mui/material";
import cloud from "../../../assets/png/faq/cloud.png";
import left from "../../../assets/png/faq/left.png";
import right from "../../../assets/png/faq/right.png";
import cloudLeft from "../../../assets/png/faq/cloud-left.png";
import cloudRight from "../../../assets/png/faq/cloud-right.png";

export const Faq = () => {
    const [selectedIndex, setSelectedIndex] = useState(-1)

    return (
        <div className={style.faq}>
            <div className={style.inner}>

                <h2 className={style.title}>
                    <span>frequently asked questions</span>
                    <img src={cloud} alt="" className={style.cloud}/>
                </h2>

                <div className={style.items}>
                    {
                        items.map((item, key) => (
                            <ItemComponent key={key}
                                           item={item}
                                           selectedIndex={selectedIndex}
                                           index={key}
                                           onClick={() => {
                                               setSelectedIndex(selectedIndex === key ? -1 : key)
                                           }}
                            />
                        ))
                    }

                    <img src={left} alt="" className={style.left}/>
                    <img src={right} alt="" className={style.right}/>
                    <img src={cloudLeft} alt="" className={style.cloudLeft}/>
                    <img src={cloudRight} alt="" className={style.cloudRight}/>

                </div>

            </div>
        </div>
    )
}

interface IItemComponent {
    item: IItem
    selectedIndex: number
    index: number
    onClick: () => void
}

const ItemComponent: FC<IItemComponent> = ({
                                               item,
                                               selectedIndex,
    index,
                                               onClick
                                           }) => {
    return (
        <div className={style.item}>

            <div className={style.questionWrapper}>
                <p className={style.question}>
                    {item.question}

                </p>

                <button className={clsx({
                    [style.btn]: true,
                    [style.btn_open]: selectedIndex === index,
                })}
                        onClick={() => onClick()}
                >
                    {svgIcons.arrow_down}
                </button>
            </div>


            <Collapse in={selectedIndex === index}>
                <p className={style.answer}>
                    {
                        item.answer.map(({text, ticket}, key) => (
                            <span key={key}
                                  className={ticket ? style.ticket : style.span}
                            >
                                {text}
                            </span>
                        ))
                    }
                </p>
            </Collapse>
        </div>
    )
}