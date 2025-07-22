import ProductCardSkeleton from "../../components/productCardSkeleton/ProductCardSkeleton";
import styles from "./index.module.scss";
import classNames from "classnames/bind";

const cnx = classNames.bind(styles);

interface Props {
	isMargin: boolean;
}

export function ProductsSceletonLeaders({ isMargin }: Props) {
	return (
		<div className={cnx("cards", isMargin ? "loading" : "")}>
			{Array(20)
				.fill(null)
				.map((_, i) => (
					<ProductCardSkeleton key={i} />
				))}
		</div>
	);
}

export default ProductsSceletonLeaders;
