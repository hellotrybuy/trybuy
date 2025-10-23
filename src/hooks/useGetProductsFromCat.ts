import { useState, useEffect, useMemo } from "react";
import { ProductDataCATResponse } from "./types";

export interface ProductDataCAT {
	id: number;
	is_hidden: boolean;
	product_id: number;
	category_id: number;
	platform_name: string;
	platform_url: string;
	icon: string;
	sort_order: number;
	type_name: string;
	type_url: string;
	name: string;
	price: number;
	price_usd: string;
	price_eur: string;
	platform: number;
	type: number;
	old_price: number;
	preview: string;
	url: string;
	discount_product: number;
	id_product: number;
	in_stock: number;
	cnt: number;
	recomm_product: number;
	is_new_product: number;
	good_reviews: string;
	bad_reviews: string;
	agency_percent: number;
	type_digi_product: string;
}

interface UseGetCategories {
	products: ProductDataCAT[] | [];
	loading: boolean;
	error: Error | null;
	totalPages: number;
}

export function useGetProductsFromCat(
	category_id: string,
	page: number,
	rows: number,
	selectOptions: string = "default",
	selectedPlatforms: string[],
	selectedTypes: string[],
	selectSecondCat: string = "",
	searchFromUrl: string = "",
	refreshKey?: number,
): UseGetCategories {
	const [products, setProducts] = useState<ProductDataCAT[] | []>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);
	const [totalPages, setTotalPages] = useState<number>(0);

	const baseUrl = import.meta.env.VITE_API_URL;

	const platforms = useMemo(() => {
		return selectedPlatforms.length > 0
			? selectedPlatforms.map((platform) => `${platform}`).join("%2C")
			: "";
	}, [selectedPlatforms]);

	const productTypes = useMemo(() => {
		return selectedTypes.length > 0
			? selectedTypes.map((type) => `${type}`).join("%2C")
			: "";
	}, [selectedTypes]);

	useEffect(() => {
		const controller = new AbortController();
		const signal = controller.signal;

		setLoading(true);
		setError(null);

		const category = selectSecondCat ? selectSecondCat : category_id;
		const offset = (page - 1) * rows;

		const fetchData = async () => {
			try {
				const response = await fetch(
					`${baseUrl}/engine/functions/category/category_product_functions.php?ajax=1&sort=${selectOptions}&category_id=${category}&rows=${rows.toString()}&offset=${offset.toString()}&platforms=${platforms}&types=${productTypes}&page=${page}&search=${searchFromUrl}`,
					{ signal },
				);

				if (!response.ok) {
					throw new Error(`Ошибка HTTP: ${response.status}`);
				}

				const data: ProductDataCATResponse = await response.json();
				setProducts(data.products);
				setTotalPages(data.totalPages);
			} catch (err) {
				if ((err as DOMException).name !== "AbortError") {
					setError(err as Error);
					setProducts(null);
				}
			} finally {
				setLoading(false);
			}
		};

		fetchData();

		return () => {
			controller.abort();
		};
	}, [
		baseUrl,
		category_id,
		page,
		rows,
		selectOptions,
		platforms,
		productTypes,
		selectSecondCat,
		searchFromUrl,
		refreshKey,
	]);

	return { products, loading, error, totalPages };
}
