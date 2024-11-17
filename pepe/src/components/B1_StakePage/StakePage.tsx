import style from "./StakePage.module.scss";
import {Items} from "./B1_0_Items/Items";
import {Forms} from "./B1_1_Forms/Forms";
import {TransactionInfo} from "./B1_2_TransactionInfo/TransactionInfo";
import {HowDoesStakingWork} from "./B1_3_HowDoesStakingWork/HowDoesStakingWork";

export const StakePage = () => {
    return (
        <div className={style.stakePage}>

            <h2 className={style.title}>
                Stake
            </h2>

            <Items/>
            <Forms/>
            <TransactionInfo/>
            <HowDoesStakingWork/>
        </div>
    )
}