import ProductCardSkeleton from "../../components/productCardSkeleton/ProductCardSkeleton";
import styles from "./index.module.scss";
import classNames from "classnames/bind";

const cnx = classNames.bind(styles);

export function ProductsSceleton() {
	return (
		<div className={cnx("cards")}>
			{Array(20)
				.fill(null)
				.map((_, i) => (
					<ProductCardSkeleton key={i} />
				))}
		</div>
	);
}

export default ProductsSceleton;
