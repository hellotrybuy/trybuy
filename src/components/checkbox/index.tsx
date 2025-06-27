import styles from "./index.module.scss";
import classNames from "classnames/bind";

import { InputHTMLAttributes } from "react";

const cnx = classNames.bind(styles);

interface ICheckbox extends InputHTMLAttributes<HTMLInputElement> {
	caption: string;
	className?: string;
	warning?: string;
}

export function Checkbox({
	className,
	caption,
	warning,
	...attributes
}: ICheckbox) {
	return (
		<div className={cnx("checkbox-wrapper", className)}>
			<label className={cnx("checkbox")}>
				<input {...attributes} type="checkbox" />
				<div className={cnx("checkbox__checkmark")}></div>
				<span className={cnx("checkbox__caption")}>{caption}</span>
			</label>
			{warning && <div className={cnx("checkbox__warning")}>{warning}</div>}
		</div>
	);
}

export default Checkbox;
