import InputField from "../../../../../../../../components/inputField";
import { OptionItem } from "../../../../../../../../hooks/types";
import styles from "../../index.module.scss";

import classNames from "classnames/bind";

const cnx = classNames.bind(styles);

interface Props {
	option: OptionItem;
	value: string;
	onChange: (name: string, value: string) => void;
}

export default function TextOptionField({ option, value, onChange }: Props) {
	return (
		<div className={cnx("activation__block")}>
			<h3 className={cnx("activation__title")}>{option.label}</h3>
			<div className={cnx("activation__options")}>
				<InputField
					value={value}
					warning={option.comment}
					onChange={(e) => onChange(option.name, e.target.value)}
					placeholder={option.label}
					id={option.id}
				/>
			</div>
		</div>
	);
}
