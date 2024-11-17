import {HashLink} from "react-router-hash-link";
import {ButtonRunning} from "../../A1_Header/ButtonRunning/ButtonRunning";
import {svgIcons} from "../../../assets/svgIcons";
import React, {FC} from "react";
import {useStore} from "../../../store/RootStore";
import {observer} from "mobx-react-lite";

interface IMenuLinks {
    classNameLink: string
}

export const MenuLinks: FC<IMenuLinks> = observer(({
                                              classNameLink
                                          }) => {
    const {
        appStore: {
            setBurgerMenu
        }
    } = useStore();

    return (
        <>
            <HashLink to="/#about"
                      smooth
                      className={classNameLink}
                      onClick={() => setBurgerMenu(false)}
            >
                <ButtonRunning label="about"
                               backgroundColor="#fac59f"
                />
            </HashLink>

            <HashLink to="/stake"
                      smooth
                      className={classNameLink}
                      onClick={() => setBurgerMenu(false)}
            >
                <ButtonRunning label="stake"
                               backgroundColor="#f4eb83"
                               dot={true}
                />
            </HashLink>

            <HashLink to="/#tokenomics"
                      smooth
                      className={classNameLink}
                      onClick={() => setBurgerMenu(false)}
            >
                <ButtonRunning label="TOKENOMICS"
                               backgroundColor="#c599e0"
                />
            </HashLink>

            <HashLink to="/#roadmap"
                      className={classNameLink}
                      onClick={() => setBurgerMenu(false)}
            >
                <ButtonRunning label="ROADMAP"
                               backgroundColor="#f59e96"
                />
            </HashLink>

            <HashLink to="/#faq"
                      className={classNameLink}
                      onClick={() => setBurgerMenu(false)}
            >
                <ButtonRunning label="faq"
                               backgroundColor="#aae7c0"
                />
            </HashLink>

            <HashLink to="/#swamp"
                      className={classNameLink}
                      onClick={() => setBurgerMenu(false)}
                      smooth
            >
                <ButtonRunning label="swamp"
                               backgroundColor="#a6cdf4"
                               dot={true}
                />
            </HashLink>

            <a href="#"
               target="_blank"
               rel="nofollow noopener noreferrer"
               className={classNameLink}
               onClick={() => setBurgerMenu(false)}
            >
                <ButtonRunning label="WHITE PAPER"
                               backgroundColor="#e5b8b8"
                               icon={svgIcons.documentArrowDown}
                />
            </a>
        </>
    )
})