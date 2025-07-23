import ProductCard from "../../components/product-card";
import ProductCardSkeleton from "../../components/productCardSkeleton/ProductCardSkeleton";
import { ProductData } from "../../hooks/types";
import { ProductDataCAT } from "../../hooks/useGetProductsFromCat";
import styles from "./index.module.scss";
import classNames from "classnames/bind";

const cnx = classNames.bind(styles);

interface IProductCards {
	data: ProductData[] | ProductDataCAT[];
	loading?: boolean;
}

export function ProductCards({ data, loading = false }: IProductCards) {
	if (loading) {
		return (
			<div className={cnx("cards", loading ? "loading" : "")}>
				{Array(data.length || 8)
					.fill(null)
					.map((_, i) => (
						<ProductCardSkeleton key={i} />
					))}
			</div>
		);
	}

	return (
		<div className={cnx("cards", loading ? "loading" : "")}>
			{data.map((product) => (
				<ProductCard key={product.id} product={product} />
			))}
		</div>
	);
}

export default ProductCards;
