import { useEffect, useState } from "react";

export interface SiteSettings {
	id: number;
	name: string;
	description: string;
	about_us: string;
	desc_seo: string;
	title_seo: string;
	keywords_seo: string;
	logo: string;
	logo_dark: string;
	logo_admin: string;
	logo_mobile: string;
	favicon: string;
	only_instock: number;
	banner: string;
	id_seller: number;
	not_null_category: number;
	cache: number;
	is_visible_img_product: number;
	is_visible_name_product: number;
	is_visible_desc_product: number;
	is_index_hidden_products: number;
	seo_card_settings: number;
	show_hidden_products_admin: number;
	banner_url: string;
	banner_2: string;
	banner_text: string;
	is_manual_preview: number;
	vk_url: string;
	tg_url: string;
	yt_url: string;
	ds_url: string;
	footer_about: string;
	metrika: string;
	google_metrika: string;
	yandex_metrika: number;
	hide_reviews: number;
	hide_reviews_main: number;
	type_reviews: string;
	hide_lastsales: number;
	vk_reviews_code: string;
	currency: string | null;
	hide_discounts: number;
	type_digi_reviews: string;
	google_recaptcha: string;
	google_recaptcha_v3: string | null;
	type_mess: string;
	vk_mess_id: number;
	jivo_mess_id: string;
	is_stop_site: number;
}

export interface SiteSettingsResponse {
	success: boolean;
	data: SiteSettings;
	message: string;
}

export function useGetSiteSettingsMin() {
	const [data, setData] = useState<SiteSettings | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchSettings = async () => {
			setLoading(true);
			const baseUrl = import.meta.env.VITE_API_URL;
			const url = `${baseUrl}/engine/functions/ajax/ajax_data?action=show_settings_min`;

			try {
				const res = await fetch(url.toString());
				const text = await res.text();

				try {
					const json: SiteSettingsResponse = JSON.parse(text);
					if (json.success) {
						setData(json.data);
					} else {
						console.error("Ошибка API:", json.message);
					}
				} catch (parseErr) {
					console.error("Ошибка JSON:", parseErr);
				}
			} finally {
				setLoading(false);
			}
		};

		fetchSettings();
	}, []);

	return {
		data,
		loading,
	};
}
