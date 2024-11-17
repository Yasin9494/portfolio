import React from "react"
import styleSoon from "./Soon.module.css"
import Navbar from "../components/Navbar"
import coinIcon from "../assets/img/coin_icon.png"
import {useLocation} from "react-router-dom"
export default function Soon() {
	const location = useLocation()
	const params = new URLSearchParams(location.search)
	const signType = params.get("signType")
	return (
		<>
			<div className={styleSoon.soon}>
				<img src={coinIcon} alt="" />
				Coming Soon
			</div>
			<Navbar />
		</>
	)
}
