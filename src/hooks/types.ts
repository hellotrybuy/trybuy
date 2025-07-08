export interface ProductData {
	id: string;
	id_prev: string;
	seller_name: string;
	id_product: string;
	id_next: string;
	name: string;
	price: string;
	currency: string;
	is_available: number;
	collection: string;
	category_id: string;
	add_info: string;
	info: string;
	propertygood: string;
	type_good: number;
	no_cart: string;
	num_in_lock: string;
	good_reviews: string;
	bad_reviews: string;
	sales: string;
	num_in_stock: string | null;
	label: string;
	sale_info: {
		common_base_price: string | null;
		common_price_usd: string | null;
		common_price_rur: string | null;
		common_price_eur: string | null;
		common_price_uah: string | null;
		percent: string | null;
		sale_end: string | null;
		sale_percent: string | null;
	};
	preview_imgs: Array<{
		id: string;
		url: string;
		width: string;
		height: string;
	}>;
	seller: {
		id: string;
		name: string;
	};
	options: string;
	payment_methods: {
		[key: string]: Array<[string, string]>;
	};
	currencies: string[];
	gift_commiss: string;
	agency_fee: string;
	agency_id: string;
	agency_sum: string;
	text: {
		date: string;
		size: string;
	};
	type: string;
	url: string;

	// другие поля можно добавить, если они встретятся
}

export interface ApiResponse {
	retval: number;
	retdesc: string;
	queryId: string;
	data: ProductData;
}

export interface OptionItem {
	name: string;
	label: string;
	type: string;
	variants?: Array<OptionItemVariantItem>;
	comment: string;
	modify_value: string;
	modify_type: string;
}

export interface OptionItemVariantItem {
	default: string;
	modify: string;
	modify_type: string;
	modify_value?: number;
	text: string;
	value: string;
}

export interface GreatCatergory {
	id: number;
	name: string;
	url: string;
	icon_dark: string;
	icon_light: string;
	cnt_product: string;
}

export interface ApiResponseGreatCatergory {
	retval: number;
	retdesc: string;
	queryId: string;
	data: GreatCatergory[];
}

export interface ProductResponse {
	data: ProductData[];
	totalPages: number;
}
