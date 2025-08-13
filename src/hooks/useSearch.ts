import { useEffect, useState } from "react";

export interface Type {
	id: number;
	name: string;
	url: string;
}

export interface Category {
	id: number;
	name: string;
	url: string;
	cnt: number;
	preview: string;
	parent_id: number;
	types: Type[];
}

export interface CategoriesResponse {
	categories: Category[];
}

export function useSearch(search: string = "") {
	const [data, setData] = useState<CategoriesResponse | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchSearch = async () => {
			setLoading(true);
			const baseUrl = import.meta.env.VITE_API_URL;
			const url = `${baseUrl}/engine/functions/ajax/search.php?search=${encodeURIComponent(
				search,
			)}`;

			try {
				const res = await fetch(url);
				const text = await res.text();

				try {
					const json = JSON.parse(text);
					const categories: Category[] = json.categories ?? [];

					setData({ categories });
				} catch (parseErr) {
					console.error("Ошибка JSON:", parseErr);
					setData(null);
				}
			} finally {
				setLoading(false);
			}
		};

		fetchSearch();
	}, [search]);

	return {
		categories: data?.categories ?? [],
		loading,
	};
}
