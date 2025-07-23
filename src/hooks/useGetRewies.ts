import { useState, useEffect } from "react";
import { RewiesData, RewiesResponse } from "./types";

interface UseGetRewiesResult {
	rewies: RewiesData[] | null;
	loading: boolean;
	error: Error | null;
}

interface UseGetRewiesParams {
	id: string;
	page?: number;
	row?: number;
	type?: string;
}

export function useGetRewies({
	id,
	page = 1,
	row = 5,
	type = "",
}: UseGetRewiesParams): UseGetRewiesResult {
	const [rewies, setRewies] = useState<RewiesData[] | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);
	const baseUrl = import.meta.env.VITE_API_URL;

	useEffect(() => {
		if (!id) return;
		const offset = (page - 1) * row;
		setLoading(true);
		setError(null);
		const fetchData = async () => {
			try {
				const response = await fetch(
					`${baseUrl}/engine/functions/ajax/ajax_data?action=show_reviews_product&product_id=${id}&offset=${offset}&limit=${row}&type=${type}`,
				);
				if (!response.ok) {
					throw new Error(`Ошибка HTTP: ${response.status}`);
				}
				const data: RewiesResponse = await response.json();
				setRewies(data.data);
			} catch (err) {
				setError(err as Error);
				setRewies(null);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [id, baseUrl, page, row, type]);

	return { rewies, loading, error };
}
