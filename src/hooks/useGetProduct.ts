import { useState, useEffect } from "react";
import { ApiResponse, ProductData } from "./types";

interface UseGetProductResult {
	product: ProductData | null;
	loading: boolean;
	error: Error | null;
}

export function useGetProduct(id: string): UseGetProductResult {
	const [product, setProduct] = useState<ProductData | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);
	const baseUrl = import.meta.env.VITE_API_URL;

	useEffect(() => {
		if (!id) return;

		setLoading(true);
		setError(null);
		const fetchData = async () => {
			try {
				const response = await fetch(
					`${baseUrl}/engine/functions/ajax/ajax_data.php?action=show_product_by_id&id_product=${id}&currency=RUB&form=calc1`,
				);
				if (!response.ok) {
					throw new Error(`Ошибка HTTP: ${response.status}`);
				}
				const data: ApiResponse = await response.json();
				setProduct(data.data);
			} catch (err) {
				setError(err as Error);
				setProduct(null);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [id, baseUrl]);

	return { product, loading, error };
}
