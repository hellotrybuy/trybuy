import classNames from "classnames/bind";
import styles from "./index.module.scss";

const cnx = classNames.bind(styles);

interface FilterButtonProps {
	onClick: () => void;
	isOpen: boolean;
}

export function FilterButton({ onClick, isOpen }: FilterButtonProps) {
	return (
		<button
			className={cnx("filter__btn", { _open: isOpen })}
			onClick={onClick}
			type="button"
			aria-expanded={isOpen}
			aria-label="Открыть фильтры"
		>
			<img
				src="/iconsFolder/common/Sort_by_square.svg"
				className={cnx("desk")}
			/>
			<img
				src="/iconsFolder/common/Sort_by_square_mob.svg"
				className={cnx("mob")}
			/>
			Фильтры
		</button>
	);
}
