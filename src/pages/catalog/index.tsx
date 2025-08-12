import styles from "./index.module.scss";
import classNames from "classnames/bind";
const cnx = classNames.bind(styles);

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router";

import Breadcrumbs, { Crumb } from "../../components/breadcrumbs";
import { CONTAINER } from "../../constants/classnames";
import ProductCards from "../../widgets/product-cards";
import {
	CATALOG_CATEGORY,
	CATALOG_PLATFORMS,
	CATALOG_SEARCH,
	CATALOG_SECOND_CAT,
	CATALOG_TYPES,
} from "../../constants/searchParams";
import Select from "../../components/select";
import FilterMobile from "../../widgets/mobile-filter";
import { Filers } from "../../components/filters";
import { ChapterSearch } from "./chapterSearch";
import { useGetGreatCategories } from "../../hooks/useGetGreatCategories";
import {
	ProductDataCAT,
	useGetProductsFromCat,
} from "../../hooks/useGetProductsFromCat";
import { useGetPlatforms } from "../../hooks/useGetPlatforms";
import { useGetProductTypes } from "../../hooks/useGetProductTypes";
import { useGetCategoriesSecondPlace } from "../../hooks/useGetCategoriesSecondPlace";
import ProductsSceleton from "../../widgets/productsSceleton";
import { useSearchContext } from "../../context";
import { useGetCommerceProduct } from "../../hooks/useGetCommerceProduct";
import { CommerceCard } from "./commerceCard";

export const selectOptions = [
	{ value: "default", label: "По рекомендациям" },
	{ value: "cnt", label: "По кол-ву продаж" },
	{ value: "asc", label: "Сначала дешевле" },
	{ value: "desc", label: "Сначала дороже" },
];

export function CatalogPage() {
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
	const [selectValue, setSelectValue] = useState(selectOptions[0].value);
	const [selectedPlatforms, setSelectedPlatforms] =
		useState<string[]>(previewPlatforms);
	const [selectedType, setSelectedType] =
		useState<string[]>(previewTypesFromUrl);
	const [selectSecondCat, setSelectSecondCat] = useState(secondCategoryFromUrl);
	const loadMoreRef = useRef(null);
	const {
		products: productsFromCat,
		loading: productsFromCatLoading,
		totalPages,
	} = useGetProductsFromCat(
		categoryId,
		currentPage,
		20,
		selectValue,
		selectedPlatforms,
		selectedType,
		selectSecondCat,
		search,
	);

	const [catalogData, setCatalogData] = useState<ProductDataCAT[]>([]);

	const { categorys, loading: loadingCat } = useGetGreatCategories();

	const { platforms } = useGetPlatforms(categoryId);
	const { types: productTypes } = useGetProductTypes(categoryId);
	const { platforms: categorySecondPlace } =
		useGetCategoriesSecondPlace(categoryId);

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
		if (!productsFromCat) return;

		setCatalogData((prev) => {
			const existingIds = new Set(prev.map((p) => p.id));
			const uniqueNew = productsFromCat.filter(
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
	}, [productsFromCat, currentPage, categoryId]);

	const { products: commerceProucts } = useGetCommerceProduct(categoryId);

	const commerceProuct = useMemo(() => {
		if (commerceProucts && commerceProucts.length > 0) {
			return commerceProucts[0];
		}
		return null;
	}, [commerceProucts]);

	const crumbs: Crumb[] = [
		{ label: "Главная", href: "/" },
		{ label: "Каталог", href: "/catalog", isActive: true },
	];

	if (loadingCat) return;

	return (
		<div className={cnx("catalog")}>
			<Breadcrumbs crumbs={crumbs} />
			<div className={CONTAINER}>
				<div className={cnx("catalog__inner")}>
					<div className={cnx("catalog__categories", "categories")}>
						<nav className={cnx("categories__nav")}>
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
								{categorys &&
									categorys.map((el) => (
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
							<ChapterSearch
								selectValue={selectValue}
								setSelectValue={setSelectValue}
								values={selectOptions}
							/>
						</nav>
					</div>
					<div className={cnx("catalog__body")}>
						<div className={cnx("catalog__filters")}>
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
						<div className={cnx("catalog__main", "main")}>
							<div className={cnx("catalog__filter-mobile", "filter-mobile")}>
								<Select
									onChange={(newValue) => setSelectValue(newValue)}
									value={selectValue}
									options={selectOptions}
								/>
								<FilterMobile
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

							{commerceProuct && <CommerceCard product={commerceProuct} />}

							<div className={cnx("main__cards")} key={categoryId}>
								{<ProductCards data={catalogData} />}
								{totalPages > currentPage && (
									<div
										ref={loadMoreRef}
										className={cnx("ref-load")}
										style={{
											minHeight: "100px",
										}}
									>
										<ProductsSceleton isMargin={catalogData.length > 0} />
									</div>
								)}

								{!(catalogData.length > 0) && totalPages == 0 && (
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
	);
}

export default CatalogPage;
