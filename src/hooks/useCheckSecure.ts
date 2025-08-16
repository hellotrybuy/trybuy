import { useState, useEffect } from "react";

interface UseCheckSecureResult {
	isStopSite: number | null;
	loading: boolean;
	error: Error | null;
}

interface ApiResponse {
	success: boolean;
	data: {
		is_stop_site: number;
	};
	message: string;
}

export function useCheckSecure(): UseCheckSecureResult {
	const [isStopSite, setIsStopSite] = useState<number | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);
	const baseUrl = import.meta.env.VITE_API_URL;

	useEffect(() => {
		setLoading(true);
		setError(null);

		async function fetchData() {
			try {
				const response = await fetch(
					`${baseUrl}/engine/functions/ajax/ajax_data.php?action=show_settings_min`,
				);
				if (!response.ok) {
					throw new Error(`Ошибка HTTP: ${response.status}`);
				}
				const data: ApiResponse = await response.json();
				setIsStopSite(data.data.is_stop_site);
			} catch (err) {
				setError(err as Error);
				setIsStopSite(null);
			} finally {
				setLoading(false);
			}
		}

		fetchData();
	}, [baseUrl]);

	return { isStopSite, loading, error };
}
