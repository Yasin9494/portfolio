import style from "./Forms.module.scss";
import icon0 from "../../../assets/png/forms/icon0.png";
import icon1 from "../../../assets/png/forms/icon1.png";
import icon2 from "../../../assets/png/forms/icon2.png";
import {colors} from "../../../constants/colors";
import {svgIcons} from "../../../assets/svgIcons";
import {FormikErrors, FormikHelpers, useFormik} from "formik";

interface IValues {
    value: number
}

const initialValues = {
    value: 0,
}

const validate = ({value}: IValues): FormikErrors<IValues> => {
    const errors = {} as FormikErrors<IValues>
    if (!value) {
        errors.value = "Value required"
    }
    if (value && value <= 0) {
        errors.value = "Value must be greater than zero"
    }
    return errors
}

//========= FORM STAKE =========//
const FormStake = () => {
    const onSubmit = (values: IValues, helpers: FormikHelpers<IValues>) => {
        console.log(values)
    }

    const formik = useFormik({
        initialValues,
        validate,
        onSubmit
    });

    return (
        <form onSubmit={formik.handleSubmit}
              className={style.form}
        >
            <div>
                <div className={style.infoField}>
                    <p className={style.label}>Current staked:</p>
                    <p className={style.value}>0,00</p>
                </div>
                <div className={style.infoField}>
                    <p className={style.label}>Lifetime rewards:</p>
                    <p className={style.value}>0,00</p>
                </div>
                <div className={style.inputField}>
                    <div className={style.coin}>
                        {svgIcons.coin}
                    </div>
                    <input type="number"
                           placeholder="placeholder"
                           {...formik.getFieldProps('value')}
                    />
                    <button className={style.max}>
                        <span>max</span>
                    </button>
                </div>
            </div>

            <button type="submit"
                    className={style.submitBtn}
            >
                <span>stake</span>
            </button>
        </form>
    )
}

//========= FORM CLAIM =========//
const FormClaim = () => {
    const onSubmit = (values: IValues, helpers: FormikHelpers<IValues>) => {
        console.log(values)
    }

    const formik = useFormik({
        initialValues,
        validate,
        onSubmit
    });

    return (
        <form onSubmit={formik.handleSubmit}
              className={style.form}
        >
            <div>
                <div className={style.infoField}>
                    <p className={style.label}>Unclaimed rewards:</p>
                    <p className={style.value}>0,00</p>
                </div>
                <div className={style.inputField}>
                    <div className={style.coin}>
                        {svgIcons.coin}
                    </div>
                    <input type="number"
                           {...formik.getFieldProps('value')}
                    />
                    <button className={style.max}>
                        <span>max</span>
                    </button>
                </div>
            </div>

            <button type="submit"
                    className={style.submitBtn}
            >
                <span>CLAIM</span>
            </button>
        </form>
    )
}

//========= FORM UNSTAKE =========//
const FormUnstake = () => {
    const onSubmit = (values: IValues, helpers: FormikHelpers<IValues>) => {
        console.log(values)
    }

    const formik = useFormik({
        initialValues,
        validate,
        onSubmit
    });

    return (
        <form onSubmit={formik.handleSubmit}
              className={style.form}
        >
            <div>
                <div className={style.infoField}>
                    <p className={style.label}>Unlocks</p>
                    <p className={style.value}>After token launch</p>
                </div>
                <div className={style.inputField}>

                    <div className={style.coin}>
                        {svgIcons.coin}
                    </div>

                    <input type="number"
                           {...formik.getFieldProps('value')}
                    />

                    <button className={style.max}>
                        <span>max</span>
                    </button>
                </div>
            </div>

            <button type="submit"
                    className={style.submitBtn}
            >
                <span>UNSTAKE</span>
            </button>
        </form>
    )
}

const forms = [
    {
        title: "Stake",
        description: "",
        icon: icon0,
        background: colors.mint,
        form: <FormStake/>
    },
    {
        title: "Claim",
        description: "Claim your staking rewards",
        icon: icon1,
        background: colors.pink1,
        form: <FormClaim/>
    },
    {
        title: "UnStake",
        description: "Unstake your tokens and send to your wallet",
        icon: icon2,
        background: colors.yellow2,
        form: <FormUnstake/>
    },
]

//========= FORMS =========//
export const Forms = () => {
    return (
        <div className={style.forms}>
            <div className={style.inner}>
                {
                    forms.map(({
                                   title,
                                   icon,
                                   description,
                                   background,
                                   form
                               }, key) => (
                        <div key={key}
                             className={style.card}
                        >

                            <div className={style.icon}
                                 style={{background}}
                            >
                                <img src={icon} alt=""/>
                            </div>


                            <p className={style.title}>{title}</p>

                            {
                                description && (
                                    <p className={style.description}>
                                        {description}
                                    </p>
                                )
                            }

                            {form}


                        </div>
                    ))
                }
            </div>
        </div>
    )
}

