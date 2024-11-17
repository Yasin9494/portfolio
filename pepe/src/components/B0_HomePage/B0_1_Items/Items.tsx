import style from "./Items.module.scss";

const items = [
    {
        label: "MK sent for staking",
        value: "11,456,846",
    },
    {
        label: "% of MK sent for staking",
        value: "88%",
    },
    {
        label: "APY (% annual yield)",
        value: "110%",
    },
    {
        label: "Remuneration paid",
        value: "7,746,375",
    },
    {
        label: "Staking participants",
        value: "32760",
    },
]

export const Items = () => {
    return (
        <div className={style.items}>
            <div className={style.inner}>
                {
                    items.map(({label, value}, key) => (
                        <div key={key}
                             className={style.item}
                        >
                            <p className={style.label}>{label}</p>
                            <p className={style.value}>{value}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}