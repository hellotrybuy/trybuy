/* eslint-disable @typescript-eslint/no-unused-vars */
import styles from "./index.module.scss";
import classNames from "classnames/bind";
import { InputHTMLAttributes } from "react";

const cnx = classNames.bind(styles);

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	afterText?: string;
	warning?: string;
	className?: string;
	placeholder?: string;
	invalid?: boolean;
}

export function InputField({
	label,
	afterText,
	warning,
	className,
	placeholder,
	invalid = false,
	...props
}: InputFieldProps) {
	return (
		<div className={cnx("replenishment__bottom", className)}>
			<div className={cnx("replenishment__block", { isInvalid: invalid })}>
				<input
					className={cnx()}
					type="text"
					placeholder={
						placeholder.charAt(0).toUpperCase() +
						placeholder.slice(1).toLowerCase()
					}
					{...props}
				/>
				{afterText && <span>{afterText}</span>}
			</div>
			{warning != "" && warning && (
				<small className={cnx("replenishment__caption")}>{warning}</small>
			)}
		</div>
	);
}

export default InputField;
