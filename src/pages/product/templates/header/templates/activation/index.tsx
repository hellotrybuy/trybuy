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
import BalanceConvertor from "../../../../../../components/balanceConvertor";

const cnx = classNames.bind(styles);

interface Props {
	product: ProductData;
}

export default function ProductActivation({ product }: Props) {
	const options = useMemo(() => {
		return JSON.parse(product[0].options) as OptionItem[];
	}, [product]);

	const {
		setTotalPrice,
		setForm,
		setCnt,
		validateForm,
		invalidFields,
		formSubmitted,
	} = usePrice();
	const [expandedRadios, setExpandedRadios] = useState<Record<string, boolean>>(
		{},
	);

	const isType_digi_product = useMemo(() => {
		return product[0].type_digi_product == "unit";
	}, [product]);

	const toggleExpand = (optionName: string) => {
		setExpandedRadios((prev) => ({
			...prev,
			[optionName]: !prev[optionName],
		}));
	};

	const [formState, setFormState] = useState<
		Record<string, string | boolean | Record<string, boolean>>
	>({});

	useEffect(() => {
		setForm((prev) => ({ ...prev, ...formState }));
	}, [formState, setForm]);

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

			if (
				found?.currency_code == "USD" &&
				product[0].price &&
				product[0].price_usd
			) {
				const priceDef = product[0].price;
				const priceDefUsdt = parseFloat(product[0].price_usd);

				return priceDef / priceDefUsdt;
			}

			return found ? parseFloat(found.rate) : 1;
		},
		[rates, product],
	);

	const applyModifier = useCallback(
		(
			currentPrice: number,
			type: string,
			value: number,
			modify: string,
		): number => {
			const currencyRate = detectCurrencyRate(modify);

			if (!type || type === "") {
				return currentPrice;
			}

			if (type === "%") {
				return currentPrice + (currentPrice * value) / 100;
			}

			return currentPrice + value * currencyRate;
		},
		[detectCurrencyRate],
	);

	useEffect(() => {
		if (formSubmitted) {
			validateForm(options);
		}
	}, [formState, formSubmitted]);

	useEffect(() => {
		if (!isType_digi_product) {
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
						} else if (
							typeof value === "object" &&
							Array.isArray(opt.variants)
						) {
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
		}
	}, [
		formState,
		options,
		basePrice,
		setTotalPrice,
		applyModifier,
		isType_digi_product,
	]);

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
					// Приводим значение по умолчанию к строке или ставим пустую строку
					initialState[opt.name] = defaultVariant?.value?.toString() ?? "";
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

	useEffect(() => {
		if (!isType_digi_product) {
			setCnt(1);
		}
	}, [isType_digi_product, setCnt]);

	const showInvalidGlobal = useMemo(() => {
		return formSubmitted && Object.values(invalidFields).some(Boolean);
	}, [formSubmitted, invalidFields]);

	const [showWarning, setShowWarning] = useState(showInvalidGlobal);

	useEffect(() => {
		setShowWarning(showInvalidGlobal);
	}, [showInvalidGlobal]);

	if (options) {
		return (
			<div className={cnx("activation")}>
				{showWarning && (
					<div className={cnx("warning")}>
						<p> Пожалуйста проверьте, что заполнены все необходимые поля</p>
						<img
							src="/iconsFolder/common/close.svg"
							alt="Закрыть"
							onClick={() => setShowWarning(false)}
						/>
					</div>
				)}
				<div className={cnx("activation__inner")}>
					{isType_digi_product && product[0].prices_unit != "" && (
						<div className={cnx("rev")}>
							<BalanceConvertor prices_unit={product[0].prices_unit} />
						</div>
					)}
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
									isInvalid={invalidFields[el.name]}
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
									isInvalid={invalidFields[el.name]}
								/>
							);
						return null;
					})}
				</div>
			</div>
		);
	} else return <></>;
}
