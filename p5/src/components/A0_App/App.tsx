import React from 'react';
import style from "./App.module.scss";
import {Route, Routes} from "react-router-dom";
import {HomePage} from "../B0_HomePage/HomePage";
import {Header} from "../A1_Header/Header";
import {BurgerMenu} from "../A2_BurgerMenu/BurgerMenu";
import {Preloader} from "../A5_Preloader/Preloader";
import {Footer} from "../A4_Footer/Footer";
import {StakePage} from "../B1_StakePage/StakePage";

export const App = () => {
    return (
        <div className={style.app}>
            <Preloader/>
            <Header/>
            <BurgerMenu/>

            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/stake" element={<StakePage/>}/>
            </Routes>

            <Footer/>
        </div>
    );
}

