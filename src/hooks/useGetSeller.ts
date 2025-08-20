import { useEffect, useState } from "react";

export type Seller = {
	id: number;
	seller_id: number;
	seller_name: string;
	rating: string;
	reviews_count: number;
	sales_count: number;
	products_count: number;
	active_since: string;
	wmid: string;
	created_at: string;
	updated_at: string;
};

export type SellerResponse = {
	success: boolean;
	data: Seller;
	message: string;
};

export function useGetSeller(category_id: string) {
	const [data, setData] = useState<Seller | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (category_id !== "all") {
			const fetchSeller = async () => {
				setLoading(true);
				const baseUrl = import.meta.env.VITE_API_URL;
				const url = `${baseUrl}/engine/functions/ajax/ajax_data.php?action=show_seller_id&sellerId=${category_id}`;
				try {
					const res = await fetch(url);
					const text = await res.text();
					try {
						const json: SellerResponse = JSON.parse(text);
						if (json.success && json.data) {
							setData(json.data);
						} else {
							setData(null);
						}
					} catch (parseErr) {
						console.error("Ошибка JSON:", parseErr);
						setData(null);
					}
				} finally {
					setLoading(false);
				}
			};
			fetchSeller();
		} else {
			setData(null);
		}
	}, [category_id]);

	return {
		seller: data,
		loading,
	};
}
