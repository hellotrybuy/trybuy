import { useState, useEffect } from "react";

export interface PageData {
	id: number;
	rules: string;
	support: string;
	oferta: string;
	oferta_1: string;
	license: string;
}

interface UseGetPages {
	pages: PageData[] | null;
	loading: boolean;
	error: Error | null;
}

export function useGetPages(): UseGetPages {
	const [pages, setPages] = useState<PageData[] | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);

	const baseUrl = import.meta.env.VITE_API_URL;

	useEffect(() => {
		setLoading(true);
		setError(null);

		const fetchData = async () => {
			try {
				const response = await fetch(
					`${baseUrl}/engine/functions/ajax/ajax_data.php?action=show_pages`,
				);
				if (!response.ok) {
					throw new Error(`Ошибка HTTP: ${response.status}`);
				}
				const data = await response.json();

				if (data.success && Array.isArray(data.data)) {
					setPages(data.data);
				} else {
					throw new Error("Ошибка данных: неверный формат ответа");
				}
			} catch (err) {
				setError(err as Error);
				setPages(null);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [baseUrl]);

	return { pages, loading, error };
}
