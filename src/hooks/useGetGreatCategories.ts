import { useState, useEffect } from "react";
import { ApiResponseGreatCatergory, GreatCatergory } from "./types";

interface UseGetCategories {
	categorys: GreatCatergory[] | [];
	loading: boolean;
	error: Error | null;
}

export function useGetGreatCategories(): UseGetCategories {
	const [categorys, setCategorys] = useState<GreatCatergory[] | []>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);
	const baseUrl = import.meta.env.VITE_API_URL;

	useEffect(() => {
		setLoading(true);
		setError(null);
		const fetchData = async () => {
			try {
				const response = await fetch(
					`${baseUrl}/engine/functions/ajax/ajax_data.php?action=show_null_categories`,
				);
				if (!response.ok) {
					throw new Error(`Ошибка HTTP: ${response.status}`);
				}
				const data: ApiResponseGreatCatergory = await response.json();
				setCategorys(data.data);
			} catch (err) {
				setError(err as Error);
				setCategorys(null);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [baseUrl]);

	return { categorys, loading, error };
}
