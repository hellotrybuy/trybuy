/* eslint-disable @typescript-eslint/no-unused-vars */
import { useParams, useSearchParams } from "react-router";
import CatalogPage, { selectOptions } from "../catalog";
import {
	CATALOG_CATEGORY,
	CATALOG_PLATFORMS,
	CATALOG_SEARCH,
	CATALOG_SECOND_CAT,
	CATALOG_TYPES,
} from "../../constants/searchParams";
import { CatalogType } from "../../types";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Breadcrumbs, { Crumb } from "../../components/breadcrumbs";
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
import { useGetSeller } from "../../hooks/useGetSeller";
import { useGetProductsFromCatSeller } from "../../hooks/useGetProductsFromCatSeller";
import { useSearchContext } from "../../context";
import { ProductDataCAT } from "../../hooks/useGetProductsFromCat";
import ProductsSceleton from "../../widgets/productsSceleton";
import { useGetPlatforms } from "../../hooks/useGetPlatforms";
import { useGetProductTypes } from "../../hooks/useGetProductTypes";
import { useGetCategoriesSecondPlace } from "../../hooks/useGetCategoriesSecondPlace";
import { useGetGreatCategories } from "../../hooks/useGetGreatCategories";
import { ChapterSearch } from "../catalog/chapterSearch";

const cnx = classNames.bind(styles);

