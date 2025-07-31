import { useCallback } from "react";

interface PaymentFormData {
	product_id: number; // ID продукта (id_d)
	id_po?: string; // ID предложения
	unit_cnt: number; // Количество единиц
	seller_id?: string; // ID продавца (agent)
	lang?: string; // Язык, по умолчанию "ru-RU"
	failpage?: string; // URL возврата при ошибке
	currency?: string; // Валюта
	payment_url?: string; // URL оплаты, по умолчанию "https://oplata.info/asp2/pay.asp"
}

interface UseDigiSellerPaymentResult {
	sendPaymentForm: (data: PaymentFormData) => void; // Функция для отправки формы
}

export function useDigiSellerPayment(): UseDigiSellerPaymentResult {
	const sendPaymentForm = useCallback((data: PaymentFormData) => {
		const form = document.createElement("form");
		form.method = "POST";
		form.action = data.payment_url || "https://oplata.info/asp2/pay.asp";

		const fields: Record<string, string> = {
			id_d: data.product_id.toString(),
			cart_uid: "",
			lang: data.lang || "ru-RU",
			agent: "1254027",
			unit_cnt: data.unit_cnt.toString(),
			havetoshowoptions: "1",
			_ow: "0",
			failpage: data.failpage || encodeURIComponent(window.location.href),
		};

		if (data.id_po != "") {
			fields.id_po = data.id_po;
		}

		if (data.currency) {
			fields.curr = data.currency;
		}

		for (const [key, value] of Object.entries(fields)) {
			const input = document.createElement("input");
			input.type = "hidden";
			input.name = key;
			input.value = value;
			form.appendChild(input);
		}

		document.body.appendChild(form);
		form.submit();
	}, []);

	return { sendPaymentForm };
}
