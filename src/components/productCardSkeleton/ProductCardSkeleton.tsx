import styles from "./index.module.scss";
import classNames from "classnames/bind";

const cnx = classNames.bind(styles);

export function ProductCardSkeleton() {
	return (
		<div className={cnx("skeleton-card")}>
			<div className={cnx("image")} />
			<div className={cnx("title")} />
			<div className={cnx("price")} />
			<div className={cnx("button")} />
		</div>
	);
}

export default ProductCardSkeleton;
