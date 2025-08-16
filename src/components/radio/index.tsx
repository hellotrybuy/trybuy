import styles from "./index.module.scss";
import classNames from "classnames/bind";
import { InputHTMLAttributes, ChangeEvent } from "react";

const cnx = classNames.bind(styles);

interface IRadio extends InputHTMLAttributes<HTMLInputElement> {
	caption: string;
	className?: string;
	onValueChange?: (value: string) => void;
	price?: string;
}

export function Radio({
	className,
	caption,
	onValueChange,
	value,
	onChange,
	price = "",
	...attributes
}: IRadio) {
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		onChange?.(e);
		if (onValueChange) {
			onValueChange(e.target.value);
		}
	};

	return (
		<label className={cnx("radio", className)}>
			<input
				{...attributes}
				type="radio"
				value={value}
				onChange={handleChange}
			/>
			<div className={cnx("radio__checkmark")}></div>
			<div className={cnx("radio__caption")}>
				{caption} <span className={cnx("itemD__text")}>{price}</span>
			</div>
		</label>
	);
}

export default Radio;
