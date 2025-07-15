import { useEffect, useState } from "react";
import { CatrgorySecondPlace, CatrgorySecondPlaceRespose } from "./types";

export function useGetCategoriesSecondPlace(category_id: string) {
	const [data, setData] = useState<CatrgorySecondPlace[] | []>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (category_id != "all") {
			const fetchPlatforms = async () => {
				setLoading(true);
				const baseUrl = import.meta.env.VITE_API_URL;
				const url = `${baseUrl}/engine/functions/ajax/ajax_data.php?action=show_parent_id_categories&category_id=${category_id}&not_null=1`;

				try {
					const res = await fetch(url.toString());

					const text = await res.text();

					try {
						const json: CatrgorySecondPlaceRespose = JSON.parse(text);
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
		platforms: data,
		loading,
	};
}
