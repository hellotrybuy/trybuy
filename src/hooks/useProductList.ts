import { useEffect, useState } from "react";
import { ProductResponseLedaders } from "./types";

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

export function useProductList(
	page: number,
	rows: number,
	selectOptions: string = "default",
) {
	const [data, setData] = useState<ProductResponseLedaders | null>(null);
	const [totalPages, setTotalPages] = useState(0);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProducts = async () => {
			setLoading(true);
			const baseUrl = import.meta.env.VITE_API_URL;

			const url = `${baseUrl}/engine/functions/ajax/ajax_data?action=show_product_popular&page=${page}&limit=${rows.toString()}`;

			try {
				const res = await fetch(url.toString());

				const text = await res.text();

				try {
					const json: ProductResponseLedaders = JSON.parse(text);
					setData(json);
					setTotalPages(json.data.totalPage);
				} catch (parseErr) {
					console.error("Ошибка JSON:", parseErr);
				}
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, [page, rows, selectOptions]);

	return {
		products: data?.data ?? { rows: [], totalPage: 0 },
		loading,
		totalPages: totalPages,
	};
}
