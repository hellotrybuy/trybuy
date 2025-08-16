import { useEffect, useState } from "react";
import { ProductsTypesRespose, ProductTypes } from "./types";

export function useGetProductTypes(category_id: string) {
	const [data, setData] = useState<ProductTypes[] | []>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (category_id != "all") {
			const fetchPlatforms = async () => {
				setLoading(true);
				const baseUrl = import.meta.env.VITE_API_URL;
				const url = `${baseUrl}/engine/functions/ajax/ajax_data.php?action=show_types_by_category&categoryId=${category_id}`;
				try {
					const res = await fetch(url.toString());

					const text = await res.text();

					try {
						const json: ProductsTypesRespose = JSON.parse(text);
						setData(json.data);
					} catch (parseErr) {
						console.error("Ошибка JSON:", parseErr);
					}
				} finally {
					setLoading(false);
				}
			};
			fetchPlatforms();
		} else {
			setData([]);
		}
	}, [category_id]);

	return {
		types: data,
		loading,
	};
}
