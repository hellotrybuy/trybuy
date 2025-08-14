import Checkbox from "../../../../../../../../components/filters/checkbox";
import {
	OptionItem,
	OptionItemVariantItem,
	ProductData,
} from "../../../../../../../../hooks/types";
import { usePrice } from "../../../../../../context";
import styles from "../../index.module.scss";
import classNames from "classnames/bind";

const cnx = classNames.bind(styles);

interface Props {
	option: OptionItem;
	values: string | boolean | Record<string, boolean>;
	onChange: (optionName: string, variantValue: string) => void;
	isInvalid: boolean;
	product: ProductData;
}

export default function CheckboxOptionGroup({
	option,
	values,
	onChange,
	isInvalid,
	product,
}: Props) {
	const { formSubmitted } = usePrice();

	if (!values) return null;

	const showInvalid = (formSubmitted || isInvalid) && isInvalid;

	const cntSumm = (elem: OptionItemVariantItem) => {
		if (elem) {
			if (elem.modify_type == "USD" && elem.modify) {
				const curs = Number(product[0].price) / Number(product[0].price_usd);

				const res = Math.ceil(Number(elem.modify_value) * curs);

				if (res > 0) {
					return `(+${Math.ceil(Number(elem.modify_value) * curs)} руб.)`;
				} else {
					return `(${Math.ceil(Number(elem.modify_value) * curs)} руб.)`;
				}
			}

			if (elem.modify) {
				if (elem.modify_value > 0) {
					return `(+${elem.modify_value} руб.)`;
				} else {
					return `(${elem.modify_value} руб.)`;
				}
			}
		}
	};

	return (
		<div className={cnx("activation__block")}>
			<h3 className={cnx("activation__title")}>{option.label}</h3>
			<div className={cnx("activation__options")}>
				{option.variants?.map((elem) => (
					<div className={cnx("itemD")}>
						<Checkbox
							key={elem.value}
							caption={elem.text}
							name={option.name}
							value={elem.value}
							checked={values[elem.value] || false}
							onChange={() => onChange(option.name, elem.value)}
							id={option.id}
							invalid={showInvalid}
						/>
						<div className={cnx("itemD__text")}>{cntSumm(elem)}</div>
					</div>
				))}
			</div>
		</div>
	);
}
