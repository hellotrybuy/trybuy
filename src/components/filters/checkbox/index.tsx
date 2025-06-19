import styles from "./index.module.scss";
import classNames from "classnames/bind";
import { InputHTMLAttributes } from "react";

const cnx = classNames.bind(styles);

interface ICheckbox extends InputHTMLAttributes<HTMLInputElement> {
	caption: string;
	className?: string;
	checked?: boolean;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export function Checkbox({
	className,
	caption,
	checked,
	onChange,
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
			<div className={cnx("checkbox__checkmark")}></div>
			<span className={cnx("checkbox__caption")}>{caption}</span>
		</label>
	);
}
export default Checkbox;
