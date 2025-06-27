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

	useEffect(() => {
		if (!id) return;

		setLoading(true);
		setError(null);

		const fetchData = async () => {
			try {
				const response = await fetch(
					`https://api.digiseller.com/api/products/info?transp=cors&format=json&lang=ru-RU&product_id=${id}&currency=RUB&form=calc1`,
				);
				if (!response.ok) {
					throw new Error(`Ошибка HTTP: ${response.status}`);
				}
				const data: ApiResponse = await response.json();
				setProduct(data.product);
			} catch (err) {
				setError(err as Error);
				setProduct(null);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [id]);

	return { product, loading, error };
}
