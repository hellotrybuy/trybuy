import { useState, useEffect } from "react";
import { ProductData, ProductResponse } from "./types";

interface UseGetCategories {
	products: ProductData[] | [];
	loading: boolean;
	error: Error | null;
}

export function useGetProductsFromCat(
	category_id: string,
	page: number,
	rows: number,
	selectOptions: string = "default",
): UseGetCategories {
	const [products, setProducts] = useState<ProductData[] | []>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);
	const baseUrl = import.meta.env.VITE_API_URL;

	useEffect(() => {
		setLoading(true);
		setError(null);
		const offset = (page - 1) * rows;
		const fetchData = async () => {
			try {
				const response = await fetch(
					`${baseUrl}/engine/functions/ajax/ajax_data.php?action=show_products_category_paginated&sort=${selectOptions}&category_id=${category_id}&limit=
			${rows.toString()}&offset=${offset.toString()}`,
				);
				if (!response.ok) {
					throw new Error(`Ошибка HTTP: ${response.status}`);
				}
				const data: ProductResponse = await response.json();
				setProducts(data.data);
			} catch (err) {
				setError(err as Error);
				setProducts(null);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [baseUrl, category_id, page, rows, selectOptions]);

	return { products, loading, error };
}
