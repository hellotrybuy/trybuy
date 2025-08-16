/* eslint-disable @typescript-eslint/no-unused-vars */
import styles from "./index.module.scss";
import classNames from "classnames/bind";
import { InputHTMLAttributes } from "react";

const cnx = classNames.bind(styles);

interface ICheckbox extends InputHTMLAttributes<HTMLInputElement> {
	caption: string;
	className?: string;
	checked?: boolean;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	invalid?: boolean;
	price?: string;
}
export function Checkbox({
	className,
	invalid = false,
	caption,
	checked,
	onChange,
	price = "",
	...attributes
}: ICheckbox) {
	return (
		<label className={cnx("checkbox")}>
			<input
				{...attributes}
				type="checkbox"
				checked={checked}
				onChange={onChange}
			/>
			<div className={cnx("checkbox__checkmark", { isInvalid: invalid })}></div>
			<div className={cnx("checkbox__caption")}>
				{caption} <span className={cnx("itemD__text")}>{price}</span>
			</div>
		</label>
	);
}
export default Checkbox;
