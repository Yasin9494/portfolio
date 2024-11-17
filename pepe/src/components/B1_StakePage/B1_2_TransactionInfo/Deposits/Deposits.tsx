import style from "./Deposits.module.scss"
import {data} from "./data";
import {colors} from "../../../../constants/colors";

const backgrounds = {
    "in progress": colors.blue,
    "rejected": colors.coral,
    "completed": colors.mint
}

export const Deposits = () => {
    return (
        <div className={style.deposits}>

            <p className={style.title}>
                Deposits
            </p>

            <div className={style.labels}>
                <p>Transaction</p>
                <p>Date</p>
                <p>Amount</p>
                <p>Status</p>
            </div>

            <div className={style.info}>
                {
                    data.map(({transaction, date, amount, status}, key) => (
                        <div key={key}
                             className={style.item}
                        >
                            <div>
                                <p>{transaction}</p>
                                <p>{date}</p>
                            </div>
                            <div>
                                <p>{amount}</p>
                                <p style={{
                                    // @ts-ignore
                                    background: backgrounds[status]
                                }}>
                                    {status}
                                </p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}