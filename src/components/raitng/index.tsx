import styles from "./index.module.scss";
import classNames from "classnames/bind";

const cnx = classNames.bind(styles);

type Props = {
	rating: string;
};

export function Rating({ rating }: Props) {
	return (
		<div className={cnx("raiting-block")}>
			<img src="/icons/common/star.svg" alt="Star" />
			<span>{rating}</span>
		</div>
	);
}
