import { useRef, useState } from "react";
import styles from "./index.module.scss";
import classNames from "classnames/bind";
import { useClickOutside } from "../../hooks/useClickOutside";

const cnx = classNames.bind(styles);

interface ISelect {
	value: string;
	options: { value: string; label: string }[];
	onChange: (value: string) => void;
}

export function Select({ value, options, onChange }: ISelect) {
	const [isOpen, setIsOpen] = useState(false);

	const ref = useRef<HTMLDivElement>(null);

	useClickOutside([ref], () => setIsOpen(false));

	const getLabel = () => {
		return options.find((option) => option.value == value)?.label;
	};

	return (
		<div className={cnx("select", isOpen && "_opened")} ref={ref} key="select">
			<div onClick={() => setIsOpen(!isOpen)} className={cnx("select__head")}>
				<span className={cnx("select__value")}>{getLabel()}</span>
				<svg
					className={cnx("select__arrow")}
					width="12"
					height="9"
					viewBox="0 0 12 9"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M1.20312 0.897522L3.70312 3.39752L6 5.52147L8.20312 3.39752L10.7031 0.897522L12 2.10254L6 8.10253L-5.26728e-08 2.10253L1.20312 0.897522Z"
						fill="#7B7B7B"
					/>
				</svg>
			</div>
			<div className={cnx("select__dropdown")}>
				<ul>
					{options.map((option, i) => (
						<li
							key={i}
							onClick={() => {
								onChange(option.value);
								setIsOpen(false);
							}}
						>
							{option.label}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
export default Select;
