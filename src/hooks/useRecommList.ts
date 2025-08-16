import { useEffect, useState } from "react";
import { ProductData } from "./types";

export interface ProductResponseRecom {
	data: ProductData[];
}

export function useRecommList(
	page: number,
	rows: number,
	selectOptions: string = "default",
) {
	const [data, setData] = useState<ProductResponseRecom | null>(null);
	const [loading, setLoading] = useState(true);
	const [hasMore, setHasMore] = useState(true);

	useEffect(() => {
		const fetchProducts = async () => {
			setLoading(true);
			const baseUrl = import.meta.env.VITE_API_URL;
			const offset = (page - 1) * rows;
			const url = `${baseUrl}/engine/functions/ajax/ajax_data.php?action=show_product_recomm&limit=${rows}&offset=${offset}`;

			try {
				const res = await fetch(url);
				const text = await res.text();

				try {
					const json: ProductResponseRecom = JSON.parse(text);
					setData(json);
					setHasMore(json.data.length === rows);
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
		products: data?.data ?? [],
		loading,
		hasMore,
	};
}
