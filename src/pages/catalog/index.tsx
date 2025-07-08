import styles from "./index.module.scss";
import classNames from "classnames/bind";
const cnx = classNames.bind(styles);

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";

import Breadcrumbs from "../../components/breadcrumbs";
import Button from "../../components/button";
import { CONTAINER } from "../../constants/classnames";
import ProductCards from "../../widgets/product-cards";
import { CATALOG_CATEGORY } from "../../constants/searchParams";
import { CatalogType } from "../../types";
import Select from "../../components/select";
import FilterMobile from "../../widgets/mobile-filter";
import { Filers } from "../../components/filters";
import { ChapterSearch } from "./chapterSearch";
import { useProductList } from "../../hooks/useProductList";
import { ProductData } from "../../hooks/types";
import { useGetGreatCategories } from "../../hooks/useGetGreatCategories";
import { useGetProductsFromCat } from "../../hooks/useGetProductsFromCat";

export const selectOptions = [
	{ value: "По рекомендациям", label: "По рекомендациям" },
	{ value: "По кол-ву продаж", label: "По кол-ву продаж" },
	{ value: "Сначала дешевле", label: "Сначала дешевле" },
	{ value: "Сначала дороже", label: "Сначала дороже" },
];

export function CatalogPage() {
	const [searchParams] = useSearchParams();
	const category = searchParams.get(CATALOG_CATEGORY) as CatalogType;
	const [currentPage, setCurrentPage] = useState(1);
	const [categoryId, setCategoryId] = useState("all");
	const [selectValue, setSelectValue] = useState(selectOptions[0].value);

	const { products, loading: productsLoading } = useProductList(
		currentPage,
		15,
	);
	const { products: productsFromCat, loading: productsFromCatLoading } =
		useGetProductsFromCat(categoryId, currentPage, 15);

	const [catalogData, setCatalogData] = useState<ProductData[]>([]);

	const { categorys, loading: loadingCat } = useGetGreatCategories();
	console.log(productsFromCat, "productsFromCat");

	const changeCategory = (id: string) => {
		setCurrentPage(1);
		setCategoryId(id);
	};

	const changePage = () => {
		setCurrentPage((prevPage) => prevPage + 1);
	};

	useEffect(() => {
		const newItems = categoryId === "all" ? products : productsFromCat;
		if (newItems && newItems.length > 0) {
			setCatalogData((prev) => {
				return currentPage === 1
					? newItems
					: [
							...prev,
							...newItems.filter((item) => !prev.some((p) => p.id === item.id)),
					  ];
			});
		}
	}, [products, productsFromCat, categoryId, currentPage]);

	const dataIsLoaded = useMemo(() => {
		return categoryId == "all" ? productsLoading : productsFromCatLoading;
	}, [categoryId, productsLoading, productsFromCatLoading]);

	if (loadingCat) return;

	return (
		<div className={cnx("catalog")}>
			<Breadcrumbs />
			<div className={CONTAINER}>
				<div className={cnx("catalog__inner")}>
					<div className={cnx("catalog__categories", "categories")}>
						<nav className={cnx("categories__nav")}>
							<ul>
								<li
									className={cnx(categoryId == "all" && "_active")}
									onClick={() => changeCategory("all")}
								>
									<div>Все товары</div>
								</li>
								{categorys &&
									categorys.map((el) => (
										<li
											className={cnx(categoryId == el.id && "_active")}
											key={el.id}
											onClick={() => changeCategory(el.id)}
										>
											<div>{el.name}</div>
										</li>
									))}
							</ul>
						</nav>
					</div>

					<div className={cnx("catalog__body")}>
						<div className={cnx("catalog__filters")}>
							<Filers />
						</div>
						<div className={cnx("catalog__main", "main")}>
							<div className={cnx("catalog__filter-mobile", "filter-mobile")}>
								<Select
									onChange={(newValue) => setSelectValue(newValue)}
									value={selectValue}
									options={selectOptions}
								/>
								<FilterMobile />
							</div>
							<ChapterSearch />

							{category === "all" ||
								(category == null && (
									<div className={cnx("main__box", "box", "_desktop")}>
										<img
											className={cnx("box__img")}
											src="mock/gta.png"
											alt="Steam"
										/>
										<div className={cnx("box__main")}>
											<div className={cnx("box__top")}>
												<div className={cnx("box__top-block")}>
													<svg
														width="8"
														height="13"
														viewBox="0 0 8 13"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															d="M2.84266 7.3729L2.38269 7.10733C1.16294 6.40311 0.553072 6.051 0.528428 5.50384C0.503784 4.95667 1.07953 4.55116 2.23103 3.74014L5.91355 1.14649C6.64173 0.633619 7.00582 0.377185 7.15415 0.512727C7.30247 0.648269 7.07981 1.03394 6.63448 1.80527L5.02363 4.59535C4.90578 4.79947 4.84685 4.90153 4.87365 5.00156C4.90045 5.10158 5.00252 5.16051 5.20664 5.27836L5.66661 5.54393C6.88635 6.24814 7.49622 6.60025 7.52087 7.14742C7.54551 7.69459 6.96976 8.1001 5.81826 8.91112L2.13574 11.5048C1.40757 12.0176 1.04348 12.2741 0.895149 12.1385C0.746822 12.003 0.969487 11.6173 1.41482 10.846L3.02567 8.05591C3.14352 7.85179 3.20245 7.74972 3.17564 7.6497C3.14884 7.54967 3.04678 7.49075 2.84266 7.3729Z"
															fill="url(#paint0_linear_743_10719)"
														/>
														<defs>
															<linearGradient
																id="paint0_linear_743_10719"
																x1="7.76954"
																y1="-0.160715"
																x2="0.279755"
																y2="12.812"
																gradientUnits="userSpaceOnUse"
															>
																<stop stop-color="#FEFEFE" />
																<stop offset="1" stop-color="#DADADA" />
															</linearGradient>
														</defs>
													</svg>
													<span>Palmdale Shop</span>
												</div>
												<div className={cnx("box__top-block")}>
													<img src="/iconsFolder/common/star.svg" alt="Star" />
													<span>5,0</span>
												</div>
												<div className={cnx("box__top-block")}>
													<span>10000+ Оценок</span>
												</div>
											</div>
											<b className={cnx("box__title")}>
												🚀АВТОМАТИЧЕСКОЕ ПОПОЛНЕНИЕ БАЛАНСА STEAM 🚀RUB UAH KZT
											</b>
											<div className={cnx("box__actions")}>
												<div className={cnx("box__input-wrap")}>
													<input
														className={cnx("box__input")}
														placeholder="К пополнению"
														type="text"
													/>
													<div className={cnx("box__input-caption")}>
														<img
															src="/iconsFolder/common/info.svg"
															alt="Info"
														/>
														<span>Минимальная сумма 40 ₽</span>
													</div>
												</div>
												<div className={cnx("box__input-wrap")}>
													<input
														className={cnx("box__input")}
														placeholder="Логин Steam"
														type="text"
													/>
													<div className={cnx("box__input-caption")}>
														<img
															src="/iconsFolder/common/info.svg"
															alt="Info"
														/>
														<span>Минимальная сумма 40 ₽</span>
													</div>
												</div>
												<Button className={cnx("box__btn")}>
													Купить за 109 ₽
												</Button>
											</div>
										</div>
									</div>
								))}

							{/* Desktop box for games */}
							{category === "games" && (
								<div className={cnx("main__box", "box", "_desktop")}>
									<img
										className={cnx("box__img")}
										src="mock/gta.png"
										alt="Steam"
									/>
									<div className={cnx("box__main")}>
										<div className={cnx("box__top")}>
											<div className={cnx("box__top-block")}>
												<svg
													width="8"
													height="13"
													viewBox="0 0 8 13"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														d="M2.84266 7.3729L2.38269 7.10733C1.16294 6.40311 0.553072 6.051 0.528428 5.50384C0.503784 4.95667 1.07953 4.55116 2.23103 3.74014L5.91355 1.14649C6.64173 0.633619 7.00582 0.377185 7.15415 0.512727C7.30247 0.648269 7.07981 1.03394 6.63448 1.80527L5.02363 4.59535C4.90578 4.79947 4.84685 4.90153 4.87365 5.00156C4.90045 5.10158 5.00252 5.16051 5.20664 5.27836L5.66661 5.54393C6.88635 6.24814 7.49622 6.60025 7.52087 7.14742C7.54551 7.69459 6.96976 8.1001 5.81826 8.91112L2.13574 11.5048C1.40757 12.0176 1.04348 12.2741 0.895149 12.1385C0.746822 12.003 0.969487 11.6173 1.41482 10.846L3.02567 8.05591C3.14352 7.85179 3.20245 7.74972 3.17564 7.6497C3.14884 7.54967 3.04678 7.49075 2.84266 7.3729Z"
														fill="url(#paint0_linear_743_10719)"
													/>
													<defs>
														<linearGradient
															id="paint0_linear_743_10719"
															x1="7.76954"
															y1="-0.160715"
															x2="0.279755"
															y2="12.812"
															gradientUnits="userSpaceOnUse"
														>
															<stop stop-color="#FEFEFE" />
															<stop offset="1" stop-color="#DADADA" />
														</linearGradient>
													</defs>
												</svg>
												<span>Palmdale Shop</span>
											</div>
											<div className={cnx("box__top-block")}>
												<img src="iconsFolder/common/star.svg" alt="Star" />
												<span>5,0</span>
											</div>
											<div className={cnx("box__top-block")}>
												<span>10000+ Оценок</span>
											</div>
										</div>
										<b className={cnx("box__title")}>
											🚀АВТОМАТИЧЕСКОЕ ПОПОЛНЕНИЕ БАЛАНСА STEAM 🚀RUB UAH KZT
										</b>
										<div className={cnx("box__actions")}>
											<strong className={cnx("box__price")}>1190 руб.</strong>
											<Button className={cnx("box__btn")}>
												Купить за 109 ₽
											</Button>
										</div>
									</div>
								</div>
							)}

							{/* Mobile box */}
							<div className={cnx("main__box", "box", "_mobile")}>
								<div className={cnx("box__top")}>
									<img
										className={cnx("box__img")}
										src="mock/gta.png"
										alt="Steam"
									/>
									<div className={cnx("box__info-mobile")}>
										<b className={cnx("box__title")}>
											🚀АВТОМАТИЧЕСКОЕ ПОПОЛНЕНИЕ БАЛАНСА STEAM 🚀RUB UAH KZT
										</b>
										<strong className={cnx("box__price")}>1190 руб.</strong>
									</div>
								</div>
								<Button className={cnx("box__btn")}>Купить</Button>
							</div>

							<div className={cnx("main__cards")} key={categoryId}>
								{dataIsLoaded ? (
									<ProductCards data={catalogData} loading />
								) : (
									<ProductCards data={catalogData} />
								)}
							</div>
						</div>
					</div>

					<Button
						white
						className={cnx("catalog__btn-more")}
						onClick={changePage}
					>
						Загрузить ещё
					</Button>
				</div>
			</div>
		</div>
	);
}

export default CatalogPage;
