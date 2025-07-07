import { useEffect, useState } from "react";
import { ProductData } from "./types";

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

interface ProductResponse {
	data: ProductData[];
	totalPages: number;
}

export function useProductList(page: number, rows: number) {
	console.log(page, "page");
	const [data, setData] = useState<ProductResponse | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchProducts = async () => {
			setLoading(true);
			setError(null);
			const baseUrl = import.meta.env.VITE_API_URL;

			const offset = (page - 1) * rows;

			const url = `${baseUrl}/engine/functions/ajax/ajax_data?action=show_product_popular&limit=
			${rows.toString()}&offset=${offset.toString()}`;

			try {
				const res = await fetch(url.toString());

				const text = await res.text();

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
	}, [page, rows]);

	console.log(data, "data");

	return {
		products: data?.data ?? [],
		loading,
	};
}
