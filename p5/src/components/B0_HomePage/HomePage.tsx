import style from "./HomePage.module.scss";
import {FirstScreen} from "./B0_0_FirstScreen/FirstScreen";
import {Items} from "./B0_1_Items/Items";
import {MissedOut} from "./B0_2_MissedOut/MissedOut";
import {AboutDegen} from "./B0_3_AboutDegen/AboutDegen";
import {HowToBuy} from "./B0_3_HowToBuy/HowToBuy";
import {People} from "./B0_5_People/People";
import {RunningString} from "./B0_6_RunningString/RunningString";
import {Roadmap} from "./B0_7_Roadmap/Roadmap";
import {Faq} from "./B0_8_Faq/Faq";

export const HomePage = () => {
    return (
        <div className={style.homePage}>
            <FirstScreen/>
            <Items/>
            <MissedOut/>
            <AboutDegen/>
            <HowToBuy/>
            <People/>
            <RunningString/>
            <Roadmap/>
            <Faq/>
            {/*<div style={{*/}
            {/*    height: "100vh",*/}
            {/*    background: "green"*/}
            {/*}}/>*/}

        </div>
    )
}