import style from "./SocialLinks.module.scss"
import {svgIcons} from "../../../assets/svgIcons";

const socialLinks = [
    {
        icon: svgIcons.instagram,
        label: "instagram",
        href: "",
    },
    {
        icon: svgIcons.twitter,
        label: "twitter",
        href: "",
    },
    {
        icon: svgIcons.discord,
        label: "discord",
        href: "",
    },
]

export const SocialLinks = () => {
    return (
        <div className={style.socialLinks}>
            {
                socialLinks.map(({icon, label, href}, key) => (
                    <a key={key} className={style.link}
                       href={href}
                       target="_blank"
                       rel="nofollow noopener noreferrer"
                    >
                        <div className={style.inner}>
                            {icon}
                            <p>{label}</p>
                        </div>
                    </a>
                ))
            }
        </div>
    )
}