export function SellerPage() {
	const { id } = useParams();

	const [isFilterOpen, setIsFilterOpen] = useState(false);

	const [searchParams, setSearchParams] = useSearchParams();
	const category = searchParams.get(CATALOG_CATEGORY);
	const platformsFromUrl = searchParams.get(CATALOG_PLATFORMS);
	const typesFromUrl = searchParams.get(CATALOG_TYPES);
	const secondCategoryFromUrl = searchParams.get(CATALOG_SECOND_CAT);
	const searchFromUrl = searchParams.get(CATALOG_SEARCH);
	const categoryRefs = useRef<Record<string, HTMLLIElement | null>>({});

	const { searchInput } = useSearchContext();

	const previewPlatforms = useMemo(() => {
		if (platformsFromUrl) {
			return platformsFromUrl.split("__");
		} else {
			return [];
		}
	}, [platformsFromUrl]);

	const previewTypesFromUrl = useMemo(() => {
		if (typesFromUrl) {
			return typesFromUrl.split("__");
		} else {
			return [];
		}
	}, [typesFromUrl]);

	const [currentPage, setCurrentPage] = useState(1);
	const [search, setSearch] = useState(searchFromUrl);
	const [categoryId, setCategoryId] = useState(category);
	const [selectedPlatforms, setSelectedPlatforms] =
		useState<string[]>(previewPlatforms);
	const [selectedType, setSelectedType] =
		useState<string[]>(previewTypesFromUrl);
	const [selectSecondCat, setSelectSecondCat] = useState(secondCategoryFromUrl);
	const loadMoreRef = useRef(null);
	const [refreshKey, setRefreshKey] = useState(0);

	const { seller } = useGetSeller(id);
	const { categorys, loading: loadingCat } = useGetGreatCategories();

	const { platforms } = useGetPlatforms(categoryId);
	const { types: productTypes } = useGetProductTypes(categoryId);
	const { platforms: categorySecondPlace } =
		useGetCategoriesSecondPlace(categoryId);

	const toggleFilter = () => setIsFilterOpen((v) => !v);
	const [selectValue, setSelectValue] = useState(selectOptions[0].value);
	const {
		products,
		loading: productsFromCatLoading,
		totalPages,
	} = useGetProductsFromCatSeller(
		categoryId,
		currentPage,
		20,
		selectValue,
		selectedPlatforms,
		selectedType,
		selectSecondCat,
		search,
		id,
		refreshKey,
	);

	console.log(products, "products");

	const [catalogData, setCatalogData] = useState<ProductDataCAT[]>([]);

	useEffect(() => {
		setCatalogData([]);
		setCurrentPage(1);
	}, [categoryId, selectedPlatforms, selectedType, selectSecondCat, search]);

	useEffect(() => {
		if (!products) return;

		setCatalogData((prev) => {
			const existingIds = new Set(prev.map((p) => p.id));
			const uniqueNew = products.filter(
				(p: ProductDataCAT, index, self) =>
					self.findIndex(
						(x: ProductDataCAT) => x.id_product === p.id_product,
					) === index,
			);

			if (currentPage === 1) {
				return uniqueNew;
			}

			const filteredNew = uniqueNew.filter((p) => !existingIds.has(p.id));
			return [...prev, ...filteredNew];
		});
	}, [products, currentPage, categoryId, refreshKey]);

	const changeCategory = (id: string) => {
		setCurrentPage(1);
		setCategoryId(id);
		setSelectedPlatforms([]);
		setSelectedType([]);
		setSearchParams((prev) => {
			const newParams = new URLSearchParams(prev);
			newParams.delete(CATALOG_PLATFORMS);
			newParams.delete(CATALOG_TYPES);
			newParams.delete(CATALOG_SECOND_CAT);
			if (id === "") {
				newParams.delete(CATALOG_CATEGORY);
			} else {
				newParams.set(CATALOG_CATEGORY, id);
			}
			return newParams;
		});
	};

	const changePage = useCallback(() => {
		if (totalPages >= currentPage) setCurrentPage((prevPage) => prevPage + 1);
	}, [totalPages, currentPage]);

	const changePlatforms = (ids: string[]) => {
		setSelectedPlatforms(ids);
		setSearchParams((prev) => {
			const newParams = new URLSearchParams(prev);
			newParams.set(CATALOG_PLATFORMS, ids.join("__"));
			return newParams;
		});
	};

	const changeContentTypes = (ids: string[]) => {
		setSelectedType(ids);
		setSearchParams((prev) => {
			const newParams = new URLSearchParams(prev);
			newParams.set(CATALOG_TYPES, ids.join("__"));
			return newParams;
		});
	};

	const changeSearch = useCallback(
		(text: string) => {
			setSearchParams((prev) => {
				const newParams = new URLSearchParams(prev);
				newParams.set(CATALOG_SEARCH, text);
				return newParams;
			});
		},
		[setSearchParams],
	);

	const changeCategorySecondPlace = (id: string) => {
		setSelectSecondCat(id);
		setSearchParams((prev) => {
			const newParams = new URLSearchParams(prev);
			newParams.set(CATALOG_SECOND_CAT, id);
			return newParams;
		});
	};

	useEffect(() => {
		setRefreshKey(Date.now());
	}, []);

	useEffect(() => {
		changeSearch(searchInput);
	}, [searchInput, changeSearch]);

	useEffect(() => {
		if (secondCategoryFromUrl) {
			setSelectSecondCat(secondCategoryFromUrl);
		} else {
			setSelectSecondCat("");
		}
		setCurrentPage(1);
	}, [secondCategoryFromUrl]);

	useEffect(() => {
		setSearch(searchInput);
		setCurrentPage(1);
	}, [searchFromUrl, searchInput]);

	useEffect(() => {
		if (previewPlatforms.length > 0) {
			setSelectedPlatforms(previewPlatforms);
		} else {
			setSelectedPlatforms([]);
		}
		setCurrentPage(1);
	}, [previewPlatforms]);

	useEffect(() => {
		if (previewTypesFromUrl.length > 0) {
			setSelectedType(previewTypesFromUrl);
		} else {
			setSelectedType([]);
		}
		setCurrentPage(1);
	}, [previewTypesFromUrl]);

	useEffect(() => {
		if (category) {
			setCategoryId(category);
		} else {
			setCategoryId("");
		}
		setCurrentPage(1);
	}, [category]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && !productsFromCatLoading) {
					changePage();
				}
			},
			{ threshold: 0.1 },
		);

		if (loadMoreRef.current) {
			observer.observe(loadMoreRef.current);
		}

		return () => {
			if (loadMoreRef.current) {
				observer.unobserve(loadMoreRef.current);
			}
		};
	}, [productsFromCatLoading, loadMoreRef, changePage, totalPages, loadingCat]);

	useEffect(() => {
		const el = categoryRefs.current[categoryId ?? ""];
		if (el) {
			el.scrollIntoView({
				behavior: "smooth",
				inline: "center",
				block: "nearest",
			});
		}
	}, [categorys, categoryId]);

	useEffect(() => {
		setCatalogData([]);
		setCurrentPage(1);
	}, [categoryId, selectedPlatforms, selectedType, selectSecondCat, search]);

	useEffect(() => {
		if (!products) return;

		setCatalogData((prev) => {
			const existingIds = new Set(prev.map((p) => p.id));
			const uniqueNew = products.filter(
				(p: ProductDataCAT, index, self) =>
					self.findIndex(
						(x: ProductDataCAT) => x.id_product === p.id_product,
					) === index,
			);

			if (currentPage === 1) {
				return uniqueNew;
			}

			const filteredNew = uniqueNew.filter((p) => !existingIds.has(p.id));
			return [...prev, ...filteredNew];
		});
	}, [products, currentPage, categoryId, refreshKey]);

	const crumbs: Crumb[] = [
		{ label: "Главная", href: "/" },
		{ label: "Продавцы", href: "/sellers" },
		{
			label: seller?.seller_name,
			href: `/sellers/${seller?.seller_id}`,
			isActive: true,
		},
	];

	return (
		<div className={cnx("seller")}>
			<Breadcrumbs crumbs={crumbs} />
			<div className={CONTAINER}>
				<div className={cnx("containerSeller")}>
					<SellerHeader seller={seller} />
					<div className={cnx("seller__inner")}>
						<div className={cnx("seller-categories")}>
							<nav className={cnx("categories__nav")}>
								{categorys ? (
									<ul>
										<li
											className={cnx(categoryId == "" && "_active")}
											onClick={() => changeCategory("")}
											ref={(node) => {
												categoryRefs.current[""] = node;
											}}
										>
											<div>Все товары</div>
										</li>
										{categorys.map((el) => (
											<li
												ref={(node) => {
													categoryRefs.current[el.id] = node;
												}}
												className={cnx(categoryId == el.id && "_active")}
												key={el.id}
												onClick={() => changeCategory(el.id)}
											>
												<div>{el.name}</div>
											</li>
										))}
									</ul>
								) : (
									<div className={cnx("categories_sceleton")}></div>
								)}

								<ChapterSearch
									selectValue={selectValue}
									setSelectValue={setSelectValue}
									values={selectOptions}
								/>
							</nav>
						</div>

						<div className={cnx("seller__body")}>
							<div className={cnx("seller__filters")}>
								<Filers
									platforms={platforms}
									category={categoryId}
									selectedPlatforms={selectedPlatforms}
									setSelectedPlatforms={changePlatforms}
									contentTypes={productTypes}
									selectedTypes={selectedType}
									setSelectedTypes={changeContentTypes}
									setSelectSecondCat={changeCategorySecondPlace}
									selectSecondCat={selectSecondCat}
									categorySecondPlace={categorySecondPlace}
									searchParams={searchParams}
									setSearchParams={setSearchParams}
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
										platforms={platforms}
										category={categoryId}
										selectedPlatforms={selectedPlatforms}
										setSelectedPlatforms={changePlatforms}
										contentTypes={productTypes}
										selectedTypes={selectedType}
										setSelectedTypes={changeContentTypes}
										setSelectSecondCat={changeCategorySecondPlace}
										selectSecondCat={selectSecondCat}
										categorySecondPlace={categorySecondPlace}
										searchParams={searchParams}
										setSearchParams={setSearchParams}
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

								{/* <div className={cnx("seller-main__cards")}>
									<ProductCards data={catalogData} />
								</div> */}
								<div className={cnx("main__cards")} key={categoryId}>
									{productsFromCatLoading && catalogData.length === 0 ? (
										<ProductsSceleton isMargin={false} />
									) : (
										<ProductCards data={catalogData} />
									)}

									{totalPages > currentPage && (
										<div
											ref={loadMoreRef}
											className={cnx("ref-load")}
											style={{ minHeight: "100px" }}
										>
											<ProductsSceleton isMargin={catalogData.length > 0} />
										</div>
									)}

									{!productsFromCatLoading && catalogData.length === 0 && (
										<div className={cnx("notFound")}>
											К сожалению, по текущему поисковому запросу в данной
											категории товаров нет :(
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
