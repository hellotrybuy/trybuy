import InputField from "../../../../../../../../components/inputField";
import { OptionItem } from "../../../../../../../../hooks/types";
import { usePrice } from "../../../../../../context";
import styles from "../../index.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";

const cnx = classNames.bind(styles);

interface Props {
	option: OptionItem;
	value: string;
	onChange: (name: string, value: string) => void;
	isComment?: boolean;
	placeholder?: string;
	isLabel?: boolean;
}

export default function TextOptionField({
	option,
	value,
	onChange,
	isComment = true,
	placeholder = "",
	isLabel = true,
}: Props) {
	const [touched, setTouched] = useState(false);
	const { formSubmitted } = usePrice();

	const handleBlur = () => {
		setTouched(true);
	};

	const isInvalid =
		(touched || formSubmitted) && !value.trim() && option.required == 1;

	return (
		<div className={cnx("activation__block")}>
			{isLabel && <h3 className={cnx("activation__title")}>{option.label}</h3>}
			<div className={cnx("activation__options")}>
				<InputField
					value={value}
					warning={isComment ? option.comment : ""}
					onChange={(e) => {
						onChange(option.name, e.target.value);
					}}
					onBlur={handleBlur}
					placeholder={placeholder == "" ? option.label : placeholder}
					id={option.id}
					invalid={isInvalid}
				/>
			</div>
		</div>
	);
}
