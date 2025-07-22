import ProductCard from "../../components/product-card";
import ProductCardSkeleton from "../../components/productCardSkeleton/ProductCardSkeleton";
import { ProductData } from "../../hooks/types";
import { ProductDataCAT } from "../../hooks/useGetProductsFromCat";
import styles from "./index.module.scss";
import classNames from "classnames/bind";

const cnx = classNames.bind(styles);

// Временный пропс для мока
interface IProductCards {
	data: ProductData[] | ProductDataCAT[];
	loading?: boolean;
}

export function ProductCards({ data, loading = false }: IProductCards) {
	if (loading && (!data || data.length === 0)) {
		// Показываем несколько скелетонов при первой загрузке
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

	return (
		<div className={cnx("cards")}>
			{data.map((product) => (
				<ProductCard key={product.id} product={product} />
			))}
		</div>
	);
}

export default ProductCards;
