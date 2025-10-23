import styles from "../../index.module.scss";
import classNames from "classnames/bind";
import { OptionItem, ProductData } from "../../../../../../../../hooks/types";
import { usePrice } from "../../../../../../context";
import Select from "../../../../../../../../components/select";

const cnx = classNames.bind(styles);

interface Props {
	option: OptionItem;
	value: string;
	onChange: (optionName: string, value: string) => void;
	isInvalid: boolean;
	product: ProductData;
}

export default function SelectOptionGroup({
	option,
	value,
	onChange,
	isInvalid,
	product,
}: Props) {
	const { formSubmitted } = usePrice();

	const showInvalid = (formSubmitted || isInvalid) && isInvalid;

	const cntSumm = (elem: any) => {
		if (elem.modify_type === "USD" && elem.modify) {
			const curs = Number(product[0].price) / Number(product[0].price_usd);
			const res = Math.ceil(Number(elem.modify_value) * curs);
			return res > 0 ? `(+${res} руб.)` : `(${res} руб.)`;
		}

		if (elem.modify_value !== 0) {
			return elem.modify_value > 0
				? `(+${elem.modify_value} руб.)`
				: `(${elem.modify_value} руб.)`;
		}
		return "";
	};

	return (
		<div className={cnx("activation__block", showInvalid && "isInvalid")}>
			<h3 className={cnx("activation__title")}>{option.label}</h3>
			<div className={cnx("activation__options")}>
				<Select
					value={value}
					onChange={(val) => onChange(option.name, val)}
					options={option.variants.map((v) => ({
						value: v.value.toString(),
						label: `${v.text} ${cntSumm(v)}`,
					}))}
				/>
			</div>
		</div>
	);
}
