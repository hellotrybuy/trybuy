import { useSearchParams } from "react-router";
import { selectOptions } from "../catalog";
import { CATALOG_CATEGORY } from "../../constants/searchParams";
import { CatalogType } from "../../types";
import { useState } from "react";
import Breadcrumbs from "../../components/breadcrumbs";
import { CONTAINER } from "../../constants/classnames";
import styles from "./index.module.scss";
import classNames from "classnames/bind";
import { Routes } from "../../routes";
import { Filers } from "../../components/filters";
import Select from "../../components/select";
import FilterMobile from "../../widgets/mobile-filter";
import Button from "../../components/button";
import ProductCards from "../../widgets/product-cards";
import { SellerHeader } from "./blocks/sellerHeader";
import { useProductList } from "../../hooks/useProductList";
import { FilterButton } from "../catalog/filterButton";

const cnx = classNames.bind(styles);

export function SellerPage() {
	const [searchParams] = useSearchParams();
	const category = searchParams.get(CATALOG_CATEGORY) as CatalogType;
	const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
	const [selectedType, setSelectedType] = useState<string[]>([]);
	const [selectSecondCat, setSelectSecondCat] = useState("");
	const [isFilterOpen, setIsFilterOpen] = useState(false);

	const toggleFilter = () => setIsFilterOpen((v) => !v);
	const [selectValue, setSelectValue] = useState(selectOptions[0].value);
	const { products } = useProductList(1, 15);
	return (
		<div className={cnx("seller")}>
			<Breadcrumbs />
			<div className={CONTAINER}>
				<div className={cnx("containerSeller")}>
					<SellerHeader />
					<div className={cnx("seller__inner")}>
						<div className={cnx("seller-categories")}>
							<nav className={cnx("seller-categories__nav")}>
								<ul>
									<li className={cnx(category !== "games" && "_active")}>
										<a href={Routes.CATALOG}>Все товары</a>
									</li>
									<li className={cnx(category === "games" && "_active")}>
										<a href={`${Routes.CATALOG}?${CATALOG_CATEGORY}=games`}>
											Игры
										</a>
									</li>
									<li>
										<a href="#">Программное обеспечение</a>
									</li>
									<li>
										<a href="#">Сервисы и соцсети</a>
									</li>
									<li>
										<a href="#">Внутриигровые ценности</a>
									</li>
								</ul>
							</nav>
						</div>

						<div className={cnx("seller__body")}>
							<div className={cnx("seller__filters")}>
								<Filers
									platforms={[]}
									selectedPlatforms={selectedPlatforms}
									setSelectedPlatforms={setSelectedPlatforms}
									contentTypes={[]}
									selectedTypes={selectedType}
									setSelectedTypes={setSelectedType}
									searchParams={null}
									setSearchParams={null}
									categorySecondPlace={[]}
									selectSecondCat={selectSecondCat}
									setSelectSecondCat={setSelectSecondCat}
									category={""}
								/>
							</div>

							<div className={cnx("seller__main", "seller-main")}>
								<div
									className={cnx(
										"seller__filter-mobile",
										"seller-filter-mobile",
									)}
								>
									<div className={cnx("catalog__main__down")}>
										<Select
											onChange={(newValue) => setSelectValue(newValue)}
											value={selectValue}
											options={selectOptions}
										/>
										<FilterButton
											onClick={toggleFilter}
											isOpen={isFilterOpen}
										/>
									</div>
									<FilterMobile
										isOpen={isFilterOpen}
										onClose={() => setIsFilterOpen(false)}
										category={""}
										platforms={[]}
										selectedPlatforms={selectedPlatforms}
										contentTypes={[]}
										selectedTypes={selectedType}
										setSelectedTypes={setSelectedType}
										setSelectedPlatforms={setSelectedPlatforms}
										searchParams={null}
										categorySecondPlace={[]}
										selectSecondCat={selectSecondCat}
										setSelectSecondCat={setSelectSecondCat}
										setSearchParams={null}
									/>
								</div>

								{category === "games" && (
									<div
										className={cnx(
											"seller-main__box",
											"seller-box",
											"_desktop",
										)}
									>
										<img
											className={cnx("seller-box__img")}
											src="mock/gta.png"
											alt="Steam"
										/>
										<div className={cnx("seller-box__main")}>
											<div className={cnx("seller-box__top")}>
												<div className={cnx("seller-box__top-block")}>
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
																<stop stopColor="#FEFEFE" />
																<stop offset="1" stopColor="#DADADA" />
															</linearGradient>
														</defs>
													</svg>
													<span>Palmdale Shop</span>
												</div>
												<div className={cnx("seller-box__top-block")}>
													<img src="/iconsFolder/common/star.svg" alt="Star" />
													<span>5,0</span>
												</div>
												<div className={cnx("seller-box__top-block")}>
													<span>10000+ Оценок</span>
												</div>
											</div>
										</div>
									</div>
								)}

								<div className={cnx("seller-main__cards")}>
									<ProductCards data={products.rows} />
								</div>
							</div>
						</div>

						<Button white className={cnx("seller__btn-more")}>
							Загрузить ещё
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
