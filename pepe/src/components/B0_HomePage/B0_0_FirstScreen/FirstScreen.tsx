import style from "./FirstScreen.module.scss"
import src0 from "../../../assets/png/first screen/icon0.png";
import src1 from "../../../assets/png/first screen/icon1.png";
import src2 from "../../../assets/png/first screen/icon2.png";
import {svgIcons} from "../../../assets/svgIcons";
import {clsx} from "clsx";
import {useState} from "react";
import {FormikErrors, FormikHelpers, useFormik} from "formik";
import lottieJson from "../../../assets/json/car.json";
import {useLottie} from "lottie-react";

const items = [
    {
        src: src0,
        svg: svgIcons.titleIcon0,
    },
    {
        src: src1,
        svg: svgIcons.titleIcon1,
    },
    {
        src: src2,
        svg: svgIcons.titleIcon2,
    },
]

const tabs = [
    {
        icon: svgIcons.eth,
        label: "eth"
    },
    {
        icon: svgIcons.usdt,
        label: "usdt"
    },
    {
        icon: svgIcons.card,
        label: "card"
    },
]

interface IValues {
    value: number
}

const initialValues = {
    value: 1,
}

const validate = ({value}: IValues): FormikErrors<IValues> => {
    const errors = {} as FormikErrors<IValues>
    if (!value) {
        errors.value = "Value required"
    }
    if (value <= 0) {
        errors.value = "Value must be greater than zero"
    }
    return errors
}

export const FirstScreen = () => {
    const [tab, setTab] = useState("eth")

    const price = 0.0015;
    const current = 6345114.12;
    const total = 10000000.00;

    const currentString = new Intl.NumberFormat("en", {
        minimumFractionDigits: 2,
        maximumSignificantDigits: 2
    }).format(current);
    const totalString = new Intl.NumberFormat("en", {
        minimumFractionDigits: 2,
        maximumSignificantDigits: 2
    }).format(total);


    const onSubmit = (values: IValues, helpers: FormikHelpers<IValues>) => {
        console.log(values)
    }

    const formik = useFormik({
        initialValues,
        validate,
        onSubmit
    });

    const options = {
        animationData: lottieJson,
        loop: true,
        autoplay: true,
    };
    const lottieStyle = {
        width: "100%"
    }

    const {View, play, stop} = useLottie(options, lottieStyle);


    return (
        <div className={style.firstScreen}>

            <div className={style.background}>
                {View}
            </div>

            <h1 className={style.title}>
                <div className={style.itemsWrapper}>
                    <div className={style.items}>
                        {
                            items.map(({src, svg}, key) => (
                                <div key={key}
                                     className={style.item}
                                >
                                    {svg}
                                    <img src={src} alt=""/>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <span>
                   Welcome to Degen Pepe Inu token presale
                </span>
            </h1>

            <div className={style.card}>
                <div className={style.timerWrapper}>
                    {svgIcons.timer}
                    <p className={style.time}>
                        08d : 23h : 41m
                    </p>
                </div>

                <p className={style.cardTitle}>
                    Buy now Next price - ${price}
                </p>

                <p className={style.values}>
                    {`USDT ${currentString} / ${totalString}  involved`}
                </p>

                <div className={style.indicator}>
                    <div className={style.inner}
                         style={{
                             width: `${100 * current / total}%`
                         }}
                    >
                        {svgIcons.indicator}
                    </div>
                </div>

                <div className={style.tip}>
                    <span>1 DGPI = $0.002</span>
                </div>

                <div className={style.tabs}>
                    {
                        tabs.map(({icon, label}, key) => (
                            <button key={key}
                                    className={clsx({
                                        [style.tab]: true,
                                        [style.tab_selected]: label === tab,
                                    })}
                                    onClick={() => setTab(label)}
                            >
                                {icon}
                                <span>{label}</span>
                            </button>
                        ))
                    }
                </div>

                <form onSubmit={formik.handleSubmit}
                      className={style.form}
                >
                    <div className={style.fields}>
                        <div className={style.field}>
                            <input type="number"
                                //min={0}
                                   {...formik.getFieldProps('value')}

                            />
                            {svgIcons.inputEth}
                            {
                                formik.touched.value && formik.errors.value && (
                                    <p className={style.error}>{formik.errors.value}</p>
                                )
                            }
                        </div>

                        <div className={style.field}>
                            <p>2000000</p>
                        </div>
                    </div>

                    <button type="submit"
                            className={style.submitBtn}
                    >
                        <span>Connect Wallet</span>
                    </button>

                    <div className={style.links}>
                        <p>Buy with ETH</p>
                        <p>How To buy</p>
                    </div>


                </form>

            </div>
        </div>
    )
}