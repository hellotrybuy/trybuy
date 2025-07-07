import { useEffect, useState } from "react";

export interface MainScreenCategory {
	id: number;
	collections_name: string;
	collections_color_1: string;
	collections_color_2: string;
	collections_url: string;
	screenshots: string[];
	created_at: string;
	sort_order: number;
}

export function useMainScreenCategories() {
	const [categories, setCategories] = useState<MainScreenCategory[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchCategories = async () => {
			setLoading(true);
			setError(null);

			const baseUrl = import.meta.env.VITE_API_URL;
			const url = `${baseUrl}/engine/functions/ajax/ajax_data?action=show_collections`;

			try {
				const res = await fetch(url);
				const text = await res.text();

				const json = JSON.parse(text);

				if (!json.success || !Array.isArray(json.data)) {
					throw new Error("Некорректная структура данных");
				}

				const parsedCategories: MainScreenCategory[] = json.data
					.map((item: any) => ({
						...item,
						screenshots: JSON.parse(item.screenshots.replace(/\\/g, "")),
					}))
					.sort((a, b) => a.sort_order - b.sort_order);

				setCategories(parsedCategories);
			} catch (err: any) {
				console.error("Ошибка загрузки категорий:", err);
				setError(err.message || "Ошибка загрузки данных");
			} finally {
				setLoading(false);
			}
		};

		fetchCategories();
	}, []);

	return {
		categories,
		loading,
		error,
	};
}
