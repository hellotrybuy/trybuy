import styles from "./index.module.scss";
import classNames from "classnames/bind";
import { InputHTMLAttributes, ChangeEvent } from "react";

const cnx = classNames.bind(styles);

interface IRadio extends InputHTMLAttributes<HTMLInputElement> {
	caption: string;
	className?: string;
	onValueChange?: (value: string) => void; // кастомный коллбэк
}

export function Radio({
	className,
	caption,
	onValueChange,
	value,
	onChange,
	...attributes
}: IRadio) {
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		onChange?.(e); // вызов стандартного onChange, если передан
		if (onValueChange) {
			onValueChange(e.target.value); // <-- правильное значение!
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
			<span className={cnx("radio__caption")}>{caption}</span>
		</label>
	);
}

export default Radio;
