import { useEffect, useState } from "react";
import { ProductResponse } from "./types";

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
	console.log(page, "page");
	const [data, setData] = useState<ProductResponse | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProducts = async () => {
			setLoading(true);
			const baseUrl = import.meta.env.VITE_API_URL;

			const offset = (page - 1) * rows;

			const url = `${baseUrl}/engine/functions/ajax/ajax_data?action=show_product_popular&limit=
			${rows.toString()}&offset=${offset.toString()}&sort=${selectOptions}`;

			try {
				const res = await fetch(url.toString());

				const text = await res.text();

				try {
					const json: ProductResponse = JSON.parse(text);
					setData(json);
				} catch (parseErr) {
					console.error("Ошибка JSON:", parseErr);
				}
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, [page, rows, selectOptions]);

	console.log(data, "data");

	return {
		products: data?.data ?? [],
		loading,
	};
}
