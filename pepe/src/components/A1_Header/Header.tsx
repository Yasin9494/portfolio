import style from "./Header.module.scss";
import {RunningString} from "./RunningString/RunningString";
import React from "react";
import {HashLink} from 'react-router-hash-link';
import logo from "../../assets/png/logo.png";
import {svgIcons} from "../../assets/svgIcons";
import {observer} from "mobx-react-lite";
import {useStore} from "../../store/RootStore";
import {MenuLinks} from "../x_common/MenuLinks/MenuLinks";

export const Header = observer(() => {
    const {
        appStore: {
            burgerMenu, setBurgerMenu
        }
    } = useStore();

    const onBurger = () => {
        setBurgerMenu(!burgerMenu)
    }

    return (
        <header className={style.header} id="top">
            <RunningString/>
            <div className={style.headerBottom}>
                <div className={style.inner}>

                    <HashLink to="/#top"
                              smooth
                              className={style.logo}
                    >
                        <img src={logo} alt=""/>
                    </HashLink>

                    <nav className={style.links}>
                        <MenuLinks classNameLink={style.link}/>
                    </nav>

                    <button className={style.burgerBtn}
                            onClick={() => onBurger()}
                    >
                        {burgerMenu ? svgIcons.close : svgIcons.burger}
                    </button>
                </div>
            </div>
        </header>
    )
})
