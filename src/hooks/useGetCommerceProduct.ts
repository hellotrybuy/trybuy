import { useState, useEffect } from "react";

export interface ProductDataCAT {
	is_hidden: boolean;
	id: number;
	product_id: number;
	category_id: number;
	platform_name: string;
	platform_url: string;
	icon: string;
	sort_order: number;
	type_name: string;
	type_url: string;
	name: string;
	price: number;
	price_usd: string;
	price_eur: string;
	platform: number;
	type: number;
	old_price: number;
	preview: string;
	url: string;
	discount_product: number;
	id_product: number;
	in_stock: number;
	cnt: number;
	recomm_product: number;
	is_new_product: number;
	good_reviews: string;
	bad_reviews: string;
	agency_percent: number;
	type_digi_product: string;
}

interface UseGetCategories {
	products: ProductDataCAT[] | [];
	loading: boolean;
	error: Error | null;
	totalPages: number;
}

export function useGetCommerceProduct(category_id: string): UseGetCategories {
	const [products, setProducts] = useState<ProductDataCAT[] | []>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);
	const [totalPages, setTotalPages] = useState<number>(0);

	const baseUrl = import.meta.env.VITE_API_URL;

	useEffect(() => {
		setLoading(true);
		setError(null);

		const fetchData = async () => {
			try {
				const response = await fetch(
					`${baseUrl}/engine/functions/ajax/ajax_data.php?action=get_commerce_product&categoryId=${category_id}`,
				);
				if (!response.ok) {
					throw new Error(`Ошибка HTTP: ${response.status}`);
				}
				const data = await response.json();
				setProducts(data.data);
				setTotalPages(data.totalPages);
			} catch (err) {
				setError(err as Error);
				setProducts(null);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [category_id, baseUrl]);

	return { products, loading, error, totalPages };
}
