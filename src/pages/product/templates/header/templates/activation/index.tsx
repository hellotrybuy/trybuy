import styles from "./index.module.scss";
import classNames from "classnames/bind";

import { ProductData } from "../../../../../../hooks/types";
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
	const options = product.options;
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
		Record<string, string | Record<string, boolean>>
	>({});

	const basePrice = useMemo(() => {
		return parseFloat(product.price.replace(",", "."));
	}, [product.price]);

	function applyModifier(
		currentPrice: number,
		type: string,
		value: number,
	): number {
		if (!type || type === "") return currentPrice;

		if (type === "%") {
			return currentPrice + (currentPrice * value) / 100;
		}

		// Любой другой тип, например "RUB", "USD", и т.п.
		return currentPrice + value;
	}

	useEffect(() => {
		let result = basePrice;

		options.forEach((opt) => {
			const value = formState[opt.name];

			if (opt.type === "radio") {
				const selected = opt.variants?.find((v) => v.value === value);
				if (selected && selected.modify_value && selected.modify_type) {
					result = applyModifier(
						result,
						selected.modify_type,
						selected.modify_value,
					);
				}
			}

			if (opt.type === "checkbox") {
				const group = value as Record<string, boolean>;
				if (group) {
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
		setTotalPrice(Math.round(result));
	}, [formState, options, basePrice, setTotalPrice]);

	useEffect(() => {
		const initialState: Record<string, any> = {};

		options.forEach((opt) => {
			if (opt.type === "text") {
				initialState[opt.name] = "";
			}
			if (opt.type === "radio" && Array.isArray(opt.variants)) {
				const defaultVariant = opt.variants.find(
					(variant) => variant.default === "1",
				);
				initialState[opt.name] = defaultVariant?.value || "";
			}
			if (opt.type === "checkbox" && Array.isArray(opt.variants)) {
				initialState[opt.name] = opt.variants.reduce((acc, variant) => {
					acc[variant.value] = false;
					return acc;
				}, {} as Record<string, boolean>);
			}
		});

		setFormState(initialState);
	}, [options]);

	const handleCheckboxChange = (optionName: string, variantValue: string) => {
		setFormState((prev) => {
			const current = prev[optionName];
			const currentGroup =
				typeof current === "object" && current !== null ? current : {};

			return {
				...prev,
				[optionName]: {
					...currentGroup,
					[variantValue]: !currentGroup[variantValue],
				},
			};
		});
	};

	const handleRadioChange = (name: string, value: string) => {
		setFormState((prev) => ({ ...prev, [name]: value }));
	};

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
								values={formState[el.name] as Record<string, boolean>}
								onChange={handleCheckboxChange}
							/>
						);
					return null;
				})}
			</div>
		</div>
	);
}
