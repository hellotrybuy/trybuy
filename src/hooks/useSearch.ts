import { useEffect, useState } from "react";

export interface Category {
	id: number;
	name: string;
	url: string;
	cnt: number;
	preview: string;
	parent_id: number;
}

export interface Type {
	id: number;
	name: string;
	url: string;
}

export interface CategoriesAndTypes {
	categories: Category[];
	types: Type[];
}

export function useSearch(search: string = "") {
	const [data, setData] = useState<CategoriesAndTypes | null>(null);
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
					const json: CategoriesAndTypes = JSON.parse(text);
					setData(json);
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
		types: data?.types ?? [],
		loading,
	};
}
