import styles from "./index.module.scss";
import classNames from "classnames/bind";

import { ProductData } from "../../../../../../hooks/types";
import { useEffect, useState } from "react";

import RadioOptionGroup from "./blocks/RadioOptionGroup";
import TextOptionField from "./blocks/TextOptionField";
import CheckboxOptionGroup from "./blocks/CheckboxOptionGroup";

const cnx = classNames.bind(styles);

interface Props {
	product: ProductData;
}

export default function ProductActivation({ product }: Props) {
	const options = product.options;
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

	console.log(formState, "formState");
	console.log(product, "options");

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
