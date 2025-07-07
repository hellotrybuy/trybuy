import Checkbox from "../../../../../../../../components/filters/checkbox";
import { OptionItem } from "../../../../../../../../hooks/types";
import styles from "../../index.module.scss";
import classNames from "classnames/bind";

const cnx = classNames.bind(styles);

interface Props {
	option: OptionItem;
	values: string | boolean | Record<string, boolean>;
	onChange: (optionName: string, variantValue: string) => void;
}

export default function CheckboxOptionGroup({
	option,
	values,
	onChange,
}: Props) {
	if (!values) return;
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
					/>
				))}
			</div>
		</div>
	);
}
