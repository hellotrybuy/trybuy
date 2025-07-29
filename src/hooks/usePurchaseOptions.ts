import { useState, useCallback } from "react";

interface OptionValueId {
	id: string;
}

interface OptionValueText {
	text: string;
}

export interface Option {
	id: string;
	value: OptionValueId | OptionValueText;
}

export interface PurchaseOptionsRequest {
	product_id: string;
	options: Option[];
	unit_cnt: number;
	lang?: string;
	ip?: string;
}

interface PurchaseOptionsResponse {
	retval: number;
	retdesc: string;
	id_po: number;
}

interface UsePurchaseOptionsResult {
	data: PurchaseOptionsResponse | null;
	error: string | null;
	loading: boolean;
	sendRequest: (requestData: PurchaseOptionsRequest) => Promise<void>;
}

export function usePurchaseOptions(): UsePurchaseOptionsResult {
	const [data, setData] = useState<PurchaseOptionsResponse | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const baseUrl = import.meta.env.VITE_API_URL;

	const sendRequest = useCallback(
		async (requestData: PurchaseOptionsRequest) => {
			setLoading(true);
			setError(null);
			setData(null);

			try {
				const response = await fetch(
					`${baseUrl}/engine/functions/other/get_id_po.php`,
					{
						method: "POST",
						headers: {
							Accept: "application/json",
							"Content-Type": "application/json",
						},
						body: JSON.stringify(requestData),
					},
				);

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const json: PurchaseOptionsResponse = await response.json();
				setData(json);
			} catch (e: any) {
				setError(e.message || "Unknown error");
			} finally {
				setLoading(false);
			}
		},
		[],
	);

	return { data, error, loading, sendRequest };
}
