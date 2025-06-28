import { useEffect, useState } from "react";

import Button from "../../components/button";
import { CONTAINER } from "../../constants/classnames";
import { Routes } from "../../routes";

import classNames from "classnames/bind";
import styles from "./index.module.scss";
import Apps from "../../components/apps";
import { MOCK_DATA_SEARCH_RESULTS } from "../../pages/catalog/chapterSearch/data";
import { MainSearch } from "../../components/mainSearch";
import CatalogMenu from "./catalogMenu/CatalogMenu";
import HeaderMobileNav from "./headerMobileNav";

const cnx = classNames.bind(styles);

export function Header() {
	const [searchValue, setSearchValue] = useState("");
	const [isCatalogOpen, setIsCatalogOpen] = useState(false);
	const [isSearchOpen, setIsSearchOpen] = useState(false);

	const [isHeaderFixed, setIsHeaderFixed] = useState(false);

	useEffect(() => {
		const computeScroll = () => {
			const scrollY = window.scrollY;

			if (scrollY > 400) {
				setIsHeaderFixed(true);
			} else if (isHeaderFixed == true) {
				setIsHeaderFixed(false);
			}
		};

		window.addEventListener("scroll", computeScroll);

		return () => window.removeEventListener("scroll", computeScroll);
	}, [isHeaderFixed]);

	console.log(searchValue, "searchValue");
	console.log(isCatalogOpen, "isCatalogOpen");

	return (
		<>
			<header className={cnx("header")}>
				<div className={CONTAINER}>
					<div className={cnx("header__inner")}>
						<div className={cnx("header__logo")}>
							<a href={Routes.HOME}>
								<img src="/icons/common/logo.svg" alt="TryBuy" />
								<img src="/icons/common/logo-short.svg" alt="TryBuy" />
							</a>
						</div>

						<nav className={cnx("header__actions", "actions")}>
							<MainSearch
								setIsCatalogOpen={setIsCatalogOpen}
								isCatalogOpen={isCatalogOpen}
								setSearchValue={setSearchValue}
								searchValue={searchValue}
								setIsSearchOpen={setIsSearchOpen}
							/>

							<Apps className={cnx("actions__apps")} />
						</nav>

						<nav className={cnx("header__actions-mobile", "actions-mobile")}>
							<HeaderMobileNav
								searchValue={searchValue}
								setSearchValue={setSearchValue}
								isCatalogOpen={isCatalogOpen}
								setIsCatalogOpen={setIsCatalogOpen}
								setIsSearchOpen={setIsSearchOpen}
							/>
						</nav>

						<Button className={cnx("header__btn")}>История покупок</Button>
					</div>

					<CatalogMenu
						isCatalogOpen={isCatalogOpen}
						setIsCatalogOpen={setIsCatalogOpen}
					/>

					{isSearchOpen && (
						<div className={cnx("actions__search-dropdown", "dropdown")}>
							{searchValue != "" && (
								<ul>
									{MOCK_DATA_SEARCH_RESULTS.map((el, index) => (
										<li key={index} className={cnx("item")}>
											<div className={cnx("item__name")}>{el.name}</div>
											<div className={cnx("item__type")}>{el.type}</div>
										</li>
									))}
								</ul>
							)}
						</div>
					)}
				</div>
			</header>

			<div className={CONTAINER}>
				<Apps className={cnx("apps")} />
			</div>
		</>
	);
}

export default Header;
