import { ButtonHTMLAttributes, forwardRef, Ref } from "react";

import styles from "./index.module.scss";
import classNames from "classnames/bind";

const cnx = classNames.bind(styles);
interface TButton
	extends React.PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
	size?: "medium" | "large";
	white?: boolean;
	active?: boolean;
	icon?: boolean;
}

export const Button = forwardRef(function (
	{ size = "medium", white, active, icon, children, ...atrributes }: TButton,
	ref: Ref<HTMLButtonElement>,
) {
	const className = atrributes.className;

	const btnClasses = cnx({
		btn: true,
		_active: active,
		_icon: icon,
		_large: size == "large",
		_white: white,
	});

	return (
		<button {...atrributes} className={cnx(btnClasses, className)} ref={ref}>
			{children}
		</button>
	);
});
export default Button;
