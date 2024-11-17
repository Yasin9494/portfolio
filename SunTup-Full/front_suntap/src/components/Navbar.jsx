import styleNavbar from "./Navbar.module.css"
import mineIcon from "../assets/icons/mine.png"
import friendsIcon from "../assets/icons/friends.png"
import earnIcon from "../assets/icons/earn.png"
import airdropIcon from "../assets/icons/airdrop.png"
import {NavLink} from "react-router-dom"
export default function Navbar() {
	return (
		<>
			<ul className={styleNavbar.navbar}>
				<li>
					<NavLink
						to={`/main`}
						className={({isActive}) => (isActive ? styleNavbar.active : "")}
					>
						<img src={mineIcon} alt="" />
						<span className="text">Mine</span>
					</NavLink>
				</li>
				<li>
					<NavLink
						to={`/friends`}
						className={({isActive}) => (isActive ? styleNavbar.active : "")}
					>
						<img src={friendsIcon} alt="" />
						<span className="text">Friends</span>
					</NavLink>
				</li>
				<li>
					<NavLink
						to={`/earn`}
						className={({isActive}) => (isActive ? styleNavbar.active : "")}
					>
						<img src={earnIcon} alt="" />
						<span className="text">Earn</span>
					</NavLink>
				</li>
				<li>
					<NavLink
						to={`/airdrop`}
						className={({isActive}) => (isActive ? styleNavbar.active : "")}
					>
						<img src={airdropIcon} alt="" />
						<span className="text">Airdrop</span>
					</NavLink>
				</li>
			</ul>
		</>
	)
}
