import { useState, useEffect, useMemo } from "react";
import { ProductDataCATResponse } from "./types";

export interface ProductDataCAT {
	id: number;
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

export function useGetProductsFromCatSeller(
	category_id: string,
	page: number,
	rows: number,
	selectOptions: string = "default",
	selectedPlatforms: string[],
	selectedTypes: string[],
	selectSecondCat: string = "",
	searchFromUrl: string = "",
	sellerId: string,
	refreshKey?: number,
): UseGetCategories {
	const [products, setProducts] = useState<ProductDataCAT[] | []>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);
	const [totalPages, setTotalPages] = useState<number>(0);

	const baseUrl = import.meta.env.VITE_API_URL;

	const platforms = useMemo(() => {
		return selectedPlatforms.length > 0 ? selectedPlatforms.join("%2C") : "";
	}, [selectedPlatforms]);

	const productTypes = useMemo(() => {
		return selectedTypes.length > 0 ? selectedTypes.join("%2C") : "";
	}, [selectedTypes]);

	useEffect(() => {
		setLoading(true);
		setError(null);

		const category = selectSecondCat || category_id;
		const offset = (page - 1) * rows;

		const fetchData = async () => {
			try {
				const url = `${baseUrl}/engine/functions/ajax/seller_ajax.php?sort=${selectOptions}&category_id=${category}&rows=${rows}&offset=${offset}&platforms=${platforms}&types=${productTypes}&page=${page}&search=${searchFromUrl}&seller_id=${sellerId}ajax=1`;

				const response = await fetch(url, {
					headers: {
						Accept: "application/json",
					},
				});

				if (!response.ok) {
					throw new Error(`Ошибка HTTP: ${response.status}`);
				}

				const contentType = response.headers.get("content-type");
				if (!contentType || !contentType.includes("application/json")) {
					const text = await response.text();
					throw new Error(`Ожидался JSON, но получен: ${text.slice(0, 200)}`);
				}

				const data: ProductDataCATResponse = await response.json();
				setProducts(data.products || []);
				setTotalPages(data.totalPages || 0);
			} catch (err) {
				setError(err as Error);
				setProducts([]);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
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
		sellerId,
	]);

	return { products, loading, error, totalPages };
}
