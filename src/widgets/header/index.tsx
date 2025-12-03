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
import { Link, useLocation, useNavigate } from "react-router";
import { useSearch } from "../../hooks/useSearch";
import { useIsMobile } from "../../hooks/useIsMobile";

const cnx = classNames.bind(styles);

export function Header() {
	const { searchInput, setSearchInput } = useSearchContext();
	const [isCatalogOpen, setIsCatalogOpen] = useState(false);
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	const [isHeaderFixed, setIsHeaderFixed] = useState(false);
	const navigate = useNavigate();
	const { isMobile } = useIsMobile();

	console.log(window.history, "navigate");

	const location = useLocation();

	const isHome = location.pathname === Routes.HOME;

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
						{!isMobile || isHome ? (
							<div className={cnx("header__logo")}>
								<a href={Routes.HOME}>
									<img src="/iconsFolder/common/logo.svg" alt="TryBuy" />
									<img src="/iconsFolder/common/logo-short.svg" alt="TryBuy" />
								</a>
							</div>
						) : (
							<div
								className={cnx("butBack")}
								onClick={() => {
									const path = location.pathname;

									// 1. Если мы на продукте в каталоге → вернуться в каталог
									if (path.startsWith("/catalog/product")) {
										navigate("/catalog");
									}
									// 2. Если мы на каталоге → уйти на главную
									else if (
										path === "/catalog" ||
										path.startsWith("/catalog?")
									) {
										navigate("/");
									}
									// 3. Все остальные страницы → обычный назад
									else {
										if (window.history.length <= 1) navigate("/");
										else navigate(-1);
									}

									setTimeout(() => {
										window.scrollTo({ top: 0, behavior: "smooth" });
									}, 0);
								}}
							>
								<img src="/iconsFolder/common/arrow-left.svg" alt="TryBuy" />
							</div>
						)}

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
