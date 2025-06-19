import { useEffect, useState } from "react";

export interface Product {
	id: string;
	product_id: string;
	category_id: string;
	platform_name: string;
	platform_url: string;
	icon: string;
	sort_order: string;
	name: string;
	price: string;
	platform: string;
	type: string;
	old_price: string;
	preview: string;
	url: string;
	discount_product: string;
	id_product: string;
	in_stock: string;
	cnt: string;
}

interface UseProductListParams {
	categoryId?: number;
	page?: number;
	rows?: number;
	search?: string;
	sort?: string;
	minPrice?: number;
	maxPrice?: number;
	platforms?: string;
}

interface ProductResponse {
	products: Product[];
	totalPages: number;
}

export function useProductList({
	categoryId = 151,
	page = 1,
	rows = 40,
	search = "",
	sort = "default",
	minPrice = 0,
	maxPrice = 999999,
	platforms = "",
}: UseProductListParams) {
	const [data, setData] = useState<ProductResponse | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchProducts = async () => {
			setLoading(true);
			setError(null);
			const baseUrl = import.meta.env.VITE_API_URL;

			const url = `${baseUrl}/engine/functions/category/category_product_functions.php?${new URLSearchParams(
				{
					ajax: "1",
					category_id: String(categoryId),
					rows: String(rows),
					page: String(page),
					search,
					sort,
					minPrice: String(minPrice),
					maxPrice: String(maxPrice),
					platforms,
				},
			)}`;

			try {
				const res = await fetch(url.toString());

				const text = await res.text();
				console.log("Raw server response:", text);

				try {
					const json: ProductResponse = JSON.parse(text);
					setData(json);
				} catch (parseErr) {
					setError("Неверный JSON-ответ от сервера");
					console.error("Ошибка JSON:", parseErr);
				}
			} catch (err: any) {
				setError(err.message || "Ошибка загрузки данных");
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, [categoryId, page, rows, search, sort, minPrice, maxPrice, platforms]);

	return {
		products: data?.products ?? [],
		totalPages: data?.totalPages ?? 0,
		loading,
		error,
	};
}
