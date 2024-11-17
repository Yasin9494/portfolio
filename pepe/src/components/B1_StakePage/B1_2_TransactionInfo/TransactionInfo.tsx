import style from "./TransactionInfo.module.scss";
import {Deposits} from "./Deposits/Deposits";
import {TotalStaked} from "./TotalStaked/TotalStaked";

export const TransactionInfo = () => {
    return (
        <div className={style.transactionInfo}>
            <div className={style.inner}>
                <Deposits/>
                <TotalStaked/>
            </div>
        </div>
    )
}