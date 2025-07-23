import styles from "./index.module.scss";
import classNames from "classnames/bind";

import {
	ExchangeRate,
	OptionItem,
	ProductData,
} from "../../../../../../hooks/types";
import { useCallback, useEffect, useMemo, useState } from "react";

import RadioOptionGroup from "./blocks/RadioOptionGroup";
import TextOptionField from "./blocks/TextOptionField";
import CheckboxOptionGroup from "./blocks/CheckboxOptionGroup";
import { usePrice } from "../../../../context";
import { useGetExchangeRate } from "../../../../../../hooks/useGetExchangeRate";

const cnx = classNames.bind(styles);

interface Props {
	product: ProductData;
}

export default function ProductActivation({ product }: Props) {
	const options = useMemo(() => {
		return JSON.parse(product[0].options) as OptionItem[];
	}, [product]);

	const { setTotalPrice } = usePrice();
	const [expandedRadios, setExpandedRadios] = useState<Record<string, boolean>>(
		{},
	);

	const toggleExpand = (optionName: string) => {
		setExpandedRadios((prev) => ({
			...prev,
			[optionName]: !prev[optionName],
		}));
	};

	const [formState, setFormState] = useState<
		Record<string, string | boolean | Record<string, boolean>>
	>({});

	const basePrice = useMemo(() => {
		return parseFloat(product[0].price);
	}, [product]);

	const { rate: rates } = useGetExchangeRate();

	const detectCurrencyRate = useCallback(
		(text: string): number => {
			const upper = text.toUpperCase();

			let currency: "USD" | "EUR" | "RUB" = "RUB";

			if (upper.includes("USD")) {
				currency = "USD";
			} else if (upper.includes("EUR")) {
				currency = "EUR";
			}

			const found = rates.find(
				(item: ExchangeRate) => item.currency_code.toUpperCase() === currency,
			);

			return found ? parseFloat(found.rate) : 1;
		},
		[rates],
	);

	const applyModifier = useCallback(
		(
			currentPrice: number,
			type: string,
			value: number,
			modify: string,
		): number => {
			const modifySize = detectCurrencyRate(modify);

			const price = value * modifySize + currentPrice;

			if (!type || type === "") return price;

			if (type === "%") {
				return price + (price * value) / 100;
			}

			return price + value;
		},
		[detectCurrencyRate],
	);

	useEffect(() => {
		let result = basePrice;

		if (options) {
			options.forEach((opt) => {
				const value = formState[opt.name];

				if (opt.type === "radio" && Array.isArray(opt.variants)) {
					const selected = opt.variants?.find(
						(v) => String(v.value) === String(value),
					);
					if (selected && selected.modify_value && selected.modify_type) {
						result = applyModifier(
							result,
							selected.modify_type,
							selected.modify_value,
							selected.modify,
						);
					}
				}

				if (opt.type === "checkbox") {
					if (typeof value === "boolean") {
						if (value && opt.modify_value && opt.modify_type) {
							result = applyModifier(
								result,
								opt.modify_type,
								Number(opt.modify_value),
								opt.modify,
							);
						}
					} else if (typeof value === "object" && Array.isArray(opt.variants)) {
						const group = value as Record<string, boolean>;
						opt.variants?.forEach((variant) => {
							if (group[variant.value]) {
								if (variant.modify_value && variant.modify_type) {
									result = applyModifier(
										result,
										variant.modify_type,
										variant.modify_value,
										variant.modify,
									);
								}
							}
						});
					}
				}
			});
		}

		setTotalPrice(Math.round(result));
	}, [formState, options, basePrice, setTotalPrice, applyModifier]);

	useEffect(() => {
		const initialState: Record<string, any> = {};

		if (options) {
			options.forEach((opt) => {
				if (opt.type === "text") {
					initialState[opt.name] = "";
				}
				if (opt.type === "radio" && Array.isArray(opt.variants)) {
					const defaultVariant = opt.variants.find(
						(variant) => Number(variant.default) === 1,
					);
					initialState[opt.name] = defaultVariant?.value ?? "";
				}
				if (opt.type === "checkbox") {
					if (Array.isArray(opt.variants) && opt.variants.length > 0) {
						initialState[opt.name] = opt.variants.reduce((acc, variant) => {
							acc[variant.value] = false;
							return acc;
						}, {} as Record<string, boolean>);
					} else {
						initialState[opt.name] = false;
					}
				}
			});
		}

		setFormState(initialState);
	}, [options]);

	const handleCheckboxChange = (optionName: string, variantValue?: string) => {
		setFormState((prev) => {
			const current = prev[optionName];

			if (typeof current === "boolean") {
				return {
					...prev,
					[optionName]: !current,
				};
			}

			const currentGroup =
				typeof current === "object" && current !== null ? current : {};

			return {
				...prev,
				[optionName]: {
					...currentGroup,
					[variantValue!]: !currentGroup[variantValue!],
				},
			};
		});
	};

	const handleRadioChange = (name: string, value: string) => {
		setFormState((prev) => ({ ...prev, [name]: value }));
	};

	if (options) {
		return (
			<div className={cnx("activation")}>
				<div className={cnx("activation__inner")}>
					{options.map((el) => {
						if (el.type === "radio")
							return (
								<RadioOptionGroup
									key={el.name}
									option={el}
									isExpanded={!!expandedRadios[el.name]}
									toggleExpand={toggleExpand}
									formValue={formState[el.name] as string}
									onChange={handleRadioChange}
								/>
							);
						if (el.type === "text")
							return (
								<TextOptionField
									key={el.name}
									option={el}
									value={formState[el.name] as string}
									onChange={(name, value) =>
										setFormState((prev) => ({ ...prev, [name]: value }))
									}
								/>
							);
						if (el.type === "checkbox")
							return (
								<CheckboxOptionGroup
									key={el.name}
									option={el}
									values={formState[el.name]}
									onChange={handleCheckboxChange}
								/>
							);
						return null;
					})}
				</div>
			</div>
		);
	} else return <></>;
}
