import { useEffect, useState } from "react";

export function useCurrency(base = "usd", target = "eur") {
	const [rate, setRate] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${base}.json`;

		fetch(url)
			.then((res) => res.json())
			.then((data) => {
				if (data[base] && data[base][target]) {
					setRate(data[base][target]);
				} else {
					setError("Currency not found");
				}
				setLoading(false);
			})
			.catch((err) => {
				setError(err.toString());
				setLoading(false);
			});
	}, [base, target]);

	return { rate, loading, error };
}
