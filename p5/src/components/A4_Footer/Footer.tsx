import style from "./Footer.module.scss"
import logo from "../../assets/png/logo.png";
import {HashLink} from "react-router-hash-link";
import React from "react";
import {SocialLinks} from "../x_common/SocialLinks/SocialLinks";
import {clsx} from "clsx";
import borderRight from "../../assets/png/burgerMenu/borderRight.png";
import starLeft from "../../assets/png/footer/star-left.png";
import starRight from "../../assets/png/footer/star-right.png";
import people from "../../assets/png/footer/people.png";

export const Footer = () => {
    return (
        <footer className={style.footer}>

            <div className={style.inner}>

                <img src={people} alt="" className={style.people}/>
                <img src={starRight} alt="" className={style.starRight}/>

                <div className={style.topPart}>

                    <HashLink to="/#top"
                              smooth
                              className={style.logo}
                    >
                        <img src={logo} alt=""/>
                    </HashLink>

                    <nav className={style.links}>
                        <HashLink to="/#about"
                                  smooth
                                  className={style.link}
                        >
                            <p>about</p>
                        </HashLink>

                        <HashLink to="/stake"
                                  smooth
                                  className={style.link}
                        >
                            <p>stake</p>
                        </HashLink>

                        <HashLink to="/#tokenomics"
                                  smooth
                                  className={style.link}
                        >
                            <p>TOKENOMICS</p>
                        </HashLink>

                        <HashLink to="/#roadmap"
                                  className={style.link}
                                  smooth
                        >
                            <p>ROADMAP</p>
                        </HashLink>

                        <HashLink to="/#faq"
                                  className={style.link}
                                  smooth
                        >
                            <p>faq</p>
                        </HashLink>

                        <HashLink to="/#swamp"
                                  className={style.link}
                                  smooth
                        >
                            <p>swamp</p>
                        </HashLink>

                        <a href="#"
                           target="_blank"
                           rel="nofollow noopener noreferrer"
                           className={style.link}
                        >
                            <p>WHITE PAPER</p>
                        </a>

                        <img src={starLeft} alt="" className={style.starLeft}/>
                    </nav>

                    <p className={clsx(style.rights, style.rights_desktop)}>
                        ©2023 all rights reserved. CryptoDegenInu
                    </p>

                </div>

                <div className={style.bottomPart}>
                    <SocialLinks/>

                    <p className={style.design}>
                        Design by Demyanchuk Art
                    </p>

                    <p className={clsx(style.rights, style.rights_mobile)}>
                        ©2023 all rights reserved. CryptoDegenInu
                    </p>

                    <img src={borderRight}
                         alt=""
                         className={style.borderRight}
                    />
                </div>


            </div>

        </footer>
    )
}