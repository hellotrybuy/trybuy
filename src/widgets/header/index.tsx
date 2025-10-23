import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import Button from "../../components/button";
import { CONTAINER } from "../../constants/classnames";
import { Routes } from "../../routes";

import classNames from "classnames/bind";
import styles from "./index.module.scss";
import Apps from "../../components/apps";
import { MainSearch } from "../../components/mainSearch";
import CatalogMenu from "./catalogMenu/CatalogMenu";
import HeaderMobileNav from "./headerMobileNav";
import { useSearchContext } from "../../context";
import { useEnterKey } from "../../hooks/useEnterKey";
import { Link, useNavigate } from "react-router";
import { useSearch } from "../../hooks/useSearch";

const cnx = classNames.bind(styles);

export function Header() {
	const { searchInput, setSearchInput } = useSearchContext();
	const [isCatalogOpen, setIsCatalogOpen] = useState(false);
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	const [isHeaderFixed, setIsHeaderFixed] = useState(false);
	const navigate = useNavigate();

	const goHistory = () => {
		window.open("https://oplata.info/info/", "_blank");
	};

	const { categories } = useSearch(searchInput.length >= 2 ? searchInput : "");

	const categoriesFromView = useMemo(() => {
		return categories.slice(0, 8);
	}, [categories]);

	const goCatalog = useCallback(() => {
		if (isSearchOpen) {
			navigate(`/catalog?search=${searchInput}`);
		}
	}, [searchInput, navigate, isSearchOpen]);

	useEnterKey(goCatalog, [goCatalog]);

	useEffect(() => {
		const computeScroll = () => {
			if (window.scrollY > 400) {
				setIsHeaderFixed(true);
			} else if (isHeaderFixed) {
				setIsHeaderFixed(false);
			}
		};

		window.addEventListener("scroll", computeScroll);
		return () => window.removeEventListener("scroll", computeScroll);
	}, [isHeaderFixed]);

	return (
		<>
			<header className={cnx("header", { "header--fixed": isHeaderFixed })}>
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
								refProp={ref}
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

					{/* Выпадающий поиск */}
					{isSearchOpen &&
						searchInput.length >= 2 &&
						categoriesFromView.length > 0 && (
							<div
								className={cnx("actions__search-dropdown", "dropdown")}
								ref={ref}
							>
								{/* Список категорий */}
								{/* {categoriesFromView.length > 0 && (
								<ul>
									{categoriesFromView
										.filter((category) => category.cnt !== 0)
										.map((category) => (
											<li key={category.id}>
												<Link
													to={`/catalog/?main_category=${category.parent_id}&second_category=${category.id}&searchI=${searchInput}`}
													className={cnx("item")}
													onClick={() => {
														setIsSearchOpen(false);
														setIsCatalogOpen(false);
													}}
												>
													<div className={cnx("item__name")}>
														{category.name}
													</div>
												</Link>
											</li>
										))}
								</ul>
							)} */}

								{/* Для каждой категории выводим её типы */}
								{categoriesFromView.some((cat) => cat.types?.length > 0) && (
									<>
										<ul className={cnx("dropdown__section-types")}>
											{categoriesFromView
												.filter(
													(category) =>
														category.cnt !== 0 && category.types?.length,
												)
												.flatMap((category) =>
													category.types.map((type) => (
														<li key={`${category.id}-${type.id}`}>
															<Link
																to={`/catalog?content_type=${type.url}&&main_category=${category.parent_id}&second_category=${category.id}&searchI=${category.name}`}
																className={cnx("item")}
																onClick={() => {
																	setIsSearchOpen(false);
																	setIsCatalogOpen(false);
																}}
															>
																<div className={cnx("item__name__cat")}>
																	{category.name}
																</div>
																<div className={cnx("item__type")}>
																	{type.name}
																</div>
															</Link>
														</li>
													)),
												)}
										</ul>
									</>
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
