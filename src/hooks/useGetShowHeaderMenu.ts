import { useEffect, useState } from "react";

export interface HeaderItem {
	id: number;
	header_menu: string;
	header_url: string;
	header_icon: string;
	sort_order: number;
}

export interface HeaderMenuResponse {
	success: boolean;
	data: HeaderItem[];
	message: string;
}

export function useGetShowHeaderMenu() {
	const [data, setData] = useState<HeaderMenuResponse[] | []>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchPlatforms = async () => {
			setLoading(true);
			const baseUrl = import.meta.env.VITE_API_URL;
			const url = `${baseUrl}/engine/functions/ajax/ajax_data.php?action=show_header_menu`;

			try {
				const res = await fetch(url.toString());

				const text = await res.text();

				try {
					const json: HeaderMenuResponse = JSON.parse(text);
					setData([json]);
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
		data: data,
		loading,
	};
}
