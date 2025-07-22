import { useCallback, useEffect, useRef, useState } from "react";

import Button from "../../components/button";
import { CONTAINER } from "../../constants/classnames";
import { Routes } from "../../routes";

import classNames from "classnames/bind";
import styles from "./index.module.scss";
import Apps from "../../components/apps";
import { MainSearch } from "../../components/mainSearch";
import CatalogMenu from "./catalogMenu/CatalogMenu";
import HeaderMobileNav from "./headerMobileNav";
// import { useSearch } from "../../hooks/useSearch";
import { useSearchContext } from "../../context";
import { useEnterKey } from "../../hooks/useEnterKey";
import { useNavigate } from "react-router";

const cnx = classNames.bind(styles);

export function Header() {
	const { searchInput, setSearchInput } = useSearchContext();
	const [isCatalogOpen, setIsCatalogOpen] = useState(false);
	const [, setIsSearchOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	const [isHeaderFixed, setIsHeaderFixed] = useState(false);
	const navigate = useNavigate();
	const goHistory = () => {
		window.open("https://oplata.info/info/", "_blank");
	};

	// const { products } = useSearch(searchInput);

	// const productsFromView = useMemo(() => {
	// 	return products.slice(0, 8);
	// }, [products]);

	// const getUrl = useCallback((product: ProductData) => {
	// 	let category = product.ca
	// }, [])

	const goCatalog = useCallback(() => {
		console.log(searchInput, "searchInput");

		navigate(`/catalog?search=${searchInput}`);
	}, [searchInput, navigate]);

	useEnterKey(goCatalog, [goCatalog]);

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

	return (
		<>
			<header className={cnx("header")}>
				<div className={CONTAINER}>
					<div className={cnx("header__inner")}>
						<div className={cnx("header__logo")}>
							<a href={Routes.HOME}>
								<img src="/iconsFolder/common/logo.svg" alt="TryBuy" />
								<img src="/iconsFolder/common/logo-short.svg" alt="TryBuy" />
							</a>
						</div>

						<nav className={cnx("header__actions", "actions")}>
							<MainSearch
								setIsCatalogOpen={setIsCatalogOpen}
								isCatalogOpen={isCatalogOpen}
								setSearchValue={setSearchInput}
								searchValue={searchInput}
								setIsSearchOpen={setIsSearchOpen}
								refProp={ref}
							/>

							<Apps className={cnx("actions__apps")} />
						</nav>

						<nav className={cnx("header__actions-mobile", "actions-mobile")}>
							<HeaderMobileNav
								setSearchValue={setSearchInput}
								searchValue={searchInput}
								isCatalogOpen={isCatalogOpen}
								setIsCatalogOpen={setIsCatalogOpen}
								setIsSearchOpen={setIsSearchOpen}
							/>
						</nav>

						<Button className={cnx("header__btn")} onClick={goHistory}>
							История покупок
						</Button>
					</div>

					<CatalogMenu
						isCatalogOpen={isCatalogOpen}
						setIsCatalogOpen={setIsCatalogOpen}
					/>
					{/* 
					{isSearchOpen && searchInput.length > 1 && (
						<div
							className={cnx("actions__search-dropdown", "dropdown")}
							ref={ref}
						>
							{searchValue != "" && productsFromView.length > 0 && (
								<ul>
									{productsFromView.map((el, index) => (
										<li key={index}>
											<Link
												to={`product/${el.id_product}`}
												className={cnx("item")}
											>
												<div className={cnx("item__name")}>{el.name}</div>
												<div className={cnx("item__type")}>{el.type_name}</div>
											</Link>
										</li>
									))}
								</ul>
							)}
						</div>
					)} */}
				</div>
			</header>

			<div className={CONTAINER}>
				<Apps className={cnx("apps")} />
			</div>
		</>
	);
}

export default Header;
