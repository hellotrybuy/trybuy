import { useEffect, useState } from "react";
import { Routes } from "../../routes";
import Button from "../button";
import styles from "./index.module.scss";
import classNames from "classnames/bind";
import { scrollFixed } from "../../lib/scroll-fixed";

const cnx = classNames.bind(styles);

export function MobileNavigation() {
	const [isHidden, setIsHidden] = useState(false);

	useEffect(() => {
		const computeScroll = () =>
			scrollFixed(
				() => setIsHidden(false),
				() => {
					if (isHidden !== true) setIsHidden(true);
				},
			);

		window.addEventListener("scroll", computeScroll);

		() => {
			window.removeEventListener("scroll", computeScroll);
		};
	}, []);

	return (
		<div className={cnx("navigation", isHidden && "_hidden")}>
			<nav className={cnx("navigation__inner")}>
				<ul>
					<li>
						<a href={Routes.HOME}>
							<img src="/iconsFolder/navigation/home.svg" alt="Главная" />
							<span> Главная</span>
						</a>
					</li>
					<li>
						<a
							onClick={(e) => {
								e.preventDefault();
								document.getElementById("main-search-input")?.focus();
							}}
						>
							<img src="/iconsFolder/navigation/search.svg" alt="Поиск" />
							<span>Поиск</span>
						</a>
					</li>
					<li>
						<a className={cnx("_catalog")} href={Routes.CATALOG}>
							<Button className={cnx("catalog-icon")}>
								<img src="/iconsFolder/navigation/catalog.svg" alt="Каталог" />
							</Button>
							<span>Каталог</span>
						</a>
					</li>
					<li>
						<a href={Routes.HOME}>
							<img src="/iconsFolder/navigation/purchases.svg" alt="Покупки" />
							<span>Покупки</span>
						</a>
					</li>
					<li>
						<a href={Routes.HOME}>
							<img src="/iconsFolder/navigation/help.svg" alt="Помощь" />
							<span>Помощь</span>
						</a>
					</li>
				</ul>
			</nav>
		</div>
	);
}
export default MobileNavigation;
