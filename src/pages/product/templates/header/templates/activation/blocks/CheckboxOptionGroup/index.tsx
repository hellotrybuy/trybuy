import Checkbox from "../../../../../../../../components/filters/checkbox";
import { OptionItem } from "../../../../../../../../hooks/types";
import { usePrice } from "../../../../../../context";
import styles from "../../index.module.scss";
import classNames from "classnames/bind";

const cnx = classNames.bind(styles);

interface Props {
	option: OptionItem;
	values: string | boolean | Record<string, boolean>;
	onChange: (optionName: string, variantValue: string) => void;
	isInvalid: boolean;
}

export default function CheckboxOptionGroup({
	option,
	values,
	onChange,
	isInvalid,
}: Props) {
	const { formSubmitted } = usePrice();

	if (!values) return null;

	const showInvalid = (formSubmitted || isInvalid) && isInvalid;

	return (
		<div className={cnx("activation__block")}>
			<h3 className={cnx("activation__title")}>{option.label}</h3>
			<div className={cnx("activation__options")}>
				{option.variants?.map((elem) => (
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
				))}
			</div>
		</div>
	);
}
