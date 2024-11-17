import style from "./BurgerMenu.module.scss"
import {clsx} from "clsx";
import {observer} from "mobx-react-lite";
import {useStore} from "../../store/RootStore";
import React from "react";
import {MenuLinks} from "../x_common/MenuLinks/MenuLinks";
import {SocialLinks} from "../x_common/SocialLinks/SocialLinks";
import borderRight from "../../assets/png/burgerMenu/borderRight.png"
import star from "../../assets/png/burgerMenu/star.png"

export const BurgerMenu = observer(() => {
    const {
        appStore: {
            burgerMenu
        }
    } = useStore();

    return (
        <div className={clsx({
            [style.burgerMenu]: true,
            [style.burgerMenu_open]: burgerMenu,
        })}>
            <div className={style.links}>
                <MenuLinks classNameLink={style.link}/>
            </div>

            <div className={style.socialLinks}>
                <SocialLinks/>

                <p className={style.design}>Design by Demyanchuk Art</p>
                <p className={style.rights}>©2023 all rights reserved. CryptoDegenInu</p>
            </div>

            <img src={borderRight} alt="" className={style.borderRight}/>
            <img src={star} alt="" className={style.star}/>

        </div>
    )
})