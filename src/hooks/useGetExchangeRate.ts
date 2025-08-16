import { useEffect, useState } from "react";
import { ExchangeRate, ExchangeRespose } from "./types";

export function useGetExchangeRate() {
	const [data, setData] = useState<ExchangeRate[] | []>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchPlatforms = async () => {
			setLoading(true);
			const baseUrl = import.meta.env.VITE_API_URL;
			const url = `${baseUrl}/engine/functions/ajax/ajax_data.php?action=show_currency_arrow`;

			try {
				const res = await fetch(url.toString());

				const text = await res.text();

				try {
					const json: ExchangeRespose = JSON.parse(text);
					setData(json.data);
				} catch (parseErr) {
					console.error("Ошибка JSON:", parseErr);
				}
			} finally {
				setLoading(false);
			}
		};
		fetchPlatforms();
	}, []);

	return {
		rate: data,
		loading,
	};
}
