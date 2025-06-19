import styles from "./index.module.scss";
import classNames from "classnames/bind";

const cnx = classNames.bind(styles);

type Props = {
	count: string;
};

export function ReviewsCount({ count }: Props) {
	return (
		<div className={cnx("review-block")}>
			<div className={cnx("card__review-block")}>
				<span>{count}+ Оценок</span>
			</div>
		</div>
	);
}
