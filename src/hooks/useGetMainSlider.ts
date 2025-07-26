import { useEffect, useState } from "react";

export interface NestedBlock {
	link: string;
	image: string;
	title: string;
}

export interface BlockData {
	id: number;
	title: string;
	img: string;
	url: string;
	price: number;
	title_2: string;
	img_2: string | null;
	sort_order: number;
	nested_blocks: string;
}

export interface ApiResponse {
	success: boolean;
	data: BlockData[];
	message: string;
}

export function useGetMainSlider() {
	const [data, setData] = useState<BlockData[] | []>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchPlatforms = async () => {
			setLoading(true);
			const baseUrl = import.meta.env.VITE_API_URL;
			const url = `${baseUrl}/engine/functions/ajax/ajax_data?action=show_slider`;

			try {
				const res = await fetch(url.toString());

				const text = await res.text();

				try {
					const json: ApiResponse = JSON.parse(text);
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
		data: data,
		loading,
	};
}
