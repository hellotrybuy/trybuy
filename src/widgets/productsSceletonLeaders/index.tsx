import ProductCardSkeleton from "../../components/productCardSkeleton/ProductCardSkeleton";
import styles from "./index.module.scss";
import classNames from "classnames/bind";

const cnx = classNames.bind(styles);

interface Props {
	isMargin: boolean;
	count?: number;
}

export function ProductsSceletonLeaders({ isMargin, count = 20 }: Props) {
	return (
		<div className={cnx("cards", isMargin ? "loading" : "")}>
			{Array(count)
				.fill(null)
				.map((_, i) => (
					<ProductCardSkeleton key={i} />
				))}
		</div>
	);
}

export default ProductsSceletonLeaders;
