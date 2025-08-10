import { useMemo } from "react";
import Button from "../../../../components/button";
import {
	PurchaseOptionsRequest,
	usePurchaseOptions,
} from "../../../../hooks/usePurchaseOptions";
import { usePrice } from "../../context";
import styles from "./index.module.scss";
import classNames from "classnames/bind";
import { ProductData } from "../../../../hooks/types";
import { useDigiSellerPayment } from "../../../../hooks/useDigiSellerPaymentResult";

const cnx = classNames.bind(styles);

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

function transformOptions(
	input: Record<string, any>,
): Record<number, number | string | number[]> {
	const result: Record<number, number | string | number[]> = {};

	for (const key in input) {
		let match = key.match(/option(?:_text|_radio|_checkbox)?_(\d+)$/);
		if (!match) continue;

		const fieldId = Number(match[1]);
		const value = input[key];

		if (key.startsWith("option_text_") && typeof value === "string") {
			result[fieldId] = value;
		} else if (
			(key.startsWith("option_radio_") || key.startsWith("option_")) &&
			(typeof value === "string" || typeof value === "number")
		) {
			const num = Number(value);
			if (!isNaN(num)) {
				result[fieldId] = num;
			}
		} else if (
			key.startsWith("option_checkbox_") &&
			typeof value === "object" &&
			value !== null
		) {
			const selectedValues = Object.entries(value)
				.filter(([, v]) => v === true)
				.map(([k]) => Number(k));

			if (selectedValues.length > 0) {
				result[fieldId] = selectedValues;
			}
		}
	}

	return result;
}

function prepareOptionsForApi(
	transformed: Record<number, number | string | number[]>,
): Option[] {
	const result: Option[] = [];

	for (const [optionIdStr, val] of Object.entries(transformed)) {
		const optionId = optionIdStr;

		if (Array.isArray(val)) {
			val.forEach((v) => {
				result.push({
					id: optionId,
					value: { id: v.toString() },
				});
			});
		} else if (typeof val === "number") {
			result.push({
				id: optionId,
				value: { id: val.toString() },
			});
		} else if (typeof val === "string") {
			result.push({
				id: optionId,
				value: { text: val },
			});
		}
	}

	return result;
}

interface Props {
	product: ProductData;
}

export function ProductPay({ product }: Props) {
	const { totalPrice, form, cnt, validateForm, setFormSubmitted } = usePrice();

	const newFormData = useMemo(() => {
		return prepareOptionsForApi(transformOptions(form));
	}, [form]);

	const { sendRequest, data: code } = usePurchaseOptions();
	const { sendPaymentForm } = useDigiSellerPayment();

	const dataFromAPI = useMemo(() => {
		return {
			options: newFormData,
			product_id: product[0].id_product,
			unit_cnt: cnt,
		} as PurchaseOptionsRequest;
	}, [newFormData, product, cnt]);

	if (code) {
		sendPaymentForm({
			product_id: product[0].id_product,
			id_po: code.id_po ? code.id_po.toString() : "0",
			unit_cnt: cnt,
			seller_id: product[0].seller_id,
		});
	}

	return (
		<div className={cnx("pay")}>
			<div className={cnx("pay__price")}>
				<b>{totalPrice} ₽</b>
			</div>
			<a href="#">У меня есть промокод</a>
			<Button
				className={cnx("pay__btn")}
				size="large"
				onClick={() => {
					setFormSubmitted(true);

					if (
						!validateForm(
							product[0]?.options ? JSON.parse(product[0].options) : [],
							true,
						)
					) {
						console.log("Форма не заполнена");
						return;
					}
					sendRequest(dataFromAPI);
				}}
			>
				Купить
			</Button>
		</div>
	);
}
export default ProductPay;
