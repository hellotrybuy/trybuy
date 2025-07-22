import { useEffect, useState } from "react";
import { SearchResponse } from "./types";

export function useSearch(search: string = "") {
	const [data, setData] = useState<SearchResponse | null>(null);
	const [totalPages, setTotalPages] = useState(0);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchSearch = async () => {
			setLoading(true);
			const baseUrl = import.meta.env.VITE_API_URL;

			const url = `${baseUrl}/engine/functions/category/category_product_functions.php?ajax=1&search=${search}`;

			try {
				const res = await fetch(url.toString());

				const text = await res.text();

				try {
					const json: SearchResponse = JSON.parse(text);
					setData(json);
					setTotalPages(json.totalPages);
				} catch (parseErr) {
					console.error("Ошибка JSON:", parseErr);
				}
			} finally {
				setLoading(false);
			}
		};

		fetchSearch();
	}, [search]);

	return {
		products: data?.products ?? [],
		loading,
		totalPages: totalPages,
	};
}
