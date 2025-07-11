import styles from "./index.module.scss";
import classNames from "classnames/bind";

import { OptionItem, ProductData } from "../../../../../../hooks/types";
import { useEffect, useMemo, useState } from "react";

import RadioOptionGroup from "./blocks/RadioOptionGroup";
import TextOptionField from "./blocks/TextOptionField";
import CheckboxOptionGroup from "./blocks/CheckboxOptionGroup";
import { usePrice } from "../../../../context";

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

	function applyModifier(
		currentPrice: number,
		type: string,
		value: number,
	): number {
		if (!type || type === "") return currentPrice;

		if (type === "%") {
			return currentPrice + (currentPrice * value) / 100;
		}

		return currentPrice + value;
	}

	useEffect(() => {
		let result = basePrice;

		if (options) {
			options.forEach((opt) => {
				const value = formState[opt.name];

				if (opt.type === "radio" && Array.isArray(opt.variants)) {
					const selected = opt.variants?.find(
						(v) => String(v.value) === String(value),
					);
					console.log(selected, "selected");
					if (selected && selected.modify_value && selected.modify_type) {
						result = applyModifier(
							result,
							selected.modify_type,
							selected.modify_value,
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
									);
								}
							}
						});
					}
				}
			});
		}

		setTotalPrice(Math.round(result));
	}, [formState, options, basePrice, setTotalPrice]);

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
		console.log(value, "value");
		setFormState((prev) => ({ ...prev, [name]: value }));
	};

	return (
		<div className={cnx("activation")}>
			<div className={cnx("activation__inner")}>
				{options &&
					options.map((el) => {
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
}